import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/css/reset.css";
import "element-plus/theme-chalk/el-message.css";
// import "element-plus/theme-chalk/el-message-box.css";
// import "element-plus/theme-chalk/el-notification.css";
// import "element-plus/theme-chalk/el-loading.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
