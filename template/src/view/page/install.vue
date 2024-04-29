<template>
    <main class="page-install" :class="page.current">
        <div class="relative w-full h-screen flex items-center justify-center px-4">
            <Card class="mx-auto max-w-sm w-[400px]" style="margin-top: -80px">
                <CardHeader class="p-5">
                    <CardTitle class="text-lg">{{$t("install.title")}}</CardTitle>
                    <CardDescription>{{$t("install.description")}}</CardDescription>
                </CardHeader>
                <CardContent class="p-5 pt-0">
                    <Tabs v-model:model-value="page.install.mode" :default-value="page.install.mode">
                        <TabsList class="grid w-full grid-cols-2">
                            <TabsTrigger value="local" @click="onModeTab('local')">{{$t("install.tab.local.title")}}</TabsTrigger>
                            <TabsTrigger value="remote" @click="onModeTab('remote')">{{$t("install.tab.remote.title")}}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="local">
                            <fieldset class="grid gap-2 rounded-lg border p-4">
                                <div class="flex space-x-2">
                                    <Input v-model:model-value="page.install.local.input" :placeholder="$t('install.tab.local.placeholder')"/>
                                    <Button variant="secondary" class="pt-2">
                                        <MagnifyingGlassIcon />
                                    </Button>
                                </div>
                                <Alert class="alert-main warning" variant="default">
                                    <ExclamationTriangleIcon />
                                    <AlertTitle>{{$t("install.tab.local.heads_up")}}</AlertTitle>
                                    <AlertDescription class="text-sm">{{$t("install.tab.local.tips")}}</AlertDescription>
                                </Alert>
                                <Button class="w-full" @click="onLocalInstall" :disabled="page.install.local.button_loading">
                                    <ReloadIcon class="w-4 h-4 mr-2 animate-spin" v-if="page.install.local.button_loading"/>
                                    <span>{{$t("install.tab.local.button")}}</span>
                                </Button>
                            </fieldset>
                        </TabsContent>
                        <TabsContent value="remote">
                            <fieldset class="grid gap-2 rounded-lg border p-4">
                                <div class="flex space-x-2">
                                    <Input v-model:model-value="page.install.remote.input" :placeholder="$t('install.tab.remote.placeholder')" />
                                    <Button variant="secondary" class="pt-2">
                                        <StitchesLogoIcon />
                                    </Button>
                                </div>
                                <Alert class="alert-main warning" variant="default">
                                    <ExclamationTriangleIcon />
                                    <AlertTitle>{{$t("install.tab.remote.heads_up")}}</AlertTitle>
                                    <AlertDescription class="text-sm">{{$t("install.tab.remote.tips")}}</AlertDescription>
                                </Alert>
                                <Button class="w-full" @click="onRemoteConnect" :disabled="page.install.remote.button_loading">
                                    <ReloadIcon class="w-4 h-4 mr-2 animate-spin" v-if="page.install.remote.button_loading"/>
                                    <span>{{$t("install.tab.remote.button")}}</span>
                                </Button>
                            </fieldset>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    </main>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import type {BaseStruct, PageStruct} from "@/package/struct";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/package/ui/card";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/package/ui/tabs";
import {Alert, AlertDescription, AlertTitle} from "@/package/ui/alert";
import {Input} from "@/package/ui/input";
import {Button} from "@/package/ui/button";
import {ReloadIcon, MagnifyingGlassIcon, ExclamationTriangleIcon, StitchesLogoIcon} from "@radix-icons/vue";

const props: any = defineProps<{
    base: BaseStruct,
    page: PageStruct
}>();

function onModeTab(mode: string){
    if(props.page.install.mode !== mode){
        props.page.install.mode = mode;
    }
}

function onLocalInstall(){
    props.page.install.local.button_loading = true;
    setTimeout(()=>{
        props.page.install.local.button_loading = false;
        props.page.install.status = true;
    }, 1500);
}

function onRemoteConnect(){
    props.page.install.remote.button_loading = true;
    setTimeout(()=>{
        props.page.install.remote.button_loading = false;
        props.page.install.status = true;
    }, 1500);
}

onBeforeMount(() => {});

onMounted(() => {
    nextTick(()=>{});
});

onBeforeUnmount(() => {});

onUnmounted(() => {});
</script>

<style scoped>
.page-install{
    width: 100%;
    height: 100%;
    background-color: hsl(var(--background));
}
</style>