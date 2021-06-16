<template>
  <v-app id="inspire">
    <div v-if="$store.getters.isLoggedIn">
      <!-- Navigation Bar -->
      <nav-bar> </nav-bar>
      <!-- Navigation drawer -->
      <!-- <nav-draw></nav-draw> -->
    </div>
    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "./components/NavBar/NavBar.vue";
// import NavDraw from "./components/NavDraw.vue";
export default {
  components: {
    NavBar,
    // NavDraw,
  },
  data: () => ({}),
  beforeCreate() {
    // await this.$store.dispatch("tryAutoLogin");
    // console.log(this.$store.getters.isLoggedIn + "");
  },
  computed: { ...mapState(["user"]) },
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
