// axios基础的封装
import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/users";
import router from "@/router/index";
const httpInstance = axios.create({
  //  1接口基地址
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  // 2接口超时时间
  timeout: 5000,
});
// 3添加请求拦截器
httpInstance.interceptors.request.use(
  function (config) {
    const pinia = useUserStore();
    // 1 从pinia中获取token数据
    const token = pinia.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 2 按照后端的要求拼接token

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 4添加响应拦截器
httpInstance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 统一错误提示
    ElMessage({
      type: "warning",
      message: error.response.data.message,
    });

    //
    if (error.response.status === 401) {
      console.log("啊啊啊");
      const useStore = useUserStore();
      useStore.clearUserInfo();
      router.push("/login");
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default httpInstance;
