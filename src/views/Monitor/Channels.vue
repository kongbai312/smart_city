<template>
    <div class="channels_container">
        <div class="inner">
            <h3 class="title">渠道分布</h3>
            <div class="echarts">
                <div class="echarts_channels_main"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { initEcharts } from '@/hooks';

//引入echarts
const echarts = inject<any>('$echarts')


var indicator = [
    { name: "机场", max: 100 },
    { name: "商场", max: 100 },
    { name: "火车站", max: 100 },
    { name: "汽车站", max: 100 },
    { name: "地铁", max: 100 }
]
let dataArr = [
    {
        value: [90, 37, 56, 66, 34],
        itemStyle: {
            lineStyle: {
                color: '#4A99FF',
                // shadowColor: '#4A99FF',
                shadowBlur: 10,
            },
        },
        areaStyle: {
            // 单项区域填充样式
            color: {
                type: 'linear',
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                    {
                        offset: 0,
                        color: '#4A99FF'
                    }, 
                    {
                        offset: 0.5,
                        color: 'rgba(0,0,0,0)'
                    }, 
                    {
                        offset: 1,
                        color: '#4A99FF'
                    }
                ],
                globalCoord: false
            },
            opacity: 1 // 区域透明度
        }
    }
]
let colorArr = ['#4A99FF', '#4BFFFC']; //颜色
let option = {
    backgroundColor: 'transparent',
    color: colorArr,
    radar: {
        shape: 'circle',
        axisName: {
            color: '#4c9bfd',
            fontSize: 10
        },
        axisNameGap: 4,
        indicator: indicator,
        splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: { // 分隔区域的样式设置。
                color: [
                    'rgba(255,255,255,0)', 
                    'rgba(255,255,255,0)'
                ], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
        },
        axisLine: { //指向外圈文本的分隔线样式
            lineStyle: {
                color: '#153269'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#113865', // 分隔线颜色
                width: 1, // 分隔线线宽
            }
        },
    },
    tooltip: {
      show: true,
      // 控制提示框组件的显示位置
      position: ["60%", "10%"]
    },
    series: [{
        name: "北京",
        type: 'radar',
        symbolSize: 5,
        data: dataArr,
        // 设置图形标记 （拐点）
        symbol: "circle",
        // 让小圆点显示数据
        label: {
            position:'bottom',
            show: true,
            fontSize: 10,
            color:'#fff'
        },
    }]
};

//echarts初始化
onMounted(() => {
    initEcharts(echarts, option, 'echarts_channels_main')
})
</script>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

.channels_container {
    flex: 1;
    height: 232px;
    margin-right: 20px;
    @include image-border;

    .inner {
        @include image-border-inner;

        // 标题
        .title {
            color: #fff;
            font-size: 20px;
            margin-bottom: 5px;
        }

        .echarts {
            .echarts_channels_main {
                height: 168px;
                width: 100%;
            }
        }
    }
}
</style>
