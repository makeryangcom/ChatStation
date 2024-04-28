<template>
    <main class="page-main">
        <CommonHeader ref="commonHeader" :base="props.base" :page="page"></CommonHeader>
        <section class="page-section">
            <PageChat ref="pageChat" :base="props.base" :page="page"></PageChat>
            <PageWorkflow ref="pageWorkflow" :base="props.base" :page="page"></PageWorkflow>
            <PageAgent ref="pageAgent" :base="props.base" :page="page"></PageAgent>
            <PageDatabase ref="pageDatabase" :base="props.base" :page="page"></PageDatabase>
            <PageExtension ref="pageExtension" :base="props.base" :page="page"></PageExtension>
        </section>
        <CommonFooter ref="commonFooter" :base="props.base" :page="page"></CommonFooter>
    </main>
</template>

<script setup lang="ts">
import {ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import type {BaseStruct, PageStruct} from "@/package/struct";
import CommonHeader from "@/view/common/header.vue";
import PageChat from "@/view/page/chat.vue";
import PageWorkflow from "@/view/page/workflow.vue";
import PageAgent from "@/view/page/agent.vue";
import PageDatabase from "@/view/page/database.vue";
import PageExtension from "@/view/page/extension.vue";
import CommonFooter from "@/view/common/footer.vue";

const props: any = defineProps<{
    base: BaseStruct
}>();

const page = ref<PageStruct>({
    current: "chat",
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
        }
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
    height: calc(100% - 74px);
}
</style>
