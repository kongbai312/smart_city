<template>
  <!-- 路由挂载点 -->
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style lang="scss">
// 实现rem适配 固定设备在1024~1920之间
@media screen and (max-width: 1024px) {
  html{
    font-size: 19.2px !important;
  }
}

@media screen and (min-width: 1920px) {
  html {
    font-size: 19.2px !important;
  }
}

body{
  font-family: Arial, Helvetica, sans-serif;
  background: url(./assets/images/bg.jpg) no-repeat;
  background-size: cover;
}

/* Webkit浏览器 */
::-webkit-scrollbar {
  width: 6px;
}

/* 轨道 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}
/* 滑块 */
::-webkit-scrollbar-thumb {
  background-color: #0003;
  border-radius: 10px;
  transition: all .2s ease-in-out;
}

/* 鼠标悬停时的滑块样式 */
::-webkit-scrollbar-thumb:hover {
  background: #B2B2B2;
}
</style>