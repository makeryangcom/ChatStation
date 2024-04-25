<template>
    <main class="page-main">
        <CommonHeader ref="commonHeader"></CommonHeader>
    </main>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import CommonHeader from "./common/header.vue";

type FatherProps = {
    base: any,
    theme: string,
    mode: string
}
const props: any = defineProps<FatherProps>();

onBeforeMount(() => {});

onMounted(() => {
    nextTick(()=>{
        console.log(props);
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
