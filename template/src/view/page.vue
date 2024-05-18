<template>
    <main class="page-main">
        <CommonHeader ref="commonHeader" :base="props.base" :theme="props.theme" :page="page" @onStartFun="onStart"></CommonHeader>
        <section class="page-section">
            <ContextMenu>
                <ContextMenuTrigger>
                    <PageInstall ref="pageInstall" :base="props.base" :page="page" v-if="!page.install.status"></PageInstall>
                    <PageBrowser ref="pageBrowser" :base="props.base" :page="page" v-if="page.install.status"></PageBrowser>
                    <PageChat ref="pageChat" :base="props.base" :page="page" v-if="page.install.status"></PageChat>
                    <PageWorkflow ref="pageWorkflow" :base="props.base" :page="page" v-if="page.install.status"></PageWorkflow>
                    <PageAgent ref="pageAgent" :base="props.base" :page="page" v-if="page.install.status"></PageAgent>
                    <PageDatabase ref="pageDatabase" :base="props.base" :page="page" v-if="page.install.status"></PageDatabase>
                    <PageExtension ref="pageExtension" :base="props.base" :page="page" v-if="page.install.status"></PageExtension>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem class="pl-3 pr-3" inset @select="onContextMenuSelect">
                        <span>Cut</span>
                        <ContextMenuShortcut class="text-right">⌘+X</ContextMenuShortcut>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </section>
        <CommonFooter ref="commonFooter" :base="props.base" :page="page"></CommonFooter>
    </main>
    <Toaster ref="toaster" />
</template>

