<template>
  <div class="Contract">
    <h2 class="MarginT_20 MarginB_20">合同（应付）</h2>
    <el-row class="MarginT_20">
      <el-form ref="formContract" :model="formContract" label-width="90px" size="small" style="padding-right: 20px;">
        <el-col :span="6">
          <el-form-item label="合同日期">
            <el-date-picker prop="contractDate"
              v-model="formContract.contractDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同名称" prop="contractName">
            <el-input v-model="formContract.contractName" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同号" prop="contractNo">
            <el-input v-model="formContract.contractNo" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="施工队" prop="constructionTeam">
            <el-select v-model="formContract.constructionTeam" filterable placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in constructionTeamList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="付款条件" prop="payTerm">
            <el-select v-model="formContract.payTerm" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in payTermList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门" prop="department">
            <el-select v-model="formContract.department" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in departmentList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务员" prop="salesman">
            <el-select v-model="formContract.salesman" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in salesmanList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目编号" prop="productionCode">
            <el-select v-model="formContract.productionCode" filterable placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in productionNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="所属公司" prop="affiliatedCompany">
            <el-select v-model="formContract.affiliatedCompany" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in companyeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目进度" prop="productionProgress">
            <el-select v-model="formContract.productionProgress" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in progressList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-form>
    </el-row>
    <el-row class="listColumnTit">
      <el-col :span="1"><span>行号</span></el-col>
      <el-col :span="3"><span>产品代码</span></el-col>
      <el-col :span="3"><span>产品名称</span></el-col>
      <el-col :span="3"><span>规格型号</span></el-col>
      <el-col :span="2"><span>数量</span></el-col>
      <el-col :span="3"><span>含税单价</span></el-col>
      <el-col :span="3"><span>价税合计</span></el-col>
      <el-col :span="3"><span>备注</span></el-col>
      <el-col :span="3"><span>计量单位</span></el-col>
    </el-row>
    <!-- list -->
    <el-row class="listTable" v-for="(Record, idx) in formAdd.list" :key="idx">
      <el-col :span="1" style="background:lightsteelblue;"><span>{{idx + 1}}</span></el-col>
      <el-col :span="3">
        <el-select v-model="Record.pcode"  filterable @change="changePCode" size="mini" placeholder="请选择" style="width: 95%;margin: 0 auto;">
          <el-option
            v-for="item in productionCodeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3"><span>{{Record.pname}}</span></el-col>
      <el-col :span="3"><span>{{Record.pmodel}}</span></el-col>
      <el-col :span="2"><el-input v-model="Record.pamount" size="mini" clearable style="width: 95%;margin: 0 auto;"></el-input></el-col>
      <el-col :span="3"><el-input v-model="Record.pprice" size="mini" clearable style="width: 95%;margin: 0 auto;"></el-input></el-col>
      <el-col :span="3"><el-input v-model="Record.psum" size="mini" clearable style="width: 95%;margin: 0 auto;"></el-input></el-col>
      <el-col :span="3"><el-input v-model="Record.pnote" size="mini" clearable style="width: 95%;margin: 0 auto;"></el-input></el-col>
      <el-col :span="3"><span>{{Record.punit}}</span></el-col>
    </el-row>
    <section class="MarginT_20">
      <el-button icon="el-icon-plus" @click="addLine">新增一行</el-button>
    </section>
    <!-- 导入Excel -->
    <!-- <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="changeFile"
      :multiple="false"
      :auto-upload="false"
      :show-file-list="false">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload> -->
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
// import $ from 'jquery'
import XLSX from 'xlsx'
export default {
  name: 'Contract',
  data () {
    return {
      formContract: {
        constructionTeam: '',
        department: '',
        payTerm: '',
        salesman: '',
        contractDate: '',
        contractName: '',
        contractNo: '',
        productionCode: '',
        affiliatedCompany: '',
        productionProgress: ''
      },
      formAdd: {
        list: [
          {pcode: 'CODE1', pname: '产品名称1', pmodel: '规格型号1', pamount: '', pprice: '', psum: '', pnote: '', punit: '件'}
        ]
      },
      productionCodeList: [
        {
          value: 'CODE1',
          label: 'CODE1'
        },
        {
          value: 'CODE2',
          label: 'CODE2'
        }
      ],
      productionNumber: [
        {
          value: '项目编号1',
          label: '项目编号1'
        },
        {
          value: '项目编号2',
          label: '项目编号2'
        }
      ],
      constructionTeamList: [
        {
          value: '施工1队',
          label: '施工1队'
        }
      ],
      payTermList: [
        {
          value: '付款条件1',
          label: '付款条件1'
        }
      ],
      departmentList: [
        {
          value: '市场部',
          label: '市场部'
        }
      ],
      salesmanList: [
        {
          value: '张三',
          label: '张三'
        }
      ],
      companyeList: [
        {
          value: '上海旺策尔信息科技有限公司',
          label: '上海旺策尔信息科技有限公司'
        }
      ],
      progressList: [
        {
          value: '完工',
          label: '完工'
        }
      ]
    }
  },
  computed: {
    // ...mapState({
    // })
  },
  created () {
  },
  methods: {
    addLine () {
      this.formAdd.list.push({pcode: '', pname: '', pmodel: '', pamount: '', pprice: '', psum: '', pnote: '', punit: ''})
    },
    changePCode (val) {
      console.log(val)
    },
    changeFile (file, fileList) {
      let files = {0: file.raw}
      this.readExcel1(files)
    },
    readExcel1 (files) { // 表格导入
      // var that = this
      console.log(files)
      if (files.length <= 0) { // 如果没有文件名
        return false
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0] // 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
          console.log(ws)
          // that.peopleArr = [] // 清空接收数据
          // if(that.peopleArr.length == 1 && that.peopleArr[0].roleName == '' && that.peopleArr[0].enLine == ''){
          //   that.peopleArr = []
          // }
          // 重写数据
          try {
          } catch (err) {
            console.log(err)
          }
          this.$refs.upload.value = ''
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    }
  }
}
</script>

<style lang='less' scoped>
  .listColumnTit{
    background:lightsteelblue;
    border-bottom: 1px solid #eee;
    .el-col{
      &:not(:last-child){
        border-right: 1px solid #eee;
      }
       span{
        height: 42px;
        line-height: 42px;
        display: block;
      }
    }
  }
  .listTable{
    border-bottom: 1px solid #eee;
    .el-col{
      height: 42px;
      line-height: 42px;
      &:not(:last-child){
        border-right: 1px solid #eee;
      }
      span{
        font-size: 14px;
      }
    }
  }
</style>
