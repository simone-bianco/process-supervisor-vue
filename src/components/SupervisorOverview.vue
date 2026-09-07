<script setup lang="ts">
import { Button, SectionPanel } from "@simone-bianco/vue-ui-components";
import { computed } from "vue";
import ProcessGroupCard from "./ProcessGroupCard.vue";
import SupervisorStatusBanner from "./SupervisorStatusBanner.vue";
import { presentationFor } from "../presentation";
import type { SupervisorLocale } from "../presentation";
import type { SupervisorStatusView } from "../types";

const props = withDefaults(
  defineProps<{
    readonly status: SupervisorStatusView;
    readonly processingGroupId?: string | null;
    readonly processingAction?: string | null;
    readonly locale?: SupervisorLocale;
    readonly showProbeControls?: boolean;
  }>(),
  {
    processingGroupId: null,
    processingAction: null,
    locale: "en",
    showProbeControls: true,
  },
);

const strings = computed(() => presentationFor(props.locale));

const emit = defineEmits<{
  refresh: [];
  recover: [];
  start: [groupId: string];
  stop: [groupId: string];
  restart: [groupId: string];
}>();

function actionFor(groupId: string): string | null {
  return props.processingGroupId === groupId ? props.processingAction : null;
}
</script>

<template>
  <div class="space-y-5" data-supervisor-overview>
    <SupervisorStatusBanner :status="props.status" :locale="props.locale" />

    <div class="flex flex-wrap items-center justify-end gap-2">
      <Button
        v-if="
          props.status.summary === 'recovery_required' &&
          props.status.can_recover === true
        "
        variant="warning"
        :loading="props.processingAction === 'recover'"
        :disabled="props.processingAction !== null"
        @click="emit('recover')"
      >
        {{ strings.actions.recover }}
      </Button>
      <Button
        variant="secondary"
        :loading="props.processingAction === 'refresh'"
        :disabled="props.processingAction !== null"
        @click="emit('refresh')"
      >
        {{ strings.actions.refresh }}
      </Button>
    </div>

    <div v-if="props.status.groups.length > 0" class="space-y-4">
      <ProcessGroupCard
        v-for="group in props.status.groups"
        :key="group.id"
        :group="group"
        :processing-action="actionFor(group.id)"
        :locale="props.locale"
        :show-probe-controls="props.showProbeControls"
        @start="emit('start', $event)"
        @stop="emit('stop', $event)"
        @restart="emit('restart', $event)"
      />
    </div>

    <SectionPanel v-else :title="strings.processGroups">
      <p class="text-sm text-ui-muted-foreground">
        {{ strings.emptyGroups }}
      </p>
    </SectionPanel>
  </div>
</template>
