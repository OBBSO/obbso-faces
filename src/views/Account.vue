<template>
  <v-container>
    <v-card :loading="loading">
      <v-card-title></v-card-title>
      <v-card-text>{{ user }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    user: {},
    loading: false,
  }),
  mounted() {
    this.loading = true;
    axios
      .get("/auth/profile", {
        headers: {
          Authorization: `${this.type} ${this.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.user = res.data;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  computed: { ...mapState(["token", "type"]) },
};
</script>

<style>
</style>