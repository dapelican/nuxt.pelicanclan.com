<script setup>
const { locale } = useI18n();

const route = useRoute();

const public_items = computed(() => {
  const public_item_list = [
    {
      active: route.path === '/',
      label: $t('t_tools'),
      to: '/',
    },
    {
      active: route.path === '/c' || route.path.startsWith('/c/'),
      label: $t('t_categories'),
      to: '/c',
    },
  ];

  if (locale.value === 'fr') {
    public_item_list.push({
      active: route.path === '/blog' || route.path.startsWith('/blog/'),
      label: $t('t_blog'),
      to: '/blog',
    });
  }

  return public_item_list;
});
</script>

<template>
  <!-- HeaderElement.vue -->
  <UHeader toggle-side="left">
    <template #title>
      <span class="font-display text-[1.7rem] font-normal">{{ WEBSITE_NAME }}</span>
    </template>

    <UNavigationMenu
      :items="public_items"
    />

    <template
      #right
    >
      <section class="flex items-center gap-4">
        <UColorModeButton class="cursor-pointer" />

        <LanguageSelectorElement />
      </section>
    </template>

    <template #body>
      <UNavigationMenu
        :items="public_items"
        orientation="vertical"
      />
    </template>
  </UHeader>
</template>
