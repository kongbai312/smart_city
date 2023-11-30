<template>
  <div class="device_count">
        <div class="inner">
        <div class="innerItem" v-for="(item,index) in deviceData" :key="index">
            <h4 class="text">{{processNum(item.count)}}</h4>
            <p class="name"><i class="icon-dot"></i>{{item.name}}</p>
        </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { processNum } from '@/hooks';
    //设备数据
    let deviceData = ref([
        {
            count: 2190,
            name : '设备总数'
        },
        {
            count: 190,
            name : '季度新增'
        },
        {
            count: 3001,
            name : '运营设备'
        },
        {
            count: 108,
            name : '异常设备'
        }
    ])
</script>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';
// 装置数量
.device_count{
    height: 110px;
    @include image-border;
    .inner{
        @include image-border-inner;
        display: flex;
        justify-content: space-around;
        .innerItem{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            &:nth-of-type(1) .name i{
                color: #4c9bfd;
            }
            &:nth-of-type(2) .name i{
                color: #6acca3;
            }
            &:nth-of-type(3) .name i{
                color: #6acca3;
            }
            &:nth-of-type(4) .name i{
                color: #ed3f35;
            }
            .text{
                font-size: 28px;
                color: #fff;
                text-align: center;
            }
            .name{
                font-size: 16px;
            }
        }
    }
}    

@media screen and (max-width: 1024px) {
    .text{
        font-size: 18px !important;
    }
    .name{
        font-size: 10px !important;
    }
}
</style>
