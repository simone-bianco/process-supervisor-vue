import type { ProcessInstanceState, SupervisorSummary } from "./types";

export type BadgeColor =
  "primary" | "success" | "warning" | "error" | "info" | "neutral";
export type FeedbackTone = "success" | "error" | "warning" | "info";

export function summaryLabel(summary: SupervisorSummary): string {
  return summary.replaceAll("_", " ");
}

export function summaryTone(summary: SupervisorSummary): FeedbackTone {
  if (summary === "ready") return "success";
  if (summary === "recovery_required" || summary === "unsupported")
    return "error";
  if (summary === "degraded" || summary === "stopping") return "warning";
  return "info";
}

export function instanceColor(state: ProcessInstanceState): BadgeColor {
  if (state === "running" || state === "idle") return "success";
  if (state === "fatal" || state === "uncertain") return "error";
  if (state === "backoff" || state === "stopping") return "warning";
  if (state === "starting") return "info";
  return "neutral";
}

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
): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      ...(includeSeconds ? { second: "2-digit" as const } : {}),
      hour12: false,
      timeZone: timezone ?? undefined,
    }).format(parsed);
  } catch {
    return value;
  }
}
