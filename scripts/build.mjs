import {build} from "vite";

await build({configFile: "app/window/vite.config.ts"});
await build({configFile: "app/preload/vite.config.ts"});
await build({configFile: "app/template/vite.config.ts"});