import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/store.js";
import axios from "axios";

Vue.config.productionTip = false;

// axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.baseURL = "https://obbso-backend.herokuapp.com/api";

// const interceptor =
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("Interceptor running");
    console.log(error);
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    // axios.interceptors.response.eject(interceptor);
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    if (token && type) {
      store.dispatch("logout");
      router.replace("/login/error");
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
