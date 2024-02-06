<template>
  <div class="progress-bar">
    <span
      v-for="n in totalQuestions"
      :key="n"
      class="dot"
      :class="{ completed: n <= currentQuestionIndex + 1 }"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    currentQuestionIndex: Number,
    totalQuestions: Number,
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2.5rem;
}

.dot {
  width: 100%;
  height: 9px;
  background-color: #ffffff;
  border-radius: 4px;
  display: inline-block;
  margin: 0 1px;
}

.completed {
  background-color: #333333;
}
</style>
