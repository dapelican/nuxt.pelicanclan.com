<script setup>
import * as z from 'zod';

const props = defineProps({
  selected_item_list: {
    type: Array,
    required: true,
  },
  source_kind: {
    type: String,
    required: true,
    validator: (value) => value === 'tools' || value === 'tags',
  },
});

const emit = defineEmits(['saved']);

const is_open = defineModel('open', {
  type: Boolean,
  default: false,
});

const MAX_LINK_COUNT = 500;

const handling_request = ref(false);
const loading_links = ref(false);
const form_error = ref('');
const target_search = ref('');
const shared_url = ref('');
const shared_name = ref('');
const is_single_selection = ref(false);
const active_selection = ref([]);
const counterpart_list = ref([]);
const draft_map = ref({});

let load_token = 0;

const itemLabel = (item, kind) => {
  if (kind === 'tools') {
    return item?.name || '';
  }

  return formatTagLabel(item);
};

const itemSearchText = (item, kind) => {
  if (kind === 'tools') {
    return `${item?.name ?? ''} ${item?.url ?? ''}`.toLowerCase();
  }

  return `${item?.label_fr ?? ''} ${item?.label_en ?? ''} ${item?.slug_fr ?? ''} ${item?.slug_en ?? ''}`.toLowerCase();
};

const counterpart_kind = computed(() => (
  props.source_kind === 'tools' ? 'tags' : 'tools'
));

const modal_title = computed(() => (
  props.source_kind === 'tools' ? 'Associer des tags' : 'Associer des outils'
));

const modal_description = computed(() => {
  if (is_single_selection.value) {
    return 'Les cases déjà cochées correspondent aux liens existants. Décocher un lien le supprime.';
  }

  return 'L\'URL et le nom spécifiques seront appliqués à chaque couple. Les liens absents de la sélection ne sont pas retirés.';
});

const selected_summary = computed(() => (
  active_selection.value
    .map((item) => itemLabel(item, props.source_kind))
    .filter(Boolean)
    .join(', ')
));

const filtered_counterpart_list = computed(() => {
  const search_text = target_search.value.trim().toLowerCase();

  if (!search_text) {
    return counterpart_list.value;
  }

  return counterpart_list.value.filter((item) => (
    itemSearchText(item, counterpart_kind.value).includes(search_text)
  ));
});

const isOptionalUrl = (value) => value === '' || z.url().safeParse(value).success;

const resetDraftMap = (existing_link_list) => {
  const next_draft_map = {};
  const existing_by_target_id = {};

  for (const link of existing_link_list) {
    const target_id = props.source_kind === 'tools' ? link.tag_id : link.tool_id;
    existing_by_target_id[target_id] = link;
  }

  for (const item of counterpart_list.value) {
    const existing_link = existing_by_target_id[item.id];

    next_draft_map[item.id] = {
      checked: Boolean(is_single_selection.value && existing_link),
      tool_specific_name: is_single_selection.value && existing_link
        ? (existing_link.tool_specific_name ?? '')
        : '',
      tool_specific_url: is_single_selection.value && existing_link
        ? (existing_link.tool_specific_url ?? '')
        : '',
      tool_tag_id: is_single_selection.value ? (existing_link?.id ?? null) : null,
    };
  }

  draft_map.value = next_draft_map;
};

const loadModalData = async () => {
  const token = ++load_token;
  loading_links.value = true;
  form_error.value = '';
  target_search.value = '';
  shared_url.value = '';
  shared_name.value = '';
  active_selection.value = props.selected_item_list.map((item) => ({ ...item }));
  is_single_selection.value = active_selection.value.length === 1;
  counterpart_list.value = [];

  try {
    const counterpart_path = counterpart_kind.value === 'tags' ? 'tags' : 'tools';
    const counterpart_response = await $fetch(`${ADMIN_BASE_PATH}/api/${counterpart_path}`);

    if (token !== load_token || !is_open.value) {
      return;
    }

    counterpart_list.value = counterpart_response[counterpart_path] ?? [];

    let existing_link_list = [];

    if (is_single_selection.value) {
      const selected_item = active_selection.value[0];
      const query = props.source_kind === 'tools'
        ? { tool_id: selected_item.id }
        : { tag_id: selected_item.id };
      const link_response = await $fetch(`${ADMIN_BASE_PATH}/api/tool-tags`, {
        query,
      });

      existing_link_list = link_response.tool_tags ?? [];
    }

    if (token !== load_token || !is_open.value) {
      return;
    }

    resetDraftMap(existing_link_list);
  } catch (error) {
    if (token !== load_token) {
      return;
    }

    form_error.value = handleAdminError(error);
  } finally {
    if (token === load_token) {
      loading_links.value = false;
    }
  }
};

watch(is_open, (open) => {
  if (open) {
    loadModalData();
  }
});

const buildLink = (tool_id, tag_id, tool_specific_url, tool_specific_name) => ({
  tag_id,
  tool_id,
  tool_specific_name: tool_specific_name.trim(),
  tool_specific_url: tool_specific_url.trim(),
});

