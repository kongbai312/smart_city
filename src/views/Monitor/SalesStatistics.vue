<template>
    <div class="sales_statistics"  @mouseenter="closeTimer" @mouseleave="openTimer">
        <div class="inner">
            <!-- 标签 -->
            <div class="tabs">
                <h3 class="title">销售额统计</h3>
                <span 
                    class="tab" 
                    :class="{ active: activeTime === item.id }" 
                    v-for="item in data" 
                    :key="item.id"
                    @click="salesChange(item.id)"
                >{{ item.name }}</span>
            </div>
            <!-- 图表 -->
            <div class="echarts">
                <!-- 折线图 -->
                <div class="echarts_sales_main"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { initEcharts } from '@/hooks';

//引入echarts
const echarts = inject<any>('$echarts')

let data: Record<string, { id: string, name: string, expected: number[], actual: number[] }> = {
    year: {
        id: 'year',
        name: '年',
        expected: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        actual: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
    },
    quarter: {
        id: 'quarter',
        name: '季',
        expected: [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
        actual: [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
    },
    month: {
        id: 'month',
        name: '月',
        expected: [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
        actual: [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
    },
    week: {
        id: 'week',
        name: '周',
        expected: [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
        actual: [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
    }
}

let xAxisData = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

//当前的时间
let activeTime = ref('year')

let option = {
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
        // 通过坐标轴来触发
        trigger: "axis"
    },
    legend: {
        // 距离容器10%
        right: "10%",
        // 修饰图例文字的颜色
        textStyle: {
            color: "#4c9bfd"
        }
        // 如果series 里面设置了name，此时图例组件的data可以省略
        // data: ["邮件营销", "联盟广告"]
    },
    grid: {
        top: "20%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        show: true,
        borderColor: "#012f4a",
        containLabel: true
    },

    xAxis: {
        type: "category",
        boundaryGap: false,
        data: xAxisData,
        // 去除刻度
        axisTick: {
            show: false
        },
        // 修饰刻度标签的颜色
        axisLabel: {
            color: "#4c9bfd"
        },
        // 去除x坐标轴的颜色
        axisLine: {
            show: false
        }
    },
    yAxis: {
        type: "value",
        name:'单位：万元',
        nameGap: 10,  // 设置名称与坐标轴之间的距离为 2px
        nameTextStyle: {
            fontSize: 10,
            color: '#4996f5'
        },
        // 去除刻度
        axisTick: {
            show: false
        },
        // 修饰刻度标签的颜色
        axisLabel: {
            color: "#4c9bfd"
        },
        // 修改y轴分割线的颜色
        splitLine: {
            lineStyle: {
                color: "#012f4a"
            }
        }
    },
    series: [
        {
            name: "预期销售额",
            type: "line",
            stack: "总量",
            // 是否让线条圆滑显示
            smooth: true,
            data: data.year.expected
        },
        {
            name: "实际销售额",
            type: "line",
            stack: "总量",
            smooth: true,
            data: data.year.actual
        }
    ]
}

//echarts实例
let myCharts: any
//echarts初始化
onMounted(() => {
    myCharts = initEcharts(echarts, option, 'echarts_sales_main')
})

//点击切换图表数据
const salesChange = (id: string) => {
    activeTime.value = id
    //修改option
    option.series[0].data = data[activeTime.value].expected
    option.series[1].data = data[activeTime.value].actual
    //更新图表
    myCharts.setOption(option)
}

//定时器 自动切换数据
let timer: any
//轮播时间 单位：毫秒
let time = 5000
//切换顺序
let sortArr = ['year','quarter','month','week']
const autoChange = () => {
    //清除定时器
    timer = null
    //当前所在的排序位置
    let index = sortArr.findIndex(item => item === activeTime.value)
    //如果当前已经在最后一个了，赋值变成第一个
    if(index === (sortArr.length - 1)){
        activeTime.value = sortArr[0]
    }
    else{//否则赋值下一个
        activeTime.value = sortArr[index + 1]
    }
    //修改当前时间
    salesChange(activeTime.value) 
    // 进入下一轮 
    timer = setTimeout(autoChange, time)
}
//开启定时器
const openTimer = () => {
    // 开启定时器
    timer = setTimeout(autoChange, time)
}
//清除定时器
const closeTimer = () => {
    //清空定时器
    clearTimeout(timer)
}
onMounted(() => {
    // 开启定时器
    openTimer()
})
onBeforeUnmount(() => {
    //清空定时器
    closeTimer()
})
</script>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

.sales_statistics {
    height: 248px;
    @include image-border;

    .inner {
        @include image-border-inner;
        display: flex;
        flex-direction: column;

        // 标签
        .tabs {
            display: flex;
            align-items: center;
            height: 18px;

            .title {
                padding-right: 18px;
                border-right: 2px solid #00f2f1;
                font-weight: 400;
            }

            .tab {
                padding: 4px;
                font-size: 16px;
                color: #0bace6;
                border-radius: 3px;
                margin-left: 21px;
                cursor: pointer;
            }

            .active {
                background-color: #4c9bfd;
                color: #fff;
            }
        }

        // 图表
        .echarts {
            flex: 1;
            padding-top: 15px;

            .echarts_sales_main {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
