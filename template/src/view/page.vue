<template>
    <main class="page-main">
        <CommonHeader ref="commonHeader" :base="props.base"></CommonHeader>
    </main>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import CommonHeader from "./common/header.vue";

const props: any = defineProps<{
    base: any,
    theme: string,
    mode: string
}>();

props.base.ipc.on("message", (event: any, message: any) => {
    if(message.type === "header-right-button"){
        props.base.window.max = message.data !== "restore";
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
</style>
