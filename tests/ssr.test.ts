import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { describe, expect, it } from "vitest";
import SupervisorOverview from "../src/components/SupervisorOverview.vue";
import type { SupervisorStatusView } from "../src/types";

const status: SupervisorStatusView = {
    enabled: true,
    summary: "ready",
    platform: "Windows",
    timezone: "Europe/Rome",
    heartbeat_at: "2026-08-31T20:00:00Z",
    reason_code: null,
    groups: [],
};

describe("SSR", () => {
    it("imports and renders without browser-only application dependencies", async () => {
        const app = createSSRApp({
            render: () => h(SupervisorOverview, { status }),
        });

        const html = await renderToString(app);

        expect(html).toContain("Laravel process supervisor");
        expect(html).toContain("No managed process groups are configured");
    });
});
