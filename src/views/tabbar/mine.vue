<template>
  <div>
    <van-nav-bar title="我的" />
    <header class="mt-2 pd-12">
      <div class="d-flex mt-4">
        <van-uploader v-if="fileList.length" v-model="fileList" max-count="1" :deletable="false" />
        <van-uploader v-else v-model="fileList" :after-read="afterRead" max-count="1" />
        <div class="d-flex flex-column j-sa">
          <div class="name">{{ userInfo.nickname }}</div>
          <div class="tel">{{ userInfo.mobile }}</div>
        </div>
      </div>
      <div class="d-flex mt-5">
        <div class="ml-2"><i style="color: #333333">9</i> 获赞</div>
        <div class="ml-6"><i style="color: #333333">9</i> 粉丝</div>
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
import { useUserStore } from "@/store/user";
import { reactive, toRefs } from "vue";
import { uploadAvatar } from "./api";
interface fileType {
  file: Blob;
  status: string;
  message: string;
  content: string;
}
const user = useUserStore();
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
const state = reactive({ fileList: [] as object[] });
const { userInfo } = user;
if (userInfo.avatar) {
  state.fileList = [{ url: `http://localhost:8000${userInfo.avatar}` }];
}
const linkTo = (url: string) => router.push(url);
const afterRead = async (file: fileType) => {
  const formData = new FormData();
  formData.append("file", file.file);
  const res = await uploadAvatar(formData);
  if (!res.code) {
    state.fileList = [{ url: `http://localhost:8000${res.data.url}` }];
  }
};
const { fileList } = toRefs(state);
</script>

<style lang="less" scoped>
header {
  background: @white;
  color: #999;
  height: 190px;
  img {
    width: 90px;
    height: 90px;
    margin: 0 12px;
  }
  .name {
    font-size: 17px;
    color: #333;
  }
  .tel {
    font-size: 15px;
  }
  i {
    font-size: 18px;
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
