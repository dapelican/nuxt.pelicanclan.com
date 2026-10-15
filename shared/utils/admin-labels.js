'use strict';

const formatBooleanLabel = (value) => (value ? 'Oui' : 'Non');

const formatTagLabel = (tag) => (
  tag?.label_fr || tag?.label_en || tag?.slug_fr || tag?.slug_en || ''
);

const formatTagType = (type) => {
  if (type === 'goal') {
    return 'Objectif';
  }

  if (type === 'target') {
    return 'Cible';
  }

  return '—';
};

const formatToolStatus = (status) => (
  status === 'sponsored' ? 'Sponsorisé' : '—'
);

export {
  formatBooleanLabel,
  formatTagLabel,
  formatTagType,
  formatToolStatus,
};
