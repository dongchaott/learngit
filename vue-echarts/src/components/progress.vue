<template>
    <div>
      <h3>大盘强度</h3>
      <div class="container-progress">
        <img src="../assets/tubiao_yibiaopan_kong.png" height="251" width="279"/>
        <canvas id="myCanvas" class="canvas"></canvas>
      </div>
    </div>
</template>

<script>
  import '../assets/progress';
    export default {
      mounted() {
        let instance = new percentCircle("myCanvas",{
          colorArr:["#9210ff","#1995ff"],  //颜色值必须是两个，可以为相同颜色，也可以是渐变的两个色值
          colorBg:'#273b68', //半圆背景色 默认#ffffff
          linewidth:24,   //半圆的宽度
          r:230,
          startPoint:Math.PI*0.73, //开始角度，开始角度不同，半圆的大小不同，默认为  Math.PI*0.7;
          targetPersent:9/10,  //进度（0-1）
          point:{             //进度条末端的点
            show:false,       //是否显示
            color:'#ffffff'     //颜色
          },
          value:8.4,
          text:"大盘强度"
        });
        instance.execAnimation();  //动画开始
      },
    };
</script>

<style scoped>
  .container-progress {
    width: 300px;
    height: 300px;
    background: #0f244e;
    position: relative;
  }
  .canvas {
    position: absolute;
    top: 13px;
    left: 13px;
  }
</style>
