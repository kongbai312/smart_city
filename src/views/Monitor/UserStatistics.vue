<template>
  <div class="user_statistics">
    <div class="inner">
      <!-- 标题 -->
      <h3 class="title">全国用户总量统计</h3>
      <!-- 图表 -->
      <div class="echarts">
        <!-- 柱状图 -->
        <div class="echarts_user_main"></div>
        <!-- 数据 -->
        <div class="data">
          <div class="dataItem">
            <span class="number">{{ processNum(120899) }}</span>
            <span class="text"><i class="icon-dot"></i>用户总量</span>
          </div>
          <div class="dataItem">
            <span class="number">{{ processNum(248) }}</span>
            <span class="text"><i class="icon-dot"></i>本月新增</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { processNum, initEcharts } from '@/hooks';

//引入echarts
const echarts = inject<any>('$echarts')

// pxAxis
let dataAxis = ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆']
// 数据
let data = [2100, 1900, 1700, 1560, 1400, 1200, 1200, 1200, 900, 750, 600, 480, 240]
let yMax = 2500;
// let dataShadow = new Array(data.length).fill(yMax);

//隐藏柱子的样式
let item = {
  name: "",
  value: 1200,
  // 1. 修改当前柱形的样式
  itemStyle: {
    color: "#254065"
  },
  // 2. 鼠标放到柱子上不想高亮显示
  emphasis: {
    itemStyle: {
      color: "#254065"
    }
  },
  // 3. 鼠标经过柱子不显示提示框组件
  tooltip: {
    extraCssText: "opacity: 0"
  }
};
let dataHaveItem = data.map(num => {
  return num === 1200 ? item : num
})

let option = {
  title: {
    show: false,
    text: '全国用户总量统计',
  },
  xAxis: {
    type: "category",
    data: dataAxis,
    axisLabel: {
      color: "#4c9bfd"
    },
    axisTick: {
      alignWithLabel: false,
      show: false
    },
    axisLine: {
      lineStyle: {
        color: "rgba(0, 240, 255, 0.3)"
        // width: 3
      }
    },
  },
  yAxis: [
    {
      type: "value",
      axisTick: {
        alignWithLabel: false,
        // 把y轴的刻度隐藏起来
        show: false
      },
      axisLabel: {
        color: "#4c9bfd",
      },
      // y轴这条线的颜色样式
      axisLine: {
        lineStyle: {
          color: "rgba(0, 240, 255, 0.3)"
          // width: 3
        }
      },
      // y轴分割线的颜色样式
      splitLine: {
        lineStyle: {
          color: "rgba(0, 240, 255, 0.3)"
        }
      }
    }
  ],
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  tooltip: {
    trigger: "item"
  },
  grid: {
    left: "0%",
    right: "3%",
    bottom: "3%",
    top: "4%",
    //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
    containLabel: true,
    // 是否显示直角坐标系网格
    show: true,
    //grid 四条边框的颜色
    borderColor: "rgba(0, 240, 255, 0.3)"
  },
  series: [
    {
      type: 'bar',
      showBackground: true,
      name: "直接访问",
      barWidth: "60%",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#00fffb" }, // 0 起始颜色
          { offset: 1, color: "#0061ce" } // 1 结束颜色
        ])
      },
      emphasis: {
        trigger: "item",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: dataHaveItem
    }
  ]
};

// 能够点击或者滚动伸缩
const zoomSize = 6;

const myChartClick = (myChart: any) => {
  myChart.on('click', function (params: any) {
    // console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    // console.log(dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)])
    myChart.dispatchAction({
      type: 'dataZoom',
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
  });
}


//echarts初始化
onMounted(() => {
  let myChart = initEcharts(echarts, option, 'echarts_user_main')
  //给mychart添加点击事件
  myChartClick(myChart)
})

</script>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

.user_statistics {
  height: 340px;
  @include image-border;

  .inner {
    @include image-border-inner;
    display: flex;
    flex-direction: column;

    // 标题
    .title {
      color: #fff;
    }

    //图表
    .echarts {
      display: flex;
      margin-top: 24px;

      .echarts_user_main {
        width: 588px;
        height: 240px;
      }

      // 数据
      .data {
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

        .dataItem {
          display: flex;
          flex-direction: column;

          &:nth-child(1) .text .icon-dot {
            color: #ed3f35;
          }

          &:nth-child(2) .text .icon-dot {
            color: #eacf19;
          }

          .number {
            font-size: 28px;
            color: #fff;
            margin-bottom: 12px;
          }

          .text {
            font-size: 16px;
            color: #4c9bfd;

            .icon-dot {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
