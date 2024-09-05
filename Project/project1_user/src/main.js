import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import userStore from "./store/userStore.js";
// vue 전역에 사용하겠다고 선언, 이거 이렇게 따로하기싫으면 index.js만들어서 한번에..

const app = createApp(App);
app.use(vuetify);
app.use(userStore); // vue 전역에 store 사용한다고 선언
app.mount("#app");
