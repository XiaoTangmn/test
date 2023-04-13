export default {
    state:{
        isCollapse: false,//定义菜单手否的收齐
        // 面包学数据
        tabsList:[
            
                {//默认跳转到首页
                    path: "/",
                    name: "home",
                    label: "首页",
                    icon: "s-home",
                    url: "Home/Home",
                  },
            
        ]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse =!state.isCollapse
        },
        // 更新面包屑数据:
        // 1.clickMenu行参item就是路径信息，只要给他添加到tabsList
        selectMenu(state,val){
            console.log(val);

        }
    }
};