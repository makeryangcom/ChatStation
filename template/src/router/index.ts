import { createRouter, createWebHashHistory } from "vue-router";
import Page from "../pages/page.vue";

const routes = [
    {
        path: "/",
        name: "Page",
        component: Page
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})