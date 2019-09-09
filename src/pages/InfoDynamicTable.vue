<template>
  <div class="InfoDynamicTable">
    <el-row>
      <!-- 基本信息 -->
      <el-col :span="24">
        <div class="ModuleTit TextAlignL">项目信息 <el-button type="info" size="small" icon="el-icon-close" @click="back"></el-button></div>
        <el-form ref="formBasic" :model="formBasic" label-width="85px" size="small" class="DisabledNormal MarginT_20"  style="padding-right: 20px;">
          <el-row>
            <el-col :span="6">
              <el-form-item label="隶属公司">
                <el-input v-model="formBasic.subsidiary" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户名称">
                <el-input v-model="formBasic.customerName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称">
                <el-input v-model="formBasic.projectName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="签约日期">
                <el-input v-model="formBasic.qyrq" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="签约部门">
                <el-input v-model="formBasic.signDepartment" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="TextAlignL">
              <el-form-item label="商务人员">
                <el-input v-model="formBasic.swry" clearable style="width:70%;"></el-input>
                <el-popover
                  placement="right"
                  width="100"
                  trigger="click">
                  <div>
                    <p v-for="(people, idx) in swryHistory" :key="idx">{{people['商务人员']}} <span style="float:right;">{{people['Column1']}}</span></p>
                  </div>
                  <el-button type="text" style="width:25%;display: inline-block;" slot="reference">历史记录</el-button>
                </el-popover>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="TextAlignL">
              <el-form-item label="项目经理">
                <el-input v-model="formBasic.xmjl" clearable style="width:70%;"></el-input>
                <el-popover
                  placement="right"
                  width="100"
                  trigger="click">
                  <div>
                    <p v-for="(people, idx) in xmjlHistory" :key="idx">{{people['项目经理']}}  <span style="float:right;">{{people['Column1']}}</span></p>
                  </div>
                  <el-button type="text" style="width:25%;display: inline-block;" slot="reference">历史记录</el-button>
                </el-popover>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开工日期">
                <el-date-picker style="width: 100%;"
                  v-model="formBasic.kgrq"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5">
              <el-form-item label="签约合同金额" label-width="100px">
                <el-input v-model="formBasic.qyhtje"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="合同金额">
                <el-input v-model="formBasic.htje" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="结算价">
                <el-input v-model="formBasic.jsj" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="审计价">
                <el-input v-model="formBasic.sjj" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="竣工日期">
                <el-input v-model="formBasic.jgrq" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5">
              <el-form-item label="预算毛利率" label-width="100px">
                <el-input v-model="formBasic.ysmll" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="毛利率">
                <el-input v-model="formBasic.mll" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="出货率">
                <el-input v-model="formBasic.chl" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="收款率">
                <el-input v-model="formBasic.skl" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="质保起">
                <el-input v-model="formBasic.zbks" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">
              <el-form-item label="累计开票">
                <el-input v-model="formBasic.ljkp" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="累计收款">
                <el-input v-model="formBasic.ljsk" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="费用合计">
                <el-input v-model="formBasic.fyhj" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="成本合计">
                <el-input v-model="formBasic.cbhj" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="质保期">
                <el-input v-model="formBasic.zbq" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="质保至">
                <el-input v-model="formBasic.zbjs" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="6">
              <el-form-item label="完工日期">
                <el-date-picker style="width: 100%;"
                  v-model="formBasic.wgrq"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row> -->

          <el-button class="MarginB_20" type="danger" size="small" @click="save">保 存</el-button>
        </el-form>
      </el-col>
      <!-- 收款比例 -->
      <el-col :span="24">
        <div class="ModuleTit TextAlignL">收款比例</div>
        <section v-if="receiptRateInfo.length > 0" class="TextAlignL MarginB_10" style="font-size: 14px;height: 150px;overflow-y: scroll;padding:0 5px 5px 20px;">
          <el-row style="margin-bottom: 10px; font-weight: bold;">
            <el-col :span="4">项目</el-col>
            <el-col :span="4">实际比例</el-col>
            <el-col :span="4">应收金额</el-col>
            <el-col :span="4">实际金额</el-col>
            <el-col :span="4">未收金额</el-col>
            <el-col :span="4">收款时间</el-col>
          </el-row>
          <div v-for="(item, idx) in receiptRateInfo" :key="idx" class="text item MarginB_10">
            <el-row>
              <el-col :span="4">{{idx + 1}}. {{item.FName}}</el-col>
              <el-col :span="4">{{item.fpercent}}</el-col>
              <el-col :span="4">{{item.fyingshou}}</el-col>
              <el-col :span="4">{{item.fshiji}}</el-col>
              <el-col :span="4">{{(item.fyingshou - item.fshiji).toFixed(2)}}</el-col>
              <el-col :span="4"></el-col>
            </el-row>
            <!-- <span>{{idx + 1}}. {{item.FName}}</span>
            <span style="margin-left: 100px;">{{item.fpercent}}</span> -->
          </div>
        </section>
        <!-- 无数据 -->
        <section v-else class="TextAlignL MarginB_10" style="font-size: 14px;height: 100px;">
          <div style="text-align: center;line-height: 100px;" >暂无数据</div>
        </section>
      </el-col>
      <!-- 警报信息 -->
      <!-- <el-col :span="12">
        <div class="ModuleTit TextAlignL">警报信息</div>
        <section class="TextAlignL" style="font-size: 14px;height: 140px;overflow-y: scroll;">
          <div v-for="(item, idx) in warnList" :key="idx" class="text item" style="padding: 5px 5px 5px 20px;">
            <span>{{idx + 1}}. {{item}}</span>
          </div>
        </section>
      </el-col> -->
    </el-row>
    <!-- 工程项目总进度 -->
    <!-- 1代表可操作（黄色），0代表不可操作（灰色），2代表操作完成（绿色），3代表警告(红色), 当前的流程蓝色 -->
    <el-col :span="24" class="TextAlignL"><span class="ModuleTit">工程项目总进度</span></el-col>
    <el-col :span="24" class="StepWrap TextAlignL" style="width: 100%;overflow-x: scroll;">
      <div :class="{SetpItem: true, 'NotAllowed': item.status == 0}" v-for="(item, idx) in steps" :key="idx" @click="changeStep(idx)">
        <div :class="{'LineItem':true, 'bgGrey': item.status == 0, 'bgYellow': item.status == 1 && curLuiCheng != item.tit, 'bgBlue': item.status == 1 && curLuiCheng == item.tit, 'bgGreen': item.status == 2, 'bgRed': item.status == 3 || item.status == 1 && idx < curLuiChengIdx}" v-show="idx > 0"></div>
        <div class="DotItemwrap">
          <div class="TextItem">
            <p>{{item.tit == '合同签订' || item.tit == '设备到现场' || item.tit == '审价结算' || item.tit == '质保结束' ? formBasic.swry : formBasic.xmjl}}</p>
            <p v-if="item.tit == '设备到现场'">{{wsjeSB > 0 ? wsjeSB : ''}}</p>
            <p v-if="item.status == 3 && item.tit == '质保结束'">{{formBasic.wsje > 0 ? formBasic.wsje : ''}}</p>
          </div>
          <div :class="{'DotItem':true, 'bgGrey': item.status == 0, 'bgYellow': item.status == 1 && curLuiCheng != item.tit, 'bgBlue': item.status == 1 && curLuiCheng == item.tit, 'bgGreen': item.status == 2, 'bgRed': item.status == 3 || item.status == 1 && idx < curLuiChengIdx}"></div>
          <div class="TextItem">
            <p>{{item.tit}}</p>
          </div>
        </div>
      </div>
    </el-col>
    <!-- 返回 -->
    <el-col :span="24" class="MarginT_20 MarginB_20">
      <el-button type="info" size="small" icon="el-icon-arrow-left" @click="back">返 回</el-button>
      <el-button type="primary" size="small" @click="toCost">成 本</el-button>
      <el-button type="warning" size="small" @click="toOutlay">费 用</el-button>
    </el-col>
    <!-- ProcessEdit -->
    <ProcessEdit v-if="ifEdit" :curTimeStamp="curTimeStamp" :processStatus="processStatus" :processName="processName" :curEditIdx="curEditIdx" :curLuiChengIdx="curLuiChengIdx" :contractNo="formBasic.contractNo" @markRed="markRed" @refresh="getInfor" @toggleProcessDialog="toggleProcessDialog"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Loading } from 'element-ui'
