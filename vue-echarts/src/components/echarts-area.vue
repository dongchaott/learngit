<template>
  <div>
    <el-row>
      <el-col :span="12">
        <h3>赚钱效应</h3>
      </el-col>
      <el-col :span="12" class="text-right">
        <span>{{date}}</span>大盘表现<span class="red">{{value}}</span>
      </el-col>
    </el-row>
    <div class="echarts-container" id="container"></div>

  </div>
</template>

<script>
  let echarts = require('echarts');
    export default {
      data() {
       return {
         date: '',
         value: 0,
         xAxisData: [],
         yAxisData: [],
         myChart: null,
       }
      },
      methods: {
        init() {
          let that = this;
          that.myChart = echarts.init(document.getElementById("container"));
          // that.yAxisData = [Math.round((Math.random() + 0.5) * 20)];

          for (let i = 0; i < 24; i++) {
            that.xAxisData.push(i + ':00');
            that.yAxisData.push(Math.round((Math.random() + 0.5) * 20));
          }
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              },
              formatter: function (params, ticket, callback) {
                that.date = params[0].axisValue;
                that.value = params[0].data;
              }
            },
            xAxis: {
              axisLine: {
                show:false,
              },
              axisTick: {
                show:false,
              },
              type: 'category',
              boundaryGap: [30, 30],  //留白
              data: that.xAxisData,
              axisLabel: {
                interval: 0,
                // formatter: function (value, index) {
                //   // return  value + ":00";
                // }
                formatter: '{value}'
              }
            },
            yAxis: {
              splitNumber :9,
              // scale: true,
              splitLine:{
                show:false
              },
              axisLine: {
                show:false,
              },
              axisTick: {
                show:false,
              },
              name: '货币表现(%)',
              min:function(value) {
                return Math.round(value.min - (value.max-value.min)/8)
              },
              max:function(value) {
                return Math.round(value.max + (value.max-value.min)/8)
              },
            },
            series: [
              {
                type:'line',
                data: that.yAxisData,
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                  normal: {
                    color: '#1092FF'
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(16,146,255,0.30)'
                    }, {
                      offset: 1,
                      color: 'rgba(16,146,255,0.00)'
                    }])
                  }
                },
              },
            ]
          };
          if (option && typeof option === "object") {
            that.myChart.setOption(option, true);
          }
        },
        addData() {
          this.xAxisData.push('24:00','25:00','26:00','27:00','28:00');
          this.yAxisData.push(24,25,26,27,28);
          let that = this;
          this.myChart.setOption({
            xAxis: {
              data: that.xAxisData
            },
            series: [{
              data: that.yAxisData
            }]
          });
        },
      },
      mounted() {
        let that = this;
        this.init();
        setTimeout(function () {
          that.addData();
        },3000)
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
    text-align: left;
    text-indent: 16px;
  }
  .red {
    color:red;
  }
</style>
