import axios from "axios";
const state = {
  counter: 0,
};
const getters = {};
const mutations = {
  increment: (state, payload) => {
    state.counter += payload;
  },
  decrement: (state, payload) => {
    state.counter -= payload;
  },
};
const actions = {
  getRoles({ commit }) {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    return new Promise((resolve, reject) => {
      axios
        .get(
          "/api/role",
          {},
          {
            headers: {
              Authorization: `${type} ${token}`,
            },
          }
        )
        .then((resp) => {
          console.log(resp);
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          commit();
        });
    });
  },
  newRole({ commit }, data) {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    return new Promise((resolve, reject) => {
      axios
        .post("/api/role", data, {
          headers: {
            Authorization: `${type} ${token}`,
          },
        })
        .then((resp) => {
          console.log(resp);
          resolve(resp.data);
          commit();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteRole({ commit }, idRole) {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    return new Promise((resolve, reject) => {
      axios
        .put("/api/role/" + idRole, {
          headers: {
            Authorization: `${type} ${token}`,
          },
        })
        .then((resp) => {
          console.log(resp, "Deleted");
          resolve(resp.data);
          commit();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  

};

export default {
  state,
  getters,
  mutations,
  actions,
};
