<template>
  
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
    admins: [
      ["Management", "mdi-account-multiple-outline"],
      ["Settings", "mdi-cog-outline"],
    ],
    cruds: [
      ["Create", "mdi-plus-outline"],
      ["Read", "mdi-file-outline"],
      ["Update", "mdi-update"],
      ["Delete", "mdi-delete"],
    ],
    items: [
      {
        icon: "mdi-wifi",
        text: "Wifi",
        redirect: "/",
      },
      {
        icon: "mdi-bluetooth",
        text: "Bluetooth",
        redirect: "/login",
      },
      {
        icon: "mdi-chart-donut",
        text: "Data Usage",
        redirect: "/about",
      },
    ],
  }),
  computed: { ...mapState(["user"]) },
};
</script>

<style>
</style>