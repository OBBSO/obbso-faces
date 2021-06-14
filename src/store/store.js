import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token"),
    user: null,
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, data) {
      state.status = "success";
      state.token = data.access_token;
      state.user = data;
    },
    auth_error(state) {
      state.status = "error";
    },
    auth_user(state, userData) {
      state.token = userData.token;
      // state.userId = userData.userId
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
          url: "public/api/auth/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.access_token;

            localStorage.setItem("token", token);
            localStorage.setItem("type", resp.data.token_type);
            localStorage.setItem("expiresIn", resp.data.expires_in);

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
    async tryAutoLogin({ commit }) {
      return new Promise((resolve) => {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const expirationDate = localStorage.getItem("expiresIn");
        const now = new Date();
        if (now >= expirationDate) {
          return;
        }

        // const userId = localStorage.getItem("userId");
        commit("auth_user", {
          token: token,
          // userId: userId,
        });
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
