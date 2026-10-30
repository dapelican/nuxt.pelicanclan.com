<script setup>
const { t, locale } = useI18n();

useSeoMeta({
  title: `${t('t_categories')} | ${WEBSITE_NAME}`,
  description: t('t_categories_page_meta_description'),
});

const {
  data: categories_data,
  error: categories_error,
  pending: handling_request,
} = await useFetch('/tags/get-all');

if (categories_error.value) {
  const error_message = categories_error.value.data?.error_message;

  if (error_message !== 'error_invalid_input') {
    handleFrontendError(null, error_message);
  }
}

const main_use_tag_list = computed(() => categories_data.value?.tags_by_type?.main_use ?? []);

const characteristics_tag_list = computed(() => categories_data.value?.tags_by_type?.characteristics ?? []);

const getTagSlug = (tag) =>
  locale.value === 'en' ? tag.slug_en : tag.slug_fr;

const getTagLabel = (tag) =>
  locale.value === 'en' ? tag.label_en : tag.label_fr;
</script>

<template>
  <!-- app/pages/t/index.vue -->
  <UContainer>
    <h1 class="text-center">
      {{ $t('t_categories') }}
    </h1>

    <section class="ml-auto mr-auto max-w-2xl">
      <LoadingElement
        v-if="handling_request"
        class="mt-6"
      />

      <div v-if="!handling_request">
        <h2>
          {{ $t('t_main_use') }}
        </h2>

        <ul>
          <li
            v-for="tag in main_use_tag_list"
            :key="tag.id"
          >
            <ULink
              v-if="tag.tool_count > 0"
              :to="`/t/${getTagSlug(tag)}`"
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
          {{ $t('t_characteristics') }}
        </h2>

        <ul>
          <li
            v-for="tag in characteristics_tag_list"
            :key="tag.id"
          >
            <ULink
              v-if="tag.tool_count > 0"
              :to="`/t/${getTagSlug(tag)}`"
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
