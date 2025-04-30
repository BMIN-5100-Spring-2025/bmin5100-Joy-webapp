<template>
  <div class="result-page">
    <header>
      <h1>Diagnosis Results</h1>
      <button class="back-btn" @click="goBack">← New Search</button>
    </header>
    <div class="cards-container">
      <div v-for="(card, i) in cards" :key="i" class="result-card">
        <div class="card-number">#{{ i + 1 }}</div>
        <p class="disease">{{ card.name }}</p>
        <p class="prob">{{ card.possibility }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { predictionStore } from '@/store/prediction'

const router = useRouter()
const goBack = () => {
  predictionStore.results.value = null
  router.push({ name: 'Home' })
}

const cards = computed(() => {
  const r = predictionStore.results.value
  if (r?.predictions?.length) {
    return r.predictions.map(p => ({
      name: p[0],
      possibility: (p[1] * 100).toFixed(2) + '%'
    }))
  }
  return [
    { name: 'Awaiting Results...', possibility: '...' },
    { name: 'Awaiting Results...', possibility: '...' },
    { name: 'Awaiting Results...', possibility: '...' }
  ]
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.result-page {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: #f5f7fa;
  padding: 2rem;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

header h1 {
  font-size: 2.5rem;
  color: #333;
  margin: 0;
}

.back-btn {
  background: transparent;
  border: none;
  color: #6B73FF;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
}

.back-btn:hover {
  color: #000DFF;
}

.cards-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 4rem);
  gap: 2rem;
}

.result-card {
  flex: 1;
  max-width: 300px;
  background: linear-gradient(135deg, #6B73FF, #000DFF);
  color: white;
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.result-card:hover {
  transform: translateY(-5px);
}

.card-number {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.2);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.disease {
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.prob {
  margin-top: 0.5rem;
  font-size: 1.125rem;
  opacity: 0.9;
}
</style>
