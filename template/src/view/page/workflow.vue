<template>
    <main class="page-workflow" :class="page.current">
        <ResizablePanelGroup direction="horizontal" class="workflow-main h-full items-stretch">
            <ResizablePanel class="left">1</ResizablePanel>
            <ResizableHandle with-handle />
            <ResizablePanel class="right">2</ResizablePanel>
        </ResizablePanelGroup>
    </main>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import type {BaseStruct, PageStruct} from "@/package/struct";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/package/ui/resizable";

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
.page-workflow{
    width: 100%;
    height: 100%;
    background-color: hsl(var(--background));
    display: none;
}
.page-workflow.workflow{
    display: block;
}
.page-workflow .workflow-main .left{
    flex: 0 0 280px !important;
}
.page-workflow .workflow-main .right{
    flex: 0 0 calc(100% - 280px) !important;
}
</style>