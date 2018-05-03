import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/home';
import EchartsArea from '@/components/echarts-area';
import EchartsAreaHover from '@/components/echarts-area-hover';
import EchartsLineBar from '@/components/echarts-line-bar';
import EchartsLineStack from '@/components/echarts-line-stack';
import EchartsRadar from '@/components/echarts-radar';
import Progress from '@/components/progress';
import ProgressLine from '@/components/progress-line';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/echarts-area',
      name: 'EchartsArea',
      component: EchartsArea
    },{
      path: '/echarts-area-hover',
      name: 'EchartsAreaHover',
      component: EchartsAreaHover
    },{
      path: '/echarts-line-bar',
      name: 'EchartsLineBar',
      component: EchartsLineBar
    },{
      path: '/echarts-line-stack',
      name: 'EchartsLineStack',
      component: EchartsLineStack
    },{
      path: '/echarts-radar',
      name: 'EchartsRadar',
      component: EchartsRadar
    },{
      path: '/progress',
      name: 'progress',
      component: Progress
    },{
      path: '/progress-line',
      name: 'ProgressLine',
      component: ProgressLine
    },
  ]
})
