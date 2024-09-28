import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/webgl',
    },
    {
      path: '/webgl',
      name: 'webgl',
      component: () => import('@/views/WebGL.vue'),
    },
    {
      path: '/webgl/3d',
      name: 'webgl-3d',
      component: () => import('@/views/WebGLRender3D.vue'),
    },
    {
      path: '/webgl/animated-plane',
      name: 'webgl-animated-plane',
      component: () => import('@/views/WebGLRenderAnimatedPlane.vue'),
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
