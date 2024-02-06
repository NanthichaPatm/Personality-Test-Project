<template>
  <div v-if="!testStarted" class="start-background">
    <button @click="testStarted = true" class="start-button">เริ่มเลย</button>
  </div>
  <TestViewVue v-else />
</template>

<script lang="ts">
import TestViewVue from "@/pages/TestView.vue";

export default {
  name: "PersonalityTest",
  components: {
    TestViewVue,
  },
  data() {
    return {
      testStarted: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.start-background {
  background-image: url("@/assets/image15.png");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: end;
  width: 100%;
}
.start-button {
  margin-bottom: 6rem;
  width: 316px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid black;
  font-family: "IBM Plex Sans Thai", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 33px;
  letter-spacing: 0em;
  background-color: #f7c116;
}
</style>
