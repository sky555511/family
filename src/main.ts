import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vant from 'vant'
import 'vant/lib/index.css' // 引入全部样式
import '@vant/touch-emulator' // 桌面端触控支持
import setRemUnit from '@/utils/rem'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
setRemUnit()
const app = createApp(App)
app.use(VueVideoPlayer)
app.use(createPinia())
app.use(router)
app.use(vant)
app.mount('#app')
