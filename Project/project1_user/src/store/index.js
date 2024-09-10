import { createStore } from "vuex";
import userStore from "./userStore";
import fileStore from "./fileStore";

const store = createStore({
  modules: {
    userStore,
    fileStore,
  },
});

export default store;
