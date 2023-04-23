<template>
  <div id="app">
   <router-view></router-view>
  <!-- <test></test> -->
  <!-- <login></login> -->
  </div>
</template>

<script>
import login from './views/Login.vue'
import User from './views/User.vue'
import Home from './views/Home.vue'
import test from  './views/test.vue'

export default {
  name: 'App',
  components: {
    Home,
    User,
    test,
    login
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
</style>

