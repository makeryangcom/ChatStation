import os from "os";
import path from "path";
import * as Electron from "electron";
import ElectronDebug from "electron-debug";
import * as Updater from "electron-updater";

// Initialize the application window
let Windows: any = {
    Main: false
};

// Prevent the application from opening multiple times
if (!Electron.app.requestSingleInstanceLock()){
    Electron.app.quit();
}else{
    Electron.app.on("second-instance", ()=>{
        if (Windows.Main) {
            Windows.Main.show();
            Windows.Main.setAlwaysOnTop(true);
            Windows.Main.setAlwaysOnTop(false);
        }
    });
}

// Configuration related to environment variables and startup parameters
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
ElectronDebug({showDevTools: false, devToolsMode: "bottom"});
Electron.app.commandLine.appendSwitch("ignore-certificate-errors", "true");
Electron.app.commandLine.appendSwitch("disable-gpu", "false");
Electron.app.commandLine.appendSwitch("--lang", "en-US");

// Initialize the application's root domain and path
const application_url: string = Electron.app.isPackaged ? `file://${path.join(__dirname, "../template/index.html")}` : `http://localhost:9898`

function onWindowMain(){
    console.log("[main:onWindowMain]");
    Windows.Main = new Electron.BrowserWindow({
        frame: false,
        center: true,
        width: 1200,
        height: 750,
        minWidth: 1200,
        minHeight: 750,
        useContentSize: false,
        hasShadow: os.platform() === "darwin",
        webPreferences: {
            javascript: true,
            spellcheck: true,
            webviewTag: true,
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, "../package/index.cjs")
        },
        fullscreen: false,
        show: false,
        backgroundColor: "#ffffff",
        titleBarStyle: "hidden"
    });

    Windows.Main.loadURL(
        application_url + "#/?package=" + path.join(__dirname, "../package/browser.cjs"),
        {
            "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"
        }
    ).then((r: any) => {});

    Windows.Main.on("ready-to-show", function () {
        Windows.Main.show();
    });

    Electron.globalShortcut.register("Shift+Alt+H", () => {
        Windows.Main.webContents.openDevTools({mode: "bottom", activate: false});
    });
}

// When the application is ready
Electron.app.on("ready", () => {
    console.log("[main:ready]");
});

// When the application is ready
Electron.app.whenReady().then(() => {
    console.log("[main:whenready]");
    onWindowMain();
    Electron.app.on("activate", () => {
        console.log("[main:activate]");
        if (Electron.BrowserWindow.getAllWindows().length === 0){
            console.log("[main:activate]", 0);
            onWindowMain();
        }
    });
    // listens for power suspend and screen lock
    Electron.powerMonitor.on("suspend", () => {
        console.log("[main:powerMonitor:suspend]");
        if (Windows.Main) {
            Windows.Main.webContents.send("message", {type: "power-lock"});
        }
    });
    Electron.powerMonitor.on("resume", () => {
        console.log("[main:powerMonitor:resume]");
        if (Windows.Main) {
            Windows.Main.webContents.send("message", {type: "power-unlock"});
        }
    });
    Electron.powerMonitor.on("lock-screen", () => {
        console.log("[main:powerMonitor:lock-screen]");
        if (Windows.Main) {
            Windows.Main.webContents.send("message", {type: "screen-lock"});
        }
    });
    Electron.powerMonitor.on("unlock-screen", () => {
        console.log("[main:powerMonitor:unlock-screen]");
        if (Windows.Main) {
            Windows.Main.webContents.send("message", {type: "screen-unlock"});
        }
    });
});

// Listen for main process messages
Electron.ipcMain.on("message", (event: any, args: any) => {
    if(args.type === "updater"){
        console.log("[main:updater]");
    }
});