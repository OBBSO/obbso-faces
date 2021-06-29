<template>
  <v-container>
    <v-card>
      <v-card-text>
        {{ user }}
      </v-card-text>
    </v-card>
    <br />

    <allowed-sites :employ="employ" :allows="userAllows"></allowed-sites>
  </v-container>
</template>

<script>
import axios from "axios";
import AllowedSites from "../components/AllowedSites.vue";
export default {
  components: { AllowedSites },
  props: {
    employ: {
      type: String,
      default: "-1",
    },
  },
  data: () => ({
    user: {},
    userModules: [],
    userAllows: [],
    userRoles: [],
    roles: [],
    loading: false,
  }),
  mounted() {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    // axios
    //   .get("/api/usuario/" + this.employ, {
    //     headers: {
    //       Authorization: `${type} ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     this.user = res.data;
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     this.loading = false;
    //   });
    // .finally(() => {
    //   this.loading = false;
    // });
    axios
      .get("auth/permisos", {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
      .then((resp) => {
        // const r = resp.data;
        console.log(resp);
        // this.userAllows = r;
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  },
};
</script>

<style>
</style>