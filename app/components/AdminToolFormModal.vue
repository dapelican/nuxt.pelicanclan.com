<script setup>
import * as z from 'zod';

const props = defineProps({
  tool: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['saved']);

const is_open = defineModel('open', {
  type: Boolean,
  default: false,
});

const status_option_list = [
  {
    label: 'Aucun',
    value: 'none',
  },
  {
    label: 'Sponsorisé',
    value: 'sponsored',
  },
];

const optional_url_schema = z.union([
  z.literal(''),
  z.url('L\'URL du logo est invalide'),
]);

const tool_form_schema = z.object({
  active_en: z.boolean(),
  active_fr: z.boolean(),
  name: z.string().trim().min(1, 'Le nom est requis'),
  square_logo_url: optional_url_schema,
  status: z.enum(['none', 'sponsored']),
  url: z.url('L\'URL est invalide'),
});

const handling_request = ref(false);
const form_error = ref('');

const form_state = reactive({
  active_en: true,
  active_fr: true,
  name: '',
  square_logo_url: '',
  status: 'none',
  url: '',
});

const modal_title = computed(() => (
  props.tool ? 'Modifier un outil' : 'Ajouter un outil'
));

const fillForm = () => {
  form_error.value = '';

  if (!props.tool) {
    form_state.active_en = true;
    form_state.active_fr = true;
    form_state.name = '';
    form_state.square_logo_url = '';
    form_state.status = 'none';
    form_state.url = '';
    return;
  }

  form_state.active_en = props.tool.active_en !== false;
  form_state.active_fr = props.tool.active_fr !== false;
  form_state.name = props.tool.name ?? '';
  form_state.square_logo_url = props.tool.square_logo_url ?? '';
  form_state.status = props.tool.status === 'sponsored' ? 'sponsored' : 'none';
  form_state.url = props.tool.url ?? '';
};

watch(is_open, (open) => {
  if (open) {
    fillForm();
  }
});

const saveTool = async () => {
  handling_request.value = true;
  form_error.value = '';

  const body = {
    active_en: form_state.active_en,
    active_fr: form_state.active_fr,
    name: form_state.name,
    square_logo_url: form_state.square_logo_url.trim(),
    status: form_state.status === 'sponsored' ? 'sponsored' : '',
    url: form_state.url.trim(),
  };

  try {
    if (props.tool?.id) {
      await $fetch(`${ADMIN_BASE_PATH}/api/tools/${props.tool.id}`, {
        method: 'PATCH',
        body,
      });
    } else {
      await $fetch(`${ADMIN_BASE_PATH}/api/tools`, {
        method: 'POST',
        body,
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
    :title="modal_title"
    :ui="{ content: 'sm:max-w-xl' }"
  >
    <template #body>
      <UForm
        class="space-y-4"
        :schema="tool_form_schema"
        :state="form_state"
        @submit="saveTool"
      >
        <UFormField
          label="Nom"
          name="name"
        >
          <UInput
            v-model="form_state.name"
            class="w-full"
            :disabled="handling_request"
          />
        </UFormField>

        <UFormField
          label="URL"
          name="url"
        >
          <UInput
            v-model="form_state.url"
            class="w-full"
            :disabled="handling_request"
            type="url"
          />
        </UFormField>

        <UFormField
          label="Statut"
          name="status"
        >
          <USelect
            v-model="form_state.status"
            class="w-full"
            :disabled="handling_request"
            :items="status_option_list"
          />
        </UFormField>

        <UFormField
          label="URL du logo carré"
          name="square_logo_url"
        >
          <UInput
            v-model="form_state.square_logo_url"
            class="w-full"
            :disabled="handling_request"
            type="url"
          />
        </UFormField>

        <UFormField name="active_en">
          <UCheckbox
            v-model="form_state.active_en"
            :disabled="handling_request"
            label="Actif en anglais"
          />
        </UFormField>

        <UFormField name="active_fr">
          <UCheckbox
            v-model="form_state.active_fr"
            :disabled="handling_request"
            label="Actif en français"
          />
        </UFormField>

        <UAlert
          v-if="form_error"
          color="error"
          :description="form_error"
          icon="i-lucide-info"
        />

        <nav class="flex flex-wrap gap-2">
          <UButton
            :disabled="handling_request"
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
      </UForm>
    </template>
  </UModal>
</template>
