<script setup lang="ts">
import { onMounted, ref } from 'vue'
declare global {
  interface Window {
    initMap: () => void;
    BMap: typeof BMap
  }
}

// 国内旅行数据示例
const travelSpots = ref([
  {
    name: '神龙架',
    position: [110.390913,31.557574], // 百度坐标
    time: '2021-01',
    desc: '华中最大滑雪场，体验林海雪原激情滑道',
    icon: 'http://www.wp520.online/images/slj.jpg'
  },
  {
    name: '长沙',
    position: [112.97108,28.209695],
    time: '2023-02',
    desc: '橘子洲头瞻仰伟人雕像，岳麓山赏红叶',
    icon: 'http://www.wp520.online/images/cs.jpg'
  },
  {
    name: '宜昌，襄阳',
    position: [111.163491,30.798606],
    time: '2024-05',
    desc: '三峡人家赏山水画廊，唐城穿越盛世唐风',
    icon: 'http://www.wp520.online/images/xy.jpg'
  },
  {
    name: '南京',
    position: [118.861646,32.060731],
    time: '2024-11',
    desc: '明孝陵神道漫步，梧桐大道秋色醉人',
    icon: 'http://www.wp520.online/images/nj.jpg'
  },
  {
    name: '岳阳',
    position: [113.100399,29.383497],
    time: '2024-11',
    desc: '登岳阳楼瞰洞庭湖，品「先忧后乐」千古绝唱',
    icon: 'http://www.wp520.online/images/yy.jpg'
  }
])

// 地图实例
const mapLoaded = ref(false)
let map: any = null
let BMap: any = null

onMounted(() => {
  initializeBaiduMap()
})

const initializeBaiduMap = () => {
  const mapScript = document.createElement('script')
  mapScript.src = `https://api.map.baidu.com/api?v=3.0&ak=KpXru1gqLkwgzwuM2M6QeVw0s3iVuoFx&callback=initMap`
  document.head.appendChild(mapScript)

  window.initMap = () => {
    BMap = (window as any).BMap
    map = new BMap.Map('map-container', {
      minZoom: 4,  // 限制最小缩放级别
      maxZoom: 18  // 限制最大缩放级别
    })

    // 设置中国视图
    map.centerAndZoom(new BMap.Point(104.1954, 35.8617), 5)
    map.enableScrollWheelZoom(true)
    map.setMapStyleV2({ styleId: 'c7fded55db9ad57cd9636c2198a57d3e' }) // 自定义地图样式ID
    mapLoaded.value = true

    addMapControls()
    addTravelMarkers()
    // addHeatmapLayer()
  }
}

// 添加地图控件
const addMapControls = () => {
  map.addControl(new BMap.NavigationControl({
    // anchor: BMAP_ANCHOR_TOP_LEFT, // 控件位置
    // type: BMAP_NAVIGATION_CONTROL_SMALL // 小型控件
  }))
  map.addControl(new BMap.ScaleControl())
  map.addControl(new BMap.OverviewMapControl())
}

// 添加旅行标记
const addTravelMarkers = () => {
  travelSpots.value.forEach(spot => {
    const point = new BMap.Point(spot.position[0], spot.position[1])

    // 创建自定义图标
    const myIcon = new BMap.Icon(
      spot.icon,
      new BMap.Size(26, 26), // 调整图标大小
      {
        anchor: new BMap.Size(30, 40), // 调整锚点位置
        imageSize: new BMap.Size(32, 40)
      }
    )

    // 创建标记
    const marker = new BMap.Marker(point, { icon: myIcon })

    // 信息窗口内容
    const infoContent = `
      <div class="info-window">
        <div class="header">
          <h3>${spot.name}</h3>
          <span class="time">${spot.time}</span>
        </div>
        <div class="content">
          <p>${spot.desc}</p>
        </div>
      </div>
    `

    // 绑定点击事件
    marker.addEventListener('click', () => {
      const infoWindow = new BMap.InfoWindow(infoContent, {
        width: 280,
        height: 'auto',
        offset: new BMap.Size(0, -30) // 调整信息窗位置
      })
      map.openInfoWindow(infoWindow, point)
    })

    map.addOverlay(marker)
  })
}

// 添加热力图层
// const addHeatmapLayer = () => {
//   const heatmapOverlay = new BMapLib.HeatmapOverlay({
//     radius: 50,
//     visible: true,
//     gradient: {
//       0.2: 'blue',
//       0.4: 'cyan',
//       0.6: 'lime',
//       0.8: 'yellow',
//       1.0: 'red'
//     }
//   })

//   map.addOverlay(heatmapOverlay)
//   heatmapOverlay.setDataSet({
//     data: travelSpots.value.map(spot => ({
//       lat: spot.position[1],
//       lng: spot.position[0],
//       count: 1
//     })),
//     max: 3
//   })
// }
</script>

<template>
  <div id="map-container" class="map-container">
    <div v-if="!mapLoaded" class="loading-overlay">
      <div class="loading-spinner"></div>
      <div class="loading-text">地图加载中...</div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(2px);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 12px;
  color: #666;
  font-size: 14px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 自定义信息窗口样式 */
:deep(.BMap_bubble_content) {
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  padding: 16px !important;
  font-family: 'Microsoft YaHei', sans-serif;
  background-color: #69b0ac;
  z-index: 9999;
}

:deep(.info-window .header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

:deep(.info-window h3) {
  margin: 0;
  font-size: 16px;
  color: #333;
  max-width: 180px;
}

:deep(.info-window .time) {
  font-size: 12px;
  color: #4d4c4c;
}

:deep(.info-window .content p) {
  margin: 0;
  font-size: 14px;
  color: #4d4c4c;
  line-height: 1.5;
}
/* 添加微渐变提升质感 */
:deep(.BMap_bubble_content) {
  background: linear-gradient(150deg, #69b0ac 0%, #80cbc4 100%);
}

/* 添加分割线 */
:deep(.info-window .header) {
  border-bottom: 1px solid rgba(224, 242, 241, 0.3);
  padding-bottom: 8px;
}
</style>
