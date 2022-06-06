import { createApp } from "vue";
// 1.1 安装后 导入
import router from "./router";
import store from "./store";
import App from "@/App.vue";
import "./styles/common.less";
import {
  Button,
  Form,
  CellGroup,
  Field,
  NavBar,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Uploader
} from "vant";

const app = createApp(App);
// 1.2. use挂载
app.use(Button);
app.use(Form);
app.use(CellGroup);
app.use(Field);
app.use(NavBar);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Tab);
app.use(Tabs);
app.use(Uploader);

app.use(router);
app.use(store);
app.mount("#app");
