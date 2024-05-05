<script setup>
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";

// 触发获取导航列表数据的action
import { useCategoryStory } from "../../stores/category";
import { onMounted } from "vue";

const categoryStory = useCategoryStory();
onMounted(() => {
  categoryStory.getCategory();
});
</script>

<template>
  <LayoutFixed></LayoutFixed>
  <LayoutNav />
  <LayoutHeader />

  <RouterView />
  <LayoutFooter />
</template>

<style scoped></style>
