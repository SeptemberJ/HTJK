<template>
  <div class="ContractList">
    <el-row style="margin: 20px 0 0 0;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="项目名称" size="mini">
          <el-input v-model="filterProjectName" size="mini" placeholder="请输入项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="" size="mini">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="getData">搜 索</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="margin-bottom: 20px;text-align: right;padding-right: 10px;">
      <el-button type="success" size="mini" icon="el-icon-printer" @click="exportExcel">导 出</el-button>
      <el-button type="danger" size="mini" icon="el-icon-plus" @click="addBudget">新 增</el-button>
    </el-row>
    <el-table
      id="FilterBlock"
      v-loading="loading"
      :data="tableData"
      :height="tableHieght - 180"
      @row-dblclick="toDetail"
      style="width: 100%">
      <el-table-column
        type="index"
        fixed
        width="50">
      </el-table-column>
      <el-table-column
        prop="公司名称"
        label="公司名称"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="客户名称"
        label="客户名称"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="编制人"
        label="编制人"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="编制日期"
        label="编制日期"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="部门"
        label="部门"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="销售员"
        label="销售员"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="项目名称"
        label="项目名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="项目类别"
        label="项目类别"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <!-- <el-button type="danger" size="mini" v-if="scope.row['合同号'] != '合计'" @click="del(scope.row.finterid)">删 除</el-button> -->
          <el-button v-if="scope.row['审核状态'] == '未审核' && scope.row['合同号'] != '合计'" type="primary" size="mini" @click="examine(scope.row.finterid, '审核')">审 核</el-button>
          <el-button v-if="scope.row['审核状态'] == '未审核' && scope.row['合同号'] != '合计'" type="danger" size="mini" @click="del(scope.row.finterid)">删 除</el-button>
          <el-button v-if="scope.row['审核状态'] == '已审核' && scope.row['合同号'] != '合计'" type="warning" size="mini" @click="examine(scope.row.finterid, '反审核')">反审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="tableData.length > 0" style="margin: 10px 0;"
      @current-change="getData"
      :current-page.sync="curPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="sum">
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import $ from 'jquery'
export default {
  name: 'ContractList',
  data () {
    return {
      loading: false,
      tableHieght: 0,
      tableData: [],
      // curPage: 1,
      pageSize: 20,
      sum: 0
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    }),
    filterProjectName: {
      get: function () {
        return this.$store.state.filterProjectName
      },
      set: function (newValue) {
        this.$store.state.filterProjectName = newValue
      }
    },
    curPage: {
      get: function () {
        return this.$store.state.curPage_budget
      },
      set: function (newValue) {
        this.$store.state.curPage_budget = newValue
      }
    }
  },
  created () {
    setTimeout(() => {
      let height = document.documentElement.clientHeight
      document.getElementById('FilterBlock').style.height = height + 'px'
      this.tableHieght = height
    }, 0)
    this.getData()
  },
  methods: {
    ...mapActions([
      'updateBudgetId'
    ]),
    addBudget () {
      this.$router.push({name: 'BudgetAdd'})
    },
    toDetail (row) {
      this.updateBudgetId(row.finterid)
      this.$router.push({name: 'BudgetDetail'})
    },
    del (FInterID) {
      this.$confirm('此操作将该单据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<Final_DEL xmlns="http://tempuri.org/">'
        tmpData += '<ID>' + FInterID + '</ID>'
        tmpData += '</Final_DEL>'
        tmpData += '</soap:Body>'
        tmpData += '</soap:Envelope>'

        this.Http.post('Final_DEL', tmpData
        ).then(res => {
          let xml = res.data
          let parser = new DOMParser()
          let xmlDoc = parser.parseFromString(xml, 'text/xml')
          // 提取数据
          let Result = xmlDoc.getElementsByTagName('Final_DELResponse')[0].getElementsByTagName('Final_DELResult')[0]
          let HtmlStr = $(Result).html()
          let Info = (JSON.parse(HtmlStr))[0]
          if (Info.code === '1') {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.getData()
          } else {
            this.$message({
              message: '删除失败!',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    examine (FInterID, Type) {
      this.$confirm('确认' + Type + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<Final_Check xmlns="http://tempuri.org/">'
        tmpData += '<ID>' + FInterID + '</ID>'
        tmpData += '<Type>' + Type + '</Type>'
        tmpData += '</Final_Check>'
        tmpData += '</soap:Body>'
        tmpData += '</soap:Envelope>'

        this.Http.post('Final_Check', tmpData
        ).then(res => {
          let xml = res.data
          let parser = new DOMParser()
          let xmlDoc = parser.parseFromString(xml, 'text/xml')
          // 提取数据
          let Result = xmlDoc.getElementsByTagName('Final_CheckResponse')[0].getElementsByTagName('Final_CheckResult')[0]
          let HtmlStr = $(Result).html()
          let Info = (JSON.parse(HtmlStr))[0]
          if (Info.code === '1') {
            this.$message({
              message: Type + '成功!',
              type: 'success'
            })
            this.getData()
          } else {
            this.$message({
              message: Type + '失败!',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    async exportExcel () {
      let dataAll = await this.getListAll()
      require.ensure([], () => {
        const { exportJsonToExcel } = require('../../vendor/Export2Excel.js')
        const tHeader = ['公司名称', '客户名称', '编制人', '编制日期', '部门', '销售员', '项目名称', '项目类别']
        const filterVal = ['公司名称', '客户名称', '编制人', '编制日期', '部门', '销售员', '项目名称', '项目类别']
        const data = this.formatJson(filterVal, dataAll)
        exportJsonToExcel(tHeader, data, '工程项目与决算表')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getListAll () {
      return new Promise((resolve, reject) => {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL><![CDATA[exec [Z_FinalReport] '" + this.filterProjectName + "'," + this.userInfo.fempid + ']]></FSQL>'
        tmpData += '</JA_LIST>'
        tmpData += '</soap:Body>'
        tmpData += '</soap:Envelope>'

        this.Http.post('JA_LIST', tmpData
        ).then(res => {
          let xml = res.data
          let parser = new DOMParser()
          let xmlDoc = parser.parseFromString(xml, 'text/xml')
          // 提取数据
          let Result = xmlDoc.getElementsByTagName('JA_LISTResponse')[0].getElementsByTagName('JA_LISTResult')[0]
          let HtmlStr = $(Result).html()
          let Info = JSON.parse(HtmlStr)
          resolve(Info)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getData () {
      this.loading = true
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[exec [Z_FinalList] '" + this.filterProjectName + "'," + Number((this.curPage - 1) * this.pageSize + 1) + ',' + this.curPage * this.pageSize + ',' + this.userInfo.fempid + ']]></FSQL>'
      tmpData += '</JA_LIST>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'

      this.Http.post('JA_LIST', tmpData
      ).then(res => {
        let xml = res.data
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // 提取数据
        let Result = xmlDoc.getElementsByTagName('JA_LISTResponse')[0].getElementsByTagName('JA_LISTResult')[0]
        let HtmlStr = $(Result).html()
        let Info = JSON.parse(HtmlStr)
        console.log(Info)
        if (Info.length > 0) {
          this.tableData = Info
          this.sum = Info[0].fcount
          this.loading = false
        } else {
          this.tableData = []
          this.sum = []
          this.loading = false
        }
      }).catch((error) => {
        console.log(error)
        this.loading = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
