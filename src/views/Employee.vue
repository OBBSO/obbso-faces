<template>
  <v-container>
    <v-card>
      <v-card-text>
        {{ employ }}
      </v-card-text>
      <v-card-text>
        {{ user }}
      </v-card-text>
    </v-card>
    <allowed-sites :modules="userModules"></allowed-sites>
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
  }),
  mounted() {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    axios
      .get("/api/user/" + this.employ, {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
      .then((res) => {
        this.user = res.data;
      });

    axios
      .get("api/modulo", {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        this.userModules = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("api/permiso", {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("api/permiso/2", {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>