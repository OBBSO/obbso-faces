import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      if (store.getters.isLoggedIn) {
        next();
        return;
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    beforeEnter(to, from, next) {
      if (!store.getters.isLoggedIn) {
        next();
        return;
      }
      next("/");
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    // beforeEnter(to, from, next) {
    //   if (store.state.user) {
    //     next();
    //   } else {
    //     next("/login");
    //   }
    // },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  saveScrollPosition: true,
});

export default router;
