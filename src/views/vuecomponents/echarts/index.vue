<template>
  <div class="echartsClass">
    <!-- <div id="demo"></div> -->
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts'
  // 基于准备好的dom，初始化echarts实例
  // var myChart = echarts.init(document.getElementById('main'))

  // 指定图表的配置项和数据
  const optionsData = {
    title: {
      text: 'ECharts 入门示例',
    },
    //提示框组件
    tooltip: {
      trigger: 'axis', //axis适用于折线与柱状图; item用于散点图、饼图等无类目轴的图表;none 不触发
      //坐标轴指示器配置项
      axisPointer: {
        type: 'line', //line（直线指示器）shadow（阴影指示器）none（无指示器） cross（十字准星指示器）
      },
    },
    // 工具条
    toolbox: {
      feature: {
        //保存为图片
        saveAsImage: { show: true },
        // 配置项还原
        restore: { show: true },
      },
    },
    //图例
    legend: {
      show: true,
      icon: 'circle',
      width: '80%',
      textStyle: {
        fontWeight: 'bold',
        color: '#000000',
      },
    },
    xAxis: {
      name: '品牌',
      type: 'category',
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {
      name: '数量',
    },
    series: [],
  }
  const seriesData = {
    name: '',
    type: 'line',
    symbol: 'circle',
    symbolSize: 10,
    data: [],
  }
  const data = {
    衬衫: [
      { dataTime: 'one', dataVaue: '17' },
      { dataTime: 'two', dataVaue: '7' },
      { dataTime: 'three', dataVaue: '28' },
      { dataTime: 'fore', dataVaue: '35' },
      { dataTime: 'five', dataVaue: '23' },
      { dataTime: 'six', dataVaue: '15' },
      { dataTime: 'serven', dataVaue: '29' },
    ],
    羊毛衫: [
      { dataTime: 'one', dataVaue: '8' },
      { dataTime: 'two', dataVaue: '15' },
      { dataTime: 'three', dataVaue: '7' },
      { dataTime: 'fore', dataVaue: '26' },
      { dataTime: 'five', dataVaue: '14' },
      { dataTime: 'six', dataVaue: '15' },
      { dataTime: 'serven', dataVaue: '12' },
    ],
    雪纺衫: [
      { dataTime: 'one', dataVaue: '22' },
      { dataTime: 'two', dataVaue: '17' },
      { dataTime: 'three', dataVaue: '28' },
      { dataTime: 'fore', dataVaue: '25' },
      { dataTime: 'five', dataVaue: '13' },
      { dataTime: 'six', dataVaue: '23' },
      { dataTime: 'serven', dataVaue: '18' },
    ],
    裤子: [
      { dataTime: 'one', dataVaue: '13' },
      { dataTime: 'two', dataVaue: '17' },
      { dataTime: 'three', dataVaue: '18' },
      { dataTime: 'fore', dataVaue: '25' },
      { dataTime: 'five', dataVaue: '13' },
      { dataTime: 'six', dataVaue: '25' },
      { dataTime: 'serven', dataVaue: '19' },
    ],
    高跟鞋: [
      { dataTime: 'one', dataVaue: '7' },
      { dataTime: 'two', dataVaue: '5' },
      { dataTime: 'three', dataVaue: '18' },
      { dataTime: 'fore', dataVaue: '15' },
      { dataTime: 'five', dataVaue: '3' },
      { dataTime: 'six', dataVaue: '9' },
      { dataTime: 'serven', dataVaue: '19' },
    ],
    袜子: [
      { dataTime: 'one', dataVaue: '27' },
      { dataTime: 'two', dataVaue: '37' },
      { dataTime: 'three', dataVaue: '35' },
      { dataTime: 'fore', dataVaue: '40' },
      { dataTime: 'five', dataVaue: '43' },
      { dataTime: 'six', dataVaue: '34' },
      { dataTime: 'serven', dataVaue: '58' },
    ],
  }
  export default {
    data() {
      return {}
    },
    mounted() {
      this.getChart()
    },
    methods: {
      //获取数据
      getChart() {
        // 基于准备好的dom，初始化echarts实例
        this.handleChartData(data)
      },
      //图表数据处理
      handleChartData(data) {
        var newArr = []
        for (var key in data) {
          let name = key
          newArr.push({ cateName: name, cateList: data[key] })
        }
        let seriesArr = []
        for (var i = 0; i < newArr.length; i++) {
          let series = JSON.parse(JSON.stringify(seriesData))
          let xArr = []
          let yArr = []
          let name = newArr[i].cateName
          let dataList = newArr[i].cateList
          for (var j = 0; j < dataList.length; j++) {
            yArr.push(dataList[j].dataVaue)
            xArr.push(dataList[j].dataTime)
          }
          series.name = name
          series.data = yArr
          seriesArr.push(series)
          optionsData.xAxis.data = xArr
        }
        optionsData.series = seriesArr
        // return optionsData
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'))
        myChart.setOption(optionsData)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .echartsClass {
    margin: 5px;
    .demo {
      height: 500px;
      width: 900px;
    }
  }
</style>
