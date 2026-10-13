<script setup>
const props = defineProps({
  sponsored_tool_list: {
    type: Array,
    default: () => [],
  },
  other_tool_list: {
    type: Array,
    default: () => [],
  },
});

const tool_list = computed(() => [
  ...props.sponsored_tool_list,
  ...props.other_tool_list,
]);

const sponsored_tool_ids = computed(() =>
  props.sponsored_tool_list.map((tool) => tool.id)
);
</script>

<template>
  <!-- ToolListElement.vue -->
  <div class="md:hidden">
    <ToolCardMobileListElement
      :sponsored_tool_list="sponsored_tool_list"
      :other_tool_list="other_tool_list"
    />
  </div>

  <div class="hidden md:grid md:gap-4">
    <ToolTableElement
      v-if="tool_list.length"
      :tools="tool_list"
      :sponsored_tool_ids="sponsored_tool_ids"
    />
  </div>
</template>
