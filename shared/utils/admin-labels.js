const formatBooleanLabel = (value) => (value ? 'Oui' : 'Non');

const formatTagLabel = (tag) => (
  tag?.label_fr || tag?.label_en || tag?.slug_fr || tag?.slug_en || ''
);

const formatTagType = (type) => {
  if (type === 'main_use') {
    return 'Usage principal';
  }

  if (type === 'characteristics') {
    return 'Caractéristiques';
  }

  return '—';
};

export {
  formatBooleanLabel,
  formatTagLabel,
  formatTagType,
};
