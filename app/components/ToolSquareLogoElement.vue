<script setup>
defineProps({
  src: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <!-- ToolSquareLogoElement.vue -->
  <img
    v-if="src"
    alt=""
    class="size-8 shrink-0 rounded-sm object-contain dark:bg-white"
    :src="src"
  >
</template>
