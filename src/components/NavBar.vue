<template>
  <v-app-bar app clipped-left flat color="secondary" dark>
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

    <v-menu bottom min-width="20%" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="primary" size="48">
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
    </v-menu>
    <v-btn text disabled x-small> </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    drawer: true,

    users: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
    initiallyOpen: ["public"],
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-code-json",
      md: "mdi-language-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
    },
    tree: [],
  }),
  computed: { ...mapState(["user"]) },
};
</script>

<style>
</style>