<script setup>
import * as z from 'zod';

const props = defineProps({
  tag: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['saved']);

const is_open = defineModel('open', {
  type: Boolean,
  default: false,
});

const type_option_list = [
  {
    label: 'Objectif',
    value: 'goal',
  },
  {
    label: 'Cible',
    value: 'target',
  },
];

const handling_request = ref(false);
const form_error = ref('');

const form_state = reactive({
  html_en: '',
  html_fr: '',
  label_en: '',
  label_fr: '',
  slug_en: '',
  slug_fr: '',
  type: 'goal',
});

const tag_form_schema = z.object({
  html_en: z.string(),
  html_fr: z.string(),
  label_en: z.string(),
  label_fr: z.string(),
  slug_en: z.string(),
  slug_fr: z.string(),
  type: z.enum(['goal', 'target']),
}).superRefine((value, context) => {
  if (!value.label_en.trim() && !value.label_fr.trim()) {
    context.addIssue({
      code: 'custom',
      message: 'Indiquez un libellé en français ou en anglais.',
      path: ['label_fr'],
    });
  }
});

const modal_title = computed(() => (
  props.tag ? 'Modifier un tag' : 'Ajouter un tag'
));

const fillForm = () => {
  form_error.value = '';

  if (!props.tag) {
    form_state.html_en = '';
    form_state.html_fr = '';
    form_state.label_en = '';
    form_state.label_fr = '';
    form_state.slug_en = '';
    form_state.slug_fr = '';
    form_state.type = 'goal';
    return;
  }

  form_state.html_en = props.tag.html_en ?? '';
  form_state.html_fr = props.tag.html_fr ?? '';
  form_state.label_en = props.tag.label_en ?? '';
  form_state.label_fr = props.tag.label_fr ?? '';
  form_state.slug_en = props.tag.slug_en ?? '';
  form_state.slug_fr = props.tag.slug_fr ?? '';
  form_state.type = props.tag.type === 'target' ? 'target' : 'goal';
};

watch(is_open, (open) => {
  if (open) {
    fillForm();
  }
});

const saveTag = async () => {
  handling_request.value = true;
  form_error.value = '';

  const body = {
    html_en: form_state.html_en,
    html_fr: form_state.html_fr,
    label_en: form_state.label_en,
    label_fr: form_state.label_fr,
    slug_en: form_state.slug_en,
    slug_fr: form_state.slug_fr,
    type: form_state.type,
  };

  try {
    if (props.tag?.id) {
      await $fetch(`${ADMIN_BASE_PATH}/api/tags/${props.tag.id}`, {
        method: 'PATCH',
        body,
      });
    } else {
      await $fetch(`${ADMIN_BASE_PATH}/api/tags`, {
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
    scrollable
    :title="modal_title"
    :ui="{ content: 'sm:max-w-3xl' }"
  >
    <template #body>
      <UForm
        class="space-y-4"
        :schema="tag_form_schema"
        :state="form_state"
        @submit="saveTag"
      >
        <div class="grid gap-4 md:grid-cols-2">
          <UFormField
            label="Libellé français"
            name="label_fr"
          >
            <UInput
              v-model="form_state.label_fr"
              class="w-full"
              :disabled="handling_request"
            />
          </UFormField>

          <UFormField
            label="Libellé anglais"
            name="label_en"
          >
            <UInput
              v-model="form_state.label_en"
              class="w-full"
              :disabled="handling_request"
            />
          </UFormField>

          <UFormField
            label="Slug français"
            name="slug_fr"
          >
            <UInput
              v-model="form_state.slug_fr"
              class="w-full"
              :disabled="handling_request"
            />
          </UFormField>

          <UFormField
            label="Slug anglais"
            name="slug_en"
          >
            <UInput
              v-model="form_state.slug_en"
              class="w-full"
              :disabled="handling_request"
            />
          </UFormField>

          <UFormField
            class="md:col-span-2"
            label="HTML français"
            name="html_fr"
          >
            <UTextarea
              v-model="form_state.html_fr"
              class="w-full"
              :disabled="handling_request"
              :rows="4"
            />
          </UFormField>

          <UFormField
            class="md:col-span-2"
            label="HTML anglais"
            name="html_en"
          >
            <UTextarea
              v-model="form_state.html_en"
              class="w-full"
              :disabled="handling_request"
              :rows="4"
            />
          </UFormField>

          <UFormField
            label="Type"
            name="type"
          >
            <USelect
              v-model="form_state.type"
              class="w-full"
              :disabled="handling_request"
              :items="type_option_list"
            />
          </UFormField>
        </div>

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
