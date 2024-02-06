<template>
  <PersonalityTest />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PersonalityTest from "./pages/PersonalityTest.vue";

export default defineComponent({
  name: "App",
  components: {
    PersonalityTest,
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;700&display=swap");
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #39b7e8;
  width: 100%;
  max-width: 720px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "IBM Plex Sans Thai", sans-serif;
}
</style>
