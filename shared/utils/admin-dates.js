import { DateTime } from 'luxon';

const toAdminDateTime = (value) => {
  if (!value) {
    return null;
  }

  const date_time = DateTime.fromISO(String(value));

  return date_time.isValid ? date_time : null;
};

const formatAdminDateTime = (value) => {
  const date_time = toAdminDateTime(value);

  if (!date_time) {
    return '—';
  }

  return date_time.toLocal().setLocale('fr').toFormat('yyyy-MM-dd HH:mm');
};

const compareAdminDateTime = (row_a, row_b, column_id) => {
  const millis_a = toAdminDateTime(row_a.getValue(column_id))?.toMillis() ?? 0;
  const millis_b = toAdminDateTime(row_b.getValue(column_id))?.toMillis() ?? 0;

  return millis_a - millis_b;
};

export {
  compareAdminDateTime,
  formatAdminDateTime,
};
