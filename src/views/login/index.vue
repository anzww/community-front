<template>
  <van-nav-bar title="登录" />
  <van-form class="mt-3" label-width="100" @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="queryObj.username"
        name="username"
        label="用户名/手机号"
        placeholder="用户名/手机号"
        :rules="[{ required: true, message: '请填写用户名或手机号' }]"
      >
      </van-field>
      <van-field
        v-model="queryObj.password"
        name="password"
        label="密码"
        placeholder="密码"
        type="password"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"> 提交 </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
import { Toast } from "vant";
import { userLogin } from "@/request/api/login";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";

interface queryObjType {
  username: string;
  password: string;
}

const router = useRouter();
const user_store = useUserStore();
const queryObj: Ref<queryObjType> = ref({ username: "", password: "" });
const onSubmit = async () => {
  const res = await userLogin(queryObj.value);
  if (!res.code) {
    user_store.setUserInfo(res.data.userInfo);
    user_store.setToken(res.data.token);
    await router.push("/");
  } else {
    Toast.fail(res.msg);
  }
};
</script>
