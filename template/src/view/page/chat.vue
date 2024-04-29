<template>
    <main class="page-chat" :class="page.current">
        <ResizablePanelGroup direction="horizontal" class="chat-main h-full items-stretch">
            <ResizablePanel class="left">
                <Tabs class="tab-item" v-model:model-value="page.chat.filter.time" :default-value="page.chat.filter.time">
                    <div class="flex items-center p-2">
                        <TabsList>
                            <TabsTrigger :value="item" v-for="(item, index) in page.chat.filter.array" :key="index" @click="onFilterTime(item)">{{$t("chat.time." + item)}}</TabsTrigger>
                        </TabsList>
                        <div class="ml-auto">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger as-child>
                                        <Button variant="ghost" size="icon">
                                            <PlusIcon class="size-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent align="center" side="right" :align-offset="0" :arrow-padding="0" avoid-collisions :collision-boundary="null" :collision-padding="{}" hide-when-detached sticky="always">
                                        <span>{{$t("chat.new")}}</span>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <Separator />
                    <div class="p-3">
                        <form v-if="page.chat.filter.time === 'today'">
                            <div class="relative">
                                <Search class="absolute left-0 top-2.5 size-4 text-muted-foreground" />
                                <Input v-model="page.chat.search.keyword" :placeholder="$t('chat.search.placeholder')" class="pl-8" style="line-height: 36px" />
                            </div>
                        </form>
                        <form v-if="page.chat.filter.time === 'history'">
                            <div class="relative">
                                <Popover>
                                    <PopoverTrigger as-child>
                                        <Button variant="outline" class="w-[256px] justify-start text-left font-normal">
                                            <CalendarIcon class="mr-2 h-4 w-4" />
                                            <template v-if="page.chat.filter.date.start">
                                                <template v-if="page.chat.filter.date.end">
                                                    <span>{{page.chat.filter.df.format(page.chat.filter.date.start.toDate(getLocalTimeZone()))}} - {{page.chat.filter.df.format(page.chat.filter.date.end.toDate(getLocalTimeZone()))}}</span>
                                                </template>
                                                <template v-else>
                                                    <span>{{page.chat.filter.df.format(page.chat.filter.date.start.toDate(getLocalTimeZone()))}}</span>
                                                </template>
                                            </template>
                                            <template v-else>
                                                <span class="placeholder">{{$t("chat.time.search")}}</span>
                                            </template>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="start" side="right" :align-offset="0" class="p-0 calendar-main">
                                        <RangeCalendar v-model="page.chat.filter.date" :locale="props.base.lang.locale" initial-focus :number-of-months="1" @update:start-value="(value) => page.chat.filter.date.start = value" @update:model-value="(value) => console.log(value)" />
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
                                        <button class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm hover:bg-accent" :key="0">
                                            <div class="flex w-full flex-col gap-1">
                                                <div class="flex items-center">
                                                    <div class="flex items-center gap-2">
                                                        <div class="font-semibold">llama3:8b</div>
                                                        <span class="flex h-2 w-2 rounded-full bg-blue-600" />
                                                    </div>
                                                    <div class="ml-auto text-xs text-foreground">6 minute ago</div>
                                                </div>
                                            </div>
                                            <div class="line-clamp-2 text-xs text-muted-foreground">需要一个基于Python的手机号码格式验证程序</div>
                                            <div class="flex items-center gap-2">
                                                <Badge class="badge-item" variant="outline">python</Badge>
                                                <Badge class="badge-item" variant="default">手机号码</Badge>
                                                <Badge class="badge-item" variant="secondary">格式验证</Badge>
                                            </div>
                                        </button>
                                        <button class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted" :key="0">
                                            <div class="flex w-full flex-col gap-1">
                                                <div class="flex items-center">
                                                    <div class="flex items-center gap-2">
                                                        <div class="font-semibold">qwen:14b</div>
                                                    </div>
                                                    <div class="ml-auto text-xs text-muted-foreground">15 minute ago</div>
                                                </div>
                                            </div>
                                            <div class="line-clamp-2 text-xs text-muted-foreground">这段代码首先创建了一个 Date 对象，它默认代表创建时的日期和时间。getFullYear() 方法返回四位数的年份；getMonth() 方法返回月份（从 0 开始计数，所以实际月份需要加 1）；getDate() 方法返回一个月中的第几天。</div>
                                            <div class="flex items-center gap-2">
                                                <Badge class="badge-item" variant="outline">nodejs</Badge>
                                            </div>
                                        </button>
                                        <button class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent" :key="0">
                                            <div class="flex w-full flex-col gap-1">
                                                <div class="flex items-center">
                                                    <div class="flex items-center gap-2">
                                                        <div class="font-semibold">OpenAI ChatGPT</div>
                                                    </div>
                                                    <div class="ml-auto text-xs text-foreground">35 minute ago</div>
                                                </div>
                                            </div>
                                            <div class="line-clamp-2 text-xs text-muted-foreground">An unofficial, community-led Vue port of shadcn/ui. We are not affiliated with shadcn, but we did get his blessing before creating a Vue version of his work. This project was born out of the need for a similar project for the Vue ecosystem.</div>
                                            <div class="flex items-center gap-2">
                                                <Badge class="badge-item" variant="secondary">vue</Badge>
                                                <Badge class="badge-item" variant="secondary">cli</Badge>
                                            </div>
                                        </button>
                                    </TransitionGroup>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="history" class="m-0 conversation-c">
                            <ScrollArea class="h-screen flex conversation-s">
                                <div class="flex-1 flex flex-col gap-2 p-3 pt-0 scroll-box">
                                    <TransitionGroup name="list" appear>
                                        <button class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm hover:bg-accent" :key="0">
                                            <div class="flex w-full flex-col gap-1">
                                                <div class="flex items-center">
                                                    <div class="flex items-center gap-2">
                                                        <div class="font-semibold">llama3:8b</div>
                                                        <span class="flex h-2 w-2 rounded-full bg-blue-600" />
                                                    </div>
                                                    <div class="ml-auto text-xs text-foreground">6 minute ago</div>
                                                </div>
                                            </div>
                                            <div class="line-clamp-2 text-xs text-muted-foreground">需要一个基于Python的手机号码格式验证程序</div>
                                            <div class="flex items-center gap-2">
                                                <Badge class="badge-item" variant="outline">python</Badge>
                                                <Badge class="badge-item" variant="default">手机号码</Badge>
                                                <Badge class="badge-item" variant="secondary">格式验证</Badge>
                                            </div>
                                        </button>
                                    </TransitionGroup>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </div>
                </Tabs>
            </ResizablePanel>
            <ResizableHandle with-handle />
            <ResizablePanel class="middle">
                <div class="chat-item-box">
                    <div class="chat-item-main">1</div>
                </div>
            </ResizablePanel>
            <ResizableHandle with-handle />
            <ResizablePanel class="right">
                <ScrollArea class="h-screen flex">
                    <div class="items-center p-4">
                        <div class="grid gap-2 pt-0">
                            <HoverCard :open-delay="200" :close-delay="10">
                                <HoverCardTrigger as-child>
                                    <div class="grid gap-4">
                                        <div class="flex items-center justify-between">
                                            <Label>{{$t("chat.configuration.workflow.title")}}</Label>
                                        </div>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue :placeholder="$t('chat.configuration.workflow.placeholder')" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>North America</SelectLabel>
                                                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent align="start" class="w-[260px] text-sm" side="left">
                                    <span class="tips-main">{{$t("chat.configuration.workflow.tips")}}</span>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <div class="grid gap-2 pt-4">
                            <HoverCard :open-delay="200" :close-delay="10">
                                <HoverCardTrigger as-child>
                                    <div class="grid gap-4">
                                        <div class="flex items-center justify-between">
                                            <Label>{{$t("chat.configuration.model.title")}}</Label>
                                        </div>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue :placeholder="$t('chat.configuration.model.placeholder')" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>North America</SelectLabel>
                                                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent align="start" class="w-[260px] text-sm" side="left">
                                    <span class="tips-main">{{$t("chat.configuration.model.tips")}}</span>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <fieldset class="grid gap-2 rounded-lg border p-4 mt-4">
                            <legend class="-ml-1 px-1 text-sm font-medium">{{$t("chat.configuration.settings.title")}}</legend>
                            <Tabs default-value="" class="flex-1">
                                <TabsList class="grid grid-cols-3">
                                    <TabsTrigger value="creative">{{$t("chat.configuration.settings.presets.creative")}}</TabsTrigger>
                                    <TabsTrigger value="balanced">{{$t("chat.configuration.settings.presets.balanced")}}</TabsTrigger>
                                    <TabsTrigger value="precise">{{$t("chat.configuration.settings.presets.precise")}}</TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <div class="grid gap-2">
                                <HoverCard :open-delay="200" :close-delay="10">
                                    <HoverCardTrigger as-child>
                                        <div class="grid gap-4">
                                            <div class="flex items-center justify-between">
                                                <Label for="temperature">{{$t("chat.configuration.settings.temperature.title")}}</Label>
                                                <span class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">{{page.chat.configuration.temperature?.[0]}}</span>
                                            </div>
                                            <Slider id="temperature" v-model="page.chat.configuration.temperature" :max="1" :step="0.1" class="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"></Slider>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align="start" class="w-[260px] text-sm" side="left">
                                        <span class="tips-main">{{$t("chat.configuration.settings.temperature.tips")}}</span>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            <div class="grid gap-2 pt-2">
                                <HoverCard :open-delay="200" :close-delay="10">
                                    <HoverCardTrigger as-child>
                                        <div class="grid gap-4">
                                            <div class="flex items-center justify-between">
                                                <Label for="maxlength">{{$t("chat.configuration.settings.maxlength.title")}}</Label>
                                                <span class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">{{page.chat.configuration.max_token?.[0]}}</span>
                                            </div>
                                            <Slider id="maxlength" v-model="page.chat.configuration.max_token" :max="4096" :step="10" class="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"></Slider>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align="start" class="w-[260px] text-sm" side="left">
                                        <span class="tips-main">{{$t("chat.configuration.settings.maxlength.tips")}}</span>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            <div class="grid gap-2 pt-2">
                                <HoverCard :open-delay="200" :close-delay="10">
                                    <HoverCardTrigger as-child>
                                        <div class="grid gap-4">
                                            <div class="flex items-center justify-between">
                                                <Label for="top_p">{{$t("chat.configuration.settings.top_p.title")}}</Label>
                                                <span class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">{{page.chat.configuration.top_p?.[0]}}</span>
                                            </div>
                                            <Slider id="top_p" v-model="page.chat.configuration.top_p" :max="1" :step="0.1" class="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"></Slider>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align="start" class="w-[260px] text-sm" side="left">
                                        <span class="tips-main">{{$t("chat.configuration.settings.top_p.tips")}}</span>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            <div class="grid gap-2 pt-2">
                                <HoverCard :open-delay="200" :close-delay="10">
                                    <HoverCardTrigger as-child>
                                        <div class="grid gap-4">
                                            <div class="flex items-center justify-between">
                                                <Label for="frequency_penalty">Frequency penalty</Label>
                                                <span class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">{{page.chat.configuration.frequency_penalty?.[0]}}</span>
                                            </div>
                                            <Slider id="frequency_penalty" aria-label="Frequency penalty" v-model="page.chat.configuration.frequency_penalty" :max="1" :step="0.1" class="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"></Slider>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align="start" class="w-[260px] text-sm" side="left">How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.</HoverCardContent>
                                </HoverCard>
                            </div>
                            <div class="grid gap-2 pt-2">
                                <HoverCard :open-delay="200" :close-delay="10">
                                    <HoverCardTrigger as-child>
                                        <div class="grid gap-4">
                                            <div class="flex items-center justify-between">
                                                <Label for="presence_penalty">Presence penalty</Label>
                                                <span class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">{{page.chat.configuration.presence_penalty?.[0]}}</span>
                                            </div>
                                            <Slider id="presence_penalty" aria-label="Presence penalty" v-model="page.chat.configuration.presence_penalty" :max="1" :step="0.1" class="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"></Slider>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent align="start" class="w-[260px] text-sm" side="left">How much to penalize new tokens based on whether they appear in the text so far. Increases the model's likelihood to talk about new topics.</HoverCardContent>
                                </HoverCard>
                            </div>
                        </fieldset>
                    </div>
                </ScrollArea>
            </ResizablePanel>
        </ResizablePanelGroup>
    </main>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick, ref, Ref} from "vue";
