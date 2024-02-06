<template>
  <div class="hello">
    <img alt="globish-logo" src="../assets/globish-logo-temp.png" />
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  padding: 2rem 1rem;
  background: white;
  border: 1px solid #000000;
  border-radius: 20px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: $primary-color;
}
</style>
