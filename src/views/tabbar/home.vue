<template>
  <van-nav-bar title="首页" />
  首页
  <br />
  {{ msg }}
  <Tabbar active="home" />
</template>

<script setup lang="ts">
// @ is an alias to /src
import Tabbar from "@/components/tabbar.vue";
import { reactive, toRefs } from "vue";
const state = reactive({ data: {}, msg: "" });
const initData = async (): Promise<void> => {
  state.msg = "123";
};
initData();

const { msg } = toRefs(state);
</script>

<style lang="less" scoped></style>
