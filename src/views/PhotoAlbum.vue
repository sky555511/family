<script setup lang="ts">
import { ref, computed } from 'vue';
import { showImagePreview } from 'vant';

// 模拟数据
const folders = ref([
  {
    id: 1,
    name: '神龙架之旅',
    cover: 'http://www.wp520.online/images/cs.jpg',
    images: [
      'http://www.wp520.online/images/cs.jpg',
      'http://www.wp520.online/images/xy.jpg'
    ]
  },
  {
    id: 2,
    name: '长沙之旅',
    cover: 'https://example.com/cover2.jpg',
    images: [
      'https://example.com/photo2-1.jpg',
      'https://example.com/photo2-2.jpg'
    ]
  },
  {
    id: 3,
    name: '宜昌，襄阳之旅',
    cover: 'https://example.com/cover2.jpg',
    images: [
      'https://example.com/photo2-1.jpg',
      'https://example.com/photo2-2.jpg'
    ]
  },
  {
    id: 4,
    name: '南京之旅',
    cover: 'https://example.com/cover2.jpg',
    images: [
      'https://example.com/photo2-1.jpg',
      'https://example.com/photo2-2.jpg'
    ]
  },
  {
    id: 5,
    name: '岳阳之旅',
    cover: 'https://example.com/cover2.jpg',
    images: [
      'https://example.com/photo2-1.jpg',
      'https://example.com/photo2-2.jpg'
    ]
  }
]);

const selectedFolder = ref<null | any>(null);

// 图片预览
const showPreview = (images: string[], index: number) => {
  showImagePreview({
    images,
    startPosition: index,
    closeable: true
  });
};

// 动态导航标题
const navTitle = computed(() =>
  selectedFolder.value ? selectedFolder.value.name : '旅行相册'
);

// 统一返回处理
const handleNavBack = () => {
  if (selectedFolder.value) {
    selectedFolder.value = null;
  } else {
    history.back();
  }
};
</script>

<template>
  <div class="container">
    <van-nav-bar
      left-arrow
      :title="navTitle"
      @click-left="handleNavBack"
    />
    <div class="photo-album-container">
      <!-- 相册列表 -->
      <template v-if="!selectedFolder">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item
            v-for="folder in folders"
            :key="folder.id"
            @click="selectedFolder = folder"
          >
            <van-image
              :src="folder.cover"
              height="150"
              fit="cover"
              loading-icon="photo"
              :show-loading="true">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
            <div class="folder-name">{{ folder.name }}</div>
          </van-grid-item>
        </van-grid>
      </template>

      <!-- 图片列表 -->
      <template v-else>
        <van-grid :column-num="3" :gutter="5">
          <van-grid-item
            v-for="(img, index) in selectedFolder.images"
            :key="index"
            @click="showPreview(selectedFolder.images, index)"
          >
            <van-image
              :src="img"
              height="100"
              fit="cover"
              loading-icon="photo"
              :show-loading="true"
            >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          </van-grid-item>
        </van-grid>
      </template>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
}

.folder-name {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}

.photo-album-container {
  padding-top: 20px;
}

/* 加载状态样式 */
:deep(.van-image__loading) {
  background-color: #f7f8fa;
  --van-loading-icon-size: 30px;
  --van-loading-icon-color: #969799;
}

/* 图片容器圆角 */
.van-grid-item__content {
  border-radius: 8px;
  overflow: hidden;
}
</style>
