<template>
  <div class="QuestionCard">
    <div class="title-label">{{ question.label }}</div>
    <div class="title-question">{{ question.question }}</div>
    <div
      class="option"
      v-for="option in question.options"
      :key="option.id"
      :class="{ selected: isSelected(option.id) }"
      @click="selectOption(option.id, option.score || 0)"
    >
      {{ option.text }}{{ option.score }}
    </div>
    <div v-if="question.id === 7 && isSelected(3)" class="option-input">
      <input
        type="text"
        v-model="additionalInput"
        placeholder="เพื่อนแนะนำมา"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Option {
  id: number;
  text: string;
  score?: number;
}

interface Question {
  id: number;
  label: string;
  question: string;
  options: Option[];
}

export default defineComponent({
  name: "QuestionCard",
  props: {
    question: {
      type: Object as () => Question,
      required: true,
    },
  },

  emits: ["optionSelected"],
  setup(props, { emit }) {
    const selectedOptionIds = ref<number[]>([]);
    const additionalInput = ref<string>("");
    function selectOption(optionId: number, score: number) {
      const isMultiSelect = props.question.id === 7;
      const index = selectedOptionIds.value.indexOf(optionId);

      if (isMultiSelect && index > -1) {
        selectedOptionIds.value.splice(index, 1);
      } else if (isMultiSelect) {
        selectedOptionIds.value.push(optionId);
      } else {
        selectedOptionIds.value = [optionId];
      }
      emit("optionSelected", {
        questionId: props.question.id,
        optionId,
        score,
        additionalInput,
      });
    }

    function isSelected(optionId: number) {
      return selectedOptionIds.value.includes(optionId);
    }
    return {
      selectOption,
      isSelected,
      additionalInput,
    };
  },
});
</script>

<style lang="scss" scoped>
.QuestionCard {
  box-sizing: border-box;
  padding: 2rem 1rem;
  background: white;
  border: 1px solid #000000;
  border-radius: 20px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  text-align: start;
}
.title-label {
  color: #c8c8c8;
  font-family: "Gloria Hallelujah";
  font-size: 32px;
  font-weight: 400;
  line-height: 63px;
}
.title-question {
  font-family: "IBM Plex Sans Thai";
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  height: 72.13px;
}
.option {
  color: #10153c;
  font-family: "IBM Plex Sans Thai";
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  width: 100%;
  height: 72.13px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 0.8rem;
  box-sizing: border-box;
}
.selected {
  background-color: #f57c4a;
  border: 1px solid black;
}
.option-input {
  width: 100%;
}
.option-input input {
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  padding: 0.5rem 1rem;
  font-family: "IBM Plex Sans Thai";
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  box-sizing: border-box;
  margin-bottom: 0.8rem;
}
</style>
