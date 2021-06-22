<template>
  <div>
    <LoginCard @dataVerified="loginUser($event)" :loading="loading"></LoginCard>
    <div class="text-center">
      <v-snackbar v-model="snackbar" rounded shaped :timeout="timeout">
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar
        v-model="error"
        style="
           {
            'margin-bottom':120px ;
          }
        "
        rounded
        shaped
        :timeout="timeout"
      >
        La sesion ha caducado, vuelve a iniciar la sesion
        <!-- <template v-slot:action="{ attrs }">
          <v-btn color="primary" text v-bind="attrs" @click="error = false">
            Close
          </v-btn>
        </template> -->
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoginCard from "../components/LoginCard.vue";
export default {
  components: { LoginCard },
  props: {
    error: {
      type: String,
      default: null,
    },
  },
  computed: { ...mapState(["user"]) },
  data: () => ({
    loading: false,
    snackbar: false,
    text: "El usuario o contraseña esta incorrecto",
    timeout: 4000,
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