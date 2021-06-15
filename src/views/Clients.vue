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
              :user="{
                name: 'User 1',
                type: 'Empleado',
                photo: 'https://randomuser.me/api/portraits/women/81.jpg',
              }"
              :redirect="'/employ/2'"
            ></UserItemList>
            <!-- TODO: List of users -->
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import NewUserDialog from "../components/user/NewUserDialog.vue";
import UserItemList from "../components/user/UserItemList.vue";
export default {
  components: { NewUserDialog, UserItemList },
  name: "Clients",
  data: () => ({}),
};
</script>
