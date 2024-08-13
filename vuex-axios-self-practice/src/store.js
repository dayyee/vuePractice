import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    btn: 0,
    datas: [],
    research: [],
  },
  getters: {
    btnGet: (state) => {
      return state.btn;
    },
    datas: (state) => {
      return state.datas;
    },
    research: (state) => {
      return state.research;
    },
  },
  mutations: {
    btnUpdate: (state) => {
      state.btn++;
    },
    getData: (state) =>
      axios.get(`https://codingapple1.github.io/vue/more0.json`).then((res) => {
        const result = res.data;
        state.datas.push(result);
      }),
    postData: (state, payload) => {
      axios
        .post(`https://codingapple1.github.io/vue/more0.json`, {
          name: payload.name,
        })
        // CORS 문제로 안넘어감..ㅎ
        .then((res) => {
          state.research.push(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  actions: {
    btnUpdate: ({ commit }) => {
      commit("btnUpdate");
    },
    getData: ({ commit }) => {
      commit("getData");
    },
    postData: ({ commit }, payload) => {
      commit("postData", payload);
    },
  },
});
