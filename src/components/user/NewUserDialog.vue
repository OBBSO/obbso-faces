<template>
  <v-dialog v-model="dialog" persistent :max-width="mobileWindow()">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Nuevo usuario
      </v-btn>
    </template>

    <v-card>
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab> Nuevo usuario </v-tab>
        <v-tab> Empleado </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card>
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
                      label="Apellidos"
                      hide-details
                      v-model="user.surnames"
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
              <v-btn color="primary" dark @click="createNewUser">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="text-center">
              Selecciona un empleado existente
            </v-card-text>
            <v-card-subtitle>
              <v-list-item-group v-model="employ">
                <v-row no-gutters>
                  <v-col cols="12" md="6">
                    <v-list-item :ripple="false" class="px-0">
                      <v-list-item-avatar>
                        <img :src="user.photo" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>Empleado 2</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item :ripple="false" class="px-0">
                      <v-list-item-avatar>
                        <img :src="user.photo" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>Empleado 1</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-list-item-group>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Cancelar
              </v-btn>
              <v-btn color="primary" dark @click="createNewUser">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    employ: null,
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
    tab: null,
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
        .dispatch("registerUser", this.user)
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