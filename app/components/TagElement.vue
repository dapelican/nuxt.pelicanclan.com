<script setup>
defineProps({
  color: {
    type: String,
    default: 'secondary',
  },
  label: {
    type: String,
    required: true,
  },
});

defineEmits(['remove_tag']);
</script>

<template>
  <UBadge :color>
    {{ label }}
  </UBadge>
</template>
