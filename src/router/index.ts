import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import ToolsView from '../views/ToolsView.vue'
import JourneyPlanView from '../views/JourneyPlanView.vue'
import PhotoTipsView from '../views/PhotoTips.vue'
import PhotoAlbumView from '../views/PhotoAlbum.vue'
import VideoAlbumView from '../views/VideoAlbum.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      redirect: '/home', // 访问根路径时自动跳转到 /home
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/tools',
      name: 'tools',
      component: ToolsView,
    },
    {
      path: '/journeyPlan',
      name: 'journeyPlan',
      component: JourneyPlanView,
    },
    {
      path: '/photoTips',
      name: 'photoTips',
      component: PhotoTipsView,
    },
    {
      path: '/photoAlbum',
      name: 'photoAlbum',
      component: PhotoAlbumView,
    },
    {
      path: '/videoAlbum',
      name: 'videoAlbum',
      component: VideoAlbumView,
    },
  ],
})

export default router
