<template>
  <v-list-item :to="redirect" :ripple="false" class="px-0">
    <v-list-item-avatar>
      <img :src="user.photo" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ user.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ user.type }}</v-list-item-subtitle>
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
          name: "Some user name",
          type: "admin",
          photo: "https://randomuser.me/api/portraits/men/80.jpg",
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