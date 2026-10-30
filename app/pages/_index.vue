<script setup>
const { t } = useI18n();

useSeoMeta({
  title: `${t('t_tools_page_title')} | ${WEBSITE_NAME}`,
  description: t('t_tools_page_meta_description'),
});

const search = ref('');
const search_tools = ref([]);
const search_pending = ref(false);

const {
  data: default_data,
  error: default_error,
  pending: default_pending,
  refresh: refreshDefaultTools,
} = await useFetch('/tools/default');

if (default_error.value) {
  const error_message = default_error.value.data?.error_message;

  if (error_message !== 'error_invalid_input') {
    handleFrontendError(null, error_message);
  }
}

const is_searching = computed(() => Boolean(search.value.trim()));

const has_tools = computed(() => {
  if (is_searching.value) {
    return search_tools.value.length > 0;
  }

  return Boolean(default_data.value?.tool_list?.length);
});

const handling_request = computed(() => (
  search.value.trim() ? search_pending.value : default_pending.value
));

let search_timeout;

const searchTools = async (query) => {
  search_pending.value = true;

  try {
    const response = await $fetch('/tools/search', {
      method: 'POST',
      body: {
        query,
      },
    });

    search_tools.value = response.tools ?? [];
  } catch (error) {
    search_tools.value = [];

    const error_message = error?.data?.error_message;

    if (error_message === 'error_invalid_input') {
      return;
    }

    handleFrontendError(error, error_message);
  } finally {
    search_pending.value = false;
  }
};

watch(search, (value) => {
  clearTimeout(search_timeout);

  const query = value.trim();

  if (!query) {
    refreshDefaultTools();
    return;
  }

  search_timeout = setTimeout(() => {
    if (query?.length >= 3) {
      useTrackEvent('search_tool', {
        props: {
          searched_tool_name: query,
        },
      });
    }

    searchTools(query);
  }, 300);
});

const clearSearch = () => {
  search.value = '';
};
</script>

<template>
  <!-- app/pages/index.vue -->
  <UContainer>
    <h1 class="text-center">
      {{ $t('t_value_proposition') }}
    </h1>

    <!-- <section class="ml-auto mr-auto max-w-5xl mt-8 flex flex-wrap gap-4 justify-center">
      <SponsoredElement
        favicon_url="https://www.google.com/s2/favicons?domain=primevideo.com&sz=32"
        tool_name="Prime Video"
      >
        Fallout, the new Amazon Original series.<br>
        Stream the full first season now on
        <ULink
          href="https://sovrn.co/1egbv3l"
          rel="noopener noreferrer"
          class="text-primary"
        >Prime Video</ULink>.
      </SponsoredElement>

      <SponsoredElement
        favicon_url="https://www.google.com/s2/favicons?domain=primevideo.com&sz=32"
        tool_name="Prime Video"
      >
        Fallout, the new Amazon Original series.<br>
        Stream the full first season now on
        <ULink
          href="https://sovrn.co/1egbv3l"
          rel="noopener noreferrer"
          class="text-primary"
        >Prime Video</ULink>.
      </SponsoredElement>
    </section> -->

    <section class="ml-auto mr-auto max-w-2xl mt-8">
      <UInput
        v-model="search"
        class="w-full"
        :placeholder="$t('t_search_placeholder')"
      >
        <template
          v-if="search"
          #trailing
        >
          <UButton
            class="cursor-pointer"
            color="neutral"
            icon="i-lucide-circle-x"
            size="xs"
            variant="link"
            :padded="false"
            @click="clearSearch"
          />
        </template>
      </UInput>
    </section>

    <section class="ml-auto mr-auto max-w-5xl mt-8">
      <LoadingElement
        v-if="handling_request"
        class="mt-6"
      />

      <div
        v-else-if="has_tools"
        class="mt-8 grid gap-4"
      >
        <h2 v-if="!is_searching">
          {{ $t('t_20_random_tools') }}
        </h2>

        <ToolListElement
          :tool_list="is_searching ? search_tools : default_data.tool_list"
        />
      </div>
    </section>
  </UContainer>
</template>
