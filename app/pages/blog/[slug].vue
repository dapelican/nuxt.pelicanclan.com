<script setup>
const route = useRoute();
const { locale, t } = useI18n();

const { data: post } = await useAsyncData(
  () => `blog-${locale.value}-${route.params.slug}`,
  () => queryCollection('blog')
    .where('locale', '=', locale.value)
    .where('slug', '=', route.params.slug)
    .first()
);

const show_not_found = () => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not Found',
    fatal: true,
  });
};

if (!post.value) {
  show_not_found();
}

const breadcrumb_items = computed(() => [
  {
    label: t('t_blog'),
    to: '/blog',
  },
  {
    label: post.value?.title ?? '',
  },
]);

watch(post, (value) => {
  if (!value) {
    show_not_found();
  }
});

useSeoMeta({
  title: () => {
    const page_title = post.value?.meta_title || post.value?.title;

    return page_title ? `${page_title} | ${WEBSITE_NAME}` : WEBSITE_NAME;
  },
  description: () => post.value?.meta_description,
});
</script>

<template>
  <!-- app/pages/blog/[slug].vue -->
  <UContainer class="blog-article ml-auto mr-auto max-w-xl">
    <UBreadcrumb
      v-if="post"
      class="mb-6"
      :items="breadcrumb_items"
    />

    <ContentRenderer
      v-if="post"
      :value="post"
    />
  </UContainer>
</template>

<style scoped>
.blog-article :deep(h1) {
  text-align: center;
}
</style>
