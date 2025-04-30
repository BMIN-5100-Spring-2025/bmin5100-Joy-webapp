import { createRouter, createWebHistory } from 'vue-router'
import SymptomInput   from '@/components/SymptomInput.vue'
import ResultDisplay  from '@/components/ResultDisplay.vue'

const routes = [
  { path: '/',        name: 'Home',    component: SymptomInput },
  { path: '/results', name: 'Results', component: ResultDisplay }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
