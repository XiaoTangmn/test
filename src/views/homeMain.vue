<template>
  <div>
 
    
    <el-container>
  <el-aside width="auto">
   
<CommonAsideVue/>
    
  </el-aside>
  <el-container>
    <el-header>
      <CommonHeader/>
    </el-header>
    <el-main>
      <router-view></router-view>
      </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import CommonAsideVue from '../components/CommonAside.vue'
import CommonHeader from "../components/CommonHeader.vue"

export default {
    name:"Home",
  components:{
   CommonAsideVue,
   CommonHeader,
  }
}
</script>

<style lang="less" scoped>
  .el-header{
    padding: 0;
  }
</style>