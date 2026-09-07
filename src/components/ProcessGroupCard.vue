<script setup lang="ts">
import {
  Badge,
  Button,
  FeedbackBanner,
  SectionPanel,
} from "@simone-bianco/vue-ui-components";
import { computed } from "vue";
import ProcessInstanceTable from "./ProcessInstanceTable.vue";
import { formatDateTime, presentationFor } from "../presentation";
import type { SupervisorLocale } from "../presentation";
import type { ProcessGroupView } from "../types";

const props = withDefaults(
  defineProps<{
    readonly group: ProcessGroupView;
    readonly processingAction?: string | null;
    readonly controlsDisabled?: boolean;
    readonly locale?: SupervisorLocale;
    readonly showProbeControls?: boolean;
  }>(),
  {
    processingAction: null,
    controlsDisabled: false,
    locale: "en",
    showProbeControls: true,
  },
);

const strings = computed(() => presentationFor(props.locale));

const emit = defineEmits<{
  start: [groupId: string];
  stop: [groupId: string];
  restart: [groupId: string];
  probe: [groupId: string];
}>();

function kindLabel(): string {
  return strings.value.groupKinds[props.group.kind];
}
</script>

<template>
  <SectionPanel :title="props.group.label">
    <template #header-actions>
      <div class="ml-auto flex flex-wrap items-center justify-end gap-2">
        <Badge :label="kindLabel()" color="neutral" />
        <Button
          v-if="
            props.showProbeControls &&
            (props.group.kind === 'queue_once' || props.group.kind === 'reverb')
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
          {{
            props.group.kind === "reverb"
              ? strings.actions.probeReverb
              : strings.actions.probeQueue
          }}
        </Button>
        <Button
          v-if="props.group.can_start"
          size="sm"
          variant="success"
          :loading="processingAction === 'start'"
          :disabled="props.controlsDisabled || processingAction !== null"
          @click="emit('start', props.group.id)"
        >
          {{ strings.actions.start }}
        </Button>
        <Button
          v-if="props.group.can_restart"
          size="sm"
          variant="secondary"
          :loading="processingAction === 'restart'"
          :disabled="props.controlsDisabled || processingAction !== null"
          @click="emit('restart', props.group.id)"
        >
          {{ strings.actions.restart }}
        </Button>
        <Button
          v-if="props.group.can_stop"
          size="sm"
          variant="danger"
          :loading="processingAction === 'stop'"
          :disabled="props.controlsDisabled || processingAction !== null"
          @click="emit('stop', props.group.id)"
        >
          {{ strings.actions.stop }}
        </Button>
      </div>
    </template>

    <div class="space-y-4">
      <FeedbackBanner
        v-if="props.group.kind === 'scheduler' || props.group.capability_message"
        tone="info"
        :message="props.group.capability_message ?? strings.schedulerNotice(props.group.timezone ?? 'UTC')"
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
            {{ strings.desiredCapacity }}
          </p>
          <p class="mt-1 text-sm font-medium text-ui-foreground">
            {{ strings.processCount(props.group.desired_processes) }}
          </p>
        </div>

        <div>
          <p
            class="text-xs font-semibold tracking-wide text-ui-muted-foreground uppercase"
          >
            {{ strings.configuredLimit }}
          </p>
          <p class="mt-1 text-sm font-medium text-ui-foreground">
            {{ strings.processCountMax(props.group.max_processes) }}
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
            {{ strings.schedulerState }}
          </p>
          <div class="mt-1 flex flex-wrap items-center gap-2">
            <Badge
              :label="
                props.group.desired_processes > 0 ? strings.on : strings.off
              "
              :color="props.group.desired_processes > 0 ? 'success' : 'neutral'"
              variant="soft"
              size="xs"
            />
            <span
              v-if="props.group.next_run_at"
              class="text-xs text-ui-muted-foreground"
            >
              {{ strings.nextRun }}:
              {{
                formatDateTime(
                  props.group.next_run_at,
                  props.group.timezone,
                  false,
                  props.locale,
                )
              }}
            </span>
          </div>
        </div>

        <div class="min-w-0">
          <p class="text-xs font-medium text-ui-muted-foreground">
            {{ strings.cronExpression }} ·
            {{ props.group.timezone ?? strings.applicationTimezone }}
          </p>
          <code
            class="mt-1 block truncate text-sm font-medium text-ui-foreground"
          >
            {{ props.group.cron ?? "* * * * *" }}
          </code>
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
            {{ strings.desiredState }}
          </p>
          <p class="mt-1 text-sm font-medium text-ui-foreground">
            {{
              props.group.desired_processes > 0
                ? strings.running
                : strings.stopped
            }}
          </p>
        </div>
      </div>

      <ProcessInstanceTable
        :instances="props.group.instances"
        :locale="props.locale"
      />
    </div>
  </SectionPanel>
</template>