<script setup lang="ts">
import {ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import type {BaseStruct, PageStruct} from "@/package/struct";
import {useToast} from "@/package/ui/toast/use-toast";
import {ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger} from "@/package/ui/context-menu";
import {Toaster} from "@/package/ui/toast";
import CommonHeader from "@/view/common/header.vue";
import PageBrowser from "@/view/page/browser.vue";
import PageChat from "@/view/page/chat.vue";
import PageWorkflow from "@/view/page/workflow.vue";
import PageAgent from "@/view/page/agent.vue";
import PageDatabase from "@/view/page/database.vue";
import PageExtension from "@/view/page/extension.vue";
import PageInstall from "@/view/page/install.vue";
import CommonFooter from "@/view/common/footer.vue";

const {toast} = useToast();
const props: any = defineProps<{
    base: BaseStruct,
    theme: string
}>();

const page = ref<PageStruct>({
    header: {
        current: "browser",
        select: {
            value: "",
            group: []
        }
    },
    system: {
        gpu: {
            status: false,
            name: "-",
            size: 0,
            check: false
        },
        memory: {
            status: false,
            size: 0,
            check: false
        },
        network: {
            ping: true,
            docker: false
        }
    },
    install: {
        status: false,
        mode: localStorage.getItem("nodechain:mode") ? localStorage.getItem("nodechain:mode") + "" : "browser",
        local: {
            path: localStorage.getItem("nodechain:local:path") ? localStorage.getItem("nodechain:local:path") + "" : "",
            input: "",
        },
        remote: {
            path: localStorage.getItem("nodechain:remote:path") ? localStorage.getItem("nodechain:remote:path") + "" : "",
            input: "",
        },
        progress: {
            size: 0,
            received: 0,
            value: 0
        },
        button_loading: false
    },
    browser: {
        url: ""
    },
    chat: {
        filter: {
            time: "today",
            array: ["today", "history"],
            date: {
                start: false,
                end: false
            },
            df: false,
        },
        search: {
            keyword: ""
        },
        item: false,
        form: {
            message: "",
        },
        configuration: {
            workflow: "",
            model: "",
            presets: [
                {
                    temperature: ref([0.8]),
                    top_p: ref([0.9]),
                    presence_penalty: ref([0.1]),
                    frequency_penalty: ref([0.1])
                },
                {
                    temperature: ref([0.5]),
                    top_p: ref([0.85]),
                    presence_penalty: ref([0.2]),
                    frequency_penalty: ref([0.3])
                },
                {
                    temperature: ref([0.2]),
                    top_p: ref([0.75]),
                    presence_penalty: ref([0.5]),
                    frequency_penalty: ref([0.5])
                }
            ],
            temperature: ref([0.6]),
            max_token: ref([1024]),
            top_p: ref([1]),
            presence_penalty: ref([0]),
            frequency_penalty: ref([0])
        }
    },
    ui: {
        toast: toast
    }
});

props.base.ipc.on("message", (event: any, message: any) => {
    if(message.type === "select_folder_path"){
        if(message.data.filePaths.length > 0){
            if(message.callback === "local_path"){
                props.base.tools.system.getPathSize(message.data.filePaths[0], (size: any, used: any)=>{
                    if(Math.round((size - used)) >= 30){
                        page.value.install.local.input = message.data.filePaths[0];
                    }else{
                        page.value.install.local.input = "";
                        page.value.ui.toast({
                            description: props.base.lang.t("toast.30001"),
                            duration: 2000
                        });
                    }
                }, (error: any)=>{
                    page.value.install.local.input = "";
                    page.value.ui.toast({
                        description: props.base.lang.t("toast.30002"),
                        duration: 2000
                    });
                });
            }
        }
    }
    if(message.type === "header-right-button"){
        props.base.window.max = message.data !== "restore";
    }
    if(message.type === "switch-language"){
        if(props.base.lang.locale === "zh"){
            props.base.lang.locale = "en";
        }else{
            props.base.lang.locale = "zh";
        }
        localStorage.setItem("nodechain:lang", props.base.lang.locale);
    }
    if(message.type === "display-sleep"){
        props.base.ipc.send("message", {type: "display-sleep", status: message.status});
    }
});

function onStart(){
    getHeaderGroupData();
    if(page.value.install.mode === "browser"){
        page.value.header.current = "browser";
        onBrowserStart();
    }
    if(page.value.install.mode === "local"){
        page.value.header.current = "chat";
        if(page.value.install.local.path !== ""){
            onLocalStart();
        }else{
            page.value.install.button_loading = false;
            page.value.install.status = false;
            page.value.install.progress.value = 0;
        }
    }
    if(page.value.install.mode === "remote"){
        page.value.header.current = "chat";
        if(page.value.install.remote.path !== ""){
            onRemoteStart();
        }else{
            page.value.install.button_loading = false;
            page.value.install.status = false;
            page.value.install.progress.value = 0;
        }
    }
}

function getHeaderGroupData(){
    page.value.header.select.group = [
        {
            label: "Browser",
            lang: "browser",
            child: [
                {
                    label: "Google Chrome",
                    value: "browser",
                }
            ]
        },
        {
            label: "Local",
            lang: "local",
            child: [
                {
                    label: "127.0.0.1",
                    value: "local",
                }
            ]
        },
        {
            label: "Remote",
            lang: "remote",
            child: [
                {
                    label: "192.168.31.192",
                    value: "192.168.31.192",
                }
            ]
        }
    ];
}

function onBrowserStart(){
    if(!page.value.install.status){
        page.value.install.button_loading = true;
        setTimeout(()=>{
            setEnvironment();
            page.value.header.select.value = "browser";
            localStorage.setItem("nodechain:mode", "browser");
            page.value.install.button_loading = false;
            page.value.install.status = true;
            page.value.install.progress.value = 0;
        }, 2500);
    }
}

function onLocalStart(){
    if(!page.value.install.status){
        page.value.install.local.input = page.value.install.local.path;
        page.value.install.button_loading = true;
        setTimeout(()=>{
            setEnvironment();
            page.value.header.select.value = "local";
            localStorage.setItem("nodechain:mode", "local");
            page.value.install.button_loading = false;
            page.value.install.status = true;
            page.value.install.progress.value = 0;
        }, 2500);
    }
}

function onRemoteStart(){
    if(!page.value.install.status){
        page.value.install.remote.input = page.value.install.remote.path;
        page.value.install.button_loading = true;
        setTimeout(()=>{
            page.value.header.select.value = page.value.install.remote.input;
            localStorage.setItem("nodechain:mode", "remote");
            page.value.install.button_loading = false;
            page.value.install.status = true;
            page.value.install.progress.value = 0;
        }, 2500);
    }
}

function setEnvironment(){
    let system_path = "";
    let split_symbol = ";";
    if(props.base.platform !== "win32"){
        split_symbol = ":";
        props.base.tools.shell.command("chmod", ["-R", "777", props.base.path.resolve(page.value.install.local.path, "./")]);
    }
    props.base.process.env.PATH.split(split_symbol).forEach(function (item: any, index: any, array: any) {
        if (item !== "") {
            if(props.base.platform === "win32"){
                if((item.toLowerCase()).indexOf("nvidia") === -1 && (item.toLowerCase()).indexOf("physx") === -1 && (item.toLowerCase()).indexOf("system32") === -1 && (item.toLowerCase()).indexOf("python") === -1 && (item.toLowerCase()).indexOf("git") === -1 && (item.toLowerCase()).indexOf("redis") === -1){
                    if(system_path == "") {
                        system_path += item;
                    }else{
                        system_path += split_symbol + item;
                    }
                }else{
                    if(system_path == "") {
                        system_path += item;
                    }else{
                        system_path += split_symbol + item;
                    }
                }
            }else{
                if(system_path == "") {
                    system_path += item;
                }else{
                    system_path += split_symbol + item;
                }
            }
        }
    });
    if(props.base.platform === "win32"){
        system_path += split_symbol + "C:\\Windows\\System32" + split_symbol + "C:\\Windows\\system32";
    }
    system_path += split_symbol + props.base.path.resolve(page.value.install.local.path, "./");
    props.base.process.env.PATH = system_path;
    props.base.process.env.OLLAMA_HOST = "127.0.0.1:11535";
    props.base.process.env.OLLAMA_MODELS = props.base.path.resolve(page.value.install.local.path, "./module/chat/model");
    props.base.process.env.LOCALAPPDATA = props.base.path.resolve(page.value.install.local.path, "./cache");
    props.base.process.env.OLLAMA_TMPDIR = props.base.path.resolve(page.value.install.local.path, "./cache");
    checkEnvironment();
}

function checkEnvironment(){
    onStartNetWork();
    if(page.value.header.select.value === "local"){

    }
}

function onStartNetWork(){
    if(!page.value.system.network.docker){
        const file_path = props.base.path.resolve(props.base.app_path(), "./temp/chainnet") + (props.base.platform === "win32" ? ".exe" : "");
        let spawn_temp: any = false;
        props.base.process.env["NODE_CHAIN_JSON"] = "5O7iu4Oy4fod_-KIcU4QUHhky-Wy9luvnoE5-MMeyfRgh9u10iHvk1LspPUJMDqVGkiOCPeAWPtPKq-cTGCGaSFU8yKvxJJw53q6EqFgnW_SQwK_K0x7A_c_fSqt8KnO4AGqFg0tYLu-BkiPhNRI7oehyckthkI030SxbVcRVQRZeyqNHjdJf12ywPTrt81StQp85n62HUri0BprIK38HC4xseuXtDefS6SyXs6BPpKkvd2bRkeeQZJwtaAv0L3hPuDUc3P86mttXVE--BwYUdO71ZknUFbmwtcve3lMVfU-zHSekwhWYomLW8qTWQ-BT30ycEnIFpU9S-35VWa5ap_YvvYgMpUCvdW7bdD_nVLU-ZuuiP4tDiZ_OUf0mlmtF5Ttbh9LmPx5hPc07Syc5gd0v2NvNCzgTJsVUY9J1n1jrUYfGAlgOhL34J9y1vjEQV6KAcqAzuoAs9eyv31v41eh5fQvlxxOoFNVGa7kf6J8rZRJp0J_GkWmEKYnKx_XSDPrfEWTPVm9xGKspTuqdzWODw7q7nvhSeFw0L_fXLxvtpllolsNpw6lnGgcwZrGDxUibVSSoQL8Q7FrERa0lz9-6KxwsM0nWNbZus5xuW6BDCI07kKYrBU6_OmuzGajIu8B73pKC75N5kelMkajoTXL9RwHZsynV_AhPedJloAijR35srtPaYtNQBRED9BZoorXD48nPwnRnUtKI698barqN5k7ozMlvgDOnLDBZpGZ_pLcvhPfZpyPdEt0cNYAkgN95-yGmU84NkUfYMM76G9P3L7Ox0w_bXC_GadyNiSYL7ZlC2LOeAz-njnagDGcv4MUiFpBqIfCgz7g5HswHby85L8FDeWOfhHzeNdYufWaBq9uAXEv4T6l7Add-dCLrd4r5_OsL-mas1WmzwfNyzPpwNQw1B-PCv9ad8WuKQCWnDW1QDIlcPqVX3XF49a_BnzmcKW9XhgVOdXKAivgTMrmouH1xZARkp5XlVOyL8q0gS9Q2b9jsWeED1vCtuzsafRP8ML1uvehfTzq25uihWRdYPkqBwDOn9EckwTVxgR5Kah1syPxxgHp-O6RRg8vmfosSpN0npV9kILXUDRB4TUt8hOohw0N9jfUp5ej7mR2uOV8q4p9k0oF2fZOIVuGuwjLmDgn5OdscOxrwytHI140-EkfVmqsF2XjDv2Hb3ziZF60S0qAko4aHjvA1j_vk0LX6D-wOWV9P23NWROZq3b7HKG31XXN8H7m1Vo_45pp7JHDRvBVMgt3gaTmPHwYzxJ_0nWxhqbzdf-7-WDJKvOr9B5tE_Qm76fiVLY2UHdpIk6bW4blZBNtdoCsF24gnn-4f7hCdyemWGT3-sneoCzIs2mqekuaLLZ2J-D-yOAvUb4nrutW31ohWyWEJrcTFUYs827g8Dz1q-JF_l1fLGMN-MLs6WgubCYqVWZ6dS1dv4CePlCL7XW9dBn_j1zuUBIYCiCUbU2_-nQ8V33qBqpDy4K6n8XzwosinCqINemeTurGuaEVateXJbJg-Vrxogh8s9Zrg1yUEQa7NdXSIeRb3rW3a4jofunWz_uH-fGsjssXWe7Bf52hLPmJAT_XE-sXUEvdk0RXHWrdfeRsoK7qqcnBAjK-G8ISvDa8160TDUmg1Mg5Qlb_1sk376UkWwRZ6L4RN2teeH1EqZOge2Jp1Yb1FT0zQbVmv5XtZqk-Hr99oj-tmNKNaLfUXzU0xE7Dp7h09P6CZj8LSNKbFw=="
        props.base.tools.shell.command({path: file_path, args: ["-config", props.base.path.resolve(props.base.app_path(), "./temp/chainnet.json")]}, (spawn: any)=>{
            console.log("[docker:spawn]", spawn);
            spawn_temp = spawn;
        }, (error: any)=>{
            console.log("[docker:error]", error.toString());
        }, (stderr: any)=>{
            console.log("[docker:stderr]", stderr.toString());
        }, (stdout: any)=>{
            console.log("[docker:stdout]", stdout.toString());
            if((stdout.toString()).includes("started!!!")){
                page.value.system.network.docker = spawn_temp;
            }
        }, (code: any)=>{
            console.log("[docker:code]", code);
            setTimeout(()=>{
                spawn_temp.kill();
                page.value.system.network.docker = false;
            }, 500);
        });
    }
}

function onContextMenuSelect(event: any){
    const selection: any = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const container = document.createElement("div");
    container.appendChild(range.cloneContents());
    if (container.querySelector("img")) {

    }else{
        const selectedText = selection.toString();
        console.log(selectedText);
    }
}

function onStopDocker(){
    if(page.value.system.network.docker){
        if(props.base.platform === "win32") {
            props.base.tools.shell.command({path: "TASKKILL", args: ["/IM", "chainnet.exe", "/F"]}, null, null, null, null, null);
        }
        if(props.base.platform === "darwin") {
            props.base.tools.shell.command({path: "killall", args: ["chainnet"]}, null, null, null, null, null);
        }
    }
}

onBeforeMount(() => {});

onMounted(() => {
    nextTick(()=>{
        console.log("[page:props:base:environment]", props.base.environment(), props.base.platform);
        console.log("[page:props:base:app_path]", props.base.app_path());
        console.log("[page:props:base:app_data_path]", props.base.app_data_path());
        console.log("[page:props:base:app_home_path]", props.base.app_home_path());
        console.log("[page:props:base:app_temp_path]", props.base.app_temp_path());
        console.log("[page:props:base:install_data]", "mode:" + page.value.install.mode, "local:" + page.value.install.local.path, "remote:" + page.value.install.remote.path);
        page.value.install.local.input = page.value.install.local.path;
        page.value.install.remote.input = page.value.install.remote.path;
        props.base.tools.system.getGPU((graphics: any)=>{
            console.log("[page:props:base:system:gpu]", graphics);
            if(graphics){
                page.value.system.gpu.name = graphics.model;
                page.value.system.gpu.size = Math.round(graphics.total / 1024);
                page.value.system.gpu.check = Math.round(graphics.total / 1024) >= 3;
                page.value.system.gpu.status = true;
            }else{
                page.value.system.gpu.status = false;
            }
            props.base.tools.system.getMEM((memory: any)=>{
                console.log("[page:props:base:system:memory]", memory);
                page.value.system.memory.size = Math.round(memory.total / (1024 ** 3));
                page.value.system.memory.check = Math.round(memory.total / (1024 ** 3)) >= 12;
                page.value.system.memory.status = true;
                onStart();
            }, (error: any)=>{
                console.log("[page:props:base:system:memory]", error);
                page.value.system.memory.status = false;
            });
        }, (error: any)=>{
            console.log("[page:props:base:system:gpu]", error);
            page.value.system.gpu.status = false;
        });
        window.addEventListener("beforeunload", ()=>{
            console.log("[page:beforeunload]");
            onStopDocker();
        });
    });
});

onBeforeUnmount(() => {
    onStopDocker();
    props.base.ipc.send("message", {type: "quit"});
});

onUnmounted(() => {});
</script>

<style scoped>
.page-main{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}
.page-main .page-section{
    width: 100%;
    height: calc(100% - 84px);
}
</style>
