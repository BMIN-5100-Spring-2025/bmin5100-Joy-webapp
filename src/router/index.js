// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import SymptomInput from '@/components/SymptomInput.vue'
import ResultDisplay  from '@/components/ResultDisplay.vue'

const routes = [
  { path: '/',        name: 'Home',    component: SymptomInput },
  { path: '/results', name: 'Results', component: ResultDisplay }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
