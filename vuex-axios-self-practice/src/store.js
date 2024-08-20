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

// export function dialogBox({vue, type, title, message, callback}){
//   var n = null
//   if(vue){
//     n=vue
//   } else {
//     n= new Vue()
//   }
//   const vm = n.$root
//   if ( type === 'alert'){
//     return vm.$alert(message, '알림', {
//       dangerouslyUseHTMLString: true,
//       confirmButtonText : '확인',
//       center: true
//     })
//   } else if (type==='confirm'){
//     return vm.$confirm(message, '알림' {
//       dangerouslyUseHTMLString: true,
//       confirmButtonText : '확인',
//       cancleButtonText : '취소',
//       center: true
//     })
//   }
// }
