import {createApp} from "vue";
import App from "./app.vue";
import {router} from "./router";
import Lang from "./package/lang";
import "./assets/css/globals.css";
import "./assets/css/themes.css";

const app = createApp(App);

app.use(router);

app.use(Lang);

app.mount("#app");
