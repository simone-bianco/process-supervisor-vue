<script setup lang="ts">
import {
  Badge,
  Button,
  FeedbackBanner,
  SectionPanel,
} from "@simone-bianco/vue-ui-components";
import ProcessInstanceTable from "./ProcessInstanceTable.vue";
import { formatDateTime } from "../presentation";
import type { ProcessGroupView } from "../types";

const props = withDefaults(
  defineProps<{
    readonly group: ProcessGroupView;
    readonly processingAction?: string | null;
    readonly controlsDisabled?: boolean;
  }>(),
  { processingAction: null, controlsDisabled: false },
);

const emit = defineEmits<{
  start: [groupId: string];
  stop: [groupId: string];
  restart: [groupId: string];
  probe: [groupId: string];
}>();

function kindLabel(): string {
  if (props.group.kind === "queue_once") return "queue · one-shot";
  if (props.group.kind === "scheduler") return "scheduler · cron";
  return "reverb";
}
</script>

<template>
  <SectionPanel :title="props.group.label">
    <template #header-actions>
      <div class="ml-auto flex flex-wrap items-center justify-end gap-2">
        <Badge :label="kindLabel()" color="neutral" />
        <Button
          v-if="
            props.group.kind === 'queue_once' || props.group.kind === 'reverb'
          "
          size="sm"
          variant="secondary"
          :loading="processingAction === 'probe'"
          :disabled="
            props.controlsDisabled ||
            processingAction !== null ||
            !props.group.can_probe
          "
          @click="emit('probe', props.group.id)"
        >
          {{ props.group.kind === "reverb" ? "Test Reverb" : "Test queue" }}
        </Button>
        <Button
          v-if="props.group.can_start"
          size="sm"
          variant="success"
          :loading="processingAction === 'start'"
          :disabled="props.controlsDisabled || processingAction !== null"
          @click="emit('start', props.group.id)"
        >
          Start
        </Button>
        <Button
          v-if="props.group.can_restart"
          size="sm"
          variant="secondary"
          :loading="processingAction === 'restart'"
          :disabled="props.controlsDisabled || processingAction !== null"
          @click="emit('restart', props.group.id)"
        >
          Restart
        </Button>
        <Button
          v-if="props.group.can_stop"
          size="sm"
          variant="danger"
          :loading="processingAction === 'stop'"
          :disabled="props.controlsDisabled || processingAction !== null"
          @click="emit('stop', props.group.id)"
        >
          Stop
        </Button>
      </div>
    </template>

    <div class="space-y-4">
      <FeedbackBanner
        v-if="props.group.capability_message"
        tone="info"
        :message="props.group.capability_message"
        :dismissible="false"
      />

      <div
        v-if="props.group.kind === 'queue_once'"
        class="grid gap-4 rounded-xl border border-ui-border bg-ui-muted/15 p-4 sm:grid-cols-2 sm:items-center"
      >
        <div>
          <p
            class="text-xs font-semibold tracking-wide text-ui-muted-foreground uppercase"
          >
            Desired capacity
          </p>
          <p class="mt-1 text-sm font-medium text-ui-foreground">
            {{ props.group.desired_processes }} process{{
              props.group.desired_processes === 1 ? "" : "es"
            }}
          </p>
        </div>

        <div>
          <p
            class="text-xs font-semibold tracking-wide text-ui-muted-foreground uppercase"
          >
            Configured limit
          </p>
          <p class="mt-1 text-sm font-medium text-ui-foreground">
            {{ props.group.max_processes }} process{{
              props.group.max_processes === 1 ? "" : "es"
            }}
            max
          </p>
        </div>
      </div>

      <div
        v-else-if="props.group.kind === 'scheduler'"
        class="grid gap-4 rounded-xl border border-ui-border bg-ui-muted/15 p-4 sm:grid-cols-2 sm:items-center"
      >
        <div class="min-w-0">
          <p
            class="text-xs font-semibold tracking-wide text-ui-muted-foreground uppercase"
          >
            Scheduler state
          </p>
          <div class="mt-1 flex flex-wrap items-center gap-2">
            <Badge
              :label="props.group.desired_processes > 0 ? 'On' : 'Off'"
              :color="props.group.desired_processes > 0 ? 'success' : 'neutral'"
              variant="soft"
              size="xs"
            />
            <span
              v-if="props.group.next_run_at"
              class="text-xs text-ui-muted-foreground"
            >
              Next:
              {{
                formatDateTime(props.group.next_run_at, props.group.timezone)
              }}
            </span>
          </div>
        </div>

        <div class="min-w-0">
          <p class="text-xs font-medium text-ui-muted-foreground">
            Cron expression ·
            {{ props.group.timezone ?? "application timezone" }}
          </p>
          <code
            class="mt-1 block truncate text-sm font-medium text-ui-foreground"
          >
            {{ props.group.cron ?? "* * * * *" }}
          </code>
          <p class="mt-1 text-xs text-ui-muted-foreground">
            Configure schedule timing from Dev Tools settings.
          </p>
        </div>
      </div>

      <div
        v-else
        class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ui-border bg-ui-muted/15 p-4"
      >
        <div>
          <p
            class="text-xs font-semibold tracking-wide text-ui-muted-foreground uppercase"
          >
            Desired state
          </p>
          <p class="mt-1 text-sm font-medium text-ui-foreground">
            {{ props.group.desired_processes > 0 ? "Running" : "Stopped" }}
          </p>
        </div>
      </div>

      <ProcessInstanceTable :instances="props.group.instances" />
    </div>
  </SectionPanel>
</template>
