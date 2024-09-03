import { createStore } from "vuex";
import { findAllUsers } from "../api/userAPI";

// vuex세팅
const userStore = createStore({
  state() {
    return {
      usersObj: {}, // list로 받으면 안됨. [[]] 두개가 생성되어서 안된다.
    };
  },
  getters: {
    // 만약 state를 쓰지 않는다면, 상태변화에 의존하지 않는 값만을 반환(고정값)
    // 상태 변화가 없다면 이걸 쓸 필요가 없음.
    // state, getters, mutations, actions는 결국 상태 변화를 위해 사용하는 것이기에.
    GE_USERS_OBJ: (state) => state.usersObj,
  },
  mutations: {
    MU_USERS_OBJ: async (state, res) => {
      // list라면, .push(res) 지만
      // object라 그냥 바로 바꿔치기 가능~
      state.usersObj = res;
    },
  },
  actions: {
    AC_USERS_OBJ: async ({ commit }) => {
      const result = await findAllUsers();
      commit("MU_USERS_OBJ", result);
    },
  },
});

export default userStore;
