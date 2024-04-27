<template>
    <main class="page-chat" :class="page.current">
        <ResizablePanelGroup direction="horizontal" class="chat-main h-full items-stretch">
            <ResizablePanel class="left">
                <Tabs class="tab-item" v-model:model-value="page.chat.filter.time" :default-value="page.chat.filter.time">
                    <div class="flex items-center p-2">
                        <TabsList>
                            <TabsTrigger :value="item" v-for="(item, index) in page.chat.filter.array" :key="index">{{$t("chat.time." + item)}}</TabsTrigger>
                        </TabsList>
                        <div class="ml-auto">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger as-child>
                                        <Button variant="outline">
                                            <PlusIcon />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent align="center" side="right" :align-offset="0" :arrow-padding="0" avoid-collisions :collision-boundary="null" :collision-padding="{}" hide-when-detached sticky="always">
                                        <span>新建对话</span>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <Separator />
                    <div class="p-3">
                        <form v-if="page.chat.filter.time === 'today'">
                            <div class="relative">
                                <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                                <Input v-model="page.chat.search.keyword" :placeholder="$t('chat.search.placeholder')" class="pl-8" style="line-height: 36px" />
                            </div>
                        </form>
                        <form v-if="page.chat.filter.time === 'history'">
                            <div class="relative">
                                <Popover>
                                    <PopoverTrigger as-child>
                                        <Button variant="outline" class="w-[280px] justify-start text-left font-normal">
                                            <CalendarIcon class="mr-2 h-4 w-4" />
                                            <template>2024-04-28</template>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent class="w-auto p-0">
                                        <RangeCalendar v-model="page.chat.filter.date" initial-focus :number-of-months="2" @update:start-value="(startDate) => page.chat.filter.date.start = startDate" />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </form>
                    </div>
                    <div class="conversation">
                        <TabsContent value="today" class="m-0 conversation-c">
                            <ScrollArea class="h-screen flex conversation-s">
                                <div class="flex-1 flex flex-col gap-2 p-3 pt-0 scroll-box">
                                    <TransitionGroup name="list" appear>
                                        <button class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent" :key="0">
                                            <div class="flex w-full flex-col gap-1">
                                                <div class="flex items-center">
                                                    <div class="flex items-center gap-2">
                                                        <div class="font-semibold">William Smith</div>
                                                        <span class="flex h-2 w-2 rounded-full bg-blue-600" />
                                                    </div>
                                                    <div class="ml-auto text-xs text-foreground">6 months ago</div>
                                                </div>
                                                <div class="text-xs font-medium">Re: Project Update</div>
                                            </div>
                                            <div class="line-clamp-2 text-xs text-muted-foreground">Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in. I have a few minor suggestions that I'll include in the attached document.Let's discuss these duri</div>
                                            <div class="flex items-center gap-2">
                                                <Badge class="badge-item" variant="outline">meeting</Badge>
                                                <Badge class="badge-item" variant="default">work</Badge>
                                                <Badge class="badge-item" variant="secondary">important</Badge>
                                            </div>
                                        </button>
                                        <button class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted" :key="0">
                                            <div class="flex w-full flex-col gap-1">
                                                <div class="flex items-center">
                                                    <div class="flex items-center gap-2">
                                                        <div class="font-semibold">Emily Davis</div>
                                                    </div>
                                                    <div class="ml-auto text-xs text-muted-foreground">about 1 year ago</div>
                                                </div>
                                                <div class="text-xs font-medium">Re: Question about Budget</div>
                                            </div>
                                            <div class="line-clamp-2 text-xs text-muted-foreground">Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in. I have a few minor suggestions that I'll include in the attached document.Let's discuss these duri</div>
                                            <div class="flex items-center gap-2">
                                                <Badge class="badge-item" variant="outline">meeting</Badge>
                                            </div>
                                        </button>
                                        <button class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent" :key="0">
                                            <div class="flex w-full flex-col gap-1">
                                                <div class="flex items-center">
                                                    <div class="flex items-center gap-2">
                                                        <div class="font-semibold">William Smith</div>
                                                        <span class="flex h-2 w-2 rounded-full bg-blue-600" />
                                                    </div>
                                                    <div class="ml-auto text-xs text-foreground">6 months ago</div>
                                                </div>
                                                <div class="text-xs font-medium">Re: Project Update</div>
                                            </div>
                                            <div class="line-clamp-2 text-xs text-muted-foreground">Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in. I have a few minor suggestions that I'll include in the attached document.Let's discuss these duri</div>
                                            <div class="flex items-center gap-2">
                                                <Badge class="badge-item" variant="secondary">work</Badge>
                                            </div>
                                        </button>
                                        <button class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent" :key="0">
                                            <div class="flex w-full flex-col gap-1">
                                                <div class="flex items-center">
                                                    <div class="flex items-center gap-2">
                                                        <div class="font-semibold">William Smith</div>
                                                        <span class="flex h-2 w-2 rounded-full bg-blue-600" />
                                                    </div>
                                                    <div class="ml-auto text-xs text-foreground">6 months ago</div>
                                                </div>
                                                <div class="text-xs font-medium">Re: Project Update</div>
                                            </div>
                                            <div class="line-clamp-2 text-xs text-muted-foreground">Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in. I have a few minor suggestions that I'll include in the attached document.Let's discuss these duri</div>
                                            <div class="flex items-center gap-2">
                                                <Badge class="badge-item" variant="default">Test</Badge>
                                            </div>
                                        </button>
                                    </TransitionGroup>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="history" class="m-0 conversation-c">
                            12
                        </TabsContent>
                    </div>
                </Tabs>
            </ResizablePanel>
            <ResizableHandle with-handle />
            <ResizablePanel class="right">2</ResizablePanel>
        </ResizablePanelGroup>
    </main>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import type {BaseStruct, PageStruct} from "@/package/struct";
