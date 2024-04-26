<template>
    <router-view ref="routerView" v-slot="{Component}">
        <component :is="Component" :base="app.base" />
    </router-view>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick} from "vue";
import {useI18n} from "vue-i18n";

const i18n = useI18n();
let app: any = ref({
    base: (window as any).base,
    theme: localStorage.getItem("nodechain:theme") ? localStorage.getItem("nodechain:theme") : "zinc",
    mode: localStorage.getItem("nodechain:mode") ? localStorage.getItem("nodechain:mode") : "",
});

onMounted(async () => {
    await nextTick( ()=>{
        console.log("NodeChain " + app.value.base.config.version + " MakerYang(https://www.makeryang.com)");
        document.documentElement.className = "theme-" + app.value.theme + " " + app.value.mode;
        app.value.base.lang.t = i18n.t;
        app.value.base.lang.locale = i18n.locale;
        window.addEventListener("resize", function() {
            app.value.base.ipc.send("message", {type: "header-right-button", data: "resize"});
        });
    });
});

</script>

<style>
@import "./assets/css/base.css";
</style>
