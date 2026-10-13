<script setup>
const { t, locale } = useI18n();

useSeoMeta({
  title: `${t('t_categories_page_title')} | ${WEBSITE_NAME}`,
  description: t('t_categories_page_meta_description'),
});

const {
  data: categories_data,
  error: categories_error,
  pending: handling_request,
} = await useFetch('/categories/get-all');

if (categories_error.value) {
  const error_message = categories_error.value.data?.error_message;

  if (error_message !== 'error_invalid_input') {
    handleFrontendError(null, error_message);
  }
}

const goal_tag_list = computed(() => categories_data.value?.tags_by_type?.goal ?? []);

const target_tag_list = computed(() => categories_data.value?.tags_by_type?.target ?? []);

const getTagSlug = (tag) =>
  locale.value === 'en' ? tag.slug_en : tag.slug_fr;

const getTagLabel = (tag) =>
  locale.value === 'en' ? tag.label_en : tag.label_fr;
</script>

<template>
  <!-- app/pages/c/index.vue -->
  <UContainer>
    <h1 class="text-center">
      {{ $t('t_categories_page_title') }}
    </h1>

    <section class="ml-auto mr-auto max-w-2xl">
      <LoadingElement
        v-if="handling_request"
        class="mt-6"
      />

      <div v-if="!handling_request">
        <h2>
          {{ $t('t_goals') }}
        </h2>

        <ul>
          <li
            v-for="tag in goal_tag_list"
            :key="tag.id"
          >
            <ULink
              v-if="tag.tool_count > 0"
              :to="`/c/${getTagSlug(tag)}`"
              class="text-primary"
            >
              {{ getTagLabel(tag) }}
              ({{ tag.tool_count }})
            </ULink>

            <span
              v-else
            >
              {{ getTagLabel(tag) }}
              ({{ $t('t_coming_soon') }})
            </span>
          </li>
        </ul>

        <h2 class="mt-8">
          {{ $t('t_tags') }}
        </h2>

        <ul>
          <li
            v-for="tag in target_tag_list"
            :key="tag.id"
          >
            <ULink
              v-if="tag.tool_count > 0"
              :to="`/c/${getTagSlug(tag)}`"
              class="text-primary"
            >
              {{ getTagLabel(tag) }}
              ({{ tag.tool_count }})
            </ULink>

            <span
              v-else
            >
              {{ getTagLabel(tag) }}
              ({{ $t('t_coming_soon') }})
            </span>
          </li>
        </ul>
      </div>
    </section>
  </UContainer>
</template>
