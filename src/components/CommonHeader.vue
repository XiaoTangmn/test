<template>
  <div class="header-container">
    <div class="l-content">
      <el-button icon="el-icon-menu" size="mini" @click="handMenu()"></el-button>
      <span class="text">首页</span>
    </div>
    <div class="r-content">
      <el-dropdown>
  <span class="el-dropdown-link">
      <img src="../assets/img/user.png" alt="" class="userImg">
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>个人中心</el-dropdown-item>
    <el-dropdown-item>退出</el-dropdown-item>
   
   
  </el-dropdown-menu>
</el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    handMenu(){
      this.$store.commit('collapseMenu')
    }
  }
};
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 30px;
  display: flex;
 
  padding: 10px 20px;
  justify-content: space-between;
  align-content: center;
  .text{
    margin-left: 10px;
    font-size: 14px;
    color: #fff;
  }
.r-content{
    .userImg{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

}
</style>