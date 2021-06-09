import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: null,
    user: null,
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, data) {
      state.status = "success";
      state.token = data.personId;
      state.user = data;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = null;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.access_token;
            localStorage.setItem("token", token);
            commit("auth_success", resp.data);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => {
      if (state.token) return true;
      return false;
    },
    authStatus: (state) => state.status,
    getUser: (state) => state.user,
  },
});
