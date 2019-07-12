<template>
  <div class="InfoDynamicTable">
    <el-row>
      <div class="mainContainer">
        <div class="topLeft">
          <!-- 基本信息 -->
          <el-col :span="24" style="height: 100%;padding-right: 10px;">
            <el-form ref="formBasic" :model="formBasic" label-width="90px" size="mini" class="DisabledNormal">
              <el-row>
                <el-col :span="24" class="TextAlignL"><span class="ModuleTit">项目信息</span></el-col>
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
                  <el-form-item label="首款率">
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
        </div>
        <div class="topRight">
          <!-- 收款比例 -->
          <el-col :span="24" style="height: 100%;">
            <el-row>
              <el-col :span="24" class="TextAlignL"><span class="ModuleTit">收款比例</span></el-col>
              <el-col :span="24" class="TextAlignL" style="font-size: 14px;height: 140px;overflow-y: scroll;">
                <div v-for="(item, idx) in receiptsRatioList" :key="idx" class="text item" style="padding: 5px;">
                  <span>{{idx + 1}}. {{item.text}}</span>
                  <span style="float: right;">{{item.ratio}}</span>
                </div>
              </el-col>
              <el-col :span="24" class="TextAlignL"><span class="ModuleTit">警报信息</span></el-col>
              <el-col :span="24" class="TextAlignL" style="height: 140px;font-size: 14px;overflow-y: scroll;">
                <div v-for="(item, idx) in warnList" :key="idx" class="text item" style="padding: 5px;">
                  <span>{{idx + 1}}. {{item}}</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </div>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24" class="TextAlignL"><span class="ModuleTit">工程项目总进度</span></el-col>
      <el-col :span="24" class="StepWrap TextAlignL" style="width: 100%;overflow-x: scroll;">
        <div :class="{SetpItem: true, 'NotAllowed': item.status == -1}" v-for="(item, idx) in steps" :key="idx" @click="changeStep(idx)">
          <div :class="{'LineItem':true, 'bgGreen': item.status == 0, 'bgGrey': item.status == -1, 'bgYellow': item.status == 1}" v-show="idx > 0"></div>
          <div class="DotItemwrap">
            <div  :class="{'DotItem':true, 'bgGreen': item.status == 0, 'bgGrey': item.status == -1, 'bgYellow': item.status == 1}"></div>
            <div class="TextItem">
              <p>{{item.tit}}</p>
              <p>{{item.date}}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- ProcessEdit -->
    <ProcessEdit v-if="ifEdit" :processName="processName" @toggleProcessDialog="toggleProcessDialog"/>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import ProcessEdit from '../components/ProcessEdit'
export default {
  name: 'InfoDynamicTable',
  data () {
    return {
      ifEdit: false,
      processName: '',
      formBasic: {
        contractNo: 'HT89378087',
        projectName: '泽天工程合同监控项目',
        signDepartment: '北京分公司',
        customerName: '某某科技公司',
        isSigned: 'ERP 先签约',
        swry: '张先生',
        qyrq: '2019-07-01',
        htje: '478.0万元',
        ysmll: '36.83%',
        xmjl: '周虎生',
        kgrq: '2019-07-12',
        wgrq: '2020-10-12',
        jsj: '478.0万元',
        ljkp: '165.9万元',
        ljsk: '0.0万元',
        chl: '0.71%',
        skl: '0.00%',
        jgrq: '',
        zbq: '12个月',
        zbks: '',
        zbjs: ''
      },
      receiptsRatioList: [
        {'text': '预收款', ratio: '30%'},
        {'text': '设备交货前收款', ratio: ''},
        {'text': '设备交货后收款', ratio: ''},
        {'text': '安装调试', ratio: ''},
        {'text': '合同(项目)验收款', ratio: '67%'},
        {'text': '审计审价', ratio: ''},
        {'text': '质保款', ratio: '3%'}
      ],
      warnList: ['预收款未收齐预收款未收齐预收款未收齐预收款未收齐预收款未收齐', '预收款未收齐', '预收款未收齐', '预收款未收齐', '预收款未收齐', '预收款未收齐', '预收款未收齐'],
      steps: [
        {status: 1, date: '2019-07-01', tit: '放号日'},
        {status: 1, date: '2019-07-01', tit: '合同签订'},
        {status: -1, date: '2019-07-01', tit: '进场开工'},
        {status: 0, date: '2019-07-01', tit: '隐蔽工程'},
        {status: 0, date: '2019-07-01', tit: '设备交货'},
        {status: 0, date: '2019-07-01', tit: '安装调试'},
        {status: 0, date: '2019-07-01', tit: '竣工验收'},
        {status: 0, date: '2019-07-01', tit: '审核结算'},
        {status: 0, date: '2019-07-01', tit: '系统移交'},
        {status: 0, date: '2019-07-01', tit: '质保开始'},
        {status: 0, date: '2019-07-01', tit: '质保结束'},
        {status: 0, date: '2019-07-01', tit: '工程完毕'}
      ]
    }
  },
  components: {
    ProcessEdit
  },
  computed: {
  },
  created () {
  },
  methods: {
    toggleProcessDialog (val) {
      this.ifEdit = val
    },
    changeStep (idx) {
      switch (this.steps[idx].status) {
        case 1:
          this.$message({
            message: '该流程已完成，不可再进行编辑！',
            type: 'warning'
          })
          break
        case -1:
          break
        default:
          this.processName = this.steps[idx].tit
          this.toggleProcessDialog(true)
      }
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
  height: 35px;
  padding-left: 5px;
  display: block;
  line-height: 35px;
  font-weight: bold;
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
.bgYellow{
  background: yellow;
}
.bgGrey{
  background: grey;
}

</style>
