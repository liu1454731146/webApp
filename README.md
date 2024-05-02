# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur


## 父传子
父组件直接在组件标签上message:'你是小猪'，子组件用const props = defineProps({message:String})接收
## 子传父
1.父组件直接在组件标签自定义事件@get-message='getMessage',getMessage函数会默认参数接收数据。
子组件通过const emit = defineEmits(['get-message'])绑定父组件的自定义事件，并通过
emit('get-message','你是小猪')传递数据
2.ref可绑定dom实例。引入ref并创建const refh1 = ref(null) 然后将refh1写进标签ref='refh1'
此时挂载后refh1是该标签的实例（组件标签也可以）。但是如果需要获取子组件具体数据，需要子组件
通过defineExpose({'你是小猪'})暴露

##  跨层传数据顶层传数据给底层
顶层组件通过provite('key',数据)，底层组件通过const 数据 = inject('key') 接收数据

##  pinia
/store/Count.js
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
const API_URL = "http://geek.itheima.net/v1_0/channels";
export const useStoreCount = defineStore("count", () => {
  //数据store
  const count = ref(0);

  // 修改数据的方法action（同步）
  const increment = () => {
    count.value++;
  };

  //调用异步action  (异步)
  const list = ref([]);
  // 通常由组件调用getList()
  const getList = async () => {
    const res = await axios.get(API_URL);
    list.value = res.data.data.channels;
  };

  // getter 定义直接用计算属性
  const doubleCount = computed(() => {
    count.value * 2;
  });

  //以对象的形式返回
  return { count, increment, doubleCount, list, getList };
});
/List.vue
<template>
  <div>
    <h1>我是list组件</h1>
    <h2>{{ count }}</h2>
    <button @click="increment">点击+1</button>
  </div>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStoreCount } from "../store/Count";
import { storeToRefs } from "pinia";
const m = useStoreCount();
// 如果不想写item.name，可以将m结构赋值，但是必须加上storeToRefs，否则会丢失响应式
//函数不需要保证响应式使用正常的解构赋值
const { count, list } = storeToRefs(m);
const { getList, increment } = m;
onMounted(() => {
  getList();
});
</script>
