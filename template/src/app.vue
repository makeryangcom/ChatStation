<template>
    <router-view ref="routerView" v-slot="{Component}">
        <component :is="Component" :base="app.base" />
    </router-view>
</template>

<script setup lang="ts">
import {ref} from "vue";

const app: any = ref({
    base: (window as any).nodechain
});

</script>

<style>
@import "./assets/css/base.scss";
</style>
