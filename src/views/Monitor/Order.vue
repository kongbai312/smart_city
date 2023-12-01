<template>
    <div class="order_container">
        <div class="inner">
            <!-- 标签 -->
            <div class="tabs">
                <span 
                    class="tab"
                    :class="{active: activeTime === item.id}" 
                    @click="timeChange(item.id)"
                    v-for="item in orderData" 
                    :key="item.id"
                >{{item.time}}</span>
            </div>
            <!-- 数据 -->
            <div class="data">
                <div class="dataItem">
                    <span class="number">{{processNum(activeTimeInfo!.orders)}}</span>
                    <span class="text"><i class="icon-dot"></i>订单量</span>
                </div>
                <div class="dataItem">
                    <span class="number">{{processNum(activeTimeInfo!.amount)}}</span>
                    <span class="text"><i class="icon-dot"></i>销售额（万元）</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { processNum } from '@/hooks';
//订单数据
let orderData = ref([
    {
        id:1,
        time:'365天',
        orders: 20301987,
        amount: 99834
    },
    {
        id:2,
        time:'90天',
        orders: 301987,
        amount: 9834
    },
    {
        id:3,
        time:'30天',
        orders: 1987,
        amount: 3834
    },
    {
        id:4,
        time:'24小时',
        orders: 987, 
        amount: 834
    } 
])

    //当前的时间 1为365天 2为90天 3为30天 4为24小时
    let activeTime = ref(1)

    //当前时间的订单量，销售额信息
    let activeTimeInfo = computed(() => {
        return orderData.value.find( item => item.id === activeTime.value)
    })

    //时间切换
    const timeChange = ( id : number ) => {
        activeTime.value = id
    }

    //定时器 自动切换数据
    let timer : any
    //轮播时间 单位：毫秒
    let time = 5000
    const autoChange = () => {
        //清除定时器
        timer = null
        //修改当前时间
        timeChange(activeTime.value)
        if(activeTime.value < 4){
            activeTime.value ++
        }
        else{
            activeTime.value = 1
        }
        timer = setTimeout(autoChange,time)
    }
    onMounted(() => {
        // 开启定时器
        timer = setTimeout(autoChange,time)
    })
    onBeforeUnmount(() => {
        //清空定时器
        clearTimeout(timer)
    })
</script>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

.order_container {
    height: 150px;
    @include image-border;

    .inner {
        @include image-border-inner;

        // 标签
        .tabs {
            display: flex;
            align-items: center;

            .tab {
                display: inline-block;
                font-size: 18px;
                height: 18px;
                line-height: 18px;
                color: #1950c4;
                border-right: 2px solid #00f2f1;
                padding: 0 18px;
                cursor: pointer;

                &:first-of-type {
                    padding-left: 0;
                }

                &:last-of-type {
                    border-right: none;
                }
            }

            .active {
                color: #fff;
                font-size: 20px;
            }
        }

        // 数据
        .data {
            display: flex;
            margin-top: 20px;

            .dataItem {
                width: 50%;
                display: flex;
                flex-direction: column;

                &:first-child .text .icon-dot {
                    color: #ed3f35;
                }

                &:last-child .text .icon-dot {
                    color: #eacf19;
                }

                .number {
                    font-size: 28px;
                    color: #fff;
                    margin-bottom: 10px;
                }

                .text {
                    color: #4c9bfd;
                    font-size: 16px;

                    .icon-dot {
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
