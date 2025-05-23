<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const activeTab = ref(route.path)

// 路由同步
watch(() => route.path, (newPath) => {
  activeTab.value = newPath
})

// 处理导航切换
const onTabChange = (path: string) => {
  if (route.path !== path) {
    router.push(path)
  }
}
</script>

<template>
  <van-tabbar
    v-model="activeTab"
    @change="onTabChange"
    active-color="#3a7afe"
    inactive-color="#666"
    :fixed="true"
    :placeholder="true"
    :safe-area-inset-bottom="true"
    class="travel-tabbar"
  >
    <van-tabbar-item
      v-for="(item, index) in [
        {
          path: '/home',
          icon: 'home-o',       // 非激活图标
          activeIcon: 'home-o',   // 激活图标（不带 -o 后缀）
          text: '首页'
        },
        {
          path: '/map',
          icon: 'location-o',
          activeIcon: 'location',
          text: '旅游地图'
        },
        // {
        //   path: '/tools',
        //   icon: 'apps-o',
        //   activeIcon: 'apps-o',
        //   text: '小工具'
        // }
      ]"
      :key="index"
      :name="item.path"
    >
    <template #icon="props">
    <van-icon
      :name="props.active ? item.activeIcon : item.icon"
      class="custom-icon"
      :class="{ 'active': props.active }"
    />
  </template>
      <span class="tabbar-text">{{ item.text }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped lang="scss">
@use "sass:math" as math;

// 基于 375px 设计稿 (1rem = 37.5px)
$base-rem: 37.5;

@function rem($px) {
  @return math.div($px, $base-rem) * 1rem;
}

.travel-tabbar {
  // height: calc(#{rem(50)} + env(safe-area-inset-bottom));
  // // padding-bottom: env(safe-area-inset-bottom);
  // background-color: #fff;
  // box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);

  // 图标容器
  // :deep(.van-tabbar-item__icon) {
  //   margin-bottom: rem(4);
  //   position: relative;

  //   &::after {
  //     content: '';
  //     position: absolute;
  //     bottom: rem(-8);
  //     left: 50%;
  //     transform: translateX(-50%);
  //     width: rem(24);
  //     height: rem(3);
  //     background: #3a7afe;
  //     opacity: 0;
  //     transition: all 0.3s ease;
  //   }
  // }

  // 激活状态
  :deep(.van-tabbar-item--active) {
    .tabbar-text {
      font-weight: 600;
      color: #3a7afe;
    }

    .custom-icon {
      transform: translateY(rem(-5));
    }

    .van-tabbar-item__icon::after {
      opacity: 1;
    }
  }

  .custom-icon {
    width: rem(24);
    height: rem(24);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .tabbar-text {
    font-size: rem(12);
    transition: color 0.3s ease;
  }
}
.custom-icon {
  font-size: rem(22);  /* 调整图标大小 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
