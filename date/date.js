export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function updatedTime(date) {
  return date.toISOString().slice(11, 16);
}

export function getFormattedTime(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours() + 3,
    date.getMinutes()
  );
}
