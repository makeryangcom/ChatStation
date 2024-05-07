<template>
    <main class="page-workflow" :class="page.header.current">
        <div class="workflow-header">
            <div class="header-main flex-1 space-y-4 p-4 pl-0 pr-0 pt-5">
                <Tabs default-value="all" class="h-full space-y-6">
                    <div class="space-between flex items-center">
                        <TabsList>
                            <TabsTrigger value="all">{{$t("workflow.tag.all")}}</TabsTrigger>
                            <TabsTrigger value="hot">{{$t("workflow.tag.hot")}}</TabsTrigger>
                            <TabsTrigger value="new">{{$t("workflow.tag.new")}}</TabsTrigger>
                            <TabsTrigger value="user">{{$t("workflow.tag.user")}}</TabsTrigger>
                        </TabsList>
                        <div class="ml-auto">
                            <div class="flex items-center space-x-2">
                                <Input type="search" :placeholder="$t('workflow.search.placeholder')" class="md:w-[100px] lg:w-[240px]" style="line-height: 36px"/>
                                <Button>
                                    <PlusCircledIcon class="mr-2 h-4 w-4" />
                                    <span>{{$t("workflow.new")}}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
        <ScrollArea class="workflow-main h-screen flex">
            <div class="workflow-box grid grid-cols-3 gap-4 space-y-0">
                <Card style="border-radius: 6px">
                    <CardHeader class="p-4 pb-2">
                        <div class="space-y-2">
                            <CardTitle style="font-size: 14px">Test Workflow</CardTitle>
                            <CardDescription class="text-sm line-clamp-2">Beautifully designed components built with Radix UI and Tailwind CSS.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent class="p-4 pt-0">
                        <div class="flex space-x-4 text-sm text-muted-foreground">
                            <div class="flex items-center">
                                <Link2Icon class="mr-1" />
                                <span>15</span>
                            </div>
                            <div class="flex items-center">
                                <StarIcon class="mr-1" />
                                <span>1.5k</span>
                            </div>
                            <div class="flex items-center">
                                <ClockIcon class="mr-1" />
                                <span>2024-05-05</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ScrollArea>
    </main>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import type {BaseStruct, PageStruct} from "@/package/struct";
import {PlusCircledIcon, Link2Icon, StarIcon, ClockIcon} from "@radix-icons/vue";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/package/ui/tabs";
import {ScrollArea} from "@/package/ui/scroll-area";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/package/ui/card";
import {Button} from "@/package/ui/button";
import {Input} from "@/package/ui/input";

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
.page-workflow{
    width: 100%;
    height: 100%;
    background-color: hsl(var(--background));
    display: none;
}
.page-workflow.workflow{
    display: block;
}
.page-workflow .workflow-header{
    width: 100%;
    height: 72px;
    background-color: hsl(var(--background));
}
.page-workflow .workflow-header .header-main{
    max-width: 850px;
    margin: 0 auto;
}
.page-workflow .workflow-main{
    width: 100%;
    height: calc(100% - 72px);
}
.page-workflow .workflow-main .workflow-box{
    max-width: 850px;
    margin: 0 auto;
}
</style>