<template>
  <div>
    <h3>{{param.title}}</h3>
    <p>3123 <span>+0.37%</span></p>
    <div class="echarts-banner" :id="param.id"></div>
  </div>
</template>

<script>
  let echarts = require('echarts');
  export default {
    props: ['param'],
    data() {
      return {
        date: '',
        value: 0
      }
    },
    methods: {
      init() {
        let that = this;
        let dom = document.getElementById(this.param.id);
        let myChart = echarts.init(dom);
        let date = [];
        let data = [Math.round((Math.random() + 0.5) * 20)];

        for (let i = 0; i < 6; i++) {
          date.push(i + ':00');
          data.push(Math.round((Math.random() + 0.5) * 20));
        }
        let option = {
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            splitLine:{
              show:false
            },
            axisLine: {
              show:false,
            },
            axisTick: {
              show:false,
            },
            type: 'category',
            boundaryGap: [30, 30],  //留白
            data: date,
            axisLabel: {
              interval: 0,
              // formatter: function (value, index) {
              //   // return  value + ":00";
              // }
              formatter: '{value}'
            }
          },
          yAxis: {
            splitNumber :4,
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
              return Math.round(value.min - (value.max-value.min)/3)
            },
            max:function(value) {
              return Math.round(value.max + (value.max-value.min)/3)
            },
          },
          series: [
            {
              type:'line',
              name:'指数',
              data: data,
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
          myChart.setOption(option, true);
        }
      },
    },
    mounted() {
      this.init();
      console.log(this.param)
    },
  };
</script>

<style scoped>
  .echarts-banner {
    width: 400px;
    height: 200px;
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
