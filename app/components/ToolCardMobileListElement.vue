<script setup>
defineProps({
  tool_list: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <!-- ToolCardMobileListElement.vue -->
  <section class="space-y-4">
    <ToolCardMobileUnitElement
      v-for="tool in tool_list"
      :key="tool.id"
      :tool="tool"
    />
  </section>
</template>
