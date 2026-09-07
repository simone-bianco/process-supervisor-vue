import type { SupervisorLocale } from "./presentation";

export function formatDuration(seconds: number | null): string {
  if (seconds === null || seconds < 0) return "—";
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  if (seconds < 3600)
    return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

export function formatDateTime(
  value: string | null | undefined,
  timezone: string | null | undefined,
  includeSeconds = false,
  locale: SupervisorLocale = "en",
): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  try {
    return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
      ...(includeSeconds ? { second: "2-digit" as const } : {}),
      hour12: false, timeZone: timezone ?? undefined,
    }).format(parsed);
  } catch {
    return value;
  }
}
