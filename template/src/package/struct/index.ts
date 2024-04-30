export interface AppStruct {
    base: BaseStruct,
    theme: string
    mode: string,
    language: string
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
    },
    tools: {
        theme: any
    }
}

export interface PageStruct {
    current: string,
    install: {
        status: boolean,
        mode: string,
        local: {
            input: string,
            button_loading: boolean
        },
        remote: {
            input: string,
            button_loading: boolean
        }
    },
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
        item: any,
        form: {
            message: string
        },
        configuration: {
            workflow: string,
            model: string,
            presets: Array<any>,
            temperature: any,
            max_token: any,
            top_p: any,
            presence_penalty: any,
            frequency_penalty: any
        }
    },
    ui: {
        toast: any
    }
}