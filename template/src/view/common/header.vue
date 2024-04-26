<template>
    <main class="page-header">
        <div class="header-item">
            <div class="left-item">
                <div class="logo">🐣</div>
            </div>
            <div class="left-item">
                <div class="mode-box">
                    <Dialog v-model:open="showDialog">
                        <Popover v-model:open="open">
                            <PopoverTrigger as-child>
                                <Button variant="outline" role="combobox" aria-expanded="true" aria-label="Select a team">
                                    <Avatar class="mr-2 h-5 w-5">
                                        <AvatarImage src="https://avatar.vercel.sh/acme-inc.png" alt="1212" />
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                    <span>Monsters Inc.</span>
                                    <CaretSortIcon class="ml-auto h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-[200px] p-0">
                                <Command>
                                    <CommandList>
                                        <CommandInput placeholder="Search team..." />
                                        <CommandEmpty>No team found.</CommandEmpty>
                                        <CommandGroup heading="aaaa">
                                            <CommandItem value="1">
                                                <Avatar class="mr-2 h-5 w-5">
                                                    <AvatarImage src="https://avatar.vercel.sh/acme-inc.png" alt="1212" />
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <span>12121212</span>
                                                <CheckIcon class="ml-auto h-4 w-4"></CheckIcon>
                                            </CommandItem>
                                        </CommandGroup>
                                        <CommandGroup heading="bbbb">
                                            <CommandItem value="1">
                                                <Avatar class="mr-2 h-5 w-5">
                                                    <AvatarImage src="https://avatar.vercel.sh/acme-inc.png" alt="1212" />
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <span>23232</span>
                                                <CheckIcon class="ml-auto h-4 w-4"></CheckIcon>
                                            </CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                    <CommandSeparator />
                                    <CommandList>
                                        <CommandGroup>
                                            <DialogTrigger as-child>
                                                <CommandItem value="create-team" @select="()=>{open = false; showDialog = true;}">
                                                    <PlusCircledIcon class="mr-2 h-5 w-5" />
                                                    <span> Create Team</span>
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
            <div class="page-tab">
                <Tabs class="tabs" default-value="chat">
                    <TabsList class="list">
                        <TabsTrigger value="chat" @click="onTab('chat')">
                            <ChatBubbleIcon class="icon" />
                            <span>{{$t("header.tab.chat")}}</span>
                        </TabsTrigger>
                        <TabsTrigger value="workflow">
                            <ShuffleIcon class="icon" />
                            <span>{{$t("header.tab.workflow")}}</span>
                        </TabsTrigger>
                        <TabsTrigger value="agent">
                            <MixIcon class="icon" />
                            <span>{{$t("header.tab.agent")}}</span>
                        </TabsTrigger>
                        <TabsTrigger value="database">
                            <LayersIcon class="icon" />
                            <span>{{$t("header.tab.database")}}</span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
        <div class="header-item">
            <div class="right-item">
                <div class="account-box">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="ghost" class="relative h-8 w-8 rounded-full">
                                <Avatar class="h-8 w-8">
                                    <AvatarImage src="https://avatars.githubusercontent.com/u/156150246?v=4" alt="@shadcn" />
                                    <AvatarFallback>SC</AvatarFallback>
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
                                    <span>Profile</span>
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Settings</span>
                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>New Team</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <span>Log out</span>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div class="right-item">
                <div class="item">
                    <MinusIcon class="item-icon" />
                </div>
                <div class="item">
                    <BoxIcon class="item-icon" />
                </div>
                <div class="item">
                    <Cross1Icon class="item-icon" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import {ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick} from "vue";
import {cn} from "@/package/utils";
import {Button} from "../../package/ui/button";
import {Tabs, TabsList, TabsTrigger} from "../../package/ui/tabs";
import {Avatar, AvatarFallback, AvatarImage} from "../../package/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger} from "../../package/ui/dropdown-menu";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator} from "../../package/ui/command";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../../package/ui/dialog";
import {Popover, PopoverContent, PopoverTrigger} from "../../package/ui/popover";
import {CaretSortIcon, CheckIcon, PlusCircledIcon, ChatBubbleIcon, ShuffleIcon, MixIcon, LayersIcon, Cross1Icon, MinusIcon, BoxIcon} from "@radix-icons/vue";

const open = ref(false);
const showDialog = ref(false);

function onTab(tab: string){
    console.log(tab);
}

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
    text-align: right;
}
.page-header .header-item .left-item{
    width: auto;
    height: 50px;
    display: inline-block;
    vertical-align: top;
    padding: 7px 5px;
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
    background-color: hsl(var(--muted));
}
.page-header .header-item .left-item .mode-box{
    width: auto;
    -webkit-app-region: no-drag;
}
.page-header .header-item .page-tab{
    width: 100%;
    padding: 7px;
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
.page-header .header-item .page-tab .tabs .list button span{
    font-size: 13px;
}
.page-header .header-item .right-item{
    width: auto;
    height: 50px;
    padding: 7px 5px;
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
</style>