<template>
  <v-container>
    <v-card>
      <v-card-text>
        {{ user }}
      </v-card-text>
    </v-card>
    <br />

    <allowed-sites :employ="employ" :allows="userAllows"></allowed-sites>
  </v-container>
</template>

<script>
import axios from "axios";
import AllowedSites from "../components/AllowedSites.vue";
export default {
  components: { AllowedSites },
  props: {
    employ: {
      type: String,
      default: "-1",
    },
  },
  data: () => ({
    user: {},
    userModules: [],
    userAllows: [],
    userRoles: [],
    roles: [],
    loading: false,
  }),
  mounted() {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    axios
      .get("/api/user/" + this.employ, {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.user = res.data;
        axios
          .get("api/rol_user", {
            headers: {
              Authorization: `${type} ${token}`,
            },
          })
          .then((resp) => {
            const r = resp.data;
            console.log(resp);
            r.map((t) => {
              if (t.user_id == this.user.id) {
                this.userRoles.push(t);
              }
            });
            console.log(this.userRoles[0]);
            axios
              .get("api/role", {
                headers: {
                  Authorization: `${type} ${token}`,
                },
              })
              .then((respo) => {
                const re = respo.data;
                re.map((t) => {
                  if (t.id == this.userRoles[0].rol_id) {
                    this.roles.push(t);
                  }
                });
                console.log(this.roles);

                axios
                  .get("api/permiso", {
                    headers: {
                      Authorization: `${type} ${token}`,
                    },
                  })
                  .then((respon) => {
                    console.log(respon);
                    const rees = respon.data;
                    rees.map((t) => {
                      if ((rees.rol_id = this.roles[0].id)) {
                        this.userModules.push(t);
                      }
                    });
                    console.log(this.userModules);

                    axios
                      .get("api/modulo", {
                        headers: {
                          Authorization: `${type} ${token}`,
                        },
                      })
                      .then((respons) => {
                        const resq = respons.data;
                        console.log(resq, "mod");
                        resq.map((t) => {
                          if (t.id == this.userModules[0].id) {
                            this.userAllows.push(t);
                          }
                        });
                        console.log(this.userAllows);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error.response);
          });
      })
      .catch((e) => {
        console.log(e);
        this.loading = false;
      });
    // .finally(() => {
    //   this.loading = false;
    // });
  },
};
</script>

<style>
</style>