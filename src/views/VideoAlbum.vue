<script setup lang="ts">
import { ref, computed} from 'vue';
// 配置播放器
const playerOptions = ref({
  playbackRates: [0.5, 1, 1.5, 2], // 播放速度
  controls: true, // 显示控件
  fluid: true, // 流体布局
  responsive: true,
  preload: 'auto', // 预加载
  sources: [] as Array<{ type: string; src: string }>, // 初始化空源
  controlBar: {
    remainingTimeDisplay: false, // 隐藏剩余时间
  }
});
// 视频播放状态
const playerRef = ref<any>(null);
const showPlayer = ref(false);
const currentVideo = ref('');

// 播放视频方法
const playVideo = (url: string) => {
  console.log('播放视频：', url);
  // 销毁旧实例
  if (playerRef.value) {
    playerRef.value = null;
  }
  currentVideo.value = url;
  playerOptions.value = {
    ...playerOptions.value,
    sources: [{
      type: 'video/mp4',
      src: url
    }]
  };
  showPlayer.value = true;
};
// 播放器准备回调
const onPlayerReady = (player: any) => {
  playerRef.value = player;
};
// 修改为视频数据结构
interface VideoFolder {
  id: number;
  name: string;
  cover: string;
  videos: string[]; // 视频URL数组
}
// 模拟数据
const folders = ref<VideoFolder[]>([
  {
    id: 1,
    name: '神龙架之旅',
    cover: 'http://www.wp520.online/images/cs.jpg',
    videos: [
      'http://www.wp520.online/videos/1.mp4',
      'http://www.wp520.online/videos/2.mp4',
    ]
  },
  {
    id: 2,
    name: '长沙之旅',
    cover: 'https://example.com/cover2.jpg',
    videos: [
      'http://www.wp520.online/videos/1.mp4',
      'https://example.com/photo2-2.jpg'
    ]
  },
  {
    id: 3,
    name: '宜昌，襄阳之旅',
    cover: 'https://example.com/cover2.jpg',
    videos: [
      'https://example.com/photo2-1.jpg',
      'https://example.com/photo2-2.jpg'
    ]
  },
  {
    id: 4,
    name: '南京之旅',
    cover: 'https://example.com/cover2.jpg',
    videos: [
      'https://example.com/photo2-1.jpg',
      'https://example.com/photo2-2.jpg'
    ]
  },
  {
    id: 5,
    name: '岳阳之旅',
    cover: 'https://example.com/cover2.jpg',
    videos: [
      'https://example.com/photo2-1.jpg',
      'https://example.com/photo2-2.jpg'
    ]
  }
]);

const selectedFolder = ref<null | VideoFolder>(null);

// 动态导航标题
const navTitle = computed(() =>
  selectedFolder.value ? selectedFolder.value.name : '旅行视频'
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

      <!-- 视频列表 -->
      <template v-else>
        <van-grid :column-num="3" :gutter="5">
          <van-grid-item
            v-for="(videoUrl, index) in selectedFolder.videos"
            :key="index"
            @click="playVideo(videoUrl)"
          >
            <div class="video-thumb">
              <van-image
                :src="selectedFolder.cover"
                height="100"
                fit="cover"
              >
                <!-- 添加播放按钮 -->
                <template #default>
                  <div class="play-button">
                    <van-icon name="play-circle" size="24" color="#fff" />
                  </div>
                </template>
              </van-image>
            </div>
          </van-grid-item>
        </van-grid>
        <van-popup
          v-model:show="showPlayer"
          round
          position="bottom"
          :style="{ height: '80%', width: '100%' }"
        >
        <div class="player-container">
          <vue-video-player
            :options="playerOptions"
            :key="currentVideo"
            class="vjs-custom-skin"
            @ready="onPlayerReady"
          />
        </div>
      </van-popup>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* 新增视频相关样式 */
.video-thumb {
  position: relative;
}
.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

/* 视频弹窗样式 */
:deep(.video-dialog) {
  width: 90%;
  max-width: 800px;
  background: black;


}
.container {
  padding: 10px;
}
.van-dialog__header {
    color: white;
  }

  video {
    background: black;
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
