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
    <h1>{{isCollapse ? "通用系统":"后台"}}</h1>
 

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
export default {
  data() {
    return {
     
      menuList: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
        {
          label: "其他2",
          icon: "location",
          children: [
            {
              path: "/page3",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page4",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
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
          this.$router.push(item.path)
      }
      // console.log(item);
      
    }
  },
  computed:{
    // 无子菜单
    noChildren(){
        console.log("9090");
        return this.menuList.filter(item =>!item.children);
    },
      hasChildren(){
        return this.menuList.filter(item =>item.children);
    },
    isCollapse(){
        return this.$store.state.tab.isCollapse
    }
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



