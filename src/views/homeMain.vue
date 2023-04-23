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
    <common-tag/>
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
import CommonTag from "../components/CommonTag.vue"

export default {
    name:"Home",
  components:{
   CommonAsideVue,
   CommonHeader,
   'common-tag':CommonTag
  }
}
</script>

<style lang="less" scoped>
  .el-header{
    padding: 0;
  }
  /deep/.tabs{
    .el-tag{
      margin-left: 10px;
    }
  }
</style>