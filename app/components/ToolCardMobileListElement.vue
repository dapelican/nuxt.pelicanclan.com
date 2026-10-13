<script setup>
defineProps({
  sponsored_tool_list: {
    type: Array,
    default: () => [],
  },
  other_tool_list: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <!-- ToolCardMobileListElement.vue -->
  <section class="space-y-4">
    <ToolCardMobileUnitElement
      v-for="tool in sponsored_tool_list"
      :key="tool.id"
      sponsored
      :tool="tool"
    />

    <ToolCardMobileUnitElement
      v-for="tool in other_tool_list"
      :key="tool.id"
      :tool="tool"
    />
  </section>
</template>
