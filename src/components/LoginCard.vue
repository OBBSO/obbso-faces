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
        <v-card tile min-width="70%">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-title class="justify-center display-1">
              Iniciar Sesion
            </v-card-title>
            <div align="center">
              <v-text-field
                v-model="username"
                :rules="[rules.required]"
                label="Username"
                outlined
                required
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show ? 'text' : 'password'"
                label="Contraseña"
                outlined
                required
                dense
                @click:append="show = !show"
              ></v-text-field>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid" color="primary" small @click="validate">
                Iniciar Sesion
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
            <br />
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { rules_login } from "../mixins/rules.js";
export default {
  mixins: [rules_login],
  data: () => ({
    valid: true,
    username: "",
    password: "",
    show: false,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style>
.background {
  background-color: white;
}
.v-text-field {
  width: 70%;
}
</style>