<template>
  <v-container>
    <v-card>
      <v-card-title>Clients</v-card-title>
      <v-card-text></v-card-text>
    </v-card>

    <br />

    <v-card :loading="loading">
      <v-card-title>Usuarios</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <NewUserDialog @successCreateUser="success($event)"></NewUserDialog>
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
                  'https://randomuser.me/api/portraits/' +
                  (i % 2 == 0 ? 'women' : 'men') +
                  '/7' +
                  i +
                  '.jpg',
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
    loading: false,
  }),
  mounted() {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    this.loading = true;
    axios
      .get("api/user", {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.users = res.data;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    success(data) {
      console.log(data);
      this.users.push(data);
    },
  },
};
</script>
