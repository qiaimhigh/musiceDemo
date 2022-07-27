import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  }, 
  {
    path: '/music',
    name: 'music',
    component: () => import('../views/MusicView.vue')
  },
  {
    path:'/search',
    name: "search",
    component: ()=>import('@/views/SearchView.vue')
  },
  {
    path: '/user',
    name: 'user',
    beforeEnter: (to, from, next) => {
      if(store.state.isLogin || localStorage.getItem('token') || store.state.token){
        next();
      }else{
        next('/login');
      }
    },
    component: ()=>import('@/views/UserView.vue')
  },
  {
    path: '/login',
    name: '登录',
    component: ()=>import('@/components/user/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
