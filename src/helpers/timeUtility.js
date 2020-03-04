// SHOWING HOURS AGO
const timePast = (utcTime) => {
  const SECOND_MILLIS = 1000;
  const MINUTE_MILLIS = 60 * SECOND_MILLIS;
  const HOUR_MILLIS = 60 * MINUTE_MILLIS;
  const DAY_MILLIS = 24 * HOUR_MILLIS;
  const MONTH_MILLIS = 30 * DAY_MILLIS;

  let time = new Date(utcTime);

  if (time < 1000000000000) {
    time *= 1000;
  }

  const now = new Date().getTime();
  const diff = now - time;

  if (time > now || time <= 0) {
    return null;
  }

  if (diff < 60 * SECOND_MILLIS) {
    return `${Math.trunc(diff / SECOND_MILLIS)}seconds ago`;
  }
  if (diff < 2 * MINUTE_MILLIS) {
    return '1 minute ago';
  }
  if (diff < 60 * MINUTE_MILLIS) {
    return `${Math.trunc(diff / MINUTE_MILLIS)} minutes ago`;
  }
  if (diff < 2 * HOUR_MILLIS) {
    return '1 hour ago';
  }
  if (diff < 24 * HOUR_MILLIS) {
    return `${Math.trunc(diff / HOUR_MILLIS)} hours ago`;
  }
  if (diff < 2 * DAY_MILLIS) {
    return '1 day ago';
  }
  if (diff < 6 * MONTH_MILLIS) {
    return `${Math.trunc(diff / DAY_MILLIS)} days ago`;
  }

  return `${Math.trunc(diff / MONTH_MILLIS)} months ago`;
};

export default timePast;
