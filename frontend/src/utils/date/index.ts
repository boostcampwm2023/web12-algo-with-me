const ONE_SEC_BY_MS = 1_000;
const ONE_MIN_BY_MS = 60 * ONE_SEC_BY_MS;

export function toLocalDate(date: Date) {
  const localTimeOffset = date.getTimezoneOffset() * ONE_MIN_BY_MS;
  const localDate = new Date(date.getTime() - localTimeOffset);

  return localDate;
}

export const formatDate = (date: Date, form: string) => {
  if (form === 'YYYY-MM-DDThh:mm') {
    return date.toISOString().slice(0, 'YYYY-MM-DDThh:mm'.length);
  }

  return '';
};
