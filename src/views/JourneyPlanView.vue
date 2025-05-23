<script setup lang="ts">
const onClickLeft = () => {
  history.back()
};
</script>

<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="行程规划">
    </van-nav-bar>
  </div>
</template>

<style scoped>
.deepseek-btn {
  background: #2d5cf6;
  color: white;
  border-radius: 8px;
}

.doubao-btn {
  background: #ff6b6b;
  color: white;
  border-radius: 8px;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .van-button {
    padding: 0 12px;
    font-size: 12px;
  }
}
</style>
