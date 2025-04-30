import { ref } from 'vue'

// 极简全局 store：只存一份 results
export const predictionStore = {
  results: ref(null)
}
