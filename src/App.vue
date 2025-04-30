<template>
  <div>
    <SymptomInput @results="handleResults" />
    <ResultDisplay :results="predictionResults" />
  </div>
</template>

<script>
import { ref } from 'vue';
import SymptomInput from './components/SymptomInput.vue';
import ResultDisplay from './components/ResultDisplay.vue';

export default {
  components: { SymptomInput, ResultDisplay },
  setup() {
    const predictionResults = ref(null);

    const handleResults = (results) => {
      console.log('父组件收到 results：', results)
      predictionResults.value = results;
    };

    return {
      predictionResults,
      handleResults,
    };
  },
};
</script>