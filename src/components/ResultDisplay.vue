<template>
  <div class="result-container">
    <h2 class="result-title">The TOP 3 possible diseases you have are</h2>
    <div class="result-cards">
      <div v-for="(card, idx) in cards" :key="idx" class="result-card">
        <p class="disease-name">{{ card.name }}</p>
        <p class="possibility">Possibility: {{ card.possibility }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ResultDisplay',
  props: {
    results: {
      type: Object,
      default: () => null
    }
  },
  setup(props) {
    const cards = computed(() => {
      // 如果拿到了 predictions，就 map 成你想要的格式
      if (props.results?.predictions?.length) {
        return props.results.predictions.map(p => ({
          name:     p[0],
          possibility: (p[1] * 100).toFixed(2) + '%'
        }))
      }
      // 否则就保持你的 loading 样式
      return [
        { name: 'Awaiting Results...', possibility: '...' },
        { name: 'Awaiting Results...', possibility: '...' },
        { name: 'Awaiting Results...', possibility: '...' }
      ]
    })

    return { cards }
  }
}
</script>


<style scoped>
.result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

.result-title {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.result-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.result-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.disease-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.possibility {
  font-size: 14px;
  color: #555;
}
</style>