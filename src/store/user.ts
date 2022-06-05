import { defineStore } from "pinia";
import { getStore, setStore } from "@/utils/store";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      userInfo:
        getStore({
          name: "userInfo"
        }) || {},
      access_token:
        getStore({
          name: "access_token"
        }) || ""
    };
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
      setStore({
        name: "userInfo",
        content: userInfo,
        type: "session"
      });
    },
    setToken(token: string) {
      this.access_token = token;
      setStore({ name: "access_token", content: token, type: "session" });
    }
  }
});
