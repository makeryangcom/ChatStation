import Os from "os";
import Path from "path";
import File from "fs";
import {ipcRenderer} from "electron";
import Database from "./database";
import Shell from "./shell";
import System from "./system";
import Download from "./download";
import Zip from "./zip";
import * as Config from "../../../package.json";
import os from "os";

(window as any).base = {
    os: Os,
    path: Path,
    process: process,
    app_path: ()=> {
        return Path.join(__dirname, (process.env["VITE_DEV_SERVER_HOST"] !== "127.0.0.1" ? "./../../../../" : "../../"));
    },
    app_data_path: ()=> {
        const path_temp= (os.platform() === "win32" ? process.env["APPDATA"] + "" : process.env["HOME"] + "");
        return Path.join(path_temp, "./");
    },
    app_home_path: ()=> {
        const path_temp= (os.platform() === "win32" ? (process.env["HOMEDRIVE"]  + "" + process.env["HOMEPATH"]) : process.env["HOME"] + "");
        return Path.join(path_temp, "./");
    },
    environment: () => {
        return process.env["VITE_DEV_SERVER_HOST"] !== "127.0.0.1" ? "produce" : "develop"
    },
    platform: Os.platform(), //darwin、linux、win32
    config: Config,
    file: File,
    ipc: ipcRenderer,
    lang: {
        t: false,
        locale: false
    },
    window: {
        max: false
    },
    tools: {
        theme: false,
        shell: Shell,
        system: System,
        download: Download,
        zip: Zip
    },
    database: Database
}