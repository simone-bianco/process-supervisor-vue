<script setup lang="ts">
import { computed } from "vue";
import {
  Badge,
  DataTable,
  type DataTableColumn,
} from "@simone-bianco/vue-ui-components";
import {
  formatDuration,
  instanceColor,
  presentationFor,
} from "../presentation";
import type { SupervisorLocale } from "../presentation";
import type { ProcessInstanceState, ProcessInstanceView } from "../types";

const props = defineProps<{
  readonly instances: readonly ProcessInstanceView[];
  readonly locale?: SupervisorLocale;
}>();

const strings = computed(() => presentationFor(props.locale ?? "en"));
const columns = computed<DataTableColumn[]>(() => [
  {
    key: "slot_label",
    label: strings.value.slot,
    class: "md:w-12 md:flex-none",
    headerClass: "w-12 flex-none",
  },
  {
    key: "state",
    label: strings.value.state,
    class: "md:min-w-0 md:flex-1",
    headerClass: "min-w-0 flex-1 break-words",
  },
  {
    key: "pid_label",
    label: strings.value.pid,
    class: "md:min-w-0 md:flex-1",
    headerClass: "min-w-0 flex-1 break-words",
  },
  {
    key: "uptime",
    label: strings.value.uptime,
    class: "md:min-w-0 md:flex-1",
    headerClass: "min-w-0 flex-1 break-words",
  },
  {
    key: "restart_count",
    label: strings.value.restarts,
    class: "md:min-w-0 md:flex-1",
    headerClass: "min-w-0 flex-1 break-words",
  },
  {
    key: "exit_label",
    label: strings.value.lastExit,
    class: "md:min-w-0 md:flex-1",
    headerClass: "min-w-0 flex-1 break-words",
  },
  {
    key: "error_label",
    label: strings.value.lastError,
    class: "md:min-w-0 md:flex-1",
    headerClass: "min-w-0 flex-1 break-words",
  },
]);

const rows = computed<Record<string, unknown>[]>(() =>
  props.instances.map((instance) => ({
    id: instance.id,
    slot: instance.slot,
    slot_label: `#${instance.slot + 1}`,
    state: instance.state,
    pid_label: instance.pid ?? "—",
    uptime: formatDuration(instance.uptime_seconds),
    restart_count: instance.restart_count,
    exit_label: instance.last_exit_code ?? "—",
    error_label: instance.last_error_code ?? "—",
  })),
);

function state(value: unknown): ProcessInstanceState {
  const candidate = String(value);
  if (
    candidate === "stopped" ||
    candidate === "starting" ||
    candidate === "running" ||
    candidate === "idle" ||
    candidate === "stopping" ||
    candidate === "backoff" ||
    candidate === "fatal" ||
    candidate === "uncertain"
  ) {
    return candidate;
  }
  return "uncertain";
}
</script>

<template>
  <DataTable
    :items="rows"
    :columns="columns"
    item-key="id"
    density="compact"
    responsive
    :ui="{
      headerRow: 'min-h-10',
      row: 'min-h-10',
      empty: 'py-8',
    }"
  >
    <template #cell-state="{ value }">
      <Badge
        :label="strings.instanceStates[state(value)]"
        :color="instanceColor(state(value))"
        variant="soft"
        size="xs"
        dot
      />
    </template>
    <template #cell-slot_label="{ value }">
      <span class="font-mono text-xs">{{ value }}</span>
    </template>
    <template #cell-pid_label="{ value }">
      <span class="font-mono text-xs text-ui-muted-foreground">{{
        value
      }}</span>
    </template>
    <template #cell-exit_label="{ value }">
      <span class="font-mono text-xs text-ui-muted-foreground">{{
        value
      }}</span>
    </template>
    <template #cell-error_label="{ value }">
      <span
        class="block truncate font-mono text-xs text-ui-muted-foreground"
        :title="String(value)"
      >
        {{ value }}
      </span>
    </template>
    <template #empty>
      <p class="text-sm text-ui-muted-foreground">
        {{ strings.emptyInstances }}
      </p>
    </template>
  </DataTable>
</template>
