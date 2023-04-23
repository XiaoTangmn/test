<template>
  <div>
    <el-dialog
      title="添加信息"
      :visible.sync="dialogVisible"
      width="59%"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
        width="40%"
        :inline="true"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="請輸入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年齡" prop="age">
          <el-input v-model="form.age" placeholder="請輸入年齡"></el-input>
        </el-form-item>
        <el-form-item label="性別" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性別" width="200px">
            <!-- 数据是数字类型，value值要加冒号 -->
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            width="200px"
            align="right"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="請輸入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="formSub">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <el-button type="primary" @click="addUserinfo()"> +新增 </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别">
        <!-- slot-scope="scope"获取父组件中数据 -->
        <template slot-scope="scope">
          <!-- 获取当前行数据 -->
          <span style="margin-left: 10px">{{
            scope.row.sex == 1 ? "男" : "女"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="birth" value-format="yyyy-MM-dd" label="出生日期">
      </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit()">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import axios from "axios";
import {nanoid} from 'nanoid'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        id:'',
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
          },

          { min: 3, max: 5, message: "长度在 3 到 5 个字符" },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
          },
        ],
        sex: [
          {
            required: true,
            message: "",
          },
        ],
        birth: [{ required: true, message: "" }],
        addr: [
          {
            required: true,
            message: "请填写地址",
          },
        ],
      },
    };
  },
  
  mounted() {
   
    this.getUser();
     console.log(this.tableData,'tableData');
  },
  methods: {
    
    getUser() {
      axios.get("http://localhost:5000/data01").then((data) => {
        // console.log(JSON.stringify(data));
        // var d = data;
        this.tableData = data.data;
      });
      // console.log(this.tableData);
    },
    handleClose() {
 this.dialogVisible=false;
 this.$refs.form.resetFields()
    },
    cancel() {
     this.handleClose()

    },
    formSub() {
      console.log(this.form);
      this.$refs.form.validate((flag) => {
        console.log(flag, "form su");
        if (flag) {
          this.form.id=nanoid();
          axios.post("http://localhost:5000/add", this.form).then((data) => {
           
          }).catch(err=>{
            console.log(err);
          });
        
          this.getUser();
        }
      });
    },
    addUserinfo() {
      this.dialogVisible = true;
    },
    handleDel(row){
      
       
      
           axios.post("http://localhost:5000/del", {id:row.id}).then((data) => {
           
          }).catch(err=>{
            console.log(err);
          });
          this.getUser();
    }
  },
 
};
</script>

<style>
</style>