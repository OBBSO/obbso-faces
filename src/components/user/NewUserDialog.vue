<template>
  <v-dialog v-model="dialog" persistent :max-width="mobileWindow()">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Nuevo usuario
      </v-btn>
    </template>
    <v-card>
      <br />
      <v-card-title>
        <span class="text-h5">Datos del usuario</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Usuario*"
                required
                hide-details
                v-model="user.username"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Contraseña*"
                required
                hide-details
                v-model="user.password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Nombres*"
                required
                hide-details
                v-model="user.names"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Apellidos*"
                hide-details
                v-model="user.surnames"
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Legal last name*"
                hint="example of persistent helper text"
                persistent-hint
                required
              ></v-text-field>
            </v-col> -->
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Celula de Identidad*"
                required
                hide-details
                v-model="user.ci"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Correo electronico"
                hide-details
                required
                v-model="user.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Celular*"
                hide-details
                required
                v-model.number="user.phone"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indica que el campo es requerido</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn color="primary" dark @click="createNewUser"> Guardar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    user: {
      username: "qwerty",
      password: "qwerty",
      names: "fakename",
      surnames: "fakesurname",
      ci: 123123,
      email: "some@email.com",
      phone: 76543210,
    },
  }),
  computed: {},
  methods: {
    mobileWindow() {
      if (this.$vuetify.breakpoint.mobile) {
        return "90%";
      }
      return "50%";
    },
    createNewUser() {
      this.user.persona_id = 3;
      console.log(this.user);
      this.$store
        .dispatch("registerUSer", this.user)
        .then((res) => {
          console.log(res, "success");
          this.$emit("successCreateUser", {
            id: 20,
            persona_id: 1,
            username: this.user.username,
          });
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          this.dialog = false;
        });
    },
  },
};
</script>

<style>
</style>