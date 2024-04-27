<template>
    <main class="page-footer">
        <div class="footer-item"></div>
        <div class="footer-item"></div>
        <div class="footer-item"></div>
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
.page-footer{
    width: 100%;
    height: 24px;
    background-color: rgba(0, 0, 0, .02);
    border-top: 1px solid hsl(var(--border));
    font-size: 12px;
}
.page-footer .footer-item{
    width: 33.33%;
    height: 24px;
    display: inline-block;
    vertical-align: top;
}
</style>