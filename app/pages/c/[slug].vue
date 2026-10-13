<script setup>
const { locale } = useI18n();

const route = useRoute();

const slug = route.params.slug;

const {
  data: category_data,
  error: category_error,
  pending: handling_request,
} = await useFetch(`/categories/${slug}`);

if (category_error.value) {
  const error_message = category_error.value.data?.error_message;

  switch (error_message) {
    case 'error_invalid_input':
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        fatal: true,
      });
      break;
    default:
      handleFrontendError(null, error_message);
      break;
  }
}

const sponsored_tools = computed(() => category_data.value?.sponsored_tools ?? []);
const other_tools = computed(() => category_data.value?.other_tools ?? []);

const label_field = computed(() => (locale.value === 'en' ? 'label_en' : 'label_fr'));

const html_field = computed(() => (locale.value === 'en' ? 'html_en' : 'html_fr'));

const category_title = computed(() => {
  const tag = category_data.value?.tag;

  return tag?.[label_field.value] ?? slug;
});

useSeoMeta({
  title: computed(() => `${category_title.value} | ${WEBSITE_NAME}`),
});
</script>

<template>
  <!-- app/pages/c/[slug].vue -->
  <UContainer>
    <h1 class="text-center">
      {{ category_title }}
    </h1>

    <section class="ml-auto mr-auto max-w-3xl">
      <LoadingElement
        v-if="handling_request"
        class="mt-6"
      />

      <div
        v-if="category_data?.tag?.[html_field]"
        class="category-html max-w-xl"
        v-html="category_data?.tag?.[html_field]"
      />

      <div
        class="mt-6 grid gap-4"
      >
        <ToolListElement
          :sponsored_tool_list="sponsored_tools"
          :other_tool_list="other_tools"
        />
      </div>
    </section>
  </UContainer>
</template>

<style scoped>
:deep(.separator-1) {
  border: none;
  height: 1rem;
}

.category-html :deep(ol),
.category-html :deep(ul) {
  list-style: revert;
  margin: revert;
  padding: revert;
}
</style>
