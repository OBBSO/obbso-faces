<template>
  <v-container>
    <AllowedSites></AllowedSites>
    
  </v-container>
</template>

<script>
import AllowedSites from "../components/AllowedSites.vue";
export default {
  name: "Settings",
  components: {
    AllowedSites,
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
  }),
};
</script>
