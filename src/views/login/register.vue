<template>
  <van-nav-bar title="注册" left-arrow @click-left="router.back()" />
  <van-form class="mt-3" label-width="100" @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="queryObj.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="queryObj.mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="queryObj.email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
        v-model="queryObj.nickname"
        name="nickname"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="queryObj.password"
        name="password"
        label="密码"
        placeholder="密码"
        type="password"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="queryObj.rePassword"
        name="rePassword"
        label="确认密码"
        placeholder="确认密码"
        type="password"
        :rules="[{ required: true, message: '请再次填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"> 提交 </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Toast } from "vant";
import { register } from "@/request/api/login";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";

const router = useRouter();
const user_store = useUserStore();
const queryObj = ref({
  username: "",
  mobile: "",
  email: "",
  nickname: "",
  password: "",
  rePassword: ""
});
const onSubmit = async () => {
  const { password, rePassword } = queryObj.value;
  if (password !== rePassword) {
    Toast.fail("密码不一致");
    return;
  }
  const res = await register(queryObj.value);
  if (!res.code) {
    user_store.setUserInfo(res.data);
    await router.push("/");
  } else {
    Toast.fail(res.msg);
  }
};
</script>
