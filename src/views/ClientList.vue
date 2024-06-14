<template>
  <div>
    <el-row :gutter="20" style="width: 60%; margin: 20px auto">
      <el-col :span="16"
        ><el-input
          @keyup.enter.native="search"
          size="large"
          placeholder="请输入电话 / 公司 / 名称"
          v-model="keyword"
          clearable
        >
        </el-input
      ></el-col>
      <el-col :span="8"
        ><el-button
          @click="search"
          size="large"
          type="primary"
          icon="el-icon-search"
          >搜索</el-button
        ></el-col
      >
    </el-row>

    <el-table
      v-loading="loading"
      :data="
        this.filteredList.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      "
      :page-size="pageSize"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="90"> </el-table-column>
      <el-table-column prop="company" label="客户公司" width="200">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="address_2" label="地址2" width="300">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 total是变量-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="totalCount"
      v-if="pageShow"
    >
    </el-pagination>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      input: "",
      loading: true,
      // ajax请求收到的数据
      dataList: [],
      // 表格总条数
      // totalCount: 0,
      // 表格当前页
      currentPage: 1,
      // 表格每页显示条数
      pageSize: 10,

      // 模糊搜索关键词
      keyword: "",
      // 控制分页标签是否显示
      pageShow: true,
      // 当前展示数据
      currentData: [],
    };
  },

  methods: {
    handleClick(row) {
      console.log(row);
      // this.$router.push("/ClientInfo");
      this.$router.push({
          path: '/ClientInfo',
          query: {
            company: row.company
          }
        })
    },

    // axios请求数据
    requestData() {
      console.log("请求数据");
      this.$axios
        .get("/api/dataList")
        .then((res) => {
          //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致
          this.dataList = res.data.data;
          // this.totalCount = this.dataList.length;
          console.log(res.data.data); //在console中看到数据
        })
        .catch((res) => {
          alert("wrong");
        });
    },

    
    handleSizeChange(pagesize) {
      console.log("翻页了1");
      this.pageSize = pagesize;
    },

    // 翻页时触发
    handleCurrentChange(currentpage) {
      console.log("翻页了");
      // 刷新表格内容
      this.currentPage = currentpage;
      console.log(currentpage);
    },

    // 模糊搜索
    search() {
      this.pageShow = false;
      console.log("搜索了", this.keyword);
      // 每次搜索后，返回第一页
      this.currentPage = 1;
      // 重写渲染翻页标签
      this.$nextTick(() => {
        this.pageShow = true;
      });

      console.log(this.filteredList);
    },
  },

  created() {
    // 加载动画
    this.loading = true;
    // 异步请求数据
    this.requestData();
  },

  mounted() {
    this.loading = false;
  },

  watch: {
    // 使用监听属性，避免异步获取数据时无法获取
    keyword() {
      console.log("监听了", this.keyword);
    },
  },

  computed: {
    // 过滤后的表格数据
    filteredList() {
      // 去除keyword前后空格
      const query = this.keyword.replace(/^\s*|\s*$/g,"");;
      // 使用filter()方法过滤dataList中符合关键字keyword的项
      return this.dataList.filter((item) => {
        return item.company.includes(query) || item.address.includes(query) || item.address_2.includes(query);
      });
    },

    // 动态计算表格总条数
    totalCount() {
      return this.filteredList.length;
    }
  },
};
</script>
<style lang="scss" scoped>
</style>