import {CalendarDate, DateFormatter, getLocalTimeZone} from "@internationalized/date";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/package/ui/resizable";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/package/ui/tooltip";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/package/ui/tabs";
import {Popover, PopoverContent, PopoverTrigger} from "@/package/ui/popover";
import {RangeCalendar} from "@/package/ui/range-calendar";
import {ScrollArea} from "@/package/ui/scroll-area";
import {Separator} from "@/package/ui/separator";
import {Input} from "@/package/ui/input";
import {Search} from "lucide-vue-next";
import {Badge} from "@/package/ui/badge";
import {Button} from "@/package/ui/button";
import {PlusIcon, CalendarIcon} from "@radix-icons/vue";

const props: any = defineProps<{
    base: BaseStruct,
    page: PageStruct
}>();

onBeforeMount(() => {});

onMounted(() => {
    nextTick(()=>{
        props.page.chat.filter.date = {
            start: new CalendarDate(2022, 1, 20),
            end: new CalendarDate(2022, 1, 20).add({ days: 20 })
        }
    });
});

onBeforeUnmount(() => {});

onUnmounted(() => {});
</script>

<style scoped>
.page-chat{
    width: 100%;
    height: calc(100%);
    background-color: hsl(var(--background));
    display: none;
}
.page-chat.chat{
    display: block;
}
.page-chat .chat-main .left{
    flex: 0 0 300px !important;
}
.page-chat .chat-main .left .tab-item{
    height: 100%;
}
.page-chat .chat-main .left .conversation{
    height: calc(100% - 104px);
}
.page-chat .chat-main .left .conversation .conversation-c{
    height: 100%;
}
.page-chat .chat-main .left .conversation .conversation-s{
    height: 100%;
}
.page-chat .chat-main .left .conversation .badge-item{
    height: 24px;
    padding: 4px 5px;
    line-height: 12px;
    display: inline-block;
}
</style>