<template>
    <router-view ref="routerView" v-slot="{Component}">
        <component :is="Component" :base="app.base" :theme="app.theme" :mode="app.mode" />
    </router-view>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick} from "vue";
import {useI18n} from "vue-i18n";

const i18n = useI18n();
const app: any = ref({
    base: (window as any).base,
    theme: localStorage.getItem("nodechain:theme") ? localStorage.getItem("nodechain:theme") : "zinc",
    mode: localStorage.getItem("nodechain:mode") ? localStorage.getItem("nodechain:mode") : "",
});

onMounted(async () => {
    await nextTick( ()=>{
        document.documentElement.className = "theme-" + app.value.theme + " " + app.value.mode;
        app.value.base.lang.t = i18n.t;
        app.value.base.lang.locale = i18n.locale;
    });
});

</script>

<style>
@import "./assets/css/base.css";
</style>
