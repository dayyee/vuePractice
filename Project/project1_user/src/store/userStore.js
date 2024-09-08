/* eslint-disable no-unused-vars */
import { createStore } from "vuex";
import {
  findAllUsers,
  findUserById,
  updateUserById,
  findSubjectById,
  removeUserById,
} from "../api/userAPI";

// vuex세팅
const userStore = createStore({
  state() {
    return {
      usersObj: {}, // list로 받으면 안됨. [[]] 두개가 생성되어서 안된다.
      userObjById: {},
      subjectObjById: {},
    };
  },
  getters: {
    // 만약 state를 쓰지 않는다면, 상태변화에 의존하지 않는 값만을 반환(고정값)
    // 상태 변화가 없다면 이걸 쓸 필요가 없음.
    // state, getters, mutations, actions는 결국 상태 변화를 위해 사용하는 것이기에.
    GE_USERS_OBJ: (state) => state.usersObj,
    GE_USER_OBJ_BY_ID: (state) => state.userObjById,
    GE_SUBJECT_OBJ_BY_ID: (state) => state.subjectObjById,
  },
  mutations: {
    MU_USERS_OBJ: (state, res) => {
      // list라면, .push(res) 지만
      // object라 그냥 바로 바꿔치기 가능~
      state.usersObj = res;
    },
    MU_USER_OBJ_BY_ID: (state, res) => {
      state.userObjById = res;
    },
    MU_SUBJECT_OBJ_BY_ID: (state, res) => {
      state.subjectObjById = res;
    },
  },
  actions: {
    AC_USERS_OBJ: async ({ commit }) => {
      const res = await findAllUsers();
      commit("MU_USERS_OBJ", res);
    },
    AC_USER_OBJ_BY_ID: async ({ commit }, id) => {
      try {
        const res = await findUserById(id);
        commit("MU_USER_OBJ_BY_ID", res);
      } catch (err) {
        console.error("findUserById", err);
      }
    },

    AC_UPDATE_USER_BY_ID: async ({ commit }, formData) => {
      try {
        const res = await updateUserById(formData);
        return res;
      } catch (err) {
        console.error("updateUserById", err);
      }
    },

    // delete User
    AC_REMOVE_USER_BY_ID: async ({ commit }, id) => {
      try {
        const res = await removeUserById(id);
        return res;
      } catch (err) {
        console.error("removeUserById", err);
      }
    },

    // subject
    AC_SUBJECT_OBJ_BY_ID: async ({ commit }, id) => {
      try {
        const res = await findSubjectById(id);
        commit("MU_SUBJECT_OBJ_BY_ID", res);
      } catch (err) {
        console.error("findSubjectById", err);
      }
    },
  },
});

export default userStore;
