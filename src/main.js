import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/element/index.scss";
import { createPinia } from "pinia";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// 引入初始化样式文件
import "./styles/common.scss";
import "@/styles/var.scss";

// 引入懒加载指令插件并注册
import { lazyPlugin } from "@/directives/index";

// 引入 全局组件插件
import { componentPlugin } from "@/components/index";

// import { getCategory } from "./apis/testApi";
// getCategory().then((res) => {
//   console.log(res);
// });

const pinia = createPinia();
// 注册持久化插件
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.use(lazyPlugin);
app.use(componentPlugin);
app.mount("#app");

// 定义全局指令
