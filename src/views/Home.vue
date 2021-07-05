<template>
  <v-container>
    <v-card>
      <v-card-title>Home</v-card-title>
      <v-card-text></v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({}),
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
