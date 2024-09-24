import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/webgl',
      name: 'webgl',
      component: () => import('@/views/WebGL.vue'),
    },
    {
      path: '/webgl/empty',
      name: 'webgl-empty',
      component: () => import('@/views/WebGLEmpty.vue'),
    },
    {
      path: '/webgl/blank-plane',
      name: 'webgl-blank-plane',
      component: () => import('@/views/WebGLRenderBlankPlane.vue'),
    },
    {
      path: '/webgl/coloured-plane',
      name: 'webgl-coloured-plane',
      component: () => import('@/views/WebGLRenderColouredPlane.vue'),
    },
    {
      path: '/webgl/custom-shaders',
      name: 'webgl-custom-shaders',
      component: () => import('@/views/WebGLCustomShaders.vue'),
    },
  ],
})

export default router
