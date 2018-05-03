<template>
  <div>
    <h3>home</h3>
    <!--<el-row>-->
      <!--<el-col :span="8" v-for="item in bannerList">-->
        <!--<echarts-banner :param="item"></echarts-banner>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in bannerList">
          <echarts-banner :param="item"></echarts-banner>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>

  </div>
</template>

<script>
  import EchartsBanner from './echartsComponents/echarts-banner';
  import Swiper from './../assets/swiper.min.js';
    export default {
      components: {
        'echarts-banner': EchartsBanner
      },
      data() {
        return {
          show: false,
          bannerList: [
            {
              id: 1,
              title: 'TIR大盘指数',
            },{
              id: 2,
              title: 'TIR权重指数',
            },{
              id: 3,
              title: 'TIR行业指数 ',
            },{
              id: 4,
              title: 'TIR大盘指数 ',
            },
          ],
        }
      },
      mounted() {
        var swiper = new Swiper('.swiper-container', {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
        let that = this;
        setTimeout(function () {
          that.show = true;
        },1000)
      },
    };
</script>

<style scoped>
  @import'../assets/swiper.min.css';

  .swiper-container {
    width: 1200px;
    height: 324px;
    box-shadow: 0 0 16px 0 rgba(0,0,0,0.06);
    border-radius: 8px;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    height: 300px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .swiper-pagination {
    width: 100px;
    height: 30px;
  }
</style>
