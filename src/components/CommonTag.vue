<template>
<!-- $route.name === item.name然当前路由点亮 -->
<div class="tabs">
  <el-tag
    v-for="(item,index) in tags"
    :key="item.label"
    :closable="item.name !== 'home'"
    :effect="$route.name === item.name ? 'dark': 'plain'"
    @click="changeMenu(item)"
    @close="handleClose(item,index)"
  >
    {{ item.label }}
  </el-tag>
</div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
export default {
    name:'CommonTag',
    data() {
        return {
            
        }
    },
    methods: {
      ...mapMutations(['closeTag']),
      changeMenu(item){
      
        this.$router.push(
         { name:item.name}
        );
          console.log(item+"val66");
      }
      ,handleClose(item,index){
        // 调用moutation的closeTag
        this.closeTag(item);
        //不需要减一，应为this.tags.length是删除后的数据长度已自动减一
        const len=this.tags.length;
        console.log(this.tags+"index"+len);
        if(item.name != this.$route.name){
          return;
        }
        // 表示删除的最后一项,index往前腿一个背景
        if(index == len){
         this.$router.push({
          name:this.tags[index-1].name
         })
        }else{
          this.$router.push({
            name:this.tags[index].name
         })
        }
      }
    },
    computed:{
        ...mapState({
            tags:state=>state.tab.tabsList
        })
    }
};
</script>

<style>
</style>