<template>
    <main class="page-install" :class="page.current">
        <div class="relative w-full h-screen flex items-center justify-center px-4">
            <Card class="mx-auto max-w-sm w-[400px]" style="margin-top: -80px">
                <CardHeader class="p-5">
                    <CardTitle class="text-lg">{{$t("install.title")}}</CardTitle>
                    <CardDescription>{{$t("install.description")}}</CardDescription>
                </CardHeader>
                <CardContent class="p-5 pt-0">
                    <Tabs default-value="local">
                        <TabsList class="grid w-full grid-cols-2">
                            <TabsTrigger value="local">{{$t("install.tab.local.title")}}</TabsTrigger>
                            <TabsTrigger value="remote">{{$t("install.tab.remote.title")}}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="local">
                            <fieldset class="grid gap-2 rounded-lg border p-4">
                                <div class="flex space-x-2">
                                    <Input default-value="" :placeholder="$t('install.tab.local.placeholder')"/>
                                    <Button variant="secondary" class="pt-2">
                                        <MagnifyingGlassIcon />
                                    </Button>
                                </div>
                                <Alert class="alert-main warning" variant="default">
                                    <ExclamationTriangleIcon />
                                    <AlertTitle>{{$t("install.tab.local.heads_up")}}</AlertTitle>
                                    <AlertDescription class="text-sm">{{$t("install.tab.local.tips")}}</AlertDescription>
                                </Alert>
                                <Button class="w-full">{{$t("install.tab.local.button")}}</Button>
                            </fieldset>
                        </TabsContent>
                        <TabsContent value="remote">
                            <fieldset class="grid gap-2 rounded-lg border p-4">
                                <div class="flex space-x-2">
                                    <Input default-value="" :placeholder="$t('install.tab.remote.placeholder')" />
                                </div>
                                <Alert class="alert-main warning" variant="default">
                                    <ExclamationTriangleIcon />
                                    <AlertTitle>{{$t("install.tab.remote.heads_up")}}</AlertTitle>
                                    <AlertDescription class="text-sm">{{$t("install.tab.remote.tips")}}</AlertDescription>
                                </Alert>
                                <Button class="w-full">{{$t("install.tab.remote.button")}}</Button>
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
import {MagnifyingGlassIcon, ExclamationTriangleIcon} from "@radix-icons/vue";

const props: any = defineProps<{
    base: BaseStruct,
    page: PageStruct
}>();

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