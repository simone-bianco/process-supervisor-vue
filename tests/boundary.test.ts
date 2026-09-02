import { readdir, readFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const sourceDirectory = resolve(process.cwd(), "src");
const forbiddenImports = [
    "@inertiajs/",
    'from "@/',
    "ziggy",
    "usepage(",
    "usehttp(",
    "v-html",
];

async function sourceFiles(directory: string): Promise<string[]> {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(
        entries.map(async (entry): Promise<string[]> => {
            const path = join(directory, entry.name);
            if (entry.isDirectory()) return sourceFiles(path);
            return [".ts", ".vue"].includes(extname(entry.name)) ? [path] : [];
        }),
    );
    return nested.flat();
}

describe("package boundary", () => {
    it("keeps application transport and unsafe html outside the package", async () => {
        const files = await sourceFiles(sourceDirectory);
        for (const file of files) {
            const source = (await readFile(file, "utf8")).toLowerCase();
            for (const forbidden of forbiddenImports) {
                expect(source, `${file} contains ${forbidden}`).not.toContain(
                    forbidden,
                );
            }
        }
    });

    it("publishes a self-contained dist with Vue as the only runtime peer", async () => {
        const metadata = JSON.parse(
            await readFile(resolve(process.cwd(), "package.json"), "utf8"),
        ) as {
            main?: string;
            module?: string;
            types?: string;
            exports?: {
                "."?: { types?: string; import?: string };
                "./style.css"?: string;
            };
            files?: string[];
            dependencies?: Record<string, string>;
            peerDependencies?: Record<string, string>;
        };

        expect(metadata.main).toBe("./dist/process-supervisor-vue.js");
        expect(metadata.module).toBe("./dist/process-supervisor-vue.js");
        expect(metadata.types).toBe("./dist/index.d.ts");
        expect(metadata.exports?.["."]).toEqual({
            types: "./dist/index.d.ts",
            import: "./dist/process-supervisor-vue.js",
        });
        expect(metadata.exports?.["./style.css"]).toBe(
            "./dist/process-supervisor-vue.css",
        );
        expect(metadata.files).toEqual(["dist", "README.md", "z-docs"]);
        expect(metadata.dependencies ?? {}).toEqual({});
        expect(metadata.peerDependencies).toEqual({ vue: "^3.5.0" });

        for (const artifact of [
            "dist/process-supervisor-vue.js",
            "dist/process-supervisor-vue.css",
            "dist/index.d.ts",
        ]) {
            await expect(
                readFile(resolve(process.cwd(), artifact), "utf8"),
            ).resolves.not.toHaveLength(0);
        }
    });
});
