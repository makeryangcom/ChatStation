<template>
    <main class="page-main">
        <CommonHeader ref="commonHeader" :base="props.base" :page="page"></CommonHeader>
        <section class="page-section">
            <PageInstall ref="pageInstall" :base="props.base" :page="page" v-if="!page.install.status"></PageInstall>
            <PageChat ref="pageChat" :base="props.base" :page="page" v-if="page.install.status"></PageChat>
            <PageWorkflow ref="pageWorkflow" :base="props.base" :page="page"  v-if="page.install.status"></PageWorkflow>
            <PageAgent ref="pageAgent" :base="props.base" :page="page"  v-if="page.install.status"></PageAgent>
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
    base: BaseStruct
}>();

const page = ref<PageStruct>({
    current: "chat",
    install: {
        status: false,
        mode: "local",
        local: {
            input: "",
            button_loading: false
        },
        remote: {
            input: "",
            button_loading: false
        }
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
});

onBeforeMount(() => {});

onMounted(() => {
    nextTick(()=>{
        console.log("[page:props]", props);
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
