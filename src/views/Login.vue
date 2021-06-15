<template>
  <div>
    <LoginCard @dataVerified="loginUser($event)" :loading="loading"></LoginCard>
    <div class="text-center">
      <v-snackbar v-model="snackbar" rounded shaped>
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoginCard from "../components/LoginCard.vue";
export default {
  components: { LoginCard },
  computed: { ...mapState(["user"]) },
  data: () => ({
    loading: false,
    snackbar: false,
    text: "El usuario o contraseña esta incorrecto",
  }),
  methods: {
    loginUser(data) {
      // console.log(data);
      this.loading = true;
      this.$store
        .dispatch("login", data)
        .then(() => this.$router.push("/"))
        .catch((err) => {
          console.log(err);
          // if (err.response.status == 401) this.notAccess = true;
          // else
          this.snackbar = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

};
</script>

<style>
</style>