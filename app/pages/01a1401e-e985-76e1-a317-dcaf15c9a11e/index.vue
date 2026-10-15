<script setup>
definePageMeta({
  layout: 'admin',
});

useSeoMeta({
  title: `Administration | ${WEBSITE_NAME}`,
});
</script>

<template>
  <!-- app/pages/01a1401e-e985-76e1-a317-dcaf15c9a11e/index.vue -->
  <UContainer>
    <h1>
      Administration
    </h1>

    <p>
      Ajouter, rechercher et modifier les outils et les tags, puis les relier entre eux.
    </p>

    <nav class="mt-8 flex flex-wrap gap-4">
      <UButton
        size="lg"
        :to="`${ADMIN_BASE_PATH}/tools`"
      >
        Outils
      </UButton>

      <UButton
        color="neutral"
        size="lg"
        :to="`${ADMIN_BASE_PATH}/tags`"
      >
        Tags
      </UButton>
    </nav>
  </UContainer>
</template>
