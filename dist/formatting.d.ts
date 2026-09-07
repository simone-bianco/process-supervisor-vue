import { SupervisorLocale } from './presentation';
export declare function formatDuration(seconds: number | null): string;
export declare function formatDateTime(value: string | null | undefined, timezone: string | null | undefined, includeSeconds?: boolean, locale?: SupervisorLocale): string;
