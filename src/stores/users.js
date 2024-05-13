// 管理用户相关
import { loginAPI } from "@/apis/users";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    // 定义管理用户的state
    // 定义获取接口数据的action函数
    //  以对象的形式把state和action  return出去
    const userInfo = ref({});
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
    };

    // 退出时清楚用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
    };

    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
