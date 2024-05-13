// 把components中所有组件都进行全局注册
// 通过插件的方式

import { install } from "element-plus";
import ImageView from "./ImageView/index.vue";
import Sku from "./XtxSku/index.vue";

export const componentPlugin = {
  install(app) {
    app.component("XtxImageView", ImageView);
    app.component("XtxSku", Sku);
  },
};
