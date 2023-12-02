<template>
    <div class="quarter_container">
        <div class="inner">
            <!-- 标题 -->
            <h3 class="title">一季度销售进度</h3>
            <!-- 图表 -->
            <div class="echarts">
                <div class="echarts_quarter_main"></div>
            </div>
            <!-- 数据 -->
            <div class="data">
                <div class="dataItem">
                    <h4 class="number">{{processNum(1321)}}</h4>
                    <span class="text"><i class="icon-dot"></i>销售额(万元)</span>
                  </div>
                  <div class="dataItem">
                    <h4 class="number">150%</h4>
                    <span class="text"><i class="icon-dot"></i>同比增长</span>
                  </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { processNum, initEcharts } from '@/hooks';

//引入echarts
const echarts = inject<any>('$echarts')

let option = {
    title: {
        text: '80%',
        x: "46%",
        y: "46%",
        textAlign: "center",
        textStyle: {
            fontWeight: "normal",
            fontSize: "16",
            fontFamily: "SourceHanSansCN-Medium",
            color: "#66FFFF",
        },
    },
    series: [
        {
            name: "销售进度",
            type: "pie",
            radius: ["120%", "140%"],
            // 移动下位置  套住50%文字
            center: ["50%", "80%"],
            //是否启用防止标签重叠策略
            // avoidLabelOverlap: false,
            labelLine: {
                show: false
            },
            // 饼形图的起始角度为 180， 注意不是旋转角度
            startAngle: 180,
            // 鼠标经过不需要放大偏移图形
            hoverOffset: 0,
            data: [
                {
                    value: 100,
                    itemStyle: {
                        // 颜色渐变#00c9e0->#005fc1
                        color: new echarts.graphic.LinearGradient(
                            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                                { offset: 1, color: "#005fc1" } // 1 结束颜色
                            ]
                        )
                    }
                },
                {
                    value: 100,
                    itemStyle: {
                        color: "#12274d"
                    }
                },
                {
                    value: 200,
                    itemStyle: {
                        color: "transparent"
                    }
                }
            ]
        }
    ]
};

//echarts初始化
onMounted(() => {
    initEcharts(echarts, option, 'echarts_quarter_main')
})
</script>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

.quarter_container {
    flex: 1;
    height: 232px;

    @include image-border;

    .inner {
        @include image-border-inner;
        display: flex;
        flex-direction: column;
        margin: 0 -6px;

        // 标题
        .title {
            color: #fff;
            font-size: 20px;
            margin-bottom: 5px;
        }
        // 图表
        .echarts {
            flex: 1;
            padding-top: 18px;

            .echarts_quarter_main {
                height: 84px;
            }
        }
        // 数据
        .data{
            display: flex;
            justify-content: space-between;
            .dataItem{
                width: 50%;
                &:first-child .text .icon-dot{
                    color: #6acca3;
                }
                &:last-child .text .icon-dot{
                    color: #ed3f35;
                }
                .number{
                    color: #fff;
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .text{
                    display: block;
                    width: 100%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    color: #4c9bfd;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
