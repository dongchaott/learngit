<template>
  <div class="container-progress">
    <canvas id="myCanvas" class="canvas"></canvas>
  </div>
</template>

<script>
  import '../assets/progress-line.js';
  export default {
    mounted() {
      var instance = new percentCircle("myCanvas",{
        colorArr:["#9210ff","#1995ff"],  //颜色值必须是两个，可以为相同颜色，也可以是渐变的两个色值
        colorBg:'#273b68', //半圆背景色 默认#ffffff
        linewidth:20,   //半圆的宽度
        r:200,
        startPoint:Math.PI*0.75, //开始角度，开始角度不同，半圆的大小不同，默认为  Math.PI*0.7;
        targetPersent:0.8,  //进度（0-1）
        point:{             //进度条末端的点
          show:false,       //是否显示
          color:'#ffffff'     //颜色
        },
        value:8.4,
        text:"大盘强度",
        line: true,
      });
      instance.execAnimation();  //动画开始
    },
  };
</script>

<style scoped>
  .container-progress {
    width: 300px;
    height: 300px;
  }
  .canvas {
    margin: 40px;
  }
</style>
