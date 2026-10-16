<script setup>
const props = defineProps({
  sponsored_tool_ids: {
    type: Array,
    default: () => [],
  },
  tools: {
    type: Array,
    required: true,
  },
});

const { locale } = useI18n();

const sort_column = ref(null);
const sort_direction = ref('asc');

const getgoalTags = (tool) =>
  (tool.tags ?? []).filter((tag) => tag.type === 'goal');

const getOtherTags = (tool) =>
  (tool.tags ?? []).filter((tag) => tag.type !== 'goal');

const show_users_column = computed(() =>
  props.tools.some((tool) => getOtherTags(tool).length > 0)
);

const sorted_tools = computed(() => {
  const tool_list = [...props.tools];

  if (!sort_column.value) {
    return tool_list;
  }

  tool_list.sort((tool_a, tool_b) => {
    let comparison = 0;

    if (sort_column.value === 'name') {
      comparison = tool_a.name.localeCompare(tool_b.name);
    }

    return sort_direction.value === 'asc' ? comparison : -comparison;
  });

  return tool_list;
});

const getTagSlug = (tag) =>
  locale.value === 'en' ? tag.slug_en : tag.slug_fr;

const getTagLabel = (tag) =>
  locale.value === 'en' ? tag.label_en : tag.label_fr;

const toggleSort = (column) => {
  if (sort_column.value === column) {
    sort_direction.value = sort_direction.value === 'asc' ? 'desc' : 'asc';
  } else {
    sort_column.value = column;
    sort_direction.value = 'asc';
  }
};

const getSortIcon = (column) => {
  if (sort_column.value !== column) {
    return 'i-lucide-arrow-up-down';
  }

  return sort_direction.value === 'asc'
    ? 'i-lucide-arrow-up'
    : 'i-lucide-arrow-down';
};

const isSponsoredTool = (tool) =>
  props.sponsored_tool_ids.includes(tool.id);
</script>

<template>
  <!-- ToolTableElement.vue -->
  <div class="overflow-x-auto">
    <table class="w-full border-collapse text-left text-sm">
      <thead>
        <tr class="border-b border-default">
          <th
            scope="col"
            class="px-3 py-2 font-medium text-muted w-12"
          >
            #
          </th>
          <th
            scope="col"
            class="px-3 py-2 font-medium"
          >
            <button
              type="button"
              class="inline-flex items-center gap-1 cursor-pointer hover:text-primary"
              @click="toggleSort('name')"
            >
              {{ $t('t_tool') }}
              <UIcon
                :name="getSortIcon('name')"
                class="size-4 shrink-0"
              />
            </button>
          </th>
          <th
            scope="col"
            class="px-3 py-2 font-medium"
          >
            {{ $t('t_goal') }}
          </th>
          <th
            v-if="show_users_column"
            scope="col"
            class="px-3 py-2 font-medium"
          >
            {{ $t('t_tags') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tool, index) in sorted_tools"
          :key="tool.id"
          class="border-b border-default align-top"
        >
          <td class="px-3 py-3 text-muted tabular-nums">
            {{ index + 1 }}
          </td>
          <td class="px-3 py-3">
            <section class="flex items-center gap-4">
              <span class="inline-flex items-center gap-2 min-w-0">
                <img
                  v-if="tool.square_logo_url"
                  alt=""
                  class="size-[32px] shrink-0 object-contain"
                  :src="tool.square_logo_url"
                >
                <ULink
                  :to="`${tool.url}?utm_source=pelicanclan.com&utm_medium=directory`"
                  target="_blank"
                  class="text-primary"
                >
                  {{ tool.name }}
                </ULink>
              </span>

              <TagElement
                v-if="isSponsoredTool(tool)"
                :label="$t('t_sponsored')"
              />
            </section>
          </td>
          <td class="px-3 py-3">
            <ul
              v-if="getgoalTags(tool).length"
              class="list-disc list-inside space-y-2"
            >
              <li
                v-for="tag in getgoalTags(tool)"
                :key="tag.id"
              >
                <ULink
                  :to="`/c/${getTagSlug(tag)}`"
                  class="text-primary"
                >
                  {{ getTagLabel(tag) }}
                </ULink>

                <span
                  v-if="tag.tool_specific_url"
                  class="ml-4 inline-flex items-center gap-1"
                >
                  &gt;&gt;
                  <ULink
                    v-if="tag.tool_specific_url"
                    :to="`${tag.tool_specific_url}?utm_source=pelicanclan.com&utm_medium=directory`"
                    target="_blank"
                    class="text-primary"
                  >{{ tag.tool_specific_name || $t('t_direct_link') }}</ULink>
                </span>
              </li>
            </ul>
          </td>
          <td
            v-if="show_users_column"
            class="px-3 py-3"
          >
            <ul
              v-if="getOtherTags(tool).length"
              class="list-disc list-inside space-y-2"
            >
              <li
                v-for="tag in getOtherTags(tool)"
                :key="tag.id"
              >
                <ULink
                  :to="`/c/${getTagSlug(tag)}`"
                  class="text-primary"
                >
                  {{ getTagLabel(tag) }}
                </ULink>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
