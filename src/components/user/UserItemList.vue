<template>
  <v-list-item :to="'/' + redirect" :ripple="false" class="px-0">
    <v-list-item-avatar v-if="user.imagen != null">
      <img :src="user.imagen" />
    </v-list-item-avatar>

    <v-list-item-avatar v-else color="black">
      <span class="white--text text-h5">{{
        user.nombres.charAt(0) ? user.nombres.charAt(0) : ""
      }}</span>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ user.nombres }}</v-list-item-title>
      <!-- <v-list-item-subtitle>{{ info.type }}</v-list-item-subtitle> -->
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          nombres: "Some user name",
          type: "admin",
          imagen: "https://randomuser.me/api/portraits/men/80.jpg",
        };
      },
    },
    redirect: {
      type: String,
      default: "/",
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
</style> 