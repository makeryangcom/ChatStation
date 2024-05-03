export interface AppStruct {
    base: BaseStruct,
    theme: string
    mode: string,
    language: string
}

export interface BaseStruct {
    os: typeof import("os");
    path: typeof import("path");
    app_path: any,
    app_data_path: any,
    app_home_path: any,
    environment: any,
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
        theme: any,
        system: {
            getGPU: any,
            getMEM: any,
            getPathSize: any
        },
        download: {
            service: any
        },
        zip: {
            file: any
        }
    },
    database: any
}

export interface PageStruct {
    current: string,
    system: {
        gpu: {
            status: boolean,
            name: string,
            size: number,
            check: boolean
        },
        memory: {
            status: boolean,
            size: number,
            check: boolean
        }
    },
    install: {
        status: boolean,
        mode: string,
        local: {
            path: string,
            input: string,
            button_loading: boolean
        },
        remote: {
            path: string,
            input: string,
            button_loading: boolean
        },
        progress: {
            size: number,
            received: number,
            value: number
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