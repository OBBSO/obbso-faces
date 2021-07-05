<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <div v-if="$store.getters.isLoggedIn">
      <!-- Navigation Bar -->
      <nav-bar :modules="modules"> </nav-bar>
    </div>
    <v-main>
      <v-slide-y-transition mode="out-in">
        <!-- Router View -->
        <router-view></router-view>
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "./components/NavBar/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data: () => ({
    loading: false,
  }),
  beforeCreate() {
    // await this.$store.dispatch("tryAutoLogin");
    // console.log(this.$store.getters.isLoggedIn + "");
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$store.dispatch("updateNavBar");
      this.$store.dispatch("getUserInfo");
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    ...mapState(["modules"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
