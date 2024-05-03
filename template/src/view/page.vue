<template>
    <main class="page-main">
        <CommonHeader ref="commonHeader" :base="props.base" :theme="props.theme" :page="page"></CommonHeader>
        <section class="page-section">
            <PageInstall ref="pageInstall" :base="props.base" :page="page" v-if="!page.install.status"></PageInstall>
            <PageChat ref="pageChat" :base="props.base" :page="page" v-if="page.install.status"></PageChat>
            <PageWorkflow ref="pageWorkflow" :base="props.base" :page="page" v-if="page.install.status"></PageWorkflow>
            <PageAgent ref="pageAgent" :base="props.base" :page="page" v-if="page.install.status"></PageAgent>
            <PageDatabase ref="pageDatabase" :base="props.base" :page="page" v-if="page.install.status"></PageDatabase>
            <PageExtension ref="pageExtension" :base="props.base" :page="page" v-if="page.install.status"></PageExtension>
        </section>
        <CommonFooter ref="commonFooter" :base="props.base" :page="page"></CommonFooter>
    </main>
    <Toaster ref="toaster" />
</template>

<script setup lang="ts">
import {ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import type {BaseStruct, PageStruct} from "@/package/struct";
import {useToast} from "@/package/ui/toast/use-toast";
import {Toaster} from "@/package/ui/toast";
import CommonHeader from "@/view/common/header.vue";
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
    current: "chat",
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
        }
    },
    install: {
        status: false,
        mode: localStorage.getItem("nodechain:mode") ? localStorage.getItem("nodechain:mode") + "" : "local",
        local: {
            path: localStorage.getItem("nodechain:local:path") ? localStorage.getItem("nodechain:local:path") + "": "",
            input: ""
        },
        remote: {
            path: localStorage.getItem("nodechain:remote:path") ? localStorage.getItem("nodechain:remote:path") + "": "",
            input: ""
        },
        progress: {
            size: 0,
            received: 0,
            value: 0
        },
        button_loading: false
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
    if(page.value.install.mode === "local"){
        if(page.value.install.local.path !== ""){
            onLocalStart();
        }
    }
    if(page.value.install.mode === "remote"){
        if(page.value.install.remote.path !== ""){
            onRemoteStart();
        }
    }
}

function onLocalStart(){
    if(!page.value.install.status){
        page.value.install.local.input = page.value.install.local.path;
        page.value.install.button_loading = true;
        setEnvironment();
    }
}

function onRemoteStart(){
    if(!page.value.install.status){
        page.value.install.status = true;
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
        if(props.base.platform === "win32"){
            if((item.toLowerCase()).indexOf("system32") === -1 && (item.toLowerCase()).indexOf("python") === -1 && (item.toLowerCase()).indexOf("git") === -1 && (item.toLowerCase()).indexOf("redis") === -1){
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
}

function checkEnvironment(){
    let paths
    let commands = [

    ];
}

onBeforeMount(() => {});

onMounted(() => {
    nextTick(()=>{
        console.log("[page:props:base:environment]", props.base.environment());
        console.log("[page:props:base:app_path]", props.base.app_path());
        console.log("[page:props:base:app_data_path]", props.base.app_data_path());
        console.log("[page:props:base:app_home_path]", props.base.app_home_path());
        console.log("[page:props:base:install_data]", "mode:" + page.value.install.mode, "local:" + page.value.install.local.path, "remote:" + page.value.install.remote.path);
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
    });
});

onBeforeUnmount(() => {});

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
