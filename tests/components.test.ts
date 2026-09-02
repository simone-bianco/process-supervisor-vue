import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ProcessGroupCard from "../src/components/ProcessGroupCard.vue";
import SupervisorOverview from "../src/components/SupervisorOverview.vue";
import SupervisorStatusBanner from "../src/components/SupervisorStatusBanner.vue";
import type { ProcessGroupView, SupervisorStatusView } from "../src/types";

const group: ProcessGroupView = {
  id: "queue-default",
  label: "Default queue",
  kind: "queue_once",
  desired_processes: 2,
  max_processes: 8,
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

const schedulerGroup: ProcessGroupView = {
  id: "scheduler",
  label: "Laravel scheduler",
  kind: "scheduler",
  desired_processes: 1,
  max_processes: 1,
  is_running: false,
  can_start: false,
  can_stop: true,
  can_restart: true,
  can_probe: false,
  cron: "* * * * *",
  timezone: "Europe/Rome",
  next_run_at: "2026-09-01T12:01:00+02:00",
  capability_message: "Cron is evaluated in Europe/Rome.",
  instances: [],
};

const status: SupervisorStatusView = {
  enabled: true,
  summary: "ready",
  platform: "Windows 11",
  timezone: "Europe/Rome",
  heartbeat_at: "2026-08-31T20:00:00Z",
  reason_code: null,
  groups: [group],
};

describe("ProcessGroupCard", () => {
  it("emits semantic lifecycle intents without transport concerns", async () => {
    const wrapper = mount(ProcessGroupCard, { props: { group } });
    const buttons = wrapper.findAll("button");

    await buttons.find((button) => button.text() === "Start")?.trigger("click");
    await buttons
      .find((button) => button.text() === "Restart")
      ?.trigger("click");
    await buttons.find((button) => button.text() === "Stop")?.trigger("click");

    expect(wrapper.emitted("start")?.[0]).toEqual(["queue-default"]);
    expect(wrapper.emitted("restart")?.[0]).toEqual(["queue-default"]);
    expect(wrapper.emitted("stop")?.[0]).toEqual(["queue-default"]);
  });

  it("emits probe only for a running probe-capable group", async () => {
    const wrapper = mount(ProcessGroupCard, { props: { group } });
    const probe = wrapper
      .findAll("button")
      .find((button) => button.text() === "Test queue");
    expect(probe).toBeDefined();
    expect(probe?.attributes("disabled")).toBeUndefined();
    await probe?.trigger("click");
    expect(wrapper.emitted("probe")?.[0]).toEqual(["queue-default"]);

    await wrapper.setProps({
      group: { ...group, is_running: false, can_probe: false },
    });
    expect(
      wrapper
        .findAll("button")
        .find((button) => button.text() === "Test queue")
        ?.attributes("disabled"),
    ).toBeDefined();
  });

  it("renders queue capacity as read-only operational state", () => {
    const wrapper = mount(ProcessGroupCard, { props: { group } });

    expect(wrapper.text()).toContain("Desired capacity");
    expect(wrapper.text()).toContain("2 processes");
    expect(wrapper.text()).toContain("Configured limit");
    expect(wrapper.text()).toContain("8 processes max");
    expect(wrapper.find('input[type="number"]').exists()).toBe(false);
    expect(
      wrapper.findAll("button").some((button) => button.text() === "Apply"),
    ).toBe(false);
  });

  it("renders scheduler timing as read-only state with Dev Tools guidance", () => {
    const wrapper = mount(ProcessGroupCard, {
      props: { group: schedulerGroup },
    });
    expect(wrapper.text()).toContain("Next: 01 Sept 2026, 12:01");
    expect(wrapper.text()).not.toContain("2026-09-01T12:01:00+02:00");
    expect(wrapper.text()).toContain("* * * * *");
    expect(wrapper.text()).toContain(
      "Configure schedule timing from Dev Tools settings.",
    );
    expect(wrapper.text()).not.toContain("Test queue");
    expect(wrapper.text()).not.toContain("Test Reverb");
    expect(wrapper.find("input").exists()).toBe(false);
    expect(
      wrapper
        .findAll("button")
        .some((button) => button.text() === "Apply schedule"),
    ).toBe(false);
  });

  it("shows only recovery-safe Stop when the server disables operational capabilities", () => {
    const recoveryGroup: ProcessGroupView = {
      ...group,
      can_start: false,
      can_restart: false,
      can_probe: false,
    };
    const wrapper = mount(ProcessGroupCard, {
      props: { group: recoveryGroup },
    });
    const labels = wrapper.findAll("button").map((button) => button.text());

    expect(labels).toContain("Stop");
    expect(labels).not.toContain("Start");
    expect(labels).not.toContain("Restart");
    expect(labels).not.toContain("Apply");
  });

  it("blocks all lifecycle controls while one mutation is in progress", () => {
    const wrapper = mount(ProcessGroupCard, {
      props: { group, processingAction: "restart" },
    });
    const actionButtons = wrapper
      .findAll("button")
      .filter((button) =>
        ["Test queue", "Start", "Restart", "Stop"].includes(button.text()),
      );

    expect(actionButtons.length).toBeGreaterThan(0);
    for (const button of actionButtons) {
      expect(button.attributes("disabled")).toBeDefined();
    }
  });

  it("blocks process controls when the host supervisor gate is disabled", () => {
    const wrapper = mount(ProcessGroupCard, {
      props: { group, controlsDisabled: true },
    });
    for (const button of wrapper.findAll("button")) {
      expect(button.attributes("disabled")).toBeDefined();
    }
  });
});



describe("SupervisorStatusBanner", () => {
  it("keeps one stable fixed-layout root while status changes to recovery", async () => {
    const wrapper = mount(SupervisorStatusBanner, { props: { status } });
    const root = wrapper.get("[data-supervisor-status-banner]");
    expect(root.classes()).toContain("min-h-[5.25rem]");
    expect(root.attributes("role")).toBe("status");
    expect(wrapper.text()).toContain("ready");

    await wrapper.setProps({
      status: {
        ...status,
        summary: "recovery_required",
        reason_code: "resident_failure",
      },
    });

    expect(wrapper.get("[data-supervisor-status-banner]").element).toBe(
      root.element,
    );
    expect(
      wrapper.get("[data-supervisor-status-banner]").attributes("role"),
    ).toBe("alert");
    expect(wrapper.text()).toContain("Runtime reason: resident_failure.");
    expect(wrapper.text()).toContain("recovery required");
  });
});

describe("SupervisorOverview", () => {
  it("emits recovery only when recovery is required", async () => {
    const recoveryStatus: SupervisorStatusView = {
      ...status,
      summary: "recovery_required",
      can_recover: true,
      reason_code: "ownership_uncertain",
    };
    const wrapper = mount(SupervisorOverview, {
      props: { status: recoveryStatus },
    });
    const recover = wrapper
      .findAll("button")
      .find((button) => button.text() === "Recover runtime");
    expect(recover).toBeDefined();
    await recover?.trigger("click");
    expect(wrapper.emitted("recover")).toHaveLength(1);
  });

  it("hides recovery while the host gate does not allow it", () => {
    const recoveryStatus: SupervisorStatusView = {
      ...status,
      summary: "recovery_required",
      can_recover: false,
      reason_code: "ownership_uncertain",
    };
    const wrapper = mount(SupervisorOverview, {
      props: { status: recoveryStatus },
    });
    const recover = wrapper
      .findAll("button")
      .find((button) => button.text() === "Recover runtime");
    expect(recover).toBeUndefined();
  });
});
