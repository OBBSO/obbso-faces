<template>
  <div>
    <LoginCard></LoginCard>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoginCard from "../components/LoginCard.vue";
export default {
  components: { LoginCard },
  computed: { ...mapState(["user"]) },
};
</script>

<style>
</style>