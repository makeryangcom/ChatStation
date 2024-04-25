import {join} from "path";
import {builtinModules} from "module";
import {defineConfig} from "vite";
// @ts-ignore
import wasm from "vite-plugin-wasm";
// @ts-ignore
import topLevelAwait from "vite-plugin-top-level-await";
import Package from "../package.json";

export default defineConfig({
    root: __dirname,
    plugins: [
        wasm(),
        topLevelAwait()
    ],
    build: {
        outDir: "../release/dist/package",
        emptyOutDir: true,
        minify: "terser",
        sourcemap: false,
        rollupOptions: {
            input: {
                index: join(__dirname, "index.ts"),
                browser: join(__dirname, "browser.ts")
            },
            output: {
                format: "cjs",
                entryFileNames: "[name].cjs",
                manualChunks: {},
            },
            external: [
                "electron",
                ...builtinModules,
                ...builtinModules.map(e => `node:${e}`),
                ...Object.keys(Package.dependencies || {}),
            ],
        },
    },
})
