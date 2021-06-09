export const rules_login = {
  mounted() {
    // console.log("Rules added with mixin, rules.js");
  },
  data: () => ({
    rules: {
      required: (value) => !!value || "Este campo no puede estar vacio",
      email: [
        (v) => !!v || "El e-mail es requerido",
        (v) => /.+@.+\..+/.test(v) || "Debe ser un e-mail valido",
      ],
    },
  }),
};
