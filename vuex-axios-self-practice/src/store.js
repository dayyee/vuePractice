import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    btn: 0,
  },
  getters: {
    btnGet: (state) => {
      return state.btn;
    },
  },
  mutations: {
    btnUpdate: (state) => {
      state.btn++;
    },
  },
  actions: {
    btnUpdate: ({ commit }) => {
      commit("btnUpdate");
    },
  },
});
