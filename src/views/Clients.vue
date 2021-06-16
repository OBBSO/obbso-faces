<template>
  <v-container>
    <v-card>
      <v-card-title>Clients</v-card-title>
      <v-card-text></v-card-text>
    </v-card>

    <br />

    <v-card>
      <v-card-title>Usuarios</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <NewUserDialog></NewUserDialog>
          </v-col>
          <v-col cols="12">
            <UserItemList
              v-for="(user, i) in users"
              :key="i"
              :user="{
                ...user,
                name: user.username,
                type: 'Empleado',
                photo:
                  'https://randomuser.me/api/portraits/women/8' + i + '.jpg',
              }"
              :redirect="'/employee/' + user.id"
            ></UserItemList>

            <!-- TODO: List of users -->
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import NewUserDialog from "../components/user/NewUserDialog.vue";
import UserItemList from "../components/user/UserItemList.vue";
export default {
  components: { NewUserDialog, UserItemList },
  name: "Clients",
  data: () => ({
    users: [],
  }),
  mounted() {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    axios
      .get("api/user", {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.users = res.data;
      });
  },
};
</script>
