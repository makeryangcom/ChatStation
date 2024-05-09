<template>
    <main class="page-header">
        <div class="header-item">
            <div class="left-item">
                <div class="logo"></div>
            </div>
            <div class="left-item">
                <div class="mode-box">
                    <Dialog v-model:open="showDialog">
                        <Popover v-model:open="open">
                            <PopoverTrigger as-child>
                                <Button variant="outline" role="combobox" aria-expanded="true" aria-label="Select a team" :disabled="!page.install.status">
                                    <span v-if="page.header.select.value !== ''">
                                        <GlobeIcon class="mr-2" v-if="page.header.select.value === 'browser'" />
                                        <LaptopIcon class="mr-2" v-else-if="page.header.select.value === 'local'" />
                                        <DesktopIcon class="mr-2" v-else />
                                    </span>
                                    <span v-else>
                                        <Link1Icon class="mr-2" />
                                    </span>
                                    <span>{{page.header.select.value === "" ? $t("header.left.placeholder") : (page.header.select.value === "browser" ? "Google Chrome" : (page.header.select.value === "local" ? "127.0.0.1" : page.header.select.value))}}</span>
                                    <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-[200px] p-0">
                                <Command :filter-function="(list: any, child: any) => list.filter((i: any) => i?.toLowerCase()?.includes(child)) ">
                                    <CommandInput :placeholder="$t('header.left.search')" />
                                    <CommandList>
                                        <CommandEmpty>{{$t("header.left.search_no_found")}}</CommandEmpty>
                                        <CommandGroup v-for="(item, index) in page.header.select.group" :key="index" :heading="$t('header.left.' + item.lang)">
                                            <CommandItem v-for="(child, ii) in item.child" :key="ii" :value="child.value" @select="onHeaderSelect(child);open = false;">
                                                <span>
                                                    <GlobeIcon class="mr-2" v-if="child.value === 'browser'" />
                                                    <LaptopIcon class="mr-2" v-else-if="child.value === 'local'" />
                                                    <DesktopIcon class="mr-2" v-else />
                                                </span>
                                                <span>{{child.label}}</span>
                                                <CheckIcon class="ml-auto h-4 w-4" :class="page.header.select.value !== child.value ? 'opacity-0' : ''"></CheckIcon>
                                            </CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                    <CommandSeparator />
                                    <CommandList>
                                        <CommandGroup>
                                            <DialogTrigger as-child>
                                                <CommandItem value="create-team" @select="()=>{open = false; showDialog = true;}">
                                                    <PlusCircledIcon class="mr-2 h-5 w-5" />
                                                    <span>{{$t("header.left.new_remote")}}</span>
                                                </CommandItem>
                                            </DialogTrigger>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <DialogContent class="11">
                            <DialogHeader>
                                <DialogTitle>Create team</DialogTitle>
                                <DialogDescription>Add a new team to manage products and customers.</DialogDescription>
                            </DialogHeader>
                            <div>1212</div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
        <div class="header-item">
            <div class="page-tab" v-if="page.header.current !== 'browser' && page.install.status">
                <Tabs class="tabs" v-model:model-value="page.header.current" :default-value="page.header.current">
                    <TabsList class="list">
                        <TabsTrigger value="chat" @click="onHeaderTab('chat')" :disabled="!page.install.status">
                            <ChatBubbleIcon class="icon" />
                            <span>{{$t("header.tab.chat")}}</span>
                        </TabsTrigger>
                        <TabsTrigger value="workflow" @click="onHeaderTab('workflow')" :disabled="!page.install.status">
                            <ShuffleIcon class="icon" />
                            <span>{{$t("header.tab.workflow")}}</span>
                        </TabsTrigger>
                        <TabsTrigger value="agent" @click="onHeaderTab('agent')" :disabled="!page.install.status">
                            <RocketIcon class="icon" />
                            <span>{{$t("header.tab.agent")}}</span>
                        </TabsTrigger>
                        <TabsTrigger value="database" @click="onHeaderTab('database')" :disabled="!page.install.status">
                            <LayersIcon class="icon" />
                            <span>{{$t("header.tab.database")}}</span>
                        </TabsTrigger>
                        <TabsTrigger value="extension" @click="onHeaderTab('extension')" :disabled="!page.install.status">
                            <MixIcon class="icon" />
                            <span>{{$t("header.tab.extension")}}</span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div class="page-tab" v-if="page.header.current === 'browser' && page.install.status">
                <div class="h-9 rounded-lg bg-muted">
                    <div class="header-browser">
                        <div class="browser-item">
                            <Button class="h-7 w-7" variant="outline" size="icon">
                                <ListBulletIcon class="size-4" />
                            </Button>
                        </div>
                        <div class="browser-item">

                        </div>
                        <div class="browser-item">
                            <Button class="h-7 w-7" variant="outline" size="icon">
                                <UpdateIcon class="size-3" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-item">
            <div class="right-item">
                <div class="account-box">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="ghost" class="relative h-8 w-8 rounded-full" :disabled="page.install.button_loading">
                                <Avatar class="h-8 w-8">
                                    <AvatarImage src="https://avatars.githubusercontent.com/u/156150246?v=4" alt="@shadcn" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-56">
                            <DropdownMenuLabel class="font-normal flex">
                                <div class="flex flex-col space-y-1">
                                    <p class="text-sm font-medium leading-none">MakerYang</p>
                                    <p class="text-xs leading-none text-muted-foreground">admin@wileho.com</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <span>{{$t("header.account.menu.profile")}}</span>
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>{{$t("header.account.menu.billing")}}</span>
                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>{{$t("header.account.menu.settings")}}</span>
                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <div class="theme-main">
                                    <div class="theme-main-item p-1">
                                        <span class="flex h-6 w-6 rounded-full" style="background-color: rgb(82, 82, 91);" @click="onTheme('zinc')">
                                            <CheckIcon class="w-6 h-6 text-sm p-1" style="color: #ffffff" v-if="theme === 'zinc'" />
                                        </span>
                                    </div>
                                    <div class="theme-main-item p-1">
                                        <span class="flex h-6 w-6 rounded-full" style="background-color: rgb(225, 29, 72);" @click="onTheme('rose')">
                                            <CheckIcon class="w-6 h-6 text-sm p-1" style="color: #ffffff" v-if="theme === 'rose'" />
                                        </span>
                                    </div>
                                    <div class="theme-main-item p-1">
                                        <span class="flex h-6 w-6 rounded-full" style="background-color: rgb(37, 99, 235);" @click="onTheme('blue')">
                                            <CheckIcon class="w-6 h-6 text-sm p-1" style="color: #ffffff" v-if="theme === 'blue'" />
                                        </span>
                                    </div>
                                    <div class="theme-main-item p-1">
                                        <span class="flex h-6 w-6 rounded-full" style="background-color: rgb(22, 163, 74);" @click="onTheme('green')">
                                            <CheckIcon class="w-6 h-6 text-sm p-1" style="color: #ffffff" v-if="theme === 'green'" />
                                        </span>
                                    </div>
                                    <div class="theme-main-item p-1">
                                        <span class="flex h-6 w-6 rounded-full" style="background-color: rgb(234, 88, 12);" @click="onTheme('orange')">
                                            <CheckIcon class="w-6 h-6 text-sm p-1" style="color: #ffffff" v-if="theme === 'orange'" />
                                        </span>
                                    </div>
                                    <div class="theme-main-item p-1">
                                        <span class="flex h-6 w-6 rounded-full" style="background-color: rgb(109, 40, 217);" @click="onTheme('violet')">
                                            <CheckIcon class="w-6 h-6 text-sm p-1" style="color: #ffffff" v-if="theme === 'violet'" />
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <span>{{$t("header.account.menu.logout")}}</span>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div class="right-item">
                <div class="item" @click="onRightButton('min')">
                    <MinusIcon title="最小化" class="item-icon" />
                </div>
                <div class="item" :title="!base.window.max ? '全屏' : '还原'" @click="onRightButton('size')">
                    <BoxIcon class="item-icon" v-if="!base.window.max" />
                    <RotateCounterClockwiseIcon class="item-icon" v-if="base.window.max" />
                </div>
                <div class="item" title="关闭" @click="onRightButton('close')">
                    <Cross1Icon class="item-icon" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import {ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick, defineEmits} from "vue";
