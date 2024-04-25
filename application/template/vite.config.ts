import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import Package from "../../package.json";

export default defineConfig({
    root: __dirname,
    mode: process.env.NODE_ENV,
    base: "./",
    plugins: [
        vue(
            {
                template: {
                    compilerOptions: {
                        isCustomElement: (tag: any) => ["webview"].includes(tag),
                    }
                }
            }
        ),
        wasm(),
        topLevelAwait()
    ],
    build: {
        outDir: "../../release/dist/renderer",
        emptyOutDir: true,
        sourcemap: false
    },
    server: {
        host: Package.env.VITE_DEV_SERVER_HOST,
        port: Package.env.VITE_DEV_SERVER_PORT,
    },
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true"
    }
})
