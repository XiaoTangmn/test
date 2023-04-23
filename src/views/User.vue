<template>
  <div class="manage">
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
    <div class="manage-header">
      <el-button type="primary" hight="20px" @click="addUserinfo()"> +新增 </el-button>

      <el-form :inline="true" :model="userForm">
        <el-form-item>
    <el-input v-model="userForm.name" placeholder="请输入搜索内容"></el-input>
  </el-form-item>
    <el-button type="primary" @click="serachSub">查询</el-button>

      </el-form>
    </div>

    <div class="common-tab">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
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
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          layout="prev, pager, next"
          @current-change="changePage2"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "../api/index.js";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      userForm:{
        name:''
      },
      total: 0,
      modalType: 0,
      pageData: {
        page: 1,
        limit: 10,
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
      tableData: [],
    };
  },
  methods: {

    // 用户表单校验
    formSub() {
      this.$refs.form.validate((valid) => {
        // console.log(valid,'jaji');

        // valid提交为true就可以进行

        if (valid) {
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              // 更新from数据
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              // 编辑from数据
              this.getList();
            });
          }
          this.handleClose();
        }
      });
    },
    addUserinfo() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    getList() {
      getUser({params:{ ...this.userForm,...this.pageData }}).then((data) => {
        // console.log(data,"get data");
        this.tableData = data.data.list;
        this.total = data.data.count ? data.data.count : 0;
      });
    },
    handleClose() {
      // console.log(this.$refs.form);
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      //  console.log(this.$refs.form);
      this.handleClose();
    },
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      // 对当前信息进行深拷贝
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDel(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //  token A in Json at position a因为数据不是兑现形式
          // Cannot destructure property 'id' of 'JSON.parse(...)' as it is null.
          delUser({ id: row.id }).then(() => {
            // 编辑from数据
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch((err) => {
          // console.log(err,'del err');
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }, // 点击页码到当前页信息
    changePage2(val) {
      // console.log("页码",val);
      this.pageData.page = val;
      this.getList();
      // 如果404可能是mock的问题
    },
        serachSub(){
          console.log("middle");
      this.getList();
      

    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
/deep/.el-form-item {
  margin-left: 30px;
  .el-form-item__content {
    width: 200px;
  }
}
.manage {
  height: 90%;
  .common-tab {
    // 动态计算高度
    height: calc( 100% - 62px );
    position: relative;
    .page {
      position: absolute;
      right: 20px;
      bottom: 0;
    }
  }
}
/deep/.manage-header{
  display: flex;
  justify-content: space-between;

}
</style>