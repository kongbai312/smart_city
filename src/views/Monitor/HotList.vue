<template>
    <div class="hot_list">
        <div class="inner">
            <!-- 全国热榜 -->
            <div class="all_nation">
                <h3 class="title">全国热榜</h3>
                <div class="data">
                    <div class="dataItem"><i class="icon-cup1" style="color: #d93f36;"></i>可爱多</div>
                    <div class="dataItem"><i class="icon-cup2" style="color: #68d8fe;"></i>娃哈啥</div>
                    <div class="dataItem"><i class="icon-cup3" style="color: #4c9bfd;"></i>喜之郎</div>
                </div>
            </div>
            <!-- 各省热销 -->
            <div class="province">
                <h3 class="title">各省热销</h3>
                <div class="data">
                    <div class="dataItem" 
                        :class="{active:item.city === activeProvince}" 
                        v-for="(item,index) in hotData" 
                        :key="index"
                        @mouseenter="mouseenterFun(item.city)"
                        @mouseleave="openTimer"
                    >
                        <span class="text">{{item.city}}</span>
                        <span class="number">
                            {{processNum(item.sales)}}
                            <i :class="{'icon-up':item.flag,'icon-down':!item.flag}"></i>
                        </span>
                    </div>
                </div>
            </div>
            <!-- 近30日 -->
            <div class="date_month">
                <h3 class="title">// 近30日 //</h3>
                <div class="data">
                    <div class="dataItem" v-for="(item,index) in activeProvinceData" :key="index">
                        <span class="text">{{item.name}}</span>
                        <span class="number">
                            {{processNum(item.num)}}
                            <i :class="{'icon-up':item.flag,'icon-down':!item.flag}"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { processNum } from '@/hooks';
    //热榜数据
    let hotData = [
      {
        city: '北京',  // 城市
        sales: 25179,  // 销售额
        flag: true, //  上升还是下降
        brands: [   //  品牌种类数据
          { name: '可爱多', num: 9086, flag: true },
          { name: '娃哈哈', num: 8341, flag: true },
          { name: '喜之郎', num: 7407, flag: false },
          { name: '八喜', num: 6080, flag: false },
          { name: '小洋人', num: 6724, flag: false },
          { name: '好多鱼', num: 2170, flag: true },
        ]
      },
      {
        city: '河北',
        sales: 23252,
        flag: false,
        brands: [
          { name: '可爱多', num: 3457, flag: false },
          { name: '娃哈哈', num: 2124, flag: true },
          { name: '喜之郎', num: 8907, flag: false },
          { name: '八喜', num: 6080, flag: true },
          { name: '小洋人', num: 1724, flag: false },
          { name: '好多鱼', num: 1170, flag: false },
        ]
      },
      {
        city: '上海',
        sales: 20760,
        flag: true,
        brands: [
          { name: '可爱多', num: 2345, flag: true },
          { name: '娃哈哈', num: 7109, flag: true },
          { name: '喜之郎', num: 3701, flag: false },
          { name: '八喜', num: 6080, flag: false },
          { name: '小洋人', num: 2724, flag: false },
          { name: '好多鱼', num: 2998, flag: true },
        ]
      },
      {
        city: '江苏',
        sales: 23252,
        flag: false,
        brands: [
          { name: '可爱多', num: 2156, flag: false },
          { name: '娃哈哈', num: 2456, flag: true },
          { name: '喜之郎', num: 9737, flag: true },
          { name: '八喜', num: 2080, flag: true },
          { name: '小洋人', num: 8724, flag: true },
          { name: '好多鱼', num: 1770, flag: false },
        ]
      },
       {
        city: '山东',
        sales: 20760,
        flag: true,
        brands: [
          { name: '可爱多', num: 9567, flag: true },
          { name: '娃哈哈', num: 2345, flag: false },
          { name: '喜之郎', num: 9037, flag: false },
          { name: '八喜', num: 1080, flag: true },
          { name: '小洋人', num: 4724, flag: false },
          { name: '好多鱼', num: 9999, flag: true },
        ]
      }
    ]

    //当前激活的省份
    let activeProvince =ref(hotData[0].city)

    //切换省份
    const changeProvince = ( city : string ) => {
        activeProvince.value = city
    } 

    //当前省份的数据
    let activeProvinceData = computed(() => {
        return hotData.find(item => item.city === activeProvince.value)!.brands
    }) 
        

    //定时器 自动切换数据
    let timer : any
    //轮播时间 单位：毫秒
    let time = 5000
    //切换顺序
    let sortArr = ['北京','河北','上海','江苏','山东']
    //自动切换
    const autoChange = () => {
        //清除定时器
        timer = null
        //当前所在的排序位置
        let index = sortArr.findIndex(item => item === activeProvince.value)
        //如果当前已经在最后一个了，赋值变成第一个
        if(index === (sortArr.length - 1)){
            activeProvince.value = sortArr[0]
        }
        else{//否则赋值下一个
            activeProvince.value = sortArr[index + 1]
        }
        //修改当前数据
        changeProvince(activeProvince.value)
        //进入下一轮
        timer = setTimeout(autoChange,time)
    }
    //鼠标移入
    const mouseenterFun = ( city : string ) => {
        //清空定时器
        closeTimer()
        //修改当前省份
        changeProvince(city)
    }
    //开启定时器
    const openTimer = () => {
        // 开启定时器
        timer = setTimeout(autoChange,time)
    }
    //清除定时器
    const closeTimer = () => {
        //清空定时器
        clearTimeout(timer)
    }
    onMounted(() => {
        //开启定时器
        openTimer()
    })
    onBeforeUnmount(() => {
        //清除定时器
        closeTimer()
    })
</script>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

.hot_list {
    height: 280px;
    @include image-border;

    .inner {
        @include image-border-inner;
        display: flex;

        // 全国热榜
        .all_nation {
            width: 168px;
            display: flex;
            flex-direction: column;

            .title {
                font-size: 20px;
                color: #fff;
                font-weight: 400;
            }

            .data {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding-left: 12px;
                margin-top: 12px;

                .dataItem {
                    color: #4c9bfd;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    i {
                        font-size: 36px;
                        margin-right: 12px;
                    }
                }
            }
        }
        // 各省热销
        .province{
            flex: 1;
            display: flex;
            flex-direction: column;
            .title {
                height: 18px;
                line-height: 18px;
                font-size: 20px;
                color: #fff;
                font-weight: 400;
            }
            .data{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-top: 14px;
                margin-bottom: 14px;
                .dataItem{
                    display: flex;
                    justify-content: space-between;
                    color: #0bace6;
                    padding: 10px 12px;
                    .icon-up{
                        color: #dc3c33;
                    }
                    .icon-down{
                        color: #36be90;
                    }
                    i{
                        display: inline-block;
                        transform: scale(0.8);
                        text-decoration: none;
                    }
                    span{
                        display: block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .active{
                    color: #a3c6f2;
                    background-color: rgba(10, 67, 188, 0.2);
                }
            }
        }
        // 近30日
        .date_month{
            flex: 1;
            display: flex;
            flex-direction: column;
            .title{
                height: 18px;
                line-height: 18px;
                font-size: 14px;
                color: #0bace6;
                text-align: right;
            }
            .data{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                background-color: rgba(10, 67, 188, 0.2); 
                margin-top: 14px;        
                .dataItem{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #52ffff;
                    padding: 10px 14px;
                    .icon-up{
                        color: #dc3c33;
                    }
                    .icon-down{
                        color: #36be90;
                    }
                    i{
                        display: inline-block;
                        transform: scale(0.8);
                        text-decoration: none;
                    }
                    span{
                        display: block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 1600px) {
  .hot_list span {
    transform: scale(0.9);
  }
}
</style>
