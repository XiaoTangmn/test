export default {
    state:{
        isCollapse: false,//定义菜单手否的收齐
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse =!state.isCollapse
        }
    }
};