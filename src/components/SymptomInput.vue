<template>
  <div class="input-page">
    <div class="card">
      <h1 class="title">Diesease Predictor</h1>
      <p class="subtitle">Describe your symptoms below in natural language.</p>
      <textarea
        v-model="inputText"
        placeholder="e.g. I have a bad headache and fever."
        rows="5"
      ></textarea>
      <button class="submit-btn" @click="generateJson">Get Diagnosis</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { predictionStore } from '@/stores/prediction'

const inputText = ref('')
const router = useRouter()

async function generateJson() {
  if (!inputText.value.trim()) return
  try {
    const response = await fetch('http://127.0.0.1:5000/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_input: [inputText.value] })
    })
    if (!response.ok) {
      console.error('Error status:', response.status)
      return
    }
    const result = await response.json()
    predictionStore.results.value = result
    router.push({ name: 'Results' })
  } catch (err) {
    console.error('Fetch error:', err)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.input-page {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  font-family: 'Inter', sans-serif;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  width: 100%;
  height: 100%;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.125rem;
  font-weight: 400;
  color: #666;
  margin-bottom: 1rem;
}

textarea {
  width: 80%;
  max-width: 800px;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  resize: vertical;
  margin-bottom: 1.5rem;
  outline: none;
  transition: border-color 0.3s;
}

textarea:focus {
  border-color: #6B73FF;
}

.submit-btn {
  width: 200px;
  padding: 0.75rem;
  background: #6B73FF;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #000DFF;
}
</style>
