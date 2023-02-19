export function formatDate(dateStirng: string) {
  return new Date(dateStirng)?.toLocaleString();
}
