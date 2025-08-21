export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function updatedTime(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