const saveLinks = async () => {
  handling_request.value = true;
  form_error.value = '';

  try {
    const link_list = [];
    const delete_id_list = [];

    if (is_single_selection.value) {
      const source_id = active_selection.value[0]?.id;

      if (!source_id) {
        form_error.value = 'Aucun élément sélectionné.';
        return;
      }

      for (const [target_id, draft] of Object.entries(draft_map.value)) {
        if (draft.checked) {
          const tool_id = props.source_kind === 'tools' ? source_id : target_id;
          const tag_id = props.source_kind === 'tools' ? target_id : source_id;

          if (!isOptionalUrl(draft.tool_specific_url.trim())) {
            form_error.value = 'Une URL spécifique est invalide.';
            return;
          }

          link_list.push(buildLink(
            tool_id,
            tag_id,
            draft.tool_specific_url,
            draft.tool_specific_name
          ));
        } else if (draft.tool_tag_id) {
          delete_id_list.push(draft.tool_tag_id);
        }
      }
    } else {
      if (!isOptionalUrl(shared_url.value.trim())) {
        form_error.value = 'L\'URL spécifique est invalide.';
        return;
      }

      const checked_target_id_list = Object.entries(draft_map.value)
        .filter(([, draft]) => draft.checked)
        .map(([target_id]) => target_id);

      if (!checked_target_id_list.length) {
        form_error.value = props.source_kind === 'tools'
          ? 'Sélectionnez au moins un tag.'
          : 'Sélectionnez au moins un outil.';
        return;
      }

      for (const source of active_selection.value) {
        for (const target_id of checked_target_id_list) {
          const tool_id = props.source_kind === 'tools' ? source.id : target_id;
          const tag_id = props.source_kind === 'tools' ? target_id : source.id;

          link_list.push(buildLink(
            tool_id,
            tag_id,
            shared_url.value,
            shared_name.value
          ));
        }
      }
    }

    if (!link_list.length && !delete_id_list.length) {
      form_error.value = 'Aucune modification à enregistrer.';
      return;
    }

    if (link_list.length > MAX_LINK_COUNT) {
      form_error.value = 'Trop de liaisons d\'un coup. Réduisez la sélection.';
      return;
    }

    for (const tool_tag_id of delete_id_list) {
      await $fetch(`${ADMIN_BASE_PATH}/api/tool-tags/${tool_tag_id}`, {
        method: 'DELETE',
      });
    }

    if (link_list.length) {
      await $fetch(`${ADMIN_BASE_PATH}/api/tool-tags`, {
        method: 'POST',
        body: {
          link_list,
        },
      });
    }

    emit('saved');
    is_open.value = false;
  } catch (error) {
    form_error.value = handleAdminError(error);
  } finally {
    handling_request.value = false;
  }
};
</script>

<template>
  <UModal
    v-model:open="is_open"
    :description="modal_description"
    scrollable
    :title="modal_title"
    :ui="{ content: 'sm:max-w-3xl' }"
  >
    <template #body>
      <form
        class="space-y-4"
        @submit.prevent="saveLinks"
      >
        <p v-if="selected_summary">
          {{ selected_summary }}
        </p>

        <LoadingElement v-if="loading_links" />

        <template v-else>
          <div
            v-if="!is_single_selection"
            class="grid gap-4 md:grid-cols-2"
          >
            <UFormField label="URL spécifique">
              <UInput
                v-model="shared_url"
                class="w-full"
                :disabled="handling_request"
                type="url"
              />
            </UFormField>

            <UFormField label="Nom spécifique">
              <UInput
                v-model="shared_name"
                class="w-full"
                :disabled="handling_request"
              />
            </UFormField>
          </div>

          <UInput
            v-model="target_search"
            class="w-full"
            :disabled="handling_request"
            :placeholder="counterpart_kind === 'tags' ? 'Filtrer les tags' : 'Filtrer les outils'"
          />

          <div
            v-if="filtered_counterpart_list.length"
            class="grid max-h-96 gap-3 overflow-y-auto"
          >
            <div
              v-for="item in filtered_counterpart_list"
              :key="item.id"
              class="rounded-md border border-default p-3"
            >
              <UCheckbox
                v-if="draft_map[item.id]"
                v-model="draft_map[item.id].checked"
                :disabled="handling_request"
                :label="itemLabel(item, counterpart_kind)"
              />

              <div
                v-if="is_single_selection && draft_map[item.id]?.checked"
                class="mt-3 grid gap-3"
              >
                <UFormField label="URL spécifique">
                  <UInput
                    v-model="draft_map[item.id].tool_specific_url"
                    class="w-full"
                    :disabled="handling_request"
                    type="url"
                  />
                </UFormField>

                <UFormField label="Nom spécifique">
                  <UInput
                    v-model="draft_map[item.id].tool_specific_name"
                    class="w-full"
                    :disabled="handling_request"
                  />
                </UFormField>
              </div>
            </div>
          </div>

          <p v-else>
            {{ counterpart_kind === 'tags' ? 'Aucun tag.' : 'Aucun outil.' }}
          </p>
        </template>

        <UAlert
          v-if="form_error"
          color="error"
          :description="form_error"
          icon="i-lucide-info"
        />

        <nav class="flex flex-wrap gap-2">
          <UButton
            :disabled="handling_request || loading_links"
            :loading="handling_request"
            type="submit"
          >
            Enregistrer
          </UButton>

          <UButton
            color="neutral"
            :disabled="handling_request"
            type="button"
            variant="ghost"
            @click="is_open = false"
          >
            Annuler
          </UButton>
        </nav>
      </form>
    </template>
  </UModal>
</template>
