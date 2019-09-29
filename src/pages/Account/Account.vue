<template>
  <div class="Account">
    <h2 class="MarginT_10 MarginB_20">工程项目预决算表</h2>
    <el-row>
      <el-form ref="form" :model="topForm" label-width="100px">
        <el-col :span="8">
          <el-form-item label="公司名称" size="mini">
            <el-select v-model="topForm.name" placeholder="请选择" size="mini" style="width: 90%;">
              <el-option
                v-for="item in CompanyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称" size="mini">
            <el-input v-model="topForm.name" size="mini" style="width: 90%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制日期" size="mini">
            <el-input v-model="topForm.name" size="mini" style="width: 85%;"></el-input>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="事业部" size="mini">
            <el-input v-model="topForm.name" size="mini" style="width: 90%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" size="mini">
            <el-input v-model="topForm.name" size="mini" style="width: 90%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="竣工日期" size="mini">
            <el-input v-model="topForm.name" size="mini" style="width: 85%;"></el-input>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="销售员" size="mini">
            <el-input v-model="topForm.name" size="mini" style="width: 90%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号" size="mini">
            <el-select v-model="topForm.name" placeholder="请选择" size="mini" style="width: 90%;">
              <el-option
                v-for="item in CodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人" size="mini">
            <el-input v-model="topForm.name" size="mini" style="width: 85%;"></el-input>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="项目经理" size="mini">
            <el-input v-model="topForm.name" size="mini" style="width: 90%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目类别" size="mini">
            <el-input v-model="topForm.name" size="mini" style="width: 90%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="税率" size="mini">
            <el-select v-model="topForm.name" placeholder="请选择" size="mini" style="width: 85%;">
              <el-option
                v-for="item in rateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- table -->
    <table cellspacing="0" class="MarginB_20" style="width: 100%;border-top: 1px solid #DCDFE6;border-left: 1px solid #DCDFE6;">
      <thead>
        <tr>
          <th>序号</th>
          <th></th>
          <th>分类款项</th>
          <th>预算(元）</th>
          <th>决算（元）</th>
          <th>财务数据</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <!-- line1 -->
        <tr>
          <td>1</td>
          <td>1001</td>
          <td>项目合同总价</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1001.01</td>
          <td>其中：银行 </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1001.02</td>
          <td>票据</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <!-- line2 -->
        <tr>
          <td>2</td>
          <td>1201</td>
          <td>设备及材料合计</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1201.01</td>
          <td>主设备</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1201.02</td>
          <td>配套设备</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1201.03</td>
          <td>其他部件费</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1201.04</td>
          <td>其他材料</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <!-- line3 -->
        <tr>
          <td>3</td>
          <td>1301</td>
          <td>安装合计</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.01</td>
          <td>材料及人工调试费</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.02</td>
          <td>外包费用（10%）</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.03</td>
          <td>外包费用（3%）</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.04</td>
          <td>外包费用（无）</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.05</td>
          <td>配合费</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.06</td>
          <td>其他</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <!-- line4 -->
        <tr>
          <td>4</td>
          <td>1401</td>
          <td>营业费用合计</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.01</td>
          <td>差旅费</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.02</td>
          <td>招待费</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.03</td>
          <td>标书及嗮图费</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.04</td>
          <td>业务直接费</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.05</td>
          <td>中标服务费</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.06</td>
          <td>其他综合费用</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <!-- line5 -->
        <tr>
          <td>5</td>
          <td>1501</td>
          <td>税费</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1701.01</td>
          <td>增值税  13%</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1701.02</td>
          <td>增值税  3%</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1701.03</td>
          <td>增值税 9%</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1701.12</td>
          <td>税金附加</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1701.13</td>
          <td>企业所得税</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1701.14</td>
          <td>印花税</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>1701.15</td>
          <td>管理费</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <!-- line6 -->
        <tr>
          <td>6</td>
          <td>1601</td>
          <td>毛利润</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <!-- line7 -->
        <tr>
          <td>7</td>
          <td>1701</td>
          <td>资金占用</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <!-- line8 -->
        <tr>
          <td>8</td>
          <td>1801</td>
          <td>毛利率</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data () {
    return {
      topForm: {
        name: ''
      },
      CompanyOptions: [
        {label: 'A', value: 'A'},
        {label: 'B', value: 'B'},
        {label: 'C', value: 'C'}
      ],
      CodeOptions: [
        {label: '保养', value: '保养'},
        {label: '维修', value: '维修'},
        {label: '改造', value: '改造'},
        {label: '板胶', value: '板胶'},
        {label: '批发', value: '批发'},
        {label: 'VRV', value: 'VRV'},
        {label: '净水', value: '净水'},
        {label: '水机', value: '水机'},
        {label: '锁具', value: '锁具'},
        {label: '灯具', value: '灯具'},
        {label: '地板', value: '地板'}
      ],
      rateOptions: [
        {label: '环科', value: '环科'},
        {label: '机电', value: '机电'},
        {label: '禾长', value: '禾长'}
      ]
    }
  },
  methods: {
    goModule (type) {
      switch (type) {
        case 0:
          this.$router.push({name: 'FilterTable'})
          break
        case 1:
          this.$router.push({name: 'FilterTable'})
          break
        case 2:
          this.$router.push({name: 'FilterTable'})
          break
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
thead{
  height: 35px;
  line-height: 35px;
}
thead tr th{
  border-bottom: 1px solid #DCDFE6;
  border-right: 1px solid #DCDFE6;
}
tbody tr td{
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #DCDFE6;
  border-right: 1px solid #DCDFE6;
}
</style>
