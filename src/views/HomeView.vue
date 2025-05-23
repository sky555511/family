<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWindowSize } from '@vant/use'
import { showImagePreview } from 'vant'


const { width: windowWidth } = useWindowSize()

// 轮播图数据
const swiperList = ref([
  {
    id: 1,
    image: 'http://www.wp520.online/images/zsl.jpg',
    title: '明孝陵神道漫步，梧桐大道秋色醉人',
    subtitle: '中山陵'
  },
  {
    id: 2,
    image: 'http://www.wp520.online/images/qhh.jpg',
    title: '文化探索之旅',
    subtitle: '秦淮河'
  },
  {
    id: 3,
    image: 'http://www.wp520.online/images/slj.jpg',
    title: '华中最大滑雪场，体验林海雪原激情滑道',
    subtitle: '神龙架'
  },
  {
    id: 4,
    image: 'http://www.wp520.online/images/cs.jpg',
    title: '橘子洲头瞻仰伟人雕像，岳麓山赏红叶',
    subtitle: '长沙'
  },
  {
    id: 5,
    image: 'http://www.wp520.online/images/xy.jpg',
    title: '唐城穿越盛世唐风',
    subtitle: '襄阳'
  }
])

// 计算轮播图高度
const swiperHeight = computed(() => Math.floor(windowWidth.value * 0.53))
// 功能入口
const features = ref([
  { icon: 'todo-list-o', text: '行程规划', router:'/journeyPlan' },
  { icon: 'photo-o', text: '旅行相册', router:'/photoAlbum' },
  { icon: 'video-o', text: '旅行视频', router:'/videoAlbum' },
  { icon: 'photo-o', text: '拍摄技巧', router:'/photoTips' },
])

// 热门目的地
const destinations = ref([
  { name: '三亚', tag: '海岛', icon: 'gem-o'},
  { name: '丽江', tag: '古镇', icon: 'flower-o' },
  { name: '桂林', tag: '山水', icon: 'star-o' },
  { name: '敦煌', tag: '文化', icon: 'fire-o' }
])
const showPreview = (index: number) => {
  showImagePreview({
    images: [
      'http://www.wp520.online/images/zsl.jpg',
      'http://www.wp520.online/images/qhh.jpg',
      'http://www.wp520.online/images/slj.jpg',
      'http://www.wp520.online/images/cs.jpg',
      'http://www.wp520.online/images/xy.jpg'
    ],
    closeable: true,
    startPosition: index
  });
}
const activeName = ref('0')
</script>

<template>
  <van-nav-bar title="十一家" />
  <van-notice-bar
  left-icon="smile-o"
  scrollable
  text="🎉🎉🎉 下一站：烟台，威海 --2025年6月2日 🎉🎉🎉"
/>
  <div class="home-view">
    <!-- 轮播图 -->
    <van-swipe
      class="banner-swipe"
      :autoplay="5000"
      indicator-color="#3a7afe"
      :height="swiperHeight"
    >
      <van-swipe-item
        v-for="(item,index) in swiperList"
        :key="item.id"
        @click="showPreview(index)"
      >
      <van-image
          :src="item.image"
          :style="{
              width: '100%',
              height: `${swiperHeight}px` // 使用计算属性高度
            }"
          fit="cover"
          loading-icon="photo"
          :show-loading="true">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <div class="swipe-info">
        <h3 class="info-title">{{ item.title }}</h3>
        <p class="info-subtitle">{{ item.subtitle }}</p>
      </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 快捷入口 -->
    <van-grid
      :column-num="4"
      :border="false"
      class="quick-access"
    >
      <van-grid-item
        v-for="(item, index) in features"
        :to="item.router"
        :key="index"
        :icon="item.icon"
        :text="item.text"
        icon-size="28px"
      />
    </van-grid>

    <!-- 热门目的地 -->
    <div class="section-card">
      <div class="section-header">
        <van-icon name="location-o" size="20" />
        <h3>热门目的地推荐</h3>
      </div>
      <div class="destinations-grid">
        <div
          v-for="(item, index) in destinations"
          :key="index"
          class="destination-item"
        >
          <div>
            <van-icon :name="item.icon" size="24" />
            <div class="destination-info">
              <span class="name">{{ item.name }}</span>
              <van-tag
                type="primary"
                plain
              >
                {{ item.tag }}
              </van-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 旅行贴士 -->
    <div class="section-card tips-card">
      <div class="section-header">
        <van-icon name="info-o" size="20" />
        <h3>出行小贴士</h3>
      </div>
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="儿童必备物品清单" name="1">
          <ul class="tip-list">
            <li>· 防晒霜/遮阳帽</li>
            <li>· 常用药品（退烧贴等）</li>
            <li>· 便携式消毒湿巾</li>
          </ul>
        </van-collapse-item>
        <van-collapse-item title="安全注意事项" name="2">
          <ul class="tip-list">
            <li>· 随时注意儿童动向</li>
            <li>· 避免单独行动</li>
            <li>· 保存紧急联系方式</li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "sass:math" as math;

$base-rem: 37.5; // 基于 375px 设计稿（1rem = 37.5px）

@function rem($px) {
  @return math.div($px, $base-rem) * 1rem;
}

.home-view {
  padding: 0 rem(12);
  padding-bottom: calc(#{rem(50)} + env(safe-area-inset-bottom));

  .banner-swipe {
    border-radius: rem(8);
    margin: rem(12) 0;
    overflow: hidden;
    box-shadow: 0 rem(2) rem(6) rgba(0,0,0,0.1);

    .swipe-image {
      width: 100%;
      height: 100%;
    }

    .swipe-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: rem(16);
      background: linear-gradient(transparent, rgba(0,0,0,0.6));
      color: white;

      .info-title {
        font-size: rem(18);
        margin: 0;
        @media (max-width: 320px) {
          font-size: rem(16);
        }
      }

      .info-subtitle {
        font-size: rem(12);
        margin: rem(4) 0 0;
        opacity: 0.9;
      }
    }
  }

  .quick-access {
    margin: rem(16) 0;
    :deep(.van-grid-item__content) {
      padding: rem(12) rem(8);
      &:active {
        background-color: #f8f8f8;
      }
    }
  }

  .section-card {
    background: white;
    border-radius: rem(8);
    margin: rem(16) 0;
    padding: rem(16);
    box-shadow: 0 rem(2) rem(8) rgba(0,0,0,0.08);

    .section-header {
      display: flex;
      align-items: center;
      gap: rem(8);
      color: #3a7afe;
      margin-bottom: rem(12);

      h3 {
        margin: 0;
        font-size: rem(16);
      }
    }

    &.tips-card {
      .tip-list {
        margin: 0;
        padding-left: rem(16);
        color: #666;
        line-height: 1.8;
        font-size: rem(13);
      }
    }
  }

  .destinations-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: rem(12);

    .destination-item {
      display: flex;
      align-items: center;
      padding: rem(12);
      background: #f8f9fa;
      border-radius: rem(6);
      gap: rem(8);

      &:active {
        transform: scale(0.98);
        transition: transform 0.2s;
      }

      .destination-info {
        display: flex;
        flex-direction: column;
        gap: rem(4);

        .name {
          font-size: rem(14);
          font-weight: 500;
        }
      }
    }
  }
}
.van-image {
  display: block;
  width: 100%;
  aspect-ratio: 16/9; // 保持16:9宽高比
  img {
    object-position: center 30%; // 优化图片裁剪焦点
  }
}
</style>
