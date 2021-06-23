<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="4" sm="4">
          <v-card-title>Permisos</v-card-title>
        </v-col>
        <v-col cols="12" md="8" sm="8">
          <v-card class="rounded-xl pa-md-2 mx-lg-auto">
            <v-card-text class="text-center">
              <v-row>
                <v-col cols="!2">
                  <strong>Permisos</strong>
                  <div v-for="(gen, i) in modules" :key="i">
                    <v-checkbox
                      :label="gen.titulo"
                      v-model="gen.value"
                      hide-details
                    ></v-checkbox>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn color="secondary" text>Cancelar</v-btn> -->
              <v-btn color="primary">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-divider inset></v-divider>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "Settings",
  props: {
    // modules: {
    //   type: Array,
    //   default: () => [],
    // },
    allows: {},
    employ: {},
  },
  data: () => ({
    admin: [
      {
        text: "Gestionar configuracion",
        value: false,
      },
      {
        text: "Gestion sucursales",
        value: false,
      },
      {
        text: "Editar permisos",
        value: false,
        children: [
          {
            text: "Agregar y eliminar empleados",
            value: false,
          },
        ],
      },
      {
        text: "Ver pagos de Payments",
        value: false,
      },
      {
        text: "Ver facturación y recibir correos electrónicos de facturación",
        value: false,
      },
      {
        text: "Ver aplicaciones privadas",
        value: false,
        children: [
          {
            text: "Editar detalles y permisos de aplicaciones privadas",
            value: false,
          },
        ],
      },
    ],
    store: [
      {
        text: "Temas",
        value: false,
      },
      {
        text: "Articulos del blog y paginas",
        value: false,
      },
      {
        text: "Navegacion",
        value: false,
      },
      {
        text: "Dominios",
        value: false,
      },
    ],
    general: [
      {
        text: "Inicio",
        value: false,
      },
      {
        text: "Pedidos",
        value: false,
        children: [
          {
            text: "Editar pedidos",
            value: false,
          },
        ],
      },
      {
        text: "Pedidos preliminares",
        value: false,
      },
      {
        text: "Productos",
        value: false,
      },
      {
        text: "Tarjetas de regalo",
        value: false,
      },
      {
        text: "Clientes",
        value: false,
      },
      {
        text: "Informes",
        value: false,
      },
      {
        text: "Panel de control",
        value: false,
      },
      {
        text: "Marketing",
        value: false,
      },
      {
        text: "Descuentos",
        value: false,
      },
      {
        text: "Aplicaciones y canales",
        value: false,
      },
    ],
    modules: [],
  }),
  mounted() {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    axios
      .get("api/modulo", {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
      .then((response) => {
        const mods = response.data;
        mods.map((t) => {
          if (this.allows[0].titulo == t.titulo) {
            t.value = true;
          } else {
            t.value = false;
          }

          this.modules.push(t);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
