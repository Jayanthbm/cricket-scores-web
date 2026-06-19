export function formatStartDate(timestamp) {
  if (!timestamp) return "";
  try {
    return new Date(timestamp).toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}
