<script setup lang="ts">
import { computed } from "vue";
import {
  Badge,
  DataTable,
  type DataTableColumn,
} from "@simone-bianco/vue-ui-components";
import { formatDuration, instanceColor } from "../presentation";
import type { ProcessInstanceState, ProcessInstanceView } from "../types";

const props = defineProps<{
  readonly instances: readonly ProcessInstanceView[];
}>();

const columns: DataTableColumn[] = [
  {
    key: "slot_label",
    label: "Slot",
    class: "md:w-20 md:flex-none",
    headerClass: "w-20 flex-none",
  },
  {
    key: "state",
    label: "State",
    class: "md:w-36 md:flex-none",
    headerClass: "w-36 flex-none",
  },
  {
    key: "pid_label",
    label: "PID",
    class: "md:w-24 md:flex-none",
    headerClass: "w-24 flex-none",
  },
  {
    key: "uptime",
    label: "Uptime",
    class: "md:w-28 md:flex-none",
    headerClass: "w-28 flex-none",
  },
  {
    key: "restart_count",
    label: "Restarts",
    class: "md:w-24 md:flex-none",
    headerClass: "w-24 flex-none",
  },
  {
    key: "exit_label",
    label: "Last exit",
    class: "md:w-24 md:flex-none",
    headerClass: "w-24 flex-none",
  },
  {
    key: "error_label",
    label: "Last error",
    class: "md:min-w-48 md:flex-1",
    headerClass: "min-w-48 flex-1",
  },
];

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
        :label="state(value)"
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
        No process instance is currently active.
      </p>
    </template>
  </DataTable>
</template>
