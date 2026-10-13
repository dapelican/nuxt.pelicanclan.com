<script setup>
const { locale, t } = useI18n();

useSeoMeta({
  title: `${t('t_blog')} | ${WEBSITE_NAME}`,
  description: t('t_blog_page_meta_description'),
});

const { data: posts } = await useAsyncData(
  () => `blog-index-${locale.value}`,
  () => queryCollection('blog')
    .where('locale', '=', locale.value)
    .where('visibility', '=', 'public')
    .order('created_at', 'DESC')
    .all()
);

const blog_posts = computed(() => posts.value ?? []);
</script>

<template>
  <!-- app/pages/blog/index.vue -->
  <UContainer class="ml-auto mr-auto max-w-xl">
    <h1 class="text-center">
      {{ $t('t_blog') }}
    </h1>

    <ul
      class="list-disc list-inside mt-4"
    >
      <li
        v-for="post in blog_posts"
        :key="post.slug"
      >
        <ULink
          class="text-primary"
          :to="`/blog/${post.slug}`"
        >
          {{ post.title }}
        </ULink>
      </li>
    </ul>
  </UContainer>
</template>
