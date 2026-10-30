<script setup>
const { locale } = useI18n();

const items = computed(() => {
  if (locale.value !== 'en') {
    return [];
  }

  return [
    {
      label: $t('t_blog'),
      to: '/blog',
    },
  ];
});
</script>

<template>
  <!-- FooterElement.vue -->
  <div class="mt-16 mb-4">
    <USeparator
      icon="i-lucide-ellipsis"
      class="h-px"
    />

    <section class="flex justify-center items-center gap-6 flex-wrap mt-4">
      <ULink
        v-for="item in items"
        :key="item.label"
        class="text-sm"
        :to="item.to"
        no-prefetch
      >
        {{ item.label }}
      </ULink>
    </section>
  </div>
</template>
