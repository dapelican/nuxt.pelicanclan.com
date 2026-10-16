<script setup>
defineProps({
  favicon_url: {
    type: String,
    required: true,
  },
  tool_name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <aside class="max-w-xs rounded border-2 border-inverted bg-default">
    <header class="flex items-center justify-center gap-2 pt-2">
      <ULink
        href="https://sovrn.co/1egbv3l"
        rel="noopener noreferrer"
        class="flex items-center justify-center gap-2"
      >
        <img
          :src="favicon_url"
          :alt="tool_name"
          width="32"
          height="32"
          class="size-[32px] shrink-0 object-contain"
        >
        <span class="font-bold text-sm text-highlighted">
          {{ tool_name }}
        </span>
      </ULink>
    </header>

    <main class="px-2 py-2 text-sm">
      <slot />
    </main>

    <footer class="flex justify-end">
      <span class="rounded-tl bg-inverted text-inverted text-xs py-px pr-1.5 pl-2">
        Sponsored
      </span>
    </footer>
  </aside>
</template>
