<template>
  <div class="container">
    <div class="page-test" v-if="!testSubmitted">
      <QuestionBar
        :currentQuestionIndex="currentQuestionIndex"
        :totalQuestions="questions.length"
      />
      <QuestionCard
        :key="currentQuestionIndex"
        :question="currentQuestion"
        @optionSelected="handleOptionSelect"
      />
      <div class="button-group">
        <button
          class="button back"
          @click="navigateQuestion('back')"
          :disabled="currentQuestionIndex === 0"
        >
          กลับ
        </button>
        <button
          class="button submit"
          @click="submitOrNextQuestion"
          :disabled="!isCurrentQuestionValid"
        >
          {{
            currentQuestionIndex === questions.length - 1
              ? "ดูผลลัพธ์"
              : "ต่อไป"
          }}
        </button>
      </div>
    </div>
    <div class="page-result" v-else>
      <div class="result-title">ผลลัพธ์ของคุณคือ</div>
      <img
        class="result-img"
        v-if="resultCategory"
        :src="resultCategory"
        alt="Result Category Image"
      />
      <div class="result-text">
        คุณรู้จัก Globish ผ่าน
        <div>{{ formattedLastQuestionResult }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import QuestionCard from "@/components/QuestionCard.vue";
import questionsData from "@/data/questionsData.json";
import QuestionBar from "@/components/QuestionBar.vue";

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

interface OptionSelectedPayload {
  questionId: number;
  optionId: number;
  score?: number;
  additionalInput?: string;
}

export default defineComponent({
  name: "TestView",
  components: {
    QuestionCard,
    QuestionBar,
  },
  setup() {
    const currentQuestionIndex = ref(0);
    const questions = ref<Question[]>(questionsData);
    const selections = ref<{ [key: number]: OptionSelectedPayload[] }>({});
    const testSubmitted = ref(false);
    const resultCategory = ref("");

    const currentQuestion = computed(
      () => questions.value[currentQuestionIndex.value]
    );

    function handleOptionSelect(payload: OptionSelectedPayload) {
      const { questionId, optionId, score, additionalInput } = payload;
      const questionSelections = selections.value[questionId] || [];
      const index = questionSelections.findIndex(
        (selection) => selection.optionId === optionId
      );
      if (index > -1) {
        questionSelections.splice(index, 1);
      } else {
        questionSelections.push({
          questionId,
          optionId,
          score: score || 0,
          additionalInput: additionalInput || "",
        });
      }
      selections.value[questionId] = questionSelections;
    }

    function navigateQuestion(direction: string) {
      if (direction === "back" && currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--;
      }
    }

    function submitOrNextQuestion() {
      if (currentQuestionIndex.value === questions.value.length - 1) {
        submitAnswers();
      } else {
        currentQuestionIndex.value++;
      }
    }

    function submitAnswers() {
      const result: { [key: number]: OptionSelectedPayload[] } = {};
      for (const questionId in selections.value) {
        const selectedOptions = selections.value[parseInt(questionId)];
        if (selectedOptions && selectedOptions.length > 0) {
          result[parseInt(questionId)] = selectedOptions;
        }
      }
      const lastQuestionId = questions.value[currentQuestionIndex.value]?.id;
      const lastQuestionOptions = selections.value[lastQuestionId] || [];

      const hasEmptyAdditionalInput = lastQuestionOptions.some(
        (option) => option.optionId === 3 && option.additionalInput === ""
      );

      if (hasEmptyAdditionalInput) {
        testSubmitted.value = false;
        alert("โปรดกรอกคุณรู้จัก Globish ผ่านช่องทางใด?");
        return;
      }

      const totalScore = Object.values(result).reduce(
        (acc, selectedOptions) =>
          acc +
          selectedOptions.reduce((acc, { score }) => acc + (score || 0), 0),
        0
      );
      console.log("score", totalScore);
      if (totalScore >= 131 && totalScore <= 180) {
        resultCategory.value = require("@/assets/image12.png");
      } else if (totalScore >= 91 && totalScore <= 130) {
        resultCategory.value = require("@/assets/image13.png");
      } else if (totalScore >= 60 && totalScore <= 90) {
        resultCategory.value = require("@/assets/image14.png");
      } else {
        resultCategory.value = "";
      }

      testSubmitted.value = true;
    }

    const isCurrentQuestionValid = computed(() => {
      if (currentQuestionIndex.value === questions.value.length - 1) {
        const lastQuestionId = currentQuestion.value.id;
        return !!selections.value[lastQuestionId];
      } else {
        return true;
      }
    });

    const formattedLastQuestionResult = computed(() => {
      if (!testSubmitted.value) return "";

      const lastQuestionId = currentQuestion.value.id;
      const selectedOptions = selections.value[lastQuestionId] || [];

      const questionLabel = currentQuestion.value.label;
      const optionsText = selectedOptions
        .map(({ optionId, additionalInput }) => {
          const option = currentQuestion.value.options.find(
            (opt) => opt.id === optionId
          );

          if (optionId === 3) {
            return additionalInput || "";
          } else {
            return option?.text || "";
          }
        })
        .join(", ");

      return optionsText;
    });

    return {
      currentQuestionIndex,
      currentQuestion,
      questions,
      handleOptionSelect,
      navigateQuestion,
      submitOrNextQuestion,
      isCurrentQuestionValid,
      resultCategory,
      testSubmitted,
      formattedLastQuestionResult,
    };
  },
});
</script>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.page-test {
  padding: 2rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 3rem;
}

.button {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  width: 316px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid black;
  font-family: "IBM Plex Sans Thai", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back {
  background-color: #fffaf5;
  width: 96px;
  height: 40px;
}

.submit {
  background-color: #f7c116;
  width: 199px;
  height: 40px;
}

.page-result {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid black;
  padding: 3rem 0.5rem;
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;
}

.result-title {
  font-family: "IBM Plex Sans Thai", sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 59px;
  text-align: center;
  margin-bottom: 1.5rem;
}

.result-img {
  width: 100%;
}

.result-text {
  margin-top: 2rem;
  font-family: "IBM Plex Sans Thai", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0em;
  text-align: center;
}
</style>