import $ from 'jquery'
import ProcessEdit from '../components/ProcessEdit'
export default {
  name: 'InfoDynamicTable',
  data () {
    return {
      ifEdit: false,
      processName: '',
      curLuiCheng: '',
      curLuiChengIdx: '',
      curEditIdx: '',
      processStatus: '',
      formBasic: {},
      xmjlHistory: [],
      swryHistory: [],
      receiptRateInfo: [],
      wsjeSB: null,
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
      curContractNo: state => state.curContractNo,
      curDB: state => state.curDB,
      userInfo: state => state.userInfo
    })
  },
  created () {
    this.getInfor()
    this.getxmjl()
    this.getSwry()
  },
  methods: {
    toggleProcessDialog (val) {
      this.ifEdit = val
    },
    // 返回
    back () {
      this.$router.push({name: 'FilterTable'})
    },
    // 保存编辑信息
    save () {
      let data = {
        items: [
          {
            FContractNo: this.curContractNo,
            FDB: this.curDB,
            f1: this.formBasic.swry,
            f2: this.formBasic.xmjl,
            famount: this.formBasic.qyhtje,
            fsdate: this.formBasic.kgrq ? this.formBasic.kgrq : '',
            fedate: this.formBasic.wgrq ? this.formBasic.wgrq : ''
          }
        ]
      }
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<Contractdetail xmlns="http://tempuri.org/">'
      tmpData += '<FJSONMSG>' + JSON.stringify(data) + '</FJSONMSG>'
      tmpData += '</Contractdetail>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'
      this.Http.post('Contractdetail', tmpData
      ).then(res => {
        let xml = res.data
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // 提取数据
        let Result = xmlDoc.getElementsByTagName('ContractdetailResponse')[0].getElementsByTagName('ContractdetailResult')[0]
        let HtmlStr = $(Result).html()
        let Info = (JSON.parse(HtmlStr))[0]
        if (Info.code === '1') {
          this.$message({
            message: '保存成功!',
            type: 'success'
          })
          this.getInfor()
          this.getxmjl()
          this.getSwry()
        } else {
          this.$message({
            message: '保存失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
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
        // case 2:
        //   this.toggleProcessDialog(true)
        //   break
        default:
          if (!this.steps[idx].author) {
            this.$message({
              message: '对不起，您没有权限对此流程进行编辑！',
              type: 'warning'
            })
          } else {
            this.curEditIdx = idx
            this.toggleProcessDialog(true)
          }
          // if (this.curLuiCheng !== this.steps[idx].tit) {
          //   this.$message({
          //     message: '请按照流程先后操作，该流程还不能进行编辑！',
          //     type: 'warning'
          //   })
          // } else {
          //   this.toggleProcessDialog(true)
          // }
      }
    },
    async getInfor () {
      let loadingInstance = Loading.service({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading'
      })
      let ReceiptRate = await this.getReceiptRate()
      let Author = await this.getAuthor()
      this.getBasicInfor(ReceiptRate, Author, loadingInstance)
    },
    getBasicInfor (ReceiptRate, Author, loadingInstance) {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL>SELECT * FROM Z_Contract WHERE  合同号='" + this.curContractNo + "' and 账套名='" + this.curDB + "'</FSQL>"
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
        console.log('Info---', Info)
        if (Info) {
          let curTimeStamp = (new Date()).getTime()
          let zbTimeStamp = Info['质保至'] ? (new Date(Info['质保至'])).getTime() : curTimeStamp
          let hasShouKuang = true
          this.formBasic = {
            subsidiary: Info['隶属公司'],
            contractNo: Info['合同号'],
            projectName: Info['项目名称'],
            signDepartment: Info['部门'],
            customerName: Info['客户'],
            // isSigned: Info['是否先签约'],
            swry: Info['商务人员'],
            qyrq: Info['签约日期'],
            htje: Info['合同金额'],
            qyhtje: Info['签约合同金额'],
            ysmll: '',
            mll: '',
            xmjl: Info['项目经理'],
            kgrq: Info['开工日期'] ? Info['开工日期'].slice(0, 10) : '',
            wgrq: Info['完工日期'] ? Info['完工日期'].slice(0, 10) : '',
            jsj: Info['结算价'],
            sjj: Info['审计价'],
            ljkp: Info['累计开票'],
            ljsk: Info['累计收款'],
            chl: Info['出货率'],
            skl: Info['收款率'],
            jgrq: Info['竣工日期'],
            fyhj: Info['费用合计'],
            cbhj: Info['成本合计'],
            zbq: Info['质保期'],
            zbks: Info['质保起'],
            zbjs: Info['质保至'],
            wsje: Info['未收金额']
          }
          if (ReceiptRate[2]) {
            let ys = ReceiptRate[2].fpercent.slice(0, ReceiptRate[2].fpercent.length - 1)
            let skl = Info['收款率'].slice(0, Info['收款率'].length - 1)
            hasShouKuang = Number(ys) <= Number(skl)
          }
          // console.log(ys)
          // console.log(skl)
          // console.log(hasShouKuang)
          this.steps = [
            {status: Info['放号'], date: '', tit: '放号', author: Author['放号']},
            {status: Info['合同签订'], date: '', tit: '合同签订', author: Author['合同签订']},
            {status: Info['进场施工'], date: '', tit: '进场施工', author: Author['进场施工']},
            {status: Info['设备到现场'] === 2 && (!hasShouKuang || Number(this.wsjeSB) > 0) ? 3 : Info['设备到现场'], date: '', tit: '设备到现场', author: Author['设备到现场']},
            // {status: Info['设备到现场'], date: '', tit: '设备到现场', author: Author['设备到现场']},
            {status: Info['隐蔽验收'], date: '', tit: '隐蔽验收', author: Author['隐蔽验收']},
            {status: Info['安装调试'], date: '', tit: '安装调试', author: Author['安装调试']},
            {status: Info['竣工验收'], date: '', tit: '竣工验收', author: Author['竣工验收']},
            {status: Info['审价结算'], date: '', tit: '审价结算', author: Author['审价结算']},
            {status: Info['项目移交'], date: '', tit: '项目移交', author: Author['项目移交']},
            {status: Info['质保开始'], date: '', tit: '质保开始', author: Author['质保开始']},
            {status: curTimeStamp > zbTimeStamp ? (Info['收款率'] === '100.00%' ? 2 : 3) : Info['质保结束'], date: '', tit: '质保结束', author: Author['质保结束']}
            // {status: curTimeStamp > zbTimeStamp && Info['收款率'] === '100.00%' ? 3 : Info['质保结束'], date: '', tit: '质保结束', author: Author['质保结束']}
          ]
          // 判断当前流程
          if (Info['放号'] === 1) {
            this.curLuiCheng = ''
            this.curLuiChengIdx = 0
          } else {
            for (let i = 0; i < 11; i++) {
              if (Info[this.liuCheng[i]] === 2 && Info[this.liuCheng[i + 1]] !== 0) {
                this.curLuiCheng = this.liuCheng[i + 1]
                this.curLuiChengIdx = Number(i) + 1
              }
              // 有禁止操作项时
              if (Info[this.liuCheng[i]] === 2 && Info[this.liuCheng[i + 1]] === 0) {
                for (let j = i + 1; j < 11; j++) {
                  if (Info[this.liuCheng[j]] === 1) {
                    this.curLuiCheng = this.liuCheng[j] ? this.liuCheng[j] : ''
                    this.curLuiChengIdx = Number(j) ? Number(j) : 100
                    break
                  }
                }
              }
            }
          }
          // for (let i = 0; i < 11; i++) {
          //   if (Info[this.liuCheng[i]] === 1) {
          //     this.curLuiCheng = this.liuCheng[i] === '放号' ? '--' : this.liuCheng[i]
          //     this.curLuiChengIdx = i
          //     break
          //   }
          // }
          // 设备到现场的未收金额
          if (ReceiptRate[1]) {
            this.wsjeSB = (ReceiptRate[1].fyingshou - ReceiptRate[1].fshiji).toFixed(2)
          } else {
            this.wsjeSB = '0.00'
          }
          this.receiptRateInfo = ReceiptRate
          // this.receiptRateInfo = ReceiptRate.map(item => {
          //   item.sj = (item.fyingshou - item.fshiji).toFixed(2)
          //   return item
          // })
          loadingInstance.close()
        } else {
          this.$message({
            message: '暂无信息!',
            type: 'info'
          })
          loadingInstance.close()
        }
      }).catch((error) => {
        console.log(error)
        loadingInstance.close()
      })
    },
    getSwry () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[select f1 商务人员,convert(varchar(50),f1date,23) from Z_Contract_log where isnull(f1,'')<>'' and FContractNo='" + this.curContractNo + "' and fdb='" + this.curDB + "'  order by fid]]></FSQL>"
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
        let Info = (JSON.parse(HtmlStr))
        console.log('reyuan', Info)
        this.swryHistory = Info
      }).catch((error) => {
        console.log(error)
      })
    },
    getxmjl () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL><![CDATA[select f2 项目经理,convert(varchar(50),f2date,23) from Z_Contract_log where isnull(f2,'')<>'' and FContractNo='" + this.curContractNo + "'and fdb='" + this.curDB + "' order by fid]]></FSQL>"
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
        let Info = (JSON.parse(HtmlStr))
        this.xmjlHistory = Info
      }).catch((error) => {
        console.log(error)
      })
    },
    getReceiptRate () {
      return new Promise((resolve, reject) => {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += "<FSQL>exec z_skbl '" + this.curContractNo + "','" + this.curDB + "'</FSQL>"
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
          let Info = (JSON.parse(HtmlStr))
          console.log('ReceiptRate--', Info)
          resolve(Info)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getAuthor () {
      return new Promise((resolve, reject) => {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
        tmpData += '<FSQL>select isnull(f_102,0)放号,isnull(f_103,0)合同签订,isnull(f_104,0)进场施工,isnull(f_105,0)设备到现场,isnull(f_106,0)隐蔽验收,isnull(f_107,0)安装调试,isnull(f_108,0)竣工验收,isnull(f_109,0)审价结算,isnull(f_110,0)项目移交,isnull(f_111,0)质保开始,isnull(f_112,0)质保结束 from t_emp where fitemid=' + this.userInfo.fempid + '</FSQL>'
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
          resolve(Info)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    // 标记红色
    markRed (Idx) {
      this.steps.map((step, idx) => {
        if (step.status === 1 && idx < Idx) {
          var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
          tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
          tmpData += '<soap:Body> '
          tmpData += '<jindu xmlns="http://tempuri.org/">'
          tmpData += '<FContractNo>' + this.curContractNo + '</FContractNo>'
          tmpData += '<FType>' + step.tit + '</FType>'
          tmpData += '<FColor>' + 3 + '</FColor>'
          tmpData += '</jindu>'
          tmpData += '</soap:Body>'
          tmpData += '</soap:Envelope>'
          this.Http.post('jindu', tmpData
          ).then(res => {
            // let xml = res.data
            // let parser = new DOMParser()
            // let xmlDoc = parser.parseFromString(xml, 'text/xml')
            // // 提取数据
            // let Result = xmlDoc.getElementsByTagName('jinduResponse')[0].getElementsByTagName('jinduResult')[0]
            // let HtmlStr = $(Result).html()
            // let Info = (JSON.parse(HtmlStr))[0]
            // if (Info.code === '1') {
            //   // this.$message({
            //   //   message: '确认红色成功!',
            //   //   type: 'success'
            //   // })
            //   // this.refresh()
            // } else {
            //   // this.$message({
            //   //   message: '确认红色失败!',
            //   //   type: 'error'
            //   // })
            // }
          }).catch((error) => {
            console.log(error)
          })
        }
        if (idx === 10) {
          this.getInfor()
        }
      })
    },
    toOutlay () {
      this.$router.push({name: 'Outlay'})
    },
    toCost () {
      this.$router.push({name: 'Cost'})
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
  height: 42px;
  background: #ddd;
  padding-left: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 42px;
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
      margin-top: 10px;
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
  height: 30px;
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
.bgBlue{
  background: blue;
}
.bgRed{
  background: red;
}
.bgGrey{
  background: grey;
}

</style>