import type {BaseStruct, PageStruct} from "@/package/struct";
import type {DateRange} from "radix-vue";
import {CalendarDate, DateFormatter, getLocalTimeZone} from "@internationalized/date";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/package/ui/select";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/package/ui/resizable";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/package/ui/tooltip";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/package/ui/tabs";
import {Popover, PopoverContent, PopoverTrigger} from "@/package/ui/popover";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/package/ui/hover-card";
import {RangeCalendar} from "@/package/ui/range-calendar";
import {ScrollArea} from "@/package/ui/scroll-area";
import {Separator} from "@/package/ui/separator";
import {Input} from "@/package/ui/input";
import {Search} from "lucide-vue-next";
import {Badge} from "@/package/ui/badge";
import {Label} from "@/package/ui/label";
import {Slider} from "@/package/ui/slider";
import {Button} from "@/package/ui/button";
import {PlusIcon, CalendarIcon} from "@radix-icons/vue";

const props: any = defineProps<{
    base: BaseStruct,
    page: PageStruct
}>();

function onFilterTime(time: string){
    if(props.page.chat.filter.time !== time){
        props.page.chat.filter.time = time;
    }
}

onBeforeMount(() => {});

onMounted(() => {
    nextTick(()=>{
        const now = new Date();
        props.page.chat.filter.date = ref({
            start: new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate()),
            end: new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate()).add({days: 0})
        }) as Ref<DateRange>;
        props.page.chat.filter.df = new DateFormatter((props.base.lang.locale === "zh" ? "zh-CN" : "en-US"), {dateStyle: "long"})
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
    flex: 0 0 280px !important;
}
.page-chat .chat-main .left .tab-item{
    height: 100%;
}
.page-chat .chat-main .left .conversation{
    height: calc(100% - 114px);
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
.page-chat .chat-main .middle .chat-item-box{
    width: 100%;
    height: 100%;
}
.page-chat .chat-main .middle .chat-item-box .chat-item-main{
    width: 100%;
    max-width: 850px;
    margin: 0 auto;
}
.page-chat .chat-main .right{
    flex: 0 0 280px !important;
}
.page-chat .chat-main .right .h-screen{
    height: 100%;
}
</style>