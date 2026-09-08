import type {
  ProcessInstanceState,
  ProcessKind,
  SupervisorSummary,
} from "./types";

export type BadgeColor =
  "primary" | "success" | "warning" | "error" | "info" | "neutral";
export type FeedbackTone = "success" | "error" | "warning" | "info";
export type SupervisorLocale = "en" | "it";

export type SupervisorPresentationStrings = {
  readonly actions: {
    readonly probeQueue: string;
    readonly probeReverb: string;
    readonly recover: string;
    readonly refresh: string;
    readonly restart: string;
    readonly start: string;
    readonly stop: string;
  };
  readonly applicationTimezone: string;
  readonly configuredLimit: string;
  readonly cronExpression: string;
  readonly desiredCapacity: string;
  readonly desiredState: string;
  readonly disabledMessage: string;
  readonly emptyGroups: string;
  readonly emptyInstances: string;
  readonly groupKinds: Readonly<Record<ProcessKind, string>>;
  readonly instanceStates: Readonly<Record<ProcessInstanceState, string>>;
  readonly lastHeartbeat: (value: string) => string;
  readonly noHeartbeat: string;
  readonly off: string;
  readonly on: string;
  readonly processCount: (count: number) => string;
  readonly processCountMax: (count: number) => string;
  readonly processGroups: string;
  readonly reason: (code: string) => string;
  readonly running: string;
  readonly schedulerState: string;
  readonly schedulerNotice: (timezone: string) => string;
  readonly slot: string;
  readonly state: string;
  readonly pid: string;
  readonly uptime: string;
  readonly restarts: string;
  readonly lastExit: string;
  readonly lastError: string;
  readonly nextRun: string;
  readonly stopped: string;
  readonly summaries: Readonly<Record<SupervisorSummary, string>>;
  readonly supervisorStatusAriaLabel: string;
  readonly supervisorTitle: string;
};

export const supervisorPresentation = {
  en: {
    actions: {
      probeQueue: "Test queue",
      probeReverb: "Test Reverb",
      recover: "Recover runtime",
      refresh: "Refresh status",
      restart: "Restart",
      start: "Start",
      stop: "Stop",
    },
    applicationTimezone: "application timezone",
    configuredLimit: "Configured limit",
    cronExpression: "Cron expression",
    desiredCapacity: "Desired capacity",
    desiredState: "Desired state",
    disabledMessage: "Process supervision is disabled for this installation.",
    emptyGroups:
      "No managed process groups are configured for this installation.",
    emptyInstances: "No process instance is currently active.",
    groupKinds: {
      queue_once: "queue · one-shot",
      scheduler: "scheduler · cron",
      reverb: "reverb",
      artisan_service: "service · singleton",
    },
    instanceStates: {
      stopped: "stopped",
      starting: "starting",
      running: "running",
      idle: "idle",
      stopping: "stopping",
      backoff: "backoff",
      fatal: "fatal",
      uncertain: "uncertain",
    },
    lastHeartbeat: (value) => `Last heartbeat: ${value}.`,
    noHeartbeat:
      "Runtime state is available, but no heartbeat has been published yet.",
    off: "Off",
    on: "On",
    processCount: (count) => `${count} process${count === 1 ? "" : "es"}`,
    processCountMax: (count) =>
      `${count} process${count === 1 ? "" : "es"} max`,
    processGroups: "Process groups",
    reason: (code) => `Runtime reason: ${code}.`,
    running: "Running",
    schedulerState: "Scheduler state",
    schedulerNotice: (timezone) => `Cron is evaluated in ${timezone}. Missed minutes are not backfilled and schedule:run never overlaps itself.`,
    slot: "Slot",
    state: "State",
    pid: "PID",
    uptime: "Uptime",
    restarts: "Restarts",
    lastExit: "Last exit",
    lastError: "Last error",
    nextRun: "Next",
    stopped: "Stopped",
    summaries: {
      disabled: "disabled",
      stopped: "stopped",
      starting: "starting",
      ready: "ready",
      degraded: "degraded",
      stopping: "stopping",
      recovery_required: "recovery required",
      unsupported: "unsupported",
    },
    supervisorStatusAriaLabel: "Process Supervisor status",
    supervisorTitle: "Laravel process supervisor",
  },
  it: {
    actions: {
      probeQueue: "Testa coda",
      probeReverb: "Testa Reverb",
      recover: "Ripristina runtime",
      refresh: "Aggiorna stato",
      restart: "Riavvia",
      start: "Avvia",
      stop: "Arresta",
    },
    applicationTimezone: "fuso orario applicazione",
    configuredLimit: "Limite configurato",
    cronExpression: "Espressione cron",
    desiredCapacity: "Capacità desiderata",
    desiredState: "Stato desiderato",
    disabledMessage:
      "La supervisione dei processi è disabilitata per questa installazione.",
    emptyGroups:
      "Nessun gruppo di processi gestito è configurato per questa installazione.",
    emptyInstances: "Nessuna istanza di processo è attualmente attiva.",
    groupKinds: {
      queue_once: "coda · esecuzione singola",
      scheduler: "scheduler · cron",
      reverb: "reverb",
      artisan_service: "servizio · istanza singola",
    },
    instanceStates: {
      stopped: "arrestato",
      starting: "in avvio",
      running: "in esecuzione",
      idle: "in attesa",
      stopping: "in arresto",
      backoff: "in attesa di nuovo tentativo",
      fatal: "errore fatale",
      uncertain: "incerto",
    },
    lastHeartbeat: (value) => `Ultimo heartbeat: ${value}.`,
    noHeartbeat:
      "Lo stato del runtime è disponibile, ma non è ancora stato pubblicato alcun heartbeat.",
    off: "Disattivo",
    on: "Attivo",
    processCount: (count) => `${count} process${count === 1 ? "o" : "i"}`,
    processCountMax: (count) =>
      `${count} process${count === 1 ? "o" : "i"} massimo`,
    processGroups: "Gruppi di processi",
    reason: (code) => `Motivo del runtime: ${code}.`,
    running: "In esecuzione",
    schedulerState: "Stato scheduler",
    schedulerNotice: (timezone) => `Pianificazione nel fuso ${timezone}. Le esecuzioni non si sovrappongono e i minuti persi non vengono recuperati.`,
    slot: "Slot",
    state: "Stato",
    pid: "PID",
    uptime: "Attività",
    restarts: "Riavvii",
    lastExit: "Ultima uscita",
    lastError: "Ultimo errore",
    nextRun: "Prossima esecuzione",
    stopped: "Arrestato",
    summaries: {
      disabled: "disabilitato",
      stopped: "arrestato",
      starting: "in avvio",
      ready: "pronto",
      degraded: "degradato",
      stopping: "in arresto",
      recovery_required: "ripristino necessario",
      unsupported: "non supportato",
    },
    supervisorStatusAriaLabel: "Stato del supervisore processi",
    supervisorTitle: "Supervisore processi Laravel",
  },
} satisfies Record<SupervisorLocale, SupervisorPresentationStrings>;

export function presentationFor(
  locale: SupervisorLocale = "en",
): SupervisorPresentationStrings {
  return supervisorPresentation[locale];
}

export function summaryLabel(
  summary: SupervisorSummary,
  locale: SupervisorLocale = "en",
): string {
  return presentationFor(locale).summaries[summary];
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

export { formatDuration, formatDateTime } from "./formatting";
