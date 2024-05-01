<template>
    <router-view ref="routerView" v-slot="{Component}">
        <component :is="Component" :base="app.base" :theme="app.theme" />
    </router-view>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick} from "vue";
import {useI18n} from "vue-i18n";
import type {AppStruct} from "@/package/struct";

const i18n = useI18n();
const app = ref<AppStruct>({
    base: (window as any).base,
    theme: localStorage.getItem("nodechain:theme") ? localStorage.getItem("nodechain:theme") + "" : "zinc",
    mode: localStorage.getItem("nodechain:mode") ? localStorage.getItem("nodechain:mode") + "" : "",
    language: (navigator as any).language,
});

onMounted(async () => {
    await nextTick( ()=>{
        console.log("NodeChain "  + app.value.language + " " + app.value.base.config.version + " MakerYang(https://www.makeryang.com)");
        document.documentElement.className = "theme-" + app.value.theme + " " + app.value.mode;
        app.value.base.lang.t = i18n.t;
        app.value.base.lang.locale = i18n.locale;
        if(app.value.base.lang.locale === "null"){
            if(app.value.language === "zh-CN"){
                app.value.base.lang.locale = "zh";
            }else{
                app.value.base.lang.locale = "en";
            }
        }
        app.value.base.tools.theme = (theme: string)=>{
            app.value.theme = theme;
            document.documentElement.className = "theme-" + app.value.theme + " " + app.value.mode;
            localStorage.setItem("nodechain:theme", theme);
        };
        window.addEventListener("resize", function() {
            app.value.base.ipc.send("message", {type: "header-right-button", data: "resize"});
        });
    });
});
</script>

<style>
@import "./assets/css/base.css";
</style>
