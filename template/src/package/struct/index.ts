export interface AppStruct {
    base: BaseStruct,
    theme: string
    mode: string,
    language: string
}

export interface BaseStruct {
    os: typeof import("os"),
    path: typeof import("path"),
    process: typeof import("process"),
    app_path: any,
    app_data_path: any,
    app_home_path: any,
    app_temp_path: any,
    environment: any,
    platform: string,
    config: any,
    file: typeof import("fs"),
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
        },
        shell: {
            command: any,
            commands: any
        },
    },
    database: any
}

export interface PageStruct {
    header: {
        current: string,
        select: {
            value: string,
            group: any
        }
    },
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
        },
        network: {
            ping: boolean,
            docker: boolean
        }
    },
    install: {
        status: boolean,
        mode: string,
        local: {
            path: string,
            input: string
        },
        remote: {
            path: string,
            input: string
        },
        progress: {
            size: number,
            received: number,
            value: number
        },
        button_loading: boolean
    },
    browser: {
        url: string
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