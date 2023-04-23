import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/User'
import Home from '../views/Home.vue'
import HomeMain from '../views/homeMain.vue'

import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Mall from '../views/Mall.vue'
import Login from '../views/Login.vue'



const routes= [
    {path:"/",
    component:HomeMain,
    redirect:"/home",

children:[
    //如果打印$route。xxxundefined是这里没配置
    {path:"home", name: "home",component:Home},
    {path:"user", name: "user",component:User},
    {path:"mall", name: "mall",component:Mall},//商品管理
    {path:"page1",name: "page1",component:PageOne},//页面1
    {path:"page2",name: "page2",component:PageTwo},
]},
{
    path:"/login",
    name:"Login",
    component:Login
}

   

]
export default new VueRouter({
        routes
})