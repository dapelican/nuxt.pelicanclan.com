<script setup>
const route = useRoute();

useSeoMeta({
  robots: 'noindex, nofollow',
});

const link_list = [
  {
    label: 'Accueil',
    to: ADMIN_BASE_PATH,
  },
  {
    label: 'Outils',
    to: `${ADMIN_BASE_PATH}/tools`,
  },
  {
    label: 'Tags',
    to: `${ADMIN_BASE_PATH}/tags`,
  },
];

const isCurrentPath = (path) => route.path === path;
</script>

<template>
  <div>
    <header class="border-b border-default">
      <UContainer class="flex flex-wrap items-center gap-2 py-4">
        <p class="mr-4 font-bold">
          Administration
        </p>

        <UButton
          v-for="link in link_list"
          :key="link.to"
          :color="isCurrentPath(link.to) ? 'primary' : 'neutral'"
          size="sm"
          :to="link.to"
          variant="ghost"
        >
          {{ link.label }}
        </UButton>
      </UContainer>
    </header>

    <UMain class="py-6">
      <slot />
    </UMain>
  </div>
</template>
