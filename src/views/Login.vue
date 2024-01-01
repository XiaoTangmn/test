<template>
  <div class="loginBox">
    <h2>登录页面</h2>
  <el-form ref="form"   label-width="70px"  :model="form" :inline="true" :rules="rules">
    <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username" placeholder="前端盖呼入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
        <el-input v-model="form.password" placeholder="前端盖呼入密码" ></el-input>
    </el-form-item>
     <el-form-item>
         <el-button type="success" :plain="true" @click="submit()">登录</el-button>
    </el-form-item>
    <button  v-copy="msg">复制的内容</button>
   
  </el-form>
  <div>
    <tenW></tenW>
  </div>
  </div>
  
</template>

<script>
import cookie from 'js-cookie'
import {getMenu} from '../api'
import tenW from "@/components/10w.vue"
// mock是export default不要用{}
import Mock  from 'mockjs'
export default {
  components:{
        tenW
  },
data() {
  return {
    msg:"hsdiufsdgf",
    form:{
      username:'',
      password:""
    },
    rules:{
      username:[
        {required:true,message:"亲输入用户名",trigger:"blur"}
      ],
       password:[
        {required:true,message:"亲输入密码",trigger:"blur"}
      ],
    }
  }
},
methods:{
  submit(){
    // 利用mock随机数生成一个token
    // console.log(Mock);
    this.$refs.form.validate((valid)=>{
      if(valid){
        // console.log(this.form);
        getMenu(this.form).then(({data})=>{
            console.log(data);
            if(data.code===20000){
           
              cookie.set("token",data.data.token);
                   this.$store.commit('setMenu', data.data.menu)
                            this.$store.commit('addMenu', this.$router)
                            // 跳转到首页
                            this.$router.push('/home')
//拿出menu 存入store数据
// console.log(data.data.menu,"menu")
// this.$store.commit("setMenu",data.data.menu)
// this.$store.commit("addMenu",this.$router)

            }else{
                 this.$message.error( data.data.message);
            }
        })
      }
    })
//     const token = Mock.Random.guid();
// cookie.set("token",token);
// this.$router.push
// ("/home")
  }
}
}
</script>

<style lang="less" scoped>
.loginBox{
  width: 400px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 14px;
  box-shadow: 0 0 25px #ccc;
  // 边距设置为内边距
  box-sizing: border-box;
  .el-input{
    width: 198px;
  }
  .el-button{
    //  text-align: center;
    margin-left: 140px;

  }
  h2{
    font-size:16px;
    text-align: center;
    margin-bottom: 50px;
  }
}
</style>