import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token"),
    type: localStorage.getItem("type"),
    user: localStorage.getItem("user"),
    modules: null,
    info: {
      imagen: null,
      nombres: "",
    },
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, data) {
      state.status = "success";
      state.token = data.access_token;
      state.type = data.token_type;
      state.user = data.user.id_user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.type = null;
      state.token = null;
      state.user = null;
    },
    modules(state, data) {
      state.modules = data;
    },
    user_info(state, data) {
      state.info = data;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "/auth/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            console.log(resp);
            localStorage.setItem("token", resp.data.access_token);
            localStorage.setItem("type", resp.data.token_type);
            localStorage.setItem("expiresIn", resp.data.expires_in);
            localStorage.setItem("user", resp.data.user.id_user);
            commit("auth_success", resp.data);
            this.dispatch("updateNavBar");
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            localStorage.removeItem("type");
            localStorage.removeItem("expiresIn");
            reject(err);
          });
      });
    },

    invalidateToken({ commit }) {
      return new Promise((resolve) => {
        const token = localStorage.getItem("token");
        const type = localStorage.getItem("type");
        axios
          .post(
            "/auth/logout",
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
            localStorage.removeItem("user");
            commit("logout");
            resolve();
          });
      });
    },

    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("user");
      commit("logout");
    },

    async refreshToken() {
      const token = localStorage.getItem("token");
      const type = localStorage.getItem("type");

      if (!token) {
        console.log("No token");
        return;
      }
      // const expirationDate = localStorage.getItem("expiresIn");
      const now = new Date();
      console.log(now);
      // if (now >= expirationDate) {
      //   return;
      // }

      await axios
        .post(
          "/auth/refresh",
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
          return resp;
          // resolve(resp);
        })
        .catch((err) => {
          console.log(err.response);
          return;
        });
      // const userId = localStorage.getItem("userId");
      // });
    },

    registerUser({ commit }, data) {
      const token = localStorage.getItem("token");
      const type = localStorage.getItem("type");
      console.log(commit);
      return new Promise((resolve, reject) => {
        axios
          .post("/user", data, {
            headers: {
              Authorization: `${type} ${token}`,
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async updateNavBar({ commit, state }) {
      // console.log(commit);
      // console.log(state);
      await axios
        .get("/permisos/" + state.user, {
          headers: {
            Authorization: `${state.type} ${state.token}`,
          },
        })
        .then((res) => {
          console.log(res);
          commit("modules", res.data);
        });
      // .catch((err) => {
      //   reject(err);
      // });
    },

    getUserInfo({ commit, state }) {
      axios
        .get("/usuarios/" + state.user, {
          headers: {
            Authorization: `${state.type} ${state.token}`,
          },
        })
        .then((res) => {
          console.log(res);
          commit("user_info", res.data);
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
    getModules: (state) => state.modules,
  },
});
