<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
        background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
    <h1>{{isCollapse ? "后台":"通用系统"}}</h1>
 

      <el-menu-item :index="item.name" @click=clickMenu(item) v-for="item in noChildren" :key="item.name">
       <!--图标 小技巧：el-icon+“data.icon” -->
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label" >
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
        </template>

        <el-menu-item-group  v-for="citem in item.children" :key="citem.path">
          <el-menu-item @click=clickMenu(citem)  :index="citem.path">{{citem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import jsCookie from 'js-cookie';
export default {
  data() {
    return {
     
    
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){

      //如果跳转页面不一致时才会再跳转
      if(this.$route.path !==item.path && !(this.$route.path==="/home" &&(item.path === "/"))){
        console.log("item.path",item.path);
          this.$router.push(item.path)
          // 不能传router，因为不能识别，传item
     this.$store.commit('selectMenu',item);
      }
 
      
      
    }
  },
  computed:{
    // 无子菜单
    noChildren(){
        // console.log("9090",this.menuList);
        return this.menuList.filter(item =>!item.children);
    },
      hasChildren(){
        return this.menuList.filter(item =>item.children);
    },
    isCollapse(){
        return this.$store.state.tab.isCollapse
    },
     menuList(){
      // 判断当前数据，如果缓存中没有就去store获取
      return JSON.parse(jsCookie.get('menu')) ||this.$store.state.tab.menu

   
    },
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  
}
.el-menu{
  height: 100vh;
  border-right: none;
  h1{
    color:#fff;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 48px;

  }
}
</style>



