

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
            if(val.name !=="home"){
                // 返回第一个符合条件的数组成员的位置，如果所有路径都不符合条件，则返回-1。

                const index =state.tabsList.findIndex(item => item.name === val.name);
                if(index ===-1){
                    // 如果不存在路径就添加
                    state.tabsList.push(val);
                }
            }

        },
        // 删除指定的tag数据
        closeTag(state,item){
            console.log(item+"closetag  data");
            const index =state.tabsList.findIndex(val => item.name === val.name);
            state.tabsList.splice(index,1)
        }
    }
};