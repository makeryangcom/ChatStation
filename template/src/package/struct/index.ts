export interface AppStruct {
    base: BaseStruct,
    theme: string
    mode: string
}

export interface BaseStruct {
    os: typeof import("os");
    path: typeof import("path");
    platform: string;
    config: any;
    file: typeof import("fs");
    ipc: typeof import("electron").ipcRenderer,
    lang: {
        t: any,
        locale: any
    },
    window: {
        max: boolean
    }
}

export interface PageStruct {
    current: string,
    chat: {
        filter: {
            time: string,
            array: Array<string>
            date: {
                start: any,
                end: any
            },
            df: any,
        },
        search: {
            keyword: string
        },
    }
}