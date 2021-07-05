import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#921BB1",
        secondary: "#C589D4",
        background: "F7F7F7",
        tertiary: "000000",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  },
});
