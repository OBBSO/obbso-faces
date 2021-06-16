import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/store.js";
import axios from "axios";

Vue.config.productionTip = false;

// axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.baseURL = "https://obbso-backend.herokuapp.com/";
const createAxiosResponseInterceptor = () => {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Reject promise if usual error
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      axios.interceptors.response.eject(interceptor);
      const token = localStorage.getItem("token");
      const type = localStorage.getItem("type");

      return axios
        .post(
          "/api/auth/refresh",
          {},
          {
            headers: {
              Authorization: `${type} ${token}`,
            },
          }
        )
        .then((response) => {
          // saveToken();
          console.log(response, "token refreshed");
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("type", response.data.token_type);
          localStorage.setItem("expiresIn", response.data.expires_in);

          error.response.config.headers["Authorization"] =
            response.data.access_token + " " + response.data.access_token;
          return axios(error.response.config);
        })
        .catch((error) => {
          localStorage.removeItem("token");
          localStorage.removeItem("type");
          localStorage.removeItem("expiresIn");
          this.router.push("/login");
          return Promise.reject(error);
        })
        .finally(createAxiosResponseInterceptor);
    }
  );
};
new Vue({
  vuetify,
  router,
  store,
  methods: {
    createAxiosResponseInterceptor,
  },
  render: (h) => h(App),
}).$mount("#app");
