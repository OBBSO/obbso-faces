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
                label="Nombres*"
                required
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Apellidos*"
                hint="example of helper text only on focus"
                hide-details
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
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Correo electronico"
                hide-details
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Celular*"
                hide-details
                required
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12" md="6" sm="6">
              <v-text-field label="Email" required></v-text-field>
            </v-col> -->
            <!-- <v-col cols="12">
              <v-text-field
                label="Password*"
                type="password"
                required
              ></v-text-field>
            </v-col> -->
          </v-row>
        </v-container>
        <small>*inica que el campo es requerido</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  computed: {},
  methods: {
    mobileWindow() {
      if (this.$vuetify.breakpoint.mobile) {
        return "90%";
      }
      return "50%";
    },
  },
};
</script>

<style>
</style>