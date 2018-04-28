<template>
  <div id="app">
    <el-row :gutter="30">
      <el-col :span="4">
        <div class="nav-echarts">
          <el-menu>
            <el-menu-item index="1" @click="$router.push({path:'/'})">
              <i class="el-icon-menu"></i>
              <span slot="title">赚钱效应</span>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push({path:'echarts-line-bar'})">
              <i class="el-icon-menu"></i>
              <span slot="title">量能变化</span>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push({path:'echarts-radar'})">
              <i class="el-icon-menu"></i>
              <span slot="title">量化评估</span>
            </el-menu-item>
            <el-menu-item index="4" @click="$router.push({path:'echarts-line-stack'})">
              <i class="el-icon-menu"></i>
              <span slot="title">货币流动性</span>
            </el-menu-item>
            <el-menu-item index="5" @click="$router.push({path:'echarts-area-hover'})">
              <i class="el-icon-menu"></i>
              <span slot="title">通证指数</span>
            </el-menu-item>
            <el-menu-item index="6" @click="$router.push({path:'progress'})">
              <i class="el-icon-menu"></i>
              <span slot="title">大盘强度</span>
            </el-menu-item>
            <!--<el-menu-item index="7" @click="$router.push({path:'progress-line'})">-->
              <!--<i class="el-icon-menu"></i>-->
              <!--<span slot="title">诊断得分</span>-->
            <!--</el-menu-item>-->
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="container-echarts">
          <router-view/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
  .nav-echarts {
    min-width: 200px;
    height: 700px;
    border-right: 1px solid #aaa;
  }
  .container-echarts {
    margin: 0 auto;
    width: 1200px;
  }
</style>
