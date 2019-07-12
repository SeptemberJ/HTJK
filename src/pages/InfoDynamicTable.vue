<template>
  <div class="InfoDynamicTable">
    <el-row>
      <!-- 基本信息 -->
      <el-col :span="24">
        <div class="ModuleTit TextAlignL">项目信息</div>
        <el-form ref="formBasic" :model="formBasic" label-width="90px" size="small" class="DisabledNormal MarginT_20"  style="padding-right: 20px;">
          <el-row>
            <el-col :span="10">
              <el-form-item label="合同编号">
                <el-input v-model="formBasic.contractNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="项目名称">
                <el-input v-model="formBasic.projectName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="签约部门">
                <el-input v-model="formBasic.signDepartment" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户名称">
                <el-input v-model="formBasic.customerName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否先签约">
                <el-input v-model="formBasic.isSigned" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="商务人员">
                <el-input v-model="formBasic.swry" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="签约日期">
                <el-input v-model="formBasic.qyrq" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合同金额">
                <el-input v-model="formBasic.htje" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预算毛利率">
                <el-input v-model="formBasic.ysmll" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="项目经理">
                <el-input v-model="formBasic.xmjl" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开工日期">
                <el-input v-model="formBasic.kgrq" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="完工日期">
                <el-input v-model="formBasic.wgrq" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结算价">
                <el-input v-model="formBasic.jsj" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="累计开票">
                <el-input v-model="formBasic.ljkp" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="累计收款">
                <el-input v-model="formBasic.ljsk" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出货率">
                <el-input v-model="formBasic.chl" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收款率">
                <el-input v-model="formBasic.skl" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="竣工日期">
                <el-input v-model="formBasic.jgrq" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="质保期">
                <el-input v-model="formBasic.zbq" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="质保起">
                <el-input v-model="formBasic.zbks" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="质保至">
                <el-input v-model="formBasic.zbjs" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <!-- 收款比例 -->
      <el-col :span="12">
        <div class="ModuleTit TextAlignL">收款比例</div>
        <section class="TextAlignL MarginB_10" style="font-size: 14px;height: 140px;overflow-y: scroll;">
          <div v-for="(item, idx) in receiptsRatioList" :key="idx" class="text item" style="padding: 5px 5px 5px 20px;">
            <span>{{idx + 1}}. {{item.text}}</span>
            <span style="float: right;">{{item.ratio}}</span>
          </div>
        </section>
      </el-col>
      <!-- 警报信息 -->
      <el-col :span="12">
        <div class="ModuleTit TextAlignL">警报信息</div>
        <section class="TextAlignL" style="font-size: 14px;height: 140px;overflow-y: scroll;">
          <div v-for="(item, idx) in warnList" :key="idx" class="text item" style="padding: 5px 5px 5px 20px;">
            <span>{{idx + 1}}. {{item}}</span>
          </div>
        </section>
      </el-col>
    </el-row>
    <!-- 工程项目总进度 -->
    <!-- 1代表可操作（绿色），0代表不可操作（灰色），2代表操作完成（红色） -->
    <el-col :span="24" class="TextAlignL"><span class="ModuleTit">工程项目总进度</span></el-col>
    <el-col :span="24" class="StepWrap TextAlignL" style="width: 100%;overflow-x: scroll;">
      <div :class="{SetpItem: true, 'NotAllowed': item.status == -1}" v-for="(item, idx) in steps" :key="idx" @click="changeStep(idx)">
        <div :class="{'LineItem':true, 'bgGreen': item.status == 1, 'bgGrey': item.status == 0, 'bgRed': item.status == 2}" v-show="idx > 0"></div>
        <div class="DotItemwrap">
          <div :class="{'DotItem':true, 'bgGreen': item.status == 1, 'bgGrey': item.status == 0, 'bgRed': item.status == 2}"></div>
          <div class="TextItem">
            <p>{{item.tit}}</p>
            <p>{{item.date}}</p>
          </div>
        </div>
      </div>
    </el-col>
    <!-- ProcessEdit -->
    <ProcessEdit v-if="ifEdit" :curTimeStamp="curTimeStamp" :processStatus="processStatus" :processName="processName" :contractNo="formBasic.contractNo" @refresh="getInfor" @toggleProcessDialog="toggleProcessDialog"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import $ from 'jquery'
import ProcessEdit from '../components/ProcessEdit'
export default {
  name: 'InfoDynamicTable',
  data () {
    return {
      ifEdit: false,
      processName: '',
      curLuiCheng: '放号',
      processStatus: '',
      formBasic: {},
      receiptsRatioList: [
        {'text': '预收款', ratio: '30%'},
        {'text': '设备交货前收款', ratio: ''},
        {'text': '设备交货后收款', ratio: ''},
        {'text': '安装调试', ratio: ''},
        {'text': '合同(项目)验收款', ratio: '67%'},
        {'text': '审计审价', ratio: ''},
        {'text': '质保款', ratio: '3%'}
      ],
      warnList: ['预收款未收齐'],
      steps: [],
      curTimeStamp: '',
      liuCheng: ['放号', '合同签订', '进场施工', '设备到现场', '隐蔽验收', '安装调试', '竣工验收', '审价结算', '项目移交', '质保开始', '质保结束']
    }
  },
  components: {
    ProcessEdit
  },
  computed: {
    ...mapState({
      curContractNo: state => state.curContractNo
    })
  },
  created () {
    this.getInfor()
  },
  methods: {
    toggleProcessDialog (val) {
      this.ifEdit = val
    },
    changeStep (idx) {
      this.processStatus = this.steps[idx].status
      this.curTimeStamp = new Date().getTime()
      this.processName = this.steps[idx].tit
      switch (this.steps[idx].status) {
        case 0:
          this.$message({
            message: '该流程不可进行编辑！',
            type: 'warning'
          })
          break
        case 2:
          this.toggleProcessDialog(true)
          break
        default:
          console.log(this.steps[idx].tit)
          if (this.curLuiCheng !== this.steps[idx].tit) {
            this.$message({
              message: '请按照流程先后操作，该流程还不能进行编辑！',
              type: 'warning'
            })
          } else {
            this.toggleProcessDialog(true)
          }
      }
    },
    getInfor () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL>SELECT * FROM Z_Contract WHERE  合同号='" + this.curContractNo + "'</FSQL>"
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
        let Info = (JSON.parse(HtmlStr))[0]
        console.log(Info)
        this.formBasic = {
          contractNo: Info['合同号'],
          projectName: Info['项目名称'],
          signDepartment: Info['部门'],
          customerName: Info['客户'],
          isSigned: Info['是否先签约'],
          swry: Info['商务人员'],
          qyrq: Info['签约日期'],
          htje: Info['合同金额'],
          ysmll: '',
          xmjl: '',
          kgrq: '',
          wgrq: '',
          jsj: Info['结算价'],
          ljkp: Info['累计开票'],
          ljsk: Info['累计收款'],
          chl: Info['出货率'],
          skl: Info['收款率'],
          jgrq: Info['竣工日期'],
          zbq: Info['质保期'],
          zbks: Info['质保起'],
          zbjs: Info['质保至']
        }
        this.steps = [
          {status: Info['放号'], date: '', tit: '放号'},
          {status: Info['合同签订'], date: '', tit: '合同签订'},
          {status: Info['进场施工'], date: '', tit: '进场施工'},
          {status: Info['设备到现场'], date: '', tit: '设备到现场'},
          {status: Info['隐蔽验收'], date: '', tit: '隐蔽验收'},
          {status: Info['安装调试'], date: '', tit: '安装调试'},
          {status: Info['竣工验收'], date: '', tit: '竣工验收'},
          {status: Info['审价结算'], date: '', tit: '审价结算'},
          {status: Info['项目移交'], date: '', tit: '项目移交'},
          {status: Info['质保开始'], date: '', tit: '质保开始'},
          {status: Info['质保结束'], date: '', tit: '质保结束'}
        ]
        for (let i = 0; i < 11; i++) {
          if (Info[this.liuCheng[i]] === 1) {
            this.curLuiCheng = this.liuCheng[i]
            break
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang='less' scoped>
@stepItemWidth: 150px;
.mainContainer {
  display:flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  -webkit-align-content: stretch;
  align-content: stretch;
}
.topLeft {
  width:70%;
  // background-color:lightgreen;
}
.topRight {
  // background-color: red;
  -webkit-flex: 1;
  flex:1;
  position:relative;
}
.ModuleTit{
  width: calc(100% - 5px);
  height: 45px;
  background: #ddd;
  padding-left: 5px;
  display: block;
  line-height: 45px;
  font-weight: bold;
  margin-bottom: 10px;
}
.StepWrap{
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}
.SetpItem{
  width: @stepItemWidth;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  .DotItemwrap{
    width: @stepItemWidth/2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .DotItem{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-top: 35px;
      margin-bottom: 10px;
    }
  }
  .LineItem{
    width: @stepItemWidth/2;
    height: 2px;
    float: left;
  }
}
.TextItem{
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.bgGreen{
  background: green;
}
.bgRed{
  background: red;
}
.bgGrey{
  background: grey;
}

</style>
