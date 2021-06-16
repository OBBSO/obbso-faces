import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/store.js";
import axios from "axios";

Vue.config.productionTip = false;

// axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.baseURL = "https://obbso-backend.herokuapp.com/";

let isRefreshing = false;
let subscribers = [];

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    const {
      config,
      response: { status, data },
    } = err;

    const originalRequest = config;

    if (data.message === "Missing token") {
      router.push({ name: "login" });
      return Promise.reject(false);
    }

    if (originalRequest.url.includes("login_check")) {
      return Promise.reject(err);
    }

    if (status === 401 
      // && data.message === "Expired token"
      ) {
      if (!isRefreshing) {
        isRefreshing = true;
        store
          .dispatch("refresToken")
          .then(({ status }) => {
            if (status === 200 || status == 204) {
              isRefreshing = false;
            }
            subscribers = [];
          })
          .catch((error) => {
            console.error(error);
          });
      }

      const requestSubscribers = new Promise((resolve) => {
        subscribeTokenRefresh(() => {
          resolve(axios(originalRequest));
        });
      });

      onRefreshed();

      return requestSubscribers;
    }
  }
);

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRefreshed() {
  subscribers.map((cb) => cb());
}

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
