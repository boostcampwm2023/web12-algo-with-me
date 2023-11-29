const ONE_SEC_BY_MS = 1_000;
const ONE_MIN_BY_MS = 60 * ONE_SEC_BY_MS;
const ONE_MIN_BY_SEC = 60;
const ONE_HOUR_BY_MIN = 60;
const ONE_HOUR_BY_SEC = ONE_HOUR_BY_MIN * ONE_MIN_BY_SEC;

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

export const formatMilliSecond = (ms: number, form: string) => {
  const sec = Math.floor(ms / ONE_SEC_BY_MS);

  if (form === 'hh:mm:ss') {
    // 시간(초)을 'hh:mm:ss' 형식으로 변환
    const hours = Math.floor(sec / ONE_HOUR_BY_SEC);
    const minutes = Math.floor((sec % ONE_HOUR_BY_SEC) / ONE_MIN_BY_SEC);
    const seconds = sec % ONE_MIN_BY_SEC;
    return [hours, minutes, seconds].map((time) => String(time).padStart(2, '0')).join(':');
  }
  return '';
};

export const formatKoreanDateTime = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Invalid date, handle error or return default value
    return 'Invalid Date';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
};
