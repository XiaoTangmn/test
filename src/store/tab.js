import Cookies from "js-cookie";


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
            
        ],
        // 面包屑数据
        menu:[]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse =!state.isCollapse
        },
        // 更新面包屑数据:
        // 1.clickMenu行参item就是路径信息，只要给他添加到tabsList
        selectMenu(state,val){
            // console.log(val,"tab selectmenu");
            if(val.name !=="home"){
                // 返回第一个符合条件的数组成员的位置，如果所有路径都不符合条件，则返回-1。

                const index =state.tabsList.findIndex(item => item.name === val.name);
                if(index ===-1){
                    // 如果不存在路径就添加
                    state.tabsList.push(val);
                }
            }

        },
        // stroe存在内存中
        // 删除指定的tag数据
        closeTag(state,item){
            console.log(item+"closetag  data");
            const index =state.tabsList.findIndex(val => item.name === val.name);
            state.tabsList.splice(index,1)
        },
        // 设置menu数据
        setMenu(state,val){
                state.menu=val;
                console.log(state.menu,"menu");
                Cookies.set('menu',JSON.stringify(val));
        },
        // 动态注册路由
        // pression。js里两个用户的界面都不一样
        addMenu(state,router){
            if(!Cookies.get("menu"))retrun
            // 把数据转成当前数据
            const menu = JSON.parse(Cookies.get('menu'))
           
            state.menu =menu;
            console.log("statemenu",state.menu);
            // 组装路由数据
            const menuArr=[];
            menu.forEach(item => {
                if(item.children){
                    // 动态给item添加组件属性为一个函数，自动引入相应页面地址
                   item.children= item.children.map(item => {
                        item.compontent = () =>import(`../views/${item.url}`)
                        return item
                    })
                    menuArr.push(...item.children)
                }else{
                    item.compontent = () =>import(`../views/${item.url}`)
                    menuArr.push(item)
                }
                console.log("menuArr",menuArr);
            //    路由动态添加1.要插入路由位置路由名
            menuArr.forEach(item =>{
              router.addRoute('Main',item)
            })
            });
        }
        
    }
};