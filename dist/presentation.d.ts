import { ProcessInstanceState, SupervisorSummary } from './types';
export type BadgeColor = "primary" | "success" | "warning" | "error" | "info" | "neutral";
export type FeedbackTone = "success" | "error" | "warning" | "info";
export declare function summaryLabel(summary: SupervisorSummary): string;
export declare function summaryTone(summary: SupervisorSummary): FeedbackTone;
export declare function instanceColor(state: ProcessInstanceState): BadgeColor;
export declare function formatDuration(seconds: number | null): string;
export declare function formatDateTime(value: string | null | undefined, timezone: string | null | undefined, includeSeconds?: boolean): string;
