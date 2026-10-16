<script setup>
defineProps({
  tool_list: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <!-- ToolListElement.vue -->
  <div class="md:hidden">
    <ToolCardMobileListElement
      :tool_list="tool_list"
    />
  </div>

  <div class="hidden md:grid md:gap-4">
    <ToolTableElement
      v-if="tool_list.length"
      :tools="tool_list"
    />
  </div>
</template>
