<script setup>
const { t } = useI18n();

useSeoMeta({
  title: `${t('t_legal_page_title')} | ${WEBSITE_NAME}`,
  description: t('t_legal_page_meta_description'),
});
</script>

<template>
  <UContainer>
    <h1 class="text-center">
      {{ $t('t_legal_page_title') }}
    </h1>
  </UContainer>
</template>
