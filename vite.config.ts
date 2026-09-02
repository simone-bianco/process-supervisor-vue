import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        dts({
            entryRoot: "src",
            include: ["src/**/*.ts", "src/**/*.vue"],
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: "src/standalone.ts",
            formats: ["es"],
            fileName: "process-supervisor-vue",
            cssFileName: "process-supervisor-vue",
        },
        rollupOptions: {
            external: ["vue"],
        },
    },
});
