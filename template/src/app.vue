<template>
    <router-view ref="routerView" v-slot="{Component}">
        <component :is="Component" :base="app.base" :theme="app.theme" :mode="app.mode" />
    </router-view>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick} from "vue";

const app: any = ref({
    base: (window as any).NodeChain,
    theme: localStorage.getItem("nodechain:theme") ? localStorage.getItem("nodechain:theme") : "theme-zinc",
    mode: localStorage.getItem("nodechain:mode") ? localStorage.getItem("nodechain:mode") : "",
});

onMounted(() => {
    nextTick(()=>{
        document.documentElement.className = app.value.theme + " " + app.value.mode;
    });
});

</script>

<style>
@import "./assets/css/base.css";
</style>
