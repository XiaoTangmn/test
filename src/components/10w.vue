<template>
  <div>
    <el-button type="primary" @click="plan">主要按钮</el-button>

    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <!-- <el-table-column  prop="date" -->
        <!-- label="发送"
   
        width="180"> -->
    <!-- </el-table-column> -->
    
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>

  </template>
  
  <style>
    .el-table .warning-row {
      background: oldlace;
    }
  
    .el-table .success-row {
      background: #f0f9eb;
    }
  </style>
  
  <script>
import axios from 'axios';

    export default {
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
       async plan(){
        console.log(122);
        // 获取数据
        const {data:res}=await axios('http://124.223.69.156:3300/bigData')
        console.log(res);
        // 页面
        //把10万条数据分为10次一组
     const twoArr=  this.cut(res.data);
       console.log(twoArr);
        // 显示，用定时器隔500ms显示
     for (let i = 0; i < twoArr.length; i++) {
      
      setTimeout(() => {
        // console.log(...twoArr[i]);
          // this.tableData=[...this.tableData,...twoArr[i]]
        }, i*20);
      
     }
      },
      cut(d){
        let i=0;
        let res=[];

// for (let i = 0; i < d.length;i=i+10) {
// res.push(i,d.splice(i,i+10))c

//   return res;
// }
while(i<d.length){
  // 每份+10，i必须递增10
res.push(i,d.slice(i,i+10))
// console.log(i);
i=i+10;
  
}
return res
      }
      },

    
      // methods{

      // },
      data() {
        return {
          arr:[],
          // tableData: [{
          //   date: '2016-05-02',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄',
          // }, {
          //   date: '2016-05-04',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // }, {
          //   date: '2016-05-01',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄',
          // }, {
          //   date: '2016-05-03',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // }]
          tableData:[]
        }
      }
    }
  </script>
  