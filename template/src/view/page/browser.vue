<template>
    <main class="page-browser" :class="page.header.current">
        <div class="browser-main">
            <webview src="https://www.chatgpt.com" allowpopups nodeintegration webpreferences="javascript=true"></webview>
        </div>
    </main>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import type {BaseStruct, PageStruct} from "@/package/struct";

const props: any = defineProps<{
    base: BaseStruct,
    page: PageStruct
}>();

onBeforeMount(() => {});

onMounted(() => {
    nextTick(()=>{});
});

onBeforeUnmount(() => {});

onUnmounted(() => {});
</script>

<style scoped>
.page-browser{
    width: 100%;
    height: 100%;
    background-color: hsl(var(--background));
    display: none;
}
.page-browser.browser{
    display: block;
}
.page-browser.browser .browser-main{
    width: 100%;
    height: 100%;
}
.page-browser.browser .browser-main webview{
    width: 100%;
    height: 100%;
}
</style>