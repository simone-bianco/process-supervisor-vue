import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SupervisorOverview from "../src/components/SupervisorOverview.vue";
import type { ProcessGroupView, SupervisorStatusView } from "../src/types";

const queueGroup: ProcessGroupView = {
  id: "queue-default",
  label: "Coda predefinita",
  kind: "queue_once",
  desired_processes: 1,
  max_processes: 4,
  is_running: true,
  can_start: true,
  can_stop: true,
  can_restart: true,
  can_probe: true,
  capability_message: null,
  instances: [
    {
      id: "queue-default:0",
      slot: 0,
      state: "running",
      pid: 3210,
      uptime_seconds: 90,
      restart_count: 1,
      last_exit_code: null,
      last_error_code: null,
    },
  ],
};

const status: SupervisorStatusView = {
  enabled: true,
  summary: "ready",
  platform: "Windows 11",
  timezone: "Europe/Rome",
  heartbeat_at: "2026-08-31T20:00:00Z",
  reason_code: null,
  groups: [queueGroup],
};

describe("SupervisorOverview localization", () => {
  it("localizes the standard scheduler notice without server prose", () => {
    const wrapper = mount(SupervisorOverview, { props: {
      locale: "it",
      status: {...status, groups: [{...queueGroup, kind: "scheduler", timezone: "Europe/Rome", capability_message: null}]},
    }});

    expect(wrapper.text()).toContain("Pianificazione nel fuso Europe/Rome");
    expect(wrapper.text()).not.toContain("Cron is evaluated");
    wrapper.unmount();
  });
  it("keeps English copy and probe controls by default", () => {
    const wrapper = mount(SupervisorOverview, { props: { status } });

    expect(wrapper.text()).toContain("Refresh status");
    expect(wrapper.text()).toContain("Desired capacity");
    expect(wrapper.text()).toContain("running");
    expect(wrapper.text()).toContain("Test queue");
  });

  it("renders Italian copy and hides probes when the host disables them", () => {
    const wrapper = mount(SupervisorOverview, {
      props: { status, locale: "it", showProbeControls: false },
    });

    expect(wrapper.text()).toContain("Aggiorna stato");
    expect(wrapper.text()).toContain("Capacità desiderata");
    expect(wrapper.text()).toContain("in esecuzione");
    expect(wrapper.text()).not.toContain("Testa coda");
    expect(wrapper.text()).not.toContain("Test queue");
  });
});
