<template>
    <main class="page-main">
        <CommonHeader ref="commonHeader"></CommonHeader>
    </main>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import CommonHeader from "./common/header.vue";

onBeforeMount(() => {});

onMounted(() => {
    nextTick(()=>{

    });
});

onBeforeUnmount(() => {});

onUnmounted(() => {});
</script>

<style scoped>
.page-main{
    width: 100%;
    height: 100%;
}
</style>
