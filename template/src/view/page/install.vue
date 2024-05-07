<template>
    <main class="page-install" :class="page.header.current">
        <div class="relative w-full h-screen flex items-center justify-center px-4" style="height: 100%">
            <Card class="mx-auto max-w-sm w-[400px]" style="margin-top: -20px">
                <CardHeader class="p-5">
                    <CardTitle class="text-lg">{{$t("install.title")}}</CardTitle>
                    <CardDescription>{{$t("install.description")}}</CardDescription>
                </CardHeader>
                <CardContent class="p-5 pt-0">
                    <Tabs v-model:model-value="page.install.mode" :default-value="page.install.mode">
                        <TabsList class="grid w-full grid-cols-3">
                            <TabsTrigger value="browser" :disabled="page.install.button_loading" @click="onModeTab('browser')">{{$t("install.tab.browser.title")}}</TabsTrigger>
                            <TabsTrigger value="local" :disabled="page.install.button_loading" @click="onModeTab('local')">{{$t("install.tab.local.title")}}</TabsTrigger>
                            <TabsTrigger value="remote" :disabled="page.install.button_loading" @click="onModeTab('remote')">{{$t("install.tab.remote.title")}}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="browser">
                            <fieldset class="grid gap-2 rounded-lg border p-4">
                                <div class="flex space-x-2 h-9"></div>
                                <Alert class="alert-main warning" variant="default">
                                    <ExclamationTriangleIcon />
                                    <AlertTitle>{{$t("install.tab.browser.heads_up")}}</AlertTitle>
                                    <AlertDescription class="text-sm">{{$t("install.tab.browser.tips")}}</AlertDescription>
                                </Alert>
                                <Button class="w-full" @click="onEnterBrowser" :disabled="page.install.button_loading" v-if="page.install.progress.value === 0">
                                    <ReloadIcon class="w-4 h-4 mr-2 animate-spin" v-if="page.install.button_loading"/>
                                    <span>{{$t("install.tab.browser.button")}}</span>
                                </Button>
                                <div class="w-full" style="padding: 14px;" v-else>
                                    <Progress style="display:inline-block;vertical-align: middle;width: calc(100% - 60px)" v-model="page.install.progress.value" />
                                    <span style="font-size: 12px; height: 8px;line-height: 8px; width: 60px;display:inline-block;vertical-align: middle; text-align: right">{{page.install.progress.value.toFixed(2)}}%</span>
                                </div>
                            </fieldset>
                        </TabsContent>
                        <TabsContent value="local">
                            <fieldset class="grid gap-2 rounded-lg border p-4">
                                <div class="flex space-x-2">
                                    <Input :value="page.install.local.input" :disabled="page.install.button_loading" :placeholder="$t('install.tab.local.placeholder')"/>
                                    <Button variant="secondary" class="pt-2" :disabled="page.install.button_loading" @click="onSelectFolder">
                                        <MagnifyingGlassIcon />
                                    </Button>
                                </div>
                                <Alert class="alert-main warning" variant="default">
                                    <ExclamationTriangleIcon />
                                    <AlertTitle>{{$t("install.tab.local.heads_up")}}</AlertTitle>
                                    <AlertDescription class="text-sm">{{$t("install.tab.local.tips")}}</AlertDescription>
                                </Alert>
                                <Button class="w-full" @click="onLocalInstall" :disabled="page.install.button_loading || page.install.local.input === ''" v-if="page.install.progress.value === 0">
                                    <ReloadIcon class="w-4 h-4 mr-2 animate-spin" v-if="page.install.button_loading"/>
                                    <span>{{$t("install.tab.local.button")}}</span>
                                </Button>
                                <div class="w-full" style="padding: 14px;" v-else>
                                    <Progress style="display:inline-block;vertical-align: middle;width: calc(100% - 60px)" v-model="page.install.progress.value" />
                                    <span style="font-size: 12px; height: 8px;line-height: 8px; width: 60px;display:inline-block;vertical-align: middle; text-align: right">{{page.install.progress.value.toFixed(2)}}%</span>
                                </div>
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
                                <Button class="w-full" @click="onRemoteConnect" :disabled="page.install.button_loading">
                                    <ReloadIcon class="w-4 h-4 mr-2 animate-spin" v-if="page.install.button_loading"/>
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
import {Progress} from "@/package/ui/progress";
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

function onSelectFolder(){
    props.base.ipc.send("message", {type: "select_folder_path", callback: "local_path"});
}

function onEnterBrowser(){
    props.page.install.button_loading = true;
    setTimeout(()=>{
        localStorage.setItem("nodechain:mode", "browser");
        props.page.install.button_loading = false;
        props.page.install.status = true;
        props.page.install.progress.value = 0;
    }, 1500);
}

function onLocalInstall(){
    if(props.page.install.local.input === ""){
        props.page.ui.toast({
            description: props.base.lang.t("toast.20001"),
            duration: 2000
        });
        return;
    }
    props.page.install.button_loading = true;
    const file_path = props.base.path.resolve(props.page.install.local.input, "./install.zip");
    const download_file = props.base.file.createWriteStream(file_path);
    props.base.tools.download.service("https://cdn.geekros.com/nodechain/install/local_install.zip", download_file, (file_data: any)=>{
        props.page.install.progress.size = file_data.headers["content-length"];
    }, (chunk: any)=>{
        props.page.install.progress.received += chunk.length;
        props.page.install.progress.value = (((props.page.install.progress.received * 100) / props.page.install.progress.size)/ 2);
    }, ()=>{
        props.page.install.progress.received = 0;
        props.base.tools.zip.file(file_path, props.base.path.resolve(props.page.install.local.input, "./"), (chunk: any, size: any)=>{
            props.page.install.progress.size = size;
            props.page.install.progress.received += chunk.length;
            props.page.install.progress.value = (50 + (((props.page.install.progress.received * 100) / props.page.install.progress.size)/ 2));
        }, ()=>{
            setTimeout(()=>{
                props.page.install.local.path = props.page.install.local.input;
                localStorage.setItem("nodechain:mode", "local");
                localStorage.setItem("nodechain:local:path", props.page.install.local.input);
                props.page.install.button_loading = false;
                props.page.install.status = true;
                props.page.install.progress.value = 0;
            }, 1500);
        }, (error: any)=>{
            props.page.install.progress.value = 0;
            props.page.install.button_loading = false;
            props.page.install.status = false;
            props.page.ui.toast({
                description: props.base.lang.t("toast.30001"),
                duration: 2000
            });
        });
    });
}

function onRemoteConnect(){
    if(props.page.install.remote.input === ""){
        props.page.ui.toast({
            description: props.base.lang.t("toast.20001"),
            duration: 2000
        });
        return;
    }
    props.page.install.button_loading = true;
    setTimeout(()=>{
        props.page.install.button_loading = false;
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