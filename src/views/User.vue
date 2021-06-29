<template>
  <v-container>
    <v-card>
      <v-card-text>
        {{ user }}
      </v-card-text>
    </v-card>
    <br />

    <allowed-sites
      :loading="loadingModules"
      :employ="user"
      :allows="userAllows"
      @updateValues="saveAllows($event)"
    ></allowed-sites>
  </v-container>
</template>

<script>
import axios from "axios";
import AllowedSites from "../components/AllowedSites.vue";
export default {
  components: { AllowedSites },
  props: {
    user: {
      type: String,
      default: "-1",
    },
  },
  data: () => ({
    user: {},
    userAllows: [],
    loading: false,
    loadingModules: false,
  }),
  mounted() {
    this.loadingModules = true;
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
      .get("permisos/" + this.user, {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
      .then((resp) => {
        const r = resp.data;
        console.log(resp);
        this.userAllows = r;
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      })
      .finally(() => {
        this.loadingModules = false;
      });
  },
  methods: {
    saveAllows(data) {
      console.log(data);
      const token = localStorage.getItem("token");
      const type = localStorage.getItem("type");
      const config = {
        headers: {
          Authorization: `${type} ${token}`,
        },
      };
      axios.put("permisos/" + this.user, data, config).then((response) => {
        console.log(response);
        this.$router.push({ name: "Users" });
      });
    },
  },
};
</script>

<style>
</style>