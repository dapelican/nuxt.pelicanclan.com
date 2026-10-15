<script setup>
definePageMeta({
  layout: 'admin',
});

useSeoMeta({
  title: `Tags | ${WEBSITE_NAME}`,
});

const search = ref('');
const pending = ref(true);
const tag_list = ref([]);
const row_selection = ref({});
const sorting = ref([]);
const is_tag_form_open = ref(false);
const is_link_modal_open = ref(false);
const edited_tag = ref(null);

let search_timeout;

const columns = [
  {
    id: 'select',
  },
  {
    accessorKey: 'label_fr',
    header: 'Libellé FR',
  },
  {
    accessorKey: 'label_en',
    header: 'Libellé EN',
  },
  {
    accessorKey: 'slug_fr',
    header: 'Slug FR',
  },
  {
    accessorKey: 'slug_en',
    header: 'Slug EN',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'sponsored_tool_name',
    header: 'Outil sponsorisé',
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

const selected_tag_list = computed(() => (
  tag_list.value.filter((tag) => row_selection.value?.[tag.id])
));

const selected_count_label = computed(() => {
  const count = selected_tag_list.value.length;

  if (count === 1) {
    return '1 tag sélectionné';
  }

  if (count > 1) {
    return `${count} tags sélectionnés`;
  }

  return '';
});

const loadTags = async () => {
  pending.value = true;

  try {
    const response = await $fetch(`${ADMIN_BASE_PATH}/api/tags`, {
      query: {
        query: search.value.trim(),
      },
    });

    tag_list.value = response.tags ?? [];
  } catch (error) {
    handleAdminError(error);
  } finally {
    pending.value = false;
  }
};

const openCreateTag = () => {
  edited_tag.value = null;
  is_tag_form_open.value = true;
};

const openEditTag = (tag) => {
  edited_tag.value = tag;
  is_tag_form_open.value = true;
};

const clearSearch = () => {
  search.value = '';
};

watch(search, () => {
  clearTimeout(search_timeout);
  row_selection.value = {};

  search_timeout = setTimeout(() => {
    loadTags();
  }, 300);
});

onMounted(() => {
  loadTags();
});
</script>

<template>
  <!-- app/pages/01a1401e-e985-76e1-a317-dcaf15c9a11e/tags.vue -->
  <UContainer>
    <h1>
      Tags
    </h1>

    <div class="mt-6 flex flex-wrap items-center gap-3">
      <UInput
        v-model="search"
        class="w-full max-w-xl"
        placeholder="Rechercher un tag"
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

      <UButton @click="openCreateTag">
        Ajouter un tag
      </UButton>

      <UButton
        color="neutral"
        :disabled="!selected_tag_list.length"
        variant="outline"
        @click="is_link_modal_open = true"
      >
        Associer des outils
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
        :data="tag_list"
        empty="Aucun tag"
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

        <template #type-cell="{ row }">
          {{ formatTagType(row.original.type) }}
        </template>

        <template #sponsored_tool_name-cell="{ row }">
          {{ row.original.sponsored_tool_name || '—' }}
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
            @click="openEditTag(row.original)"
          >
            Modifier
          </UButton>
        </template>
      </UTable>
    </div>

    <AdminTagFormModal
      v-model:open="is_tag_form_open"
      :tag="edited_tag"
      @saved="loadTags"
    />

    <AdminToolTagsModal
      v-model:open="is_link_modal_open"
      :selected_item_list="selected_tag_list"
      source_kind="tags"
      @saved="loadTags"
    />
  </UContainer>
</template>
