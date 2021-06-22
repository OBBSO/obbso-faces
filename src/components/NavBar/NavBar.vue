<template>
  <div>
    <v-app-bar app clipped-left flat color="primary" dark>
      <!-- <v-btn @click="navDrawer()" icon>
        <v-icon>{{ !drawer ? "mdi-menu" : "mdi-arrow-left" }}</v-icon>
      </v-btn> -->
      <v-btn icon class="mx-1" @click.stop="navDrawer">
        <template v-if="drawer">
          <v-icon style="font-size: 28px">mdi-arrow-left</v-icon>
        </template>
        <template v-else>
          <v-icon style="font-size: 28px">mdi-menu</v-icon>
        </template>
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
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
      color="white"
      hide-overlay
      :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="$vuetify.breakpoint.smAndDown"
      :mini-variant.sync="mini"
      :mini-variant-width="80"
      :class="{ 'drawer-mini': !drawer }"
    >
      <v-list dense nav>
        <UserItemList :user="user" :redirect="'/account'"></UserItemList>

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
      <template v-slot:append>
        <v-list dense nav>
          <v-list-item to="/settings">
            <v-list-item-icon>
              <v-icon v-text="'mdi-cog'"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="'Configuración'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="onLogout">
            <v-list-item-icon>
              <v-icon v-text="'mdi-logout'"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="'Cerrar sesion'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import UserItemList from "../user/UserItemList.vue";
export default {
  components: { UserItemList },
  data: () => ({
    drawer: false,
    mini: false,
    user: {
      type: "admin",
      name: "John Doe",
      email: "john.doe@doe.com",
      photo: "https://randomuser.me/api/portraits/men/81.jpg",
    },

    items: [
      {
        icon: "mdi-home",
        text: "Inicio",
        redirect: "/",
      },
      // {
      //   icon: "mdi-inbox-arrow-down",
      //   text: "Pedidos",
      //   redirect: "/orders",
      //   children: [
      //     ["Pedidos", "/a", ""],
      //     ["Preliminares", "/b", ""],
      //     ["Carritos abandonados", "/c", ""],
      //   ],
      // },
      {
        icon: "mdi-tag",
        text: "Productos",
        redirect: "/products",
        // children: [
        //   ["Todos los productos", "/d", ""],
        //   ["Inventario", "/e", ""],
        //   ["Transferencias", "/f", ""],
        //   ["Colecciones", "/g", ""],
        //   ["Tarjetas de regalo", "/h", ""],
        // ],
      },
      {
        icon: "mdi-account",
        text: "Usuarios",
        redirect: "/users",
      },
      {
        icon: "mdi-signal",
        text: "Informes y estadísticas",
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
        redirect: "/discounts",
      },
      {
        icon: "mdi-apps",
        text: "Aplicaciones",
        redirect: "/apps",
      },
    ],
  }),
  methods: {
    navDrawer() {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = !this.drawer;
        this.mini = false;
        return;
      }
      this.mini = !this.mini;
      this.drawer = !this.drawer;
    },
    onLogout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
  // computed: { ...mapState(["user"]) },
};
</script>

<style src="./NavBar.scss" lang="scss"/>