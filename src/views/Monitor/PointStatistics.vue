<template>
  <div class="point_statistics">
    <div class="inner">
        <!-- 标题 -->
        <h3 class="title">点位分布统计</h3>
        <!-- 图表 -->
        <div class="echarts">
            <!-- 饼状图 -->
            <div class="echarts_point_main"></div>
            <!-- 数据 -->
            <div class="data">
                <div class="dataItem">
                    <h4 class="number">{{processNum(32011)}}</h4>
                    <span class="text"><i class="icon-dot"></i>点位总数</span>
                </div>
                <div class="dataItem">
                    <h4 class="number">{{processNum(418)}}</h4>
                    <span class="text"><i class="icon-dot"></i>本月新增</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import  type { EChartsOption } from '@/utils/echarts.ts';
import { processNum , initEcharts } from '@/hooks';
    //引入echarts
    const echarts = inject<any>('$echarts')

    //数据
    const echartsData = [
        { value: 20, name: '云南' },
        { value: 26, name: '北京' },
        { value: 24, name: '山东' },
        { value: 25, name: '河北' },
        { value: 20, name: '江苏' },
        { value: 25, name: '浙江' },
        { value: 30, name: '四川' },
        { value: 42, name: '湖北' }
    ]

    //颜色
    const colorList = [
        "#006cff",
        "#60cda0",
        "#ed8884",
        "#ff9f7f",
        "#0096ff",
        "#9fe6b8",
        "#32c5e9",
        "#1d9dff"
    ]

    //配置项
    let option: EChartsOption = {
        tooltip: {
            trigger: "item",
            // 格式化提示内容：
            // a 代表series系列图表名称  
            // b 代表series数据名称 data 里面的name    
            // c 代表series数据值 data 里面的value   
            // d代表  当前数据/总数据的比例
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 颜色
        color: colorList,
        series: [
            {
                name: '面积模式',
                type: 'pie',
                //内外圆半径
                radius: ["10%", "70%"],
                center: ['50%', '50%'],
                roseType: "radius",
                // 文本标签控制饼形图文字的相关样式
                label: {
                    fontSize: 10
                },
                // 引导线调整
                labelLine:{
                    // 连接扇形图线长
                    length: 6,
                    // 连接文字线长
                    length2: 8,
                },
                data: echartsData.map((item, index) => {
                    return {
                        ...item,
                        label: {
                            color: colorList[index]
                        }
                    }
                })
                
            }
        ]
    };

    //初始化echarts
    onMounted(() => {
        initEcharts(echarts,option,'echarts_point_main')
    })
</script>

<style lang="scss" scoped> 
@import '../../styles/mixins.scss'; 
    .point_statistics{
        height: 340px;
        @include image-border;
        .inner{
            @include image-border-inner;
            display: flex;
            flex-direction: column;
            //标题
            .title{
                color: #fff;
            }
            .echarts{
                margin-top: 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .echarts_point_main{
                    width: 312px;
                    height: 240px;
                    margin-left: -10px;
                }
                .data{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 168px;
                    height: 100%;
                    padding: 36px 30px;
                    box-sizing: border-box;
                    background: url(../../assets/images/rect.png) no-repeat;
                    background-size: cover;
                    background-position: center;
                    .dataItem{
                        display: flex;
                        flex-direction: column;
                        &:nth-child(1) .text .icon-dot{
                            color: #ed3f35;
                        }
                        &:nth-child(2) .text .icon-dot{
                            color: #eacf19;
                        }
                        .number {
                            font-size: 28px;
                            color: #fff;
                            margin-bottom: 12px;
                        }
                        .text{
                            font-size: 16px;
                            color: #4c9bfd;
                            .icon-dot{
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
