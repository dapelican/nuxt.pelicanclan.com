<script setup>
const props = defineProps({
  sponsored: {
    type: Boolean,
    default: false,
  },
  tool: {
    type: Object,
    required: true,
  },
});

const { locale } = useI18n();

const goal_tags = computed(() =>
  (props.tool.tags ?? []).filter((tag) => tag.type === 'goal')
);

const other_tags = computed(() =>
  (props.tool.tags ?? []).filter((tag) => tag.type !== 'goal')
);

const getTagSlug = (tag) =>
  locale.value === 'en' ? tag.slug_en : tag.slug_fr;

const getTagLabel = (tag) =>
  locale.value === 'en' ? tag.label_en : tag.label_fr;
</script>

<template>
  <!-- ToolCardMobileUnitElement.vue -->
  <UCard
    variant="outline"
    class="ring-accented divide-accented"
  >
    <template #header>
      <section class="flex items-center justify-between">
        <ULink
          :to="`${tool.url}?utm_source=pelicanclan.com&utm_medium=directory`"
          target="_blank"
          class="text-primary"
        >
          {{ tool.name }}
        </ULink>

        <TagElement
          v-if="sponsored"
          :label="$t('t_sponsored')"
        />
      </section>
    </template>

    <section v-if="goal_tags.length">
      <p>
        {{ $t('t_x_goals', { count: goal_tags.length }) }}
      </p>

      <ul class="list-disc list-inside space-y-2">
        <li
          v-for="tag in goal_tags"
          :key="tag.id"
          class="mt-1"
        >
          <ULink
            :to="`/c/${getTagSlug(tag)}`"
            class="text-primary"
          >
            {{ getTagLabel(tag) }}
          </ULink>

          <span
            v-if="tag.tool_specific_url"
            class="inline-flex items-center gap-1"
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
    </section>

    <section
      v-if="other_tags.length"
      class="mt-4"
    >
      <p>
        {{ $t('t_tags') }}
      </p>

      <ul class="list-disc list-inside space-y-2">
        <li
          v-for="tag in other_tags"
          :key="tag.id"
          class="mt-1"
        >
          <ULink
            :to="`/c/${getTagSlug(tag)}`"
            class="text-primary"
          >
            {{ getTagLabel(tag) }}
          </ULink>
        </li>
      </ul>
    </section>
  </UCard>
</template>
