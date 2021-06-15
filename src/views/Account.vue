<template>
  <v-container>
    <v-card>
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
  }),
  mounted() {
    axios
      .get("api/auth/profile", {
        headers: {
          Authorization: `${this.type} ${this.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.user = res.data;
      });
  },
  computed: { ...mapState(["token", "type"]) },
};
</script>

<style>
</style>