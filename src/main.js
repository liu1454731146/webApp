import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/element/index.scss";

import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(ElementPlus);
app.mount("#app");
