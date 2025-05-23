<script setup lang="ts">
import { ref } from 'vue'

// 页面状态管理
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)

// 拍摄技巧数据源
const tipsList = ref([
  {
    title: '黄金时刻',
    description: '日出后1小时和日落前1小时是拍摄黄金时段，光线柔和层次丰富',
    cover: 'http://www.wp520.online/images/gysk.jpg'
  },
  {
    title: '三分构图',
    description: '将画面分成九宫格，主体放在交叉点上能获得更和谐的视觉效果',
    cover: 'http://www.wp520.online/images/sf.jpg'
  },
  {
    title: '慢门技巧',
    description: '使用三脚架拍摄流水雾化效果，建议快门速度1/4秒以上',
    cover: 'http://www.wp520.online/images/mm.jpg'
  }
])

// 返回按钮处理
const onClickLeft = () => {
  history.back()
}

// 下拉刷新处理
const onRefresh = () => {
  setTimeout(() => {
    refreshing.value = false
  }, 1000)
}

// 上拉加载处理
const onLoad = () => {
  setTimeout(() => {
    loading.value = false
    finished.value = true
  }, 1000)
}
</script>

<template>
  <div class="photo-tips-page">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="旅行相册"
      fixed
    />

    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      class="content-container"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        @load="onLoad"
      >
        <!-- 使用 grid 布局 -->
        <van-grid
          :column-num="2"
          :gutter="10"
          class="tips-grid"
        >
          <van-grid-item
            v-for="(item, index) in tipsList"
            :key="index"
          >
            <div class="grid-card">
              <van-image
                :src="item.cover"
                width="100%"
                height="160"
                fit="cover"
                radius="8"
                loading-icon="photo"
                :show-loading="true">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
              <!-- 文字内容 -->
              <div class="grid-text">
                <h3 class="title">{{ item.title }}</h3>
                <p class="desc">{{ item.description }}</p>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped>
/* 网格布局优化 */
.tips-grid {
  padding: 60px 8px;
}

.grid-card {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 12px;
  display: flex; /* 启用弹性布局 */
  flex-direction: column; /* 垂直排列 */
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: all 0.3s;
}

.grid-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.grid-text {
  padding: 12px;
}

.title {
  font-size: 14px;
  color: #333;
  margin: 8px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.desc {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
