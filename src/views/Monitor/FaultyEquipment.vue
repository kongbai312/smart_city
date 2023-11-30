<template>
  <div class="faulty_equipment">
    <div class="inner">
        <!-- 标签 -->
        <div class="tabs">
            <span 
                class="text" 
                :class="{actived:equipmentState === 'faulty'}" 
                @click="checkEquipment('faulty')">故障设备监控
            </span>
            <span 
                class="text" 
                :class="{actived:equipmentState === 'abnormal'}"
                @click="checkEquipment('abnormal')"
            >异常设备监控</span>
        </div>
        <!-- 内容 -->
        <div class="content">
            <!-- 头部 -->
            <div class="header">
                <span class="col">异常时间</span>
                <span class="col">设备地址</span>
                <span class="col">异常代码</span>
            </div>
            <!-- 设备信息 -->
            <div class="equipment-info">
                <div class="rolling">
                    <div class="row" v-for="(item,index) in 20" :key="index">
                        <span class="col">20180701</span>
                        <span class="col" title="深圳市南山区西丽万科云城C号楼4层512">深圳市南山区西丽万科云城C号楼4层512</span>
                        <span class="col">1000001</span>
                        <span class="icon-dot"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
    //当前查看的设备 faulty为故障 abnormal为异常
    let equipmentState = ref('faulty')

    //查看设备
    const checkEquipment = ( state : string ) => {
        // 点击同一按钮，直接返回
        if(state === equipmentState.value) return
        // 更改状态
        equipmentState.value = state
    }
</script>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

@keyframes move {
  0% {
  }
  100% {
    transform: translateY(-50%);
  }
}

// 故障设备
    .faulty_equipment{
        height: 480px;
        @include image-border;
        .inner{
            @include image-border-inner;
            padding: 24px 0;
            display: flex;
            flex-direction: column;
            // 标签栏
            .tabs{
                padding: 0 36px;
                color: #1950c4;
                margin-bottom: 18px;
                .text{
                    font-size: 18px;
                    padding: 0 27px;
                    cursor: pointer;
                }
                & .text:nth-of-type(1){
                    padding-left: 0;
                    border-right: 2px solid #00f2f1;
                }
                .actived{
                    color: #fff;
                }
            }
            //内容
            .content{
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                //头部
                .header{
                    background-color: rgba(255, 255, 255, 0.1);
                    padding: 12px 36px;
                    color: #68d8fe;
                    font-size: 14px;
                    display: flex;
                    justify-content: space-between;
                    .col{
                        display: inline-block;
                    }
                    & .col:nth-of-type(1){
                        width: 80px;
                    }
                    & .col:nth-of-type(2){
                        width: 200px;
                    }
                    & .col:nth-of-type(3){
                        width: 80px;
                    }
                }
                
                //设备信息
                .equipment-info{
                    flex: 1;
                    overflow: hidden;
                    .rolling{
                        animation: move 15s linear infinite;
                        &:hover{
                            animation-play-state: paused;
                        }
                        .row{
                            position: relative;
                            padding: 12px 36px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            &:hover{
                                &{
                                    background-color:  rgba(255, 255, 255, 0.1);
                                    .col{
                                        color: #68d8fe;
                                    }
                                    .icon-dot{
                                        opacity: 1;
                                    }
                                }
                            }
                            .col{
                                display: inline-block;
                                font-size: 12px;
                                color: #61a8ff;
                            }
                            & .col:nth-child(1){
                                width: 80px;
                            }
                            & .col:nth-child(2){
                                width: 200px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                            & .col:nth-child(3){
                                width: 80px;
                            }
                            .icon-dot{
                                position: absolute;
                                left: 10px;
                                opacity: 0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
