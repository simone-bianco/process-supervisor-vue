<script setup lang="ts">
import { computed } from "vue";
import {
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  Info,
  XCircle,
} from "lucide-vue-next";
import { formatDateTime, presentationFor, summaryLabel } from "../presentation";
import type { SupervisorLocale } from "../presentation";
import type { SupervisorStatusView } from "../types";

const props = defineProps<{
  readonly status: SupervisorStatusView;
  readonly locale?: SupervisorLocale;
}>();

const locale = computed(() => props.locale ?? "en");
const strings = computed(() => presentationFor(locale.value));

const message = computed(() => {
  if (!props.status.enabled) {
    return strings.value.disabledMessage;
  }
  if (props.status.reason_code) {
    return strings.value.reason(props.status.reason_code);
  }
  if (props.status.heartbeat_at) {
    return strings.value.lastHeartbeat(
      formatDateTime(
        props.status.heartbeat_at,
        props.status.timezone,
        true,
        locale.value,
      ),
    );
  }
  return strings.value.noHeartbeat;
});

const danger = computed(
  () =>
    props.status.summary === "recovery_required" ||
    props.status.summary === "unsupported",
);
const warning = computed(
  () =>
    props.status.summary === "degraded" || props.status.summary === "stopping",
);
const success = computed(() => props.status.summary === "ready");
const info = computed(() => props.status.summary === "starting");

const icon = computed(() => {
  if (danger.value) return XCircle;
  if (warning.value) return AlertTriangle;
  if (success.value) return CheckCircle2;
  if (info.value) return Info;
  return CircleDot;
});

const panelClass = computed(() => {
  if (danger.value) {
    return "border-[rgb(var(--ui-destructive)/0.55)] bg-[rgb(var(--ui-destructive)/0.10)]";
  }
  if (warning.value) {
    return "border-[rgb(var(--ui-warning)/0.45)] bg-[rgb(var(--ui-warning)/0.08)]";
  }
  if (success.value) {
    return "border-[rgb(var(--ui-success)/0.40)] bg-[rgb(var(--ui-success)/0.08)]";
  }
  if (info.value) {
    return "border-[rgb(var(--ui-info)/0.40)] bg-[rgb(var(--ui-info)/0.08)]";
  }
  return "border-ui-border bg-ui-card";
});

const accentClass = computed(() => {
  if (danger.value) return "text-[rgb(var(--ui-destructive))]";
  if (warning.value) return "text-[rgb(var(--ui-warning))]";
  if (success.value) return "text-[rgb(var(--ui-success))]";
  if (info.value) return "text-[rgb(var(--ui-info))]";
  return "text-ui-muted-foreground";
});
</script>

<template>
  <section
    class="grid min-h-[5.25rem] w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-xl border px-4 py-3 shadow-sm"
    :class="panelClass"
    :role="danger ? 'alert' : 'status'"
    :aria-label="strings.supervisorStatusAriaLabel"
    data-supervisor-status-banner
  >
    <component
      :is="icon"
      class="mt-0.5 h-5 w-5 shrink-0"
      :class="accentClass"
      aria-hidden="true"
    />
    <div class="min-w-0">
      <strong class="block text-sm font-semibold text-ui-foreground">
        {{ strings.supervisorTitle }}
      </strong>
      <p class="mt-0.5 text-[0.8125rem] leading-5 text-ui-muted-foreground">
        {{ message }}
      </p>
      <div class="mt-2 flex min-h-6 flex-wrap items-center gap-2">
        <span
          class="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold"
          :class="[panelClass, accentClass]"
        >
          <span
            class="h-1.5 w-1.5 rounded-full bg-current"
            aria-hidden="true"
          />
          {{ summaryLabel(props.status.summary, locale) }}
        </span>
        <span class="font-mono text-xs text-ui-muted-foreground">
          {{ props.status.platform }}
        </span>
      </div>
    </div>
  </section>
</template>
