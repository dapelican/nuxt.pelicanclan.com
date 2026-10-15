<script setup>
const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  sorted: {
    type: [Boolean, String],
    default: false,
  },
});

const sort_icon = computed(() => {
  if (props.sorted === 'asc') {
    return 'i-lucide-arrow-up-narrow-wide';
  }

  if (props.sorted === 'desc') {
    return 'i-lucide-arrow-down-wide-narrow';
  }

  return 'i-lucide-arrow-up-down';
});

const toggleSort = () => {
  props.column.toggleSorting(props.sorted === 'asc');
};
</script>

<template>
  <UButton
    class="-mx-2.5"
    color="neutral"
    :icon="sort_icon"
    :label="label"
    variant="ghost"
    @click="toggleSort"
  />
</template>
