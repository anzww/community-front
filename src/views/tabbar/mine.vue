<template>
  <div>
    <van-nav-bar title="我的" />
    <header class="mt-2 pd-12">
      <div class="d-flex mt-4">
        <img src="" alt="" />
        <div class="d-flex flex-column j-sa">
          <div class="name">铁憨憨</div>
          <div class="tel">13912341234</div>
        </div>
      </div>
      <div class="money pd-15">
        <div>账户余额</div>
        <div class="d-flex j-sb a-center mt-2">
          <div class="item">
            <div class="count">19800.10</div>
            <div class="item_name">钱包余额</div>
          </div>
          <div class="item">
            <div class="count">19800.10</div>
            <div class="item_name">运费余额</div>
          </div>
          <div class="item">
            <div class="count">1234</div>
            <div class="item_name">卡券中心</div>
          </div>
        </div>
      </div>
    </header>
    <div class="mt-5">
      <div v-for="item in list" :key="item.id" class="mt-2 card pd-15 list_item">
        <div class="title">我的供应商</div>
        <div class="d-flex">
          <div v-for="link in item.linkList" :key="link.id" class="link" @click="linkTo(link.path)">
            <img :src="link.icon" alt="" />
            <div class="mt-2">{{ link.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <Tabbar active="mine" />
  </div>
</template>

<script setup lang="ts">
import Tabbar from "@/components/tabbar.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const list: object[] = [
  {
    title: "我的供应商",
    linkList: [
      { name: "采购订单", path: "/myPurchaseList", icon: "", id: "1-1" },
      {
        name: "采购售后",
        path: "/myPurchaseList/saleList",
        icon: "",
        id: "1-2"
      },
      { name: "我的云仓", path: "/purchaseCloud", icon: "", id: "1-3" }
    ],
    id: 1
  },
  {
    title: "我的经销商",
    linkList: [
      { name: "销售订单", path: "/mySalesList", icon: "", id: "2-1" },
      { name: "销售售后", path: "/saleList", icon: "", id: "2-2" },
      { name: "商品管理", path: "", icon: "", id: "2-4" }
    ],
    id: 2
  }
];
const linkTo = (url: string) => router.push(url);
</script>

<style lang="less" scoped>
header {
  background: @white;
  color: #999;
  height: 190px;
  position: relative;
  img {
    width: 60px;
    height: 60px;
    margin: 0 12px;
  }
  .name {
    font-size: 17px;
    color: #333;
  }
  .tel {
    font-size: 15px;
  }
}
.money {
  background: linear-gradient(82deg, #fd6a7b 0%, #ff556b 100%);
  border-radius: 4px;
  position: absolute;
  bottom: -15px;
  width: 85.5%;
  color: @white;
  font-size: 14px;
  .item {
    text-align: center;
    .count {
      font-size: 18px;
    }
    .item_name {
      font-size: 13px;
    }
  }
}
.list_item {
  .title {
    color: #333;
    font-size: 16px;
    margin-bottom: 24px;
  }
  .link {
    width: 25%;
    text-align: center;
    font-size: 13px;
    color: #555;
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
