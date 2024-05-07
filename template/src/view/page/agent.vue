<template>
    <main class="page-agent" :class="page.header.current">
        <div class="agent-header">
            <div class="header-main flex-1 space-y-4 p-4 pl-0 pr-0 pt-5">
                <Tabs default-value="all" class="h-full space-y-6">
                    <div class="space-between flex items-center">
                        <TabsList>
                            <TabsTrigger value="all">{{$t("agent.tag.all")}}</TabsTrigger>
                            <TabsTrigger value="hot">{{$t("agent.tag.hot")}}</TabsTrigger>
                            <TabsTrigger value="new">{{$t("agent.tag.new")}}</TabsTrigger>
                            <TabsTrigger value="user">{{$t("agent.tag.user")}}</TabsTrigger>
                        </TabsList>
                        <div class="ml-auto">
                            <div class="flex items-center space-x-2">
                                <Input type="search" :placeholder="$t('agent.search.placeholder')" class="md:w-[100px] lg:w-[240px]" style="line-height: 36px"/>
                                <Button>
                                    <PlusCircledIcon class="mr-2 h-4 w-4" />
                                    <span>{{$t("agent.new")}}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
        <ScrollArea class="agent-main h-screen flex">
            <div class="agent-box grid grid-cols-3 gap-4 space-y-0">
                <Card style="border-radius: 6px">
                    <CardHeader class="p-4 pb-2">
                        <div class="space-y-2">
                            <CardTitle style="font-size: 14px">Test Agent</CardTitle>
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
.page-agent{
    width: 100%;
    height: 100%;
    background-color: hsl(var(--background));
    display: none;
}
.page-agent.agent{
    display: block;
}
.page-agent .agent-header{
    width: 100%;
    height: 72px;
    background-color: hsl(var(--background));
}
.page-agent .agent-header .header-main{
    max-width: 850px;
    margin: 0 auto;
}
.page-agent .agent-main{
    width: 100%;
    height: calc(100% - 72px);
}
.page-agent .agent-main .agent-box{
    max-width: 850px;
    margin: 0 auto;
}
</style>