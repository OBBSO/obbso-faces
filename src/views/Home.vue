<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>

      <v-col cols="12">
        <v-card flat class="mr-4 mb-2">
          <v-row>
            <v-col cols="12" md="4" sm="4">
              <v-card-title>Permisos</v-card-title>
            </v-col>
            <v-col cols="12" md="8" sm="8">
              <v-card class="rounded-xl pa-md-4 mx-lg-auto">
                <v-card-text>
                  <v-container>
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-card-text><strong>General</strong></v-card-text>
                        <div v-for="(gen, i) in general" :key="i">
                          <v-checkbox
                            :label="gen.text"
                            v-model="gen.value"
                            hide-details
                          ></v-checkbox>
                          <div v-if="gen.children">
                            <v-checkbox
                              :disabled="!gen.value"
                              class="pr-6"
                              v-for="(child, j) in gen.children"
                              :key="j"
                              :label="child.text"
                              v-model="child.value"
                              hide-details
                            ></v-checkbox>
                          </div>
                        </div>
                      </v-col>

                      <v-col cols="6">
                        <v-card-text><strong>Tienda</strong></v-card-text>
                        <div v-for="(gen, i) in admin" :key="i">
                          <v-checkbox
                            :label="gen.text"
                            v-model="gen.value"
                            hide-details
                          ></v-checkbox>
                          <div v-if="gen.children">
                            <v-checkbox
                              :disabled="!gen.value"
                              v-for="(child, j) in gen.children"
                              :key="j"
                              :label="child.text"
                              v-model="child.value"
                              hide-details
                            ></v-checkbox>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <v-card-text>
                          <strong>Administracion</strong>
                        </v-card-text>
                        <div v-for="(gen, i) in store" :key="i">
                          <v-checkbox
                            :label="gen.text"
                            v-model="gen.value"
                            hide-details
                          ></v-checkbox>
                          <div v-if="gen.children">
                            <v-checkbox
                              :disabled="!gen.value"
                              v-for="(child, j) in gen.children"
                              :key="j"
                              :label="child.text"
                              v-model="child.value"
                              hide-details
                            ></v-checkbox>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
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
  }),
};
</script>
