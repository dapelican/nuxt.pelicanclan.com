<script setup>
const { locale } = useI18n();

const en_sponsor_list = [
  {
    name: 'Sponsor 1',
    url: 'https://www.sponsor1.com',
    description: 'Sponsor 1 description',
  },
  {
    name: 'Sponsor 2',
    url: 'https://www.sponsor2.com',
    description: 'Sponsor 2 description',
  },
];

const fr_sponsor_list = [
  {
    name: 'Annonceur1',
    url: 'https://www.sponsor1.com',
    description: 'Sponsor 1 description',
  },
  {
    name: 'Annonceur 2',
    url: 'https://www.sponsor2.com',
    description: 'Sponsor 2 description',
  },
];

const random_index = locale.value === 'en'
  ? Math.floor(Math.random() * en_sponsor_list.length)
  : Math.floor(Math.random() * fr_sponsor_list.length);

const sponsor = locale.value === 'en'
  ? en_sponsor_list[random_index]
  : fr_sponsor_list[random_index];
</script>

<template>
  <!-- AdElement.vue -->
  <UCard
    variant="outline"
  >
    <template #header>
      <section class="flex items-center justify-between">
        <ULink
          :to="`${sponsor.url}?utm_source=pelicanclan.com&utm_medium=directory`"
          target="_blank"
          class="text-primary"
        >
          {{ sponsor.name }}
        </ULink>

        <TagElement :label="$t('t_sponsor')" />
      </section>
    </template>

    <p>
      {{ sponsor.description }}
    </p>
  </UCard>
</template>
