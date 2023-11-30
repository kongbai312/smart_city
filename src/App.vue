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
    font-size: 10.24px !important;
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
</style>