import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import ChartGallery from '@/views/ChartGallery.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/chart-gallery',
      name: 'chart-gallery',
      component: ChartGallery,
    }

  ],
})

export default router
