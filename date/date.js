export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function updatedTime(date) {
  return date.toISOString().slice(11, 16);
}
