<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="4" sm="4">
          <v-card-title>Permisos</v-card-title>
        </v-col>
        <v-col cols="12" md="8" sm="8">
          <v-card class="rounded-xl pa-md-2 mx-lg-auto" :loading="loading">
            <v-card-text class="text-center">
              <v-row>
                <v-col cols="!2">
                  <strong>Permisos</strong>
                  <div v-for="(gen, i) in allows" :key="i">
                    <v-checkbox
                      :label="gen.modulo"
                      v-model="gen.estado"
                      :true-value="1"
                      :false-value="0"
                      hide-details
                    ></v-checkbox>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn color="secondary" text>Cancelar</v-btn> -->
              <v-btn v-show="edited" color="primary" @click="saveAllows">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-divider inset></v-divider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Settings",
  props: {
    // modules: {
    //   type: Array,
    //   default: () => [],
    // },
    allows: {},
    employ: {},
    loading: { type: Boolean, default: false },
  },
  watch: {
    allows: {
      handler(newValue) {
        console.log(newValue);
        if (newValue.length > 0) this.edited = true;
        else return;
      },
      deep: true,
    },
  },
  data: () => ({
    edited: false,
  }),
  methods: {
    saveAllows() {
      // console.log(this.allows);
      this.$emit("updateValues", this.allows);
    },
  },
};
</script>
