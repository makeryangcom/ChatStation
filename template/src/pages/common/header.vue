<template>
    <main class="page-header">
    </main>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";

onBeforeMount(() => {});

onMounted(() => {
    nextTick(()=>{

    });
});

onBeforeUnmount(() => {});

onUnmounted(() => {});
</script>

<style scoped>
.page-header{
    width: 100%;
    height: 50px;
    background-color: rgba(246, 248, 250, 1);
    border-bottom: 1px solid rgba(216, 222, 228, .2);
    position: fixed;
    top: 0;
    z-index: 99999;
    -webkit-app-region: drag;
}
</style>