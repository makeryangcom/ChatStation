<template>
    <main class="page-extension" :class="page.current">extension</main>
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
.page-extension{
    width: 100%;
    height: 100%;
    background-color: hsl(var(--background));
    display: none;
}
.page-extension.extension{
    display: block;
}
</style>