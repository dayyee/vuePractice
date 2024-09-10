/* eslint-disable no-unused-vars */
import { findAllfileList, uploadFile } from "../api/fileAPI";

const fileStore = {
  state() {
    return {
      filesList: [],
    };
  },
  getters: {
    GE_FILES_LIST: (state) => state.filesList,
  },
  mutations: {
    MU_FILES_LIST: (state, res) => {
      state.filesList = res;
    },
  },
  actions: {
    AC_FILES_LIST: async ({ commit }) => {
      const res = await findAllfileList();
      commit("MU_FILES_LIST", res);
    },
    AC_FILE_UPLOAD: async ({ commit }, payload) => {
      const res = await uploadFile(payload);
      return res;
    },
  },
};

export default fileStore;
