import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/User'
import Home from '../views/Home.vue'
import HomeMain from '../views/homeMain.vue'

import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Mall from '../views/Mall.vue'



const routes= [
    {path:"/",
    component:HomeMain,
    redirect:"/home",

children:[
    {path:"home",component:Home},
    {path:"user",component:User},
    {path:"mall",component:Mall},//商品管理
    {path:"page1",component:PageOne},//页面1
    {path:"page2",component:PageTwo},
]},

   

]
export default new VueRouter({
        routes
})