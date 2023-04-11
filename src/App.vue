<template>
  <div id="app">
   <router-view></router-view>
  
  </div>
</template>

<script>

import User from './views/User.vue'
import Home from './views/Home.vue'

export default {
  name: 'App',
  components: {
    Home,
    User
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
</style>

