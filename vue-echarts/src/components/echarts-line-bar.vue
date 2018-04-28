<template>
  <div>
    <el-row>
      <el-col :span="12">
        <h3>量能变化</h3>
      </el-col>
      <el-col :span="12" class="text-right">
        <span>{{date}}</span>平均价格<span class="red">{{price}}</span>平均成交额<span class="red">{{value}}</span>
      </el-col>
    </el-row>
    <div class="echarts-container" id="container"></div>
  </div>
</template>

<script>
  var echarts = require('echarts');
  export default {
    data() {
      return {
        date: '',
        price: 0,
        value: 0,
      }
    },
    methods: {
      init() {
        var that = this;
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var option = null;
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            formatter: function (params, ticket, callback) {
              that.date = params[0].axisValue;
              that.price = params[0].value;
              that.value = params[1].value;
            }
          },
          grid: {
            right: '20%'
          },
          legend: {
            bottom: 0,
            data:[
            {
              name: '24h平均成交额',
              icon: 'rect'
            },
            {
              name: '平均成交价',
              icon: 'rect',
             },]
          },
          xAxis: [
            {
              type: 'category',
              axisLine: {
                show:false,
              },
              axisTick: {
                show:false,
              },
              boundaryGap: [30, 30],
              data: ['1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00']
            }
          ],
          yAxis: [
            {
              splitNumber  :8,
              splitLine:{
                show:false
              },
              axisLine: {
                show:false,
              },
              axisTick: {
                show:false,
              },
              type: 'value',
              name: '货币均价(元)',
              min: 0,
              max: 27,
              position: 'left',
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              splitNumber  :8,
              splitLine:{
                show:false
              },
              axisLine: {
                show:false,
              },
              axisTick: {
                show:false,
              },
              type: 'value',
              name: '成交额(亿元)',
              min: 0,
              max: 270,
              position: 'right',
              // offset: 80,

              axisLabel: {
                formatter: '{value}'
              }
            },

          ],
          series: [
            {
              name:'平均成交价',
              type:'line',
              yAxisIndex: 0,
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#78CFBB'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#78CFBB'
                  }, {
                    offset: 1,
                    color: '#fff'
                  }])
                }
              },
            },
            {
              name:'24h平均成交额',
              type:'bar',
              yAxisIndex: 1,
              data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
              barWidth :18,
              itemStyle: {
                normal: {
                  color: '#1092FF'
                }
              },
            },
          ]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      },
    },
    mounted() {
      this.init()
    },
  };
</script>

<style scoped>
  .echarts-container {
    height: 647px;
  }
  .text-right {
    padding-top: 30px;
    padding-right: 50px;
    text-align: right;
  }
  .text-right span {
    width: 80px;
    display: inline-block;
    text-align: center;
  }
  .red {
    color:red;
  }
</style>
