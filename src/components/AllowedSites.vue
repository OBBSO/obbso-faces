<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="4" sm="4">
          <v-card-title>Modulos</v-card-title>
        </v-col>
        <v-col cols="12" md="8" sm="8">
          <v-card class="rounded-xl pa-md-2 mx-lg-auto">
            <v-card-text class="text-center">
              <v-row>
                <v-col cols="!2">
                  <strong>Modulos</strong>
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
                  <div v-for="(gen, i) in allows" :key="i">
                    <v-checkbox
                      :label="gen.id + ''"
                      v-model="gen.value"
                      hide-details
                    ></v-checkbox>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-divider inset></v-divider>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="4" sm="4">
          <v-card-title>Roles</v-card-title>
        </v-col>
        <v-col cols="12" md="8" sm="8">
          <v-card class="rounded-xl pa-md-2 mx-lg-auto">
            <v-card-text class="text-center">
              <v-row>
                <v-col cols="!2">
                  <strong>Roles</strong>
                  <div v-for="(gen, i) in roles" :key="i">
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
              <v-btn color="primary">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Settings",
  props: {
    modules: {
      type: Array,
      default: () => [],
    },
    roles: {},
    allows: {},
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
    // store: [
    //   {
    //     text: "Temas",
    //     value: false,
    //   },
    //   {
    //     text: "Articulos del blog y paginas",
    //     value: false,
    //   },
    //   {
    //     text: "Navegacion",
    //     value: false,
    //   },
    //   {
    //     text: "Dominios",
    //     value: false,
    //   },
    // ],
    // general: [
    //   {
    //     text: "Inicio",
    //     value: false,
    //   },
    //   {
    //     text: "Pedidos",
    //     value: false,
    //     children: [
    //       {
    //         text: "Editar pedidos",
    //         value: false,
    //       },
    //     ],
    //   },
    //   {
    //     text: "Pedidos preliminares",
    //     value: false,
    //   },
    //   {
    //     text: "Productos",
    //     value: false,
    //   },
    //   {
    //     text: "Tarjetas de regalo",
    //     value: false,
    //   },
    //   {
    //     text: "Clientes",
    //     value: false,
    //   },
    //   {
    //     text: "Informes",
    //     value: false,
    //   },
    //   {
    //     text: "Panel de control",
    //     value: false,
    //   },
    //   {
    //     text: "Marketing",
    //     value: false,
    //   },
    //   {
    //     text: "Descuentos",
    //     value: false,
    //   },
    //   {
    //     text: "Aplicaciones y canales",
    //     value: false,
    //   },
    // ],
  }),
};
</script>
