<template>
  <div class="monitor">
    
    <!-- 内容部分 -->
    <div class="container">
      <!-- 左边屏幕 -->
      <div class="left">
        <!-- 装置总数 -->
        <DeviceCount></DeviceCount>
        <!-- 故障设备监视 -->
        <FaultyEquipment></FaultyEquipment>
        <!-- 点位分布统计 -->
        <PointStatistics></PointStatistics>
      </div>

      <!-- 中间屏幕 -->
      <div class="center">
        <!-- 地图区域 -->
        <MapRegion></MapRegion>
        <!-- 全国用户总量统计 -->
        <UserStatistics></UserStatistics>
      </div>

      <!-- 右边屏幕 -->
      <div class="right"></div>
    </div>

    <!-- 路由挂载点 -->
    <!-- <RouterView /> -->
  </div>
</template>

<script setup lang='ts'>
//    import { RouterView } from 'vue-router';
import DeviceCount from './DeviceCount.vue';
import FaultyEquipment from './FaultyEquipment.vue';
import PointStatistics from './PointStatistics.vue';
import MapRegion from './MapRegion.vue';
import UserStatistics from './UserStatistics.vue';
</script>

<style lang="scss" scoped>

  .monitor{
    min-width: 1024px;
    max-width: 1920px;
    min-height: 780px;
    padding: 80px 20px 0;
    background: url(../../assets/images/logo.png) no-repeat;
    background-size: contain;
    //内容
    .container{
      display: flex;
      //左边屏
      .left{
        flex: 3;
      }
      .center{
        flex: 4;
        margin: 32px 20px 0;
      }
      .right{
        flex: 3;
        background-color: red;
      }
    }
  }
</style>
