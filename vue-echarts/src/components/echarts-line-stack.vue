<template>
  <div>
    <el-row>
      <el-col :span="12">
        <h3>货币流动性</h3>
      </el-col>
      <el-col :span="12" class="text-right">
        <span>{{date}}</span>货币市场热度<span class="red">{{price}}</span>虚拟货币市场平均热度<span class="red">{{value}}</span>
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
            formatter: function (params, ticket, callback) {
              that.date = params[0].axisValue;
              that.price = params[0].value;
              that.value = params[1].value;
            },
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            },
          },
          legend: {
            bottom: 0,
            data:['货币市场热度','虚拟货币市场平均热度']
          },
          xAxis: {
            axisLine: {
              show:false,
            },
            axisTick: {
              show:false,
            },
            type: 'category',
            boundaryGap: [30, 30],  //两端留白
            data: ['0:00','3:00','6:00','9:00','12:00','15:00','18:00','21:00','24:00']
          },
          yAxis: {
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
            position: 'left',
            name: '换手率(%)',
          },
          series: [
            {
              name:'货币市场热度',
              type:'line',
              stack: '货币市场热度',
              symbol: 'none',
              data:[90, 88, 96, 78, 90, 60, 55, 88, 97]
            },
            {
              name:'虚拟货币市场平均热度',
              type:'line',
              stack: '虚拟货币市场平均热度',
              symbol: 'none',
              data:[55, 45, 68, 50, 53, 42, 33, 55, 34]
            }
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
