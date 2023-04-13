<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/img/user.png" alt="" srcset="" />
            <div class="user-info">
              <p class="user-name">admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2023-04-09</span></p>
            <p>上次登录地点：<span>湖南</span></p>
          </div>
        </el-card>
        <el-card style="height: 300px; margin-top: 30px">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
              v-for="(val, key) in tablelabel"
              :prop="key"
              :label="val"
              :key="key"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="grid-content bg-purple-light">
        <div class="number">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ backgroundColor: item.color }"
            ></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="text">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
      </div>
      <el-card style="height: 200px">
        <div ref="eChart1" style="height: 200px"></div>
      </el-card>
      <div class="eChart2">
        <el-card>
          <div ref="eChart3" style="height: 200px"></div>
        </el-card>
        <el-card>
          <div ref="eChart4" style="height: 200px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tablelabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;

      this.tableData = tableData;

      const eChart1 = echarts.init(this.$refs.eChart1);
      var eChart1Option = {};
      const { orderData, userData,videoData} = data.data;
      //  获取可枚举的属性
      //  可枚举就是可遍历的意思，如果对象的属性可以通过for key in myOject遍历，就意味着该属性是可枚举的。新建一个对象时，定义的属性默认是可枚举的，
      const xAxis = Object.keys(orderData.data[0]);
      console.log(userData.map(item => item.date));
      const xAxisShow = {
        data: xAxis,
      };
      eChart1Option.tooltip = {};
      eChart1Option.xAxis = xAxisShow;
      eChart1Option.yAxis = {};
      eChart1Option.legend = xAxisShow;
      // 初始化渲染数据
      eChart1Option.series = [];
      xAxis.forEach((key) => {
        eChart1Option.series.push({
          name: key,
          // 通过key可以再偏离一次
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
     
      });
      eChart1.setOption(eChart1Option);
      // 要渲染的数据

      // 柱状图
      const echart3 = echarts.init(this.$refs.eChart3);
      const eChart3Option = {
        
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              data:{},
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: [
            "#2ec7c9",
            "#b6a2de",
            "#5ab1ef",
            "#ffb980",
            "#d87a80",
            "#8d98b3",
          ],
          series:
           [
            // 有多个对象可显示多行
            {
              name: "新增",
              // 通过key可以再偏离一次
              data: userData.map(item => item.new),
              type: "bar",
            },
            {
              name: "活跃",
              // 通过key可以再偏离一次
              data: userData.map(item => item.active),
              type: "bar",
            },
          ],
        
      };
      echart3.setOption(eChart3Option);

       // 柱状图
      const echart4 = echarts.init(this.$refs.eChart4);
      const eChart4Option= {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data:videoData,
              type:'pie'
            }
          ],
        }
        echart4.setOption(eChart4Option);
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;

  // justify-content: space-between;
  align-items: center;
  img {
    margin-right: 40px;
    height: 90px;
    width: 90px;
    border-radius: 50%;
  }
  .user-info {
    .user-name {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .access {
      font-size: 10px;

      color: #999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 10px;
    span {
      font-size: 10px;
      margin-left: 40px;
      color: #999;
    }
  }
}
.number {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; //超出内容自动换行
  .icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
    color: #fff;
    line-height: 60px;
    text-align: center;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 20px;
      line-height: 20px;
      margin-bottom: 14px;
    }
    .text {
      font-size: 13px;
      color: #ccc;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 14px;
  }
}
.eChart2 {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 48%;
    height: 260px;
  }
}
</style>