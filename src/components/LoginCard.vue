<template>
  <v-container class="background" fluid pa-0>
    <v-row align="center" justify="center" style="height: 100vh" dense>
      <v-col
        cols="12"
        lg="6"
        md="6"
        sm="8"
        class="d-flex justify-center align-center"
      >
        <v-card
          min-width="75%"
          elevation="10"
          class="rounded-xl"
          :loading="loading"
        >
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text></v-card-text>
            <v-card-title class="justify-center display-1">
              Iniciar Sesion
            </v-card-title>
            <v-card-text></v-card-text>
            <div align="center">
              <v-text-field
                v-model="username"
                :rules="[rules.required]"
                label="Usuario"
                @keyup.enter="validate"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show ? 'text' : 'password'"
                label="Contraseña"
                required
                @keyup.enter="validate"
                @click:append="show = !show"
              ></v-text-field>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid" color="primary" @click="validate">
                Iniciar Sesion
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-card-text></v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { rules_login } from "../mixins/rules.js";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [rules_login],
  data: () => ({
    valid: true,
    username: "admin",
    password: "123456",
    show: false,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
      console.log(this.valid);
      if (this.password == null || this.username == null) return;
      if (!this.valid) return;
      this.$emit("dataVerified", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style>
.background {
  background-color: #f7f7f7;
}
.v-text-field {
  width: 70%;
}
</style>