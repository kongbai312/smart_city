//将数字变为带千分位的字符串
export const processNum = ( number : number ) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//echarts初始化
export const initEcharts = ( echarts : any , option : any , className : string ) => {
    //获取Dom对象
    let echarsDom = document.getElementsByClassName(className)[0]!
    // 实例
    let myChart = echarts.init(echarsDom)
    //配置
    myChart.setOption(option)
    // 根据页面大小自动响应图表大小
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    return myChart
}
    