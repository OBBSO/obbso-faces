<template>
  <v-container>
    <!-- <v-card>
      <v-card-title>Clients</v-card-title>
      <v-card-text></v-card-text>
    </v-card>

    <br /> -->

    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="4" sm="4">
            <v-card-title>Empleados</v-card-title>
          </v-col>
          <v-col cols="12" md="8" sm="8">
            <v-card :loading="loading">
              <v-card-text>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    md="6"
                    v-for="(user, i) in users"
                    :key="i"
                    sm="6"
                  >
                    <UserItemList
                      :user="user"
                      :redirect="'user/' + user.id_user"
                    ></UserItemList>

                    <!-- TODO: List of users -->
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <NewEmployedDialog
                  @successCreateUser="success($event)"
                ></NewEmployedDialog>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import UserItemList from "../components/user/UserItemList.vue";
import NewEmployedDialog from "../components/user/NewEmployedDialog.vue";
export default {
  components: { UserItemList, NewEmployedDialog },
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
      .get("empleados", {
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