import type {BaseStruct, PageStruct} from "@/package/struct";
import {Button} from "@/package/ui/button";
import {Tabs, TabsList, TabsTrigger} from "@/package/ui/tabs";
import {Avatar, AvatarFallback, AvatarImage} from "@/package/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger} from "@/package/ui/dropdown-menu";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator} from "@/package/ui/command";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/package/ui/dialog";
import {Popover, PopoverContent, PopoverTrigger} from "@/package/ui/popover";
import {Link1Icon, ListBulletIcon, GlobeIcon, UpdateIcon, DesktopIcon, LaptopIcon, CaretSortIcon, CheckIcon, RocketIcon, PlusCircledIcon, ChatBubbleIcon, ShuffleIcon, MixIcon, LayersIcon, Cross1Icon, MinusIcon, BoxIcon, RotateCounterClockwiseIcon} from "@radix-icons/vue";

const emits = defineEmits(["onStartFun"]);
const props: any = defineProps<{
    base: BaseStruct,
    theme: string,
    page: PageStruct
}>();

const open = ref(false);
const showDialog = ref(false);

function onRightButton(data: string){
    props.base.ipc.send("message", {type: "header-right-button", data: data});
}

function onHeaderSelect(child: any){
    if(props.page.header.select.value !== child.value){
        props.page.header.select.value = child.value;
        if(props.page.header.select.value === "browser"){
            props.page.header.current = "browser";
            props.page.install.mode = "browser";
        }else{
            props.page.header.current = "chat";
            props.page.install.mode = "local";
            props.page.install.local.input = props.page.install.local.path;
            if(props.page.header.select.value !== "local"){
                props.page.install.mode = "remote";
                props.page.install.remote.input = props.page.install.remote.path;
            }
        }
        props.page.install.button_loading = true;
        props.page.install.status = false;
        props.page.install.progress.value = 0;
        emits("onStartFun");
    }
}

