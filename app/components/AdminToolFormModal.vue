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

const SQUARE_LOGO_BASE_URL = 'https://a.pelicanclan.com/';

const tool_form_schema = z.object({
  active_en: z.boolean(),
  active_fr: z.boolean(),
  comment: z.string().trim().max(10000, 'Le commentaire est trop long'),
  name: z.string().trim().min(1, 'Le nom est requis'),
  square_logo_url: z.string().trim().regex(/^(?:[^\s/]\S*)?$/, 'Le nom du fichier est invalide'),
  url: z.url('L\'URL est invalide'),
});

const handling_request = ref(false);
const form_error = ref('');

const form_state = reactive({
  active_en: true,
  active_fr: true,
  comment: '',
  name: '',
  square_logo_url: '',
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
    form_state.comment = '';
    form_state.name = '';
    form_state.square_logo_url = '';
    form_state.url = '';
    return;
  }

  form_state.active_en = props.tool.active_en !== false;
  form_state.active_fr = props.tool.active_fr !== false;
  form_state.comment = props.tool.comment ?? '';
  form_state.name = props.tool.name ?? '';
  const square_logo_url = props.tool.square_logo_url ?? '';
  form_state.square_logo_url = square_logo_url.startsWith(SQUARE_LOGO_BASE_URL)
    ? square_logo_url.slice(SQUARE_LOGO_BASE_URL.length)
    : square_logo_url;
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

  const square_logo_file_name = form_state.square_logo_url.trim();

  const body = {
    active_en: form_state.active_en,
    active_fr: form_state.active_fr,
    comment: form_state.comment.trim(),
    name: form_state.name,
    square_logo_url: square_logo_file_name ? `${SQUARE_LOGO_BASE_URL}${square_logo_file_name}` : '',
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
          label="URL du logo carré"
          name="square_logo_url"
        >
          <UFieldGroup class="w-full">
            <UBadge
              color="neutral"
              :label="SQUARE_LOGO_BASE_URL"
              size="lg"
              variant="outline"
            />
            <UInput
              v-model="form_state.square_logo_url"
              class="w-full"
              :disabled="handling_request"
              placeholder="logo.png"
            />
          </UFieldGroup>
        </UFormField>

        <UFormField
          label="Commentaire"
          name="comment"
        >
          <UTextarea
            v-model="form_state.comment"
            class="w-full"
            :disabled="handling_request"
            :rows="4"
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
