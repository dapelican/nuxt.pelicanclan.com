<script setup>
definePageMeta({
  layout: 'admin',
});

useSeoMeta({
  title: `Outils | ${WEBSITE_NAME}`,
});

const search = ref('');
const pending = ref(true);
const tool_list = ref([]);
const row_selection = ref({});
const sorting = ref([
  {
    desc: true,
    id: 'created_at',
  },
]);
const is_tool_form_open = ref(false);
const is_link_modal_open = ref(false);
const edited_tool = ref(null);

let search_timeout;

const columns = [
  {
    id: 'select',
  },
  {
    accessorKey: 'name',
    header: 'Nom',
  },
  {
    accessorKey: 'url',
    header: 'URL',
  },
  {
    accessorKey: 'active_en',
    header: 'Actif EN',
  },
  {
    accessorKey: 'active_fr',
    header: 'Actif FR',
  },
  {
    accessorKey: 'square_logo_url',
    header: 'Logo',
  },
  {
    accessorKey: 'created_at',
    enableSorting: true,
    header: 'Créé le',
    meta: {
      class: {
        td: 'whitespace-nowrap',
      },
    },
    sortingFn: compareAdminDateTime,
  },
  {
    accessorKey: 'updated_at',
    enableSorting: true,
    header: 'Modifié le',
    meta: {
      class: {
        td: 'whitespace-nowrap',
      },
    },
    sortingFn: compareAdminDateTime,
  },
  {
    id: 'actions',
  },
];

const getRowId = (row) => row.id;

const selected_tool_list = computed(() => (
  tool_list.value.filter((tool) => row_selection.value?.[tool.id])
));

const selected_count_label = computed(() => {
  const count = selected_tool_list.value.length;

  if (count === 1) {
    return '1 outil sélectionné';
  }

  if (count > 1) {
    return `${count} outils sélectionnés`;
  }

  return '';
});

const loadTools = async () => {
  pending.value = true;

  try {
    const response = await $fetch(`${ADMIN_BASE_PATH}/api/tools`, {
      query: {
        query: search.value.trim(),
      },
    });

    tool_list.value = response.tools ?? [];
  } catch (error) {
    handleAdminError(error);
  } finally {
    pending.value = false;
  }
};

const openCreateTool = () => {
  edited_tool.value = null;
  is_tool_form_open.value = true;
};

const openEditTool = (tool) => {
  edited_tool.value = tool;
  is_tool_form_open.value = true;
};

const clearSearch = () => {
  search.value = '';
};

watch(search, () => {
  clearTimeout(search_timeout);
  row_selection.value = {};

  search_timeout = setTimeout(() => {
    loadTools();
  }, 300);
});

onMounted(() => {
  loadTools();
});
</script>

<template>
  <!-- app/pages/01a1401e-e985-76e1-a317-dcaf15c9a11e/tools.vue -->
  <UContainer>
    <h1>
      Outils
    </h1>

    <div class="mt-6 flex flex-wrap items-center gap-3">
      <UInput
        v-model="search"
        class="w-full max-w-xl"
        placeholder="Rechercher un outil"
      >
        <template
          v-if="search"
          #trailing
        >
          <UButton
            aria-label="Effacer la recherche"
            color="neutral"
            icon="i-lucide-circle-x"
            size="xs"
            variant="link"
            @click="clearSearch"
          />
        </template>
      </UInput>

      <UButton @click="openCreateTool">
        Ajouter un outil
      </UButton>

      <UButton
        color="neutral"
        :disabled="!selected_tool_list.length"
        variant="outline"
        @click="is_link_modal_open = true"
      >
        Associer des tags
      </UButton>
    </div>

    <p
      v-if="selected_count_label"
      class="mt-4 text-sm"
    >
      {{ selected_count_label }}
    </p>

    <LoadingElement
      v-if="pending"
      class="mt-6"
    />

    <div
      v-else
      class="mt-6 overflow-x-auto"
    >
      <UTable
        v-model:row-selection="row_selection"
        v-model:sorting="sorting"
        :columns="columns"
        :data="tool_list"
        empty="Aucun outil"
        :get-row-id="getRowId"
      >
        <template #select-header="{ table }">
          <UCheckbox
            aria-label="Tout sélectionner"
            :model-value="table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected()"
            @update:model-value="(value) => table.toggleAllPageRowsSelected(!!value)"
          />
        </template>

        <template #select-cell="{ row }">
          <UCheckbox
            aria-label="Sélectionner la ligne"
            :model-value="row.getIsSelected()"
            @update:model-value="(value) => row.toggleSelected(!!value)"
          />
        </template>

        <template #url-cell="{ row }">
          <a
            class="block max-w-xs truncate"
            :href="row.original.url"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ row.original.url }}
          </a>
        </template>

        <template #active_en-cell="{ row }">
          {{ formatBooleanLabel(row.original.active_en) }}
        </template>

        <template #active_fr-cell="{ row }">
          {{ formatBooleanLabel(row.original.active_fr) }}
        </template>

        <template #square_logo_url-cell="{ row }">
          <ToolSquareLogoElement :src="row.original.square_logo_url" />
          <span v-if="!row.original.square_logo_url">—</span>
        </template>

        <template #created_at-header="{ column }">
          <AdminSortableColumnHeader
            :column="column"
            label="Créé le"
            :sorted="column.getIsSorted()"
          />
        </template>

        <template #created_at-cell="{ row }">
          {{ formatAdminDateTime(row.original.created_at) }}
        </template>

        <template #updated_at-header="{ column }">
          <AdminSortableColumnHeader
            :column="column"
            label="Modifié le"
            :sorted="column.getIsSorted()"
          />
        </template>

        <template #updated_at-cell="{ row }">
          {{ formatAdminDateTime(row.original.updated_at) }}
        </template>

        <template #actions-cell="{ row }">
          <UButton
            color="neutral"
            size="sm"
            variant="ghost"
            @click="openEditTool(row.original)"
          >
            Modifier
          </UButton>
        </template>
      </UTable>
    </div>

    <AdminToolFormModal
      v-model:open="is_tool_form_open"
      :tool="edited_tool"
      @saved="loadTools"
    />

    <AdminToolTagsModal
      v-model:open="is_link_modal_open"
      :selected_item_list="selected_tool_list"
      source_kind="tools"
      @saved="loadTools"
    />
  </UContainer>
</template>
