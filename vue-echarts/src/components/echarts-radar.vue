<template>
  <div>
    <h3>量化评估</h3>
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
          animation:false,
          tooltip: {
            show:false,
          },
          legend: {
          },
          radar: {
            splitLine :{
            },
            axisLine : {
              show:false
            },
            name: {
              textStyle: {
                color: '#333',
                fontSize  : 12,
                backgroundColor: '#fff',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: '市场热度', max: 100},
              { name: '人气意愿', max: 100},
              { name: '流动性', max: 100},
              { name: '量能变化', max: 100},

            ],
            splitArea: {
              show  : false
            }
          },
          series: [{
            // symbol: 'none',
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            areaStyle: {normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(16,146,255,0.15)'
                }])
              }},
            data : [
              {
                value: [80, 90, 88, 70],
                label: {
                  normal: {
                    show: true,
                    formatter:function(params) {
                      return params.value;
                    }
                  }
                }
              },
            ],
            itemStyle: {
              normal: {
                color: '#1092FF'
              }
            },
          }]
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
    width:320px;
    height: 240px;
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
