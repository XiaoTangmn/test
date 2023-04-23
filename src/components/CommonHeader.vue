<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right:20px"
        icon="el-icon-menu"
        size="mini"
        @click="handMenu()"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
       
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="closePage">
        <span class="el-dropdown-link">
          <img src="../assets/img/user.png" alt="" class="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import jsCookie from 'js-cookie';
import { mapState} from 'vuex'
export default {
  methods: {
    handMenu() {
      this.$store.commit("collapseMenu");
    },
    // logout(){
    //   console.log("lll");
    //   jsCookie.remove("token")
    // }
      closePag
  },
  computed:{
    ...mapState({
      tags:state => state.tab.tabsList
    })
  },
  mounted() {
    console.log(this.tags);
  },
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
  .text {
    margin-left: 10px;
    font-size: 14px;
    color: #fff;
  }
  .r-content {
    .userImg {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content{
    display: flex;
    align-items: center;
    // /deep/深度查找某个有id子元素的样式
    /deep/.el-breadcrumb__item{
      font-weight: bold;
        .el-breadcrumb__inner{
          // &代表并且的意思
          &.is-link{
              color:#666
          }
    }
    &:last-child{
      .el-breadcrumb__inner{
          // &代表并且的意思
        &.is-link{
              color:#fff
          }
    }
    }
    
  }}
}
</style>