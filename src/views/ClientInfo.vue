<template>
  <div>
    <el-container>
      <el-header style="text-align: center; margin: 10px">
        <el-row :gutter="20">
          <el-col :span="10"
            ><span
              style="font-size: 24px; font-weight: bold; margin-bottom: 20px"
              >客户名称：{{ company }}</span
            ></el-col
          >
          <el-col :span="6" :offset="6">
            <el-date-picker
              v-model="selectTime"
              type="daterange"
              start-placeholder="开始日期"
              :picker-options="pickerOptions"
              end-placeholder="结束日期"
            >
            </el-date-picker
          ></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table     v-loading="loading"  :data="filterData" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="90">
          </el-table-column>
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="projectName" label="项目名称" width="300">
          </el-table-column>
          <el-table-column prop="supplier" label="供应单位" width="300">
          </el-table-column>
          <el-table-column prop="money" label="项目金额(元)"> </el-table-column>
          <el-table-column prop="tel.phone" label="联系人电话">
          </el-table-column>
          <el-table-column prop="projectNumber" label="项目编号">
          </el-table-column>
          <el-table-column prop="url" label="项目链接">
            <template slot-scope="{row}">
              <el-link type="primary" :href="row.url" target="_blank"
              >链接</el-link
            >
            </template>
          </el-table-column>
          <el-table-column prop="opt" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="primary"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <span
        style="margin-top: 20px; font-weight: 700; font-size: 25px; color: #666"
        >总金额：{{ totalMoney }}￥</span
      >
    </el-container>

    <el-button size="small" @click="$router.push('/')" type="primary"
      >返回</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      // 日期选择器配置
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      selectTime: null,
      // 路由传递的参数
      company: this.$route.query.company,
      dataList: [],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },

    requestData() {
      this.$axios.get("/api/dataInfo").then((res) => {
        this.dataList = res.data.data;
        console.log(this.dataList);
      });
    },
  },

  created() {
    this.requestData();
    this.loading = false;
  },

  watch: {
    selectTime() {
      console.log(this.selectTime);
    },
  },

  computed: {
    // 日期筛选后的数据
    filterData() {
      if (!this.selectTime) {
        return this.dataList;
      }
      let d1 = new Date(this.selectTime[0]);
      let d2 = new Date(this.selectTime[1]);
      let result = this.dataList.filter((item) => {
        let d3 = new Date(item.date);
        return d3 >= d1 && d3 <= d2;
      });
      return result;
    },

    // 总金额
    totalMoney() {
      // 数组中所有对象的money属性求和
      return this.filterData
        .reduce((prev, curr) => prev + curr.money, 0)
        .toFixed(2);
    },
  },
};
</script>