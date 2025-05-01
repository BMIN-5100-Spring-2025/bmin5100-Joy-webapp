import { createRouter, createWebHistory } from 'vue-router'
import Login         from '@/components/Login.vue'
import SymptomInput  from '@/components/SymptomInput.vue'
import ResultDisplay from '@/components/ResultDisplay.vue'

const routes = [
  // 根路径直接跳到 /login
//   { path: '/',            redirect: '/login' },
    { path: '/',        redirect: '/input' },
  // 登录页
  { path: '/login',       name: 'Login',   component: Login ,   redirect: '/input'},
  // 用户输入页
  { path: '/input',       name: 'Home',    component: SymptomInput },
  // 结果页
  { path: '/results',     name: 'Results', component: ResultDisplay }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// （可选）全局导航守卫，未登录前禁止访问 /input 和 /results
// import { useMainStore } from '@/stores/mainStore'
// router.beforeEach((to, from, next) => {
//   const store = useMainStore()
//   const isAuthRoute = to.name === 'Input' || to.name === 'Results'
//   if (isAuthRoute && store.status !== store.statusOptions.LOGGED_IN) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })

export default router
