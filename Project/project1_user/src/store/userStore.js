import { createStore } from "vuex";
import { findAllUsers, findUserById } from "../api/userAPI";

// vuex세팅
const userStore = createStore({
  state() {
    return {
      usersObj: {}, // list로 받으면 안됨. [[]] 두개가 생성되어서 안된다.
      userObjById: {},
    };
  },
  getters: {
    // 만약 state를 쓰지 않는다면, 상태변화에 의존하지 않는 값만을 반환(고정값)
    // 상태 변화가 없다면 이걸 쓸 필요가 없음.
    // state, getters, mutations, actions는 결국 상태 변화를 위해 사용하는 것이기에.
    GE_USERS_OBJ: (state) => state.usersObj,
    GE_USER_OBJ_BY_ID: (state) => state.userObjById,
  },
  mutations: {
    MU_USERS_OBJ: async (state, res) => {
      // list라면, .push(res) 지만
      // object라 그냥 바로 바꿔치기 가능~
      state.usersObj = res;
    },
    MU_USER_OBJ_BY_ID: (state, res) => {
      state.userObjById = res;
    },
  },
  actions: {
    AC_USERS_OBJ: async ({ commit }) => {
      const res = await findAllUsers();
      commit("MU_USERS_OBJ", res);
    },
    AC_USER_OBJ_BY_ID: async ({ commit }, id) => {
      const res = await findUserById(id);
      commit("MU_USER_OBJ_BY_ID", res);
    },
  },
});

export default userStore;
