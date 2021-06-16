import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/store.js";
import axios from "axios";

Vue.config.productionTip = false;

// axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.baseURL = "https://obbso-backend.herokuapp.com/";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url.includes("auth/jwt/refresh/")
    ) {
      // store.commit("clearUserData");
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("expiresIn");
      router.push("/login");
      return Promise.reject(error);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await store.dispatch("refreshToken");
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
