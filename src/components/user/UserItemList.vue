<template>
  <v-list-item two-line class="px-0">
    <v-list-item-avatar>
      <img src="https://randomuser.me/api/portraits/men/81.jpg" />
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
        };
      },
    },
  },
};
</script>

<style>
</style> 