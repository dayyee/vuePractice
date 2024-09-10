import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
// vue 전역에 사용하겠다고 선언, 이거 이렇게 따로하기싫으면 index.js만들어서 인터페이스처럼 하고..(모듈화)
// 거기서 다 불러올 수 있게끔 엮는다.

const app = createApp(App);
app.use(vuetify);
app.use(store); // vue 전역에 store 사용한다고 선언
app.mount("#app");