function onHeaderTab(tab: string){
    props.page.header.current = tab;
}

function onTheme(theme: string){
    if(props.base.tools.theme){
        props.base.tools.theme(theme);
    }
}

onBeforeMount(() => {});

onMounted(() => {
    nextTick(()=>{});
});

onBeforeUnmount(() => {});

onUnmounted(() => {});
</script>

<style scoped>
.page-header{
    width: 100%;
    height: 60px;
    background-color: hsl(var(--card));
    border-bottom: 1px solid hsl(var(--border));
    -webkit-app-region: drag;
}
.page-header .header-item{
    width: calc(100% - 680px);
    height: 60px;
    display: inline-block;
    vertical-align: top;
}
.page-header .header-item:first-child{
    width: 340px;
}
.page-header .header-item:last-child{
    width: 340px;
    text-align: right;
}
.page-header .header-item .left-item{
    width: auto;
    height: 60px;
    display: inline-block;
    vertical-align: top;
    padding: 13px 5px;
}
.page-header .header-item .left-item:first-child{
    padding-left: 10px;
}
.page-header .header-item .left-item .logo{
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 18px;
    font-size: 18px;
    background: hsl(var(--muted)) url("/image/logo.png") no-repeat center center;
    background-size: 60%;
}
.page-header .header-item .left-item .mode-box{
    width: auto;
    -webkit-app-region: no-drag;
}
.page-header .header-item .page-tab{
    width: 100%;
    padding: 13px 0;
    text-align: center;
}
.page-header .header-item .page-tab .tabs .list{
    -webkit-app-region: no-drag;
}
.page-header .header-item .page-tab .tabs .list button{
    font-size: 14px;
}
.page-header .header-item .page-tab .tabs .list button .icon{
    margin-right: 5px;
}
.page-header .header-item .right-item{
    width: auto;
    height: 60px;
    padding: 13px 5px;
    display: inline-block;
    vertical-align: top;
}
.page-header .header-item .right-item .account-box{
    -webkit-app-region: no-drag;
    padding: 3px;
}
.page-header .header-item .right-item .item{
    width: 36px;
    height: 36px;
    line-height: 32px;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    -webkit-app-region: no-drag;
}
.page-header .header-item .right-item .item .item-icon{
    width: 12px;
    display: inline-block;
}
.page-header .header-item .right-item .item:hover{
    background-color: hsl(var(--muted));
}
.page-header .header-item .header-browser{
    width: 100%;
    height: 36px;
    padding: 4px;
    -webkit-app-region: no-drag;
}
.page-header .header-item .header-browser .browser-item{
    width: calc(100% - 56px);
    height: 28px;
    display: inline-block;
    vertical-align: middle;
}
.page-header .header-item .header-browser .browser-item:first-child{
    width: 28px;
}
.page-header .header-item .header-browser .browser-item:last-child{
    width: 28px;
}
.theme-main{
    width: 100%;
}
.theme-main .theme-main-item{
    width: 16.66%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    display: inline-block;
    vertical-align: top;
}
.theme-main .theme-main-item span{
    line-height: 24px;
}
</style>