<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap',
    },
  ],
});

const { locale } = useI18n();

const route = useRoute();

const public_item_list = [
  {
    active: route.path === '/',
    label: $t('t_tools'),
    to: '/',
  },
  {
    active: route.path === '/c',
    label: $t('t_categories'),
    to: '/c',
  },
];

if (locale.value === 'fr') {
  public_item_list.unshift({
    active: route.path === '/blog',
    label: $t('t_blog'),
    to: '/blog',
  });
}

const public_items = computed(() => public_item_list);
</script>

<template>
  <!-- HeaderElement.vue -->
  <UHeader toggle-side="left">
    <template #title>
      <span class="header-element-title-font">{{ WEBSITE_NAME }}</span>
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

<style scoped>
.header-element-title-font {
  font-family: 'Permanent Marker', cursive;
  font-size: 1.7rem;
}
</style>
