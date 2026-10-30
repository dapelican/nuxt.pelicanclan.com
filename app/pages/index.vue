<script setup>
const { t } = useI18n();

useSeoMeta({
  title: `${t('t_home_page_title')} | ${WEBSITE_NAME}`,
  description: $t('t_home_page_meta_description'),
});

const search = ref('');
const search_tools = ref([]);
const search_pending = ref(false);

const is_searching = computed(() => Boolean(search.value.trim()));

const has_tools = computed(() => search_tools.value.length > 0);

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
    search_tools.value = [];
    search_pending.value = false;
    return;
  }

  search_pending.value = true;

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

    <section class="ml-auto mr-auto max-w-5xl mt-8">
      <h2>
        {{ $t('t_search_known_tool') }}
      </h2>

      <UInput
        v-model="search"
        class="w-full max-w-2xl"
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
      <h2>
        {{ $t('t_click_on_use') }}
      </h2>

      <p
        v-if="!is_searching"
        class="mt-6"
      >
        {{ $t('t_search_first') }}
      </p>

      <LoadingElement
        v-else-if="search_pending"
        class="mt-6"
      />

      <div
        v-else-if="has_tools"
        class="mt-8 grid gap-4"
      >
        <ToolListElement :tool_list="search_tools" />
      </div>

      <p
        v-else
        class="mt-6"
      >
        {{ $t('t_no_tool_found') }}
      </p>
    </section>
  </UContainer>
</template>
