import {build} from "vite";

await build({configFile: "main/vite.config.ts"});
await build({configFile: "package/vite.config.ts"});
await build({configFile: "template/vite.config.ts"});