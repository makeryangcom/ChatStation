<template>
    <main class="page-header">
        <div class="header-item">1</div>
        <div class="header-item">1</div>
        <div class="header-item">1</div>
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
    background-color: hsl(var(--card));
    border-bottom: 1px solid hsl(var(--border));
    position: fixed;
    top: 0;
    z-index: 99999;
    -webkit-app-region: drag;
}
.page-header .header-item{
    width: calc(100% - 680px);
    height: 50px;
    display: inline-block;
    vertical-align: top;
}
.page-header .header-item:first-child{
    width: 340px;
}
.page-header .header-item:last-child{
    width: 340px;
}
</style>