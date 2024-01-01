import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import "./mock/index2.js"
import "./api/mock.js"
import De from "@/de/index"
import store from "./store"
import Cookies from 'js-cookie';

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(De);


router.beforeEach((to,form,next)=>{
  const token = Cookies.get('token');
  //     // token不存在，不能等于login，会出现死循环，因为点击登录按钮一瞬间就会生成token
if(!token && to.name !=='Login'){
  next({
    name:"Login"
  }
    )
    // token存在，但不能重复登
}else if(token && to.name =='Login'){
  next({
    name:"home"
  })
}else{
  // token不存在就继续下一步
  next();
}
})



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
