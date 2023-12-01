<template>
  <div class="channels_quarter">
    <!-- 频道分布 -->
    <Channels></Channels>
    <!-- 一季度销售 -->
    <Quarter></Quarter>
  </div>
</template>

<script setup lang='ts'>
   import Channels from './Channels.vue';
   import Quarter from './Quarter.vue'
</script>

<style lang="scss" scoped>
    .channels_quarter{
        display: flex;
    }
</style>
