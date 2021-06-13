<template>
  <div>
    <v-app-bar app clipped-left flat color="primary" dark>
      <v-btn
        @click="
          mini = !mini;
          drawer = !drawer;
        "
        icon
      >
        <v-icon>{{ mini ? "mdi-menu" : "mdi-arrow-left" }}</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <!-- <v-menu bottom min-width="20%" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="white" size="48">
              <span class="white--text text-h5">{{ users.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="white--text text-h5">{{ users.initials }}</span>
              </v-avatar>
              <h3>{{ users.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ users.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Edit Account </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Disconnect </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu> -->
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
      color="white"
      hide-overlay
      :permanent="$vuetify.breakpoint.mdAndUp"
      :mini-variant.sync="mini"
    >
      <v-list dense nav>
        <user-item-list :user="user"></user-item-list>

        <div v-for="(item, i) in items" :key="i">
          <v-list-item :to="item.redirect" v-if="!item.children">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            no-action
            v-else
            :value="false"
            :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <!-- <v-list-item> -->
              <!-- <v-list-item-content> -->
              <v-list-item-title v-text="item.text"></v-list-item-title>
              <!-- </v-list-item-content> -->
              <!-- </v-list-item> -->
            </template>

            <v-list-item
              v-for="([title, to], i) in item.children"
              :to="to"
              :key="i"
              link
            >
              <!-- <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon> -->
              <v-list-item-title v-text="title"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import UserItemList from "./user/UserItemList.vue";
export default {
  components: { UserItemList },
  data: () => ({
    drawer: true,
    mini: true,
    user: {
      type: "admin",
      name: "John Doe",
      email: "john.doe@doe.com",
    },

    items: [
      {
        icon: "mdi-home",
        text: "Inicio",
        redirect: "/",
      },
      {
        icon: "mdi-inbox-arrow-down",
        text: "Pedidos",
        redirect: "/orders",
        children: [
          ["Pedidos", "/a", ""],
          ["Preliminares", "/b", ""],
          ["Carritos abandonados", "/c", ""],
        ],
      },
      {
        icon: "mdi-tag",
        text: "Productos",
        redirect: "/products",
        children: [
          ["Todos los productos", "/d", ""],
          ["Inventario", "/e", ""],
          ["Transferencias", "/f", ""],
          ["Colecciones", "/g", ""],
          ["Tarjetas de regalo", "/h", ""],
        ],
      },
      {
        icon: "mdi-account",
        text: "Clientes",
        redirect: "/clients",
      },
      {
        icon: "mdi-signal",
        text: "Informes y estadisticas",
        redirect: "/statistics",
        children: [
          ["Panel de control", "/i", ""],
          ["Informes", "/j", ""],
          ["Vista en tiempo real", "/k", ""],
        ],
      },
      {
        icon: "mdi-bullhorn",
        text: "Marketing",
        redirect: "/marketing",
        children: [
          ["Informe general", "/l", ""],
          ["Campañas de marketing", "/m", ""],
          ["Automatizaciones", "/n", ""],
        ],
      },
      {
        icon: "mdi-sale",
        text: "Descuentos",
        redirect: "/sale",
      },
      {
        icon: "mdi-apps",
        text: "Aplicaciones",
        redirect: "/apps",
      },
    ],
  }),
  // computed: { ...mapState(["user"]) },
};
</script>

<style>
</style>