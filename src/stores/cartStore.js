//  封装购物车模块

import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    const addCart = (goods) => {
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        // 商品已存在 只需要 count +1
        item.count++;
      } else {
        //  商品不存在  需要添加
        cartList.value.push(goods);
      }
    };

    return {
      cartList,
      addCart,
    };
  },
  {
    persist: true,
  }
);
