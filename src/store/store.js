import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token"),
    type: localStorage.getItem("type"),
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
          url: "/api/auth/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            console.log(resp);
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
        const token = localStorage.getItem("token");
        const type = localStorage.getItem("type");
        axios
          .post(
            "/api/auth/logout",
            {},
            {
              headers: {
                Authorization: `${type} ${token}`,
              },
            }
          )
          .then()
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("type");
            localStorage.removeItem("expiresIn");
            commit("logout");
            resolve();
          });
      });
    },
    tryAutoLogin({ commit }) {
      return new Promise((resolve) => {
        const token = localStorage.getItem("token");
        const type = localStorage.getItem("type");

        if (!token) {
          return;
        }
        // const expirationDate = localStorage.getItem("expiresIn");
        // const now = new Date();
        // if (now >= expirationDate) {
        //   return;
        // }

        axios
          .post(
            "/api/auth/refresh",
            {},
            {
              headers: {
                Authorization: `${type} ${token}`,
              },
            }
          )
          .then((resp) => {
            console.log(resp, "token refreshed");
            localStorage.setItem("token", resp.data.access_token);
            localStorage.setItem("type", resp.data.token_type);
            localStorage.setItem("expiresIn", resp.data.expires_in);
            commit("auth_success", resp.data);
            resolve();
          });
        // const userId = localStorage.getItem("userId");
      });
    },
    register({ commit }, data) {
      const token = localStorage.getItem("token");
      const type = localStorage.getItem("type");
      return new Promise((resolve, reject) => {
        axios
          .post("/api/auth/register", data, {
            headers: {
              Authorization: `${type} ${token}`,
            },
          })
          .then(() => {
            commit("success");
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
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
