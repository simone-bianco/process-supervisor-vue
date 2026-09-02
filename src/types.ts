export type SupervisorSummary =
  | "disabled"
  | "stopped"
  | "starting"
  | "ready"
  | "degraded"
  | "stopping"
  | "recovery_required"
  | "unsupported";

export type ProcessKind = "queue_once" | "reverb" | "scheduler";

export type ProcessInstanceState =
  | "stopped"
  | "starting"
  | "running"
  | "idle"
  | "stopping"
  | "backoff"
  | "fatal"
  | "uncertain";

export interface ProcessInstanceView {
  readonly id: string;
  readonly slot: number;
  readonly state: ProcessInstanceState;
  readonly pid: number | null;
  readonly uptime_seconds: number | null;
  readonly restart_count: number;
  readonly last_exit_code: number | null;
  readonly last_error_code: string | null;
}

export interface ProcessGroupView {
  readonly id: string;
  readonly label: string;
  readonly kind: ProcessKind;
  readonly desired_processes: number;
  readonly max_processes: number;
  readonly instances: readonly ProcessInstanceView[];
  readonly is_running: boolean;
  readonly can_start: boolean;
  readonly can_stop: boolean;
  readonly can_restart: boolean;
  readonly can_probe: boolean;
  readonly cron?: string | null;
  readonly timezone?: string | null;
  readonly next_run_at?: string | null;
  readonly capability_message?: string | null;
}

export interface SupervisorStatusView {
  readonly enabled: boolean;
  readonly can_recover?: boolean;
  readonly summary: SupervisorSummary;
  readonly platform: string;
  readonly timezone: string;
  readonly heartbeat_at: string | null;
  readonly reason_code: string | null;
  readonly groups: readonly ProcessGroupView[];
}



export type SupervisorAction =
  "start" | "stop" | "restart" | "probe" | "start-all" | "recover" | "refresh";
