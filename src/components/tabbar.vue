<template>
  <van-tabbar route :value="active" active-color="#b94b4b">
    <van-tabbar-item
      v-for="(item, index) in tabList"
      :key="index"
      replace
      :name="item.name"
      :to="item.link"
      :icon="item.icon"
    >
      {{ item.desc }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  props: {
    active: { type: String, default: "home" }
  },
  data() {
    return {
      tabList: [
        { link: "/", icon: "home-o", name: "home", desc: "首页" },
        { link: "/goods", icon: "cart-o", name: "goods", desc: "商品" },
        { link: "/work", icon: "setting-o", name: "work", desc: "工作台" },
        { link: "/mine", icon: "friends-o", name: "mine", desc: "我的" }
      ]
    };
  }
};
</script>

<style></style>
