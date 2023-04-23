<template>
  <div class="loginBox">
    <h2>登录页面</h2>
  <el-form ref="form"   label-width="70px"  :model="form" :inline="true" :rules="rules">
    <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username" placeholder="前端盖呼入账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd" label="密码">
        <el-input v-model="form.pwd" placeholder="前端盖呼入密码" ></el-input>
    </el-form-item>
     <el-form-item>
         <el-button type="success" :plain="true" @click="submit()">登录</el-button>
    </el-form-item>
   
  </el-form>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import {getMenu} from '../api'
// mock是export default不要用{}
import Mock  from 'mockjs'
export default {
data() {
  return {
    form:{
      username:'',
      pwd:""
    },
    rules:{
      username:[
        {required:true,message:"亲输入用户名",trigger:"blur"}
      ],
       pwd:[
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
           
              cookie.set("token",   data.data.token);
              this.$router.push
("/home")
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