// 저장소
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //data
    allUsers: [
      {
        userId: "hoza123",
        password: "123",
        name: "Hoza",
        address: "Seoul",
        src: "https://goo.gl/oqLfJR",
      },
      {
        userId: "max123",
        password: "456",
        name: "Max",
        address: "Berlin",
        src: "https://goo.gl/Ksk9B9",
      },
      {
        userId: "lego123",
        password: "789",
        name: "Lego",
        address: "Busan",
        src: "https://goo.gl/x7SpCD",
      },
    ],
  },

  getters: {
    // computed
    // 값 저장해둔.. computed와 다른점은 함수가 뒤에 들어가고. this.data 값 썼었는데, getters에는 function안에는 대분류를 넣어줘야함.
    allUsersCount: (state) => {
      return state.allUsers.length;
    },
    countOfSeoul: (state) => {
      let count = 0;
      //forEach는 앞의 array의 요소(여기선 객체)를 다 돌아가면서 보여주는
      state.allUsers.forEach((user) => {
        if (user.address == "Seoul") count++;
      });
      return count;
    },
    // 두번재 인자로 getters를 받기에 state를 꼭 써야함.
    percentOfSeoul: (state, getters) => {
      return Math.round((getters.countOfSeoul / getters.allUsersCount) * 100);
    },
  },
  //  즉 state를 변화시키는건 mutations에 넣고,
  // mutations을 동작시키는 비지니스 로직은 actions에..
  // 예시>> ✨ 회원가입이라고 치면 mutations는 state를 변화시키는 최종 기능이고
  // =>        이거 딱 한줄 (commit('mutations이름'),payload)
  // actions는 회원가입시 비밀번호 수 제한, id 형식 등 확인하는 로직이 들어가는것.
  mutations: {
    // state를 변화시키는 변화기.
    // mutations은 동기로 업데이트한다는 문제.
    // 그래서 비동기 로직은 actions에서 사용해야함.
    // payload는 가져온 값을 넘겨주는 역할
    addUsers: (state, payload) => {
      state.allUsers.push(payload);
    },
  },
  actions: {
    /*     addUsers: (context) => {
      context.commit("addUsers"); // mutations의 addUsers를 commit 할게.
    }, */
    //==function({commit})
    addUsers: ({ commit }, payload) => {
      // context, payload -> context를 생략하기 위해.. 아래처럼 쓴거야.
      // {commit}, payload
      commit("addUsers", payload);
    },
  },
});
