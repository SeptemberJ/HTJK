<template>
  <div class="FilterTable">
    <el-row>
      <el-col :span="10" class="FilterBlock">
        <section>
          <el-row>
            <el-form ref="formFilter" :model="formFilter" label-width="70px" label-position="left" size="mini">
              <el-col :span="8">
                <el-form-item label="签约部门">
                  <el-select v-model="formFilter.signDepartment" placeholder="请选择">
                    <el-option
                      v-for="item in signDepartmentList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同金额">
                  <el-select v-model="formFilter.contractPrice" placeholder="请选择">
                    <el-option
                      v-for="item in contractPriceList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签约年份">
                  <el-select v-model="formFilter.signYear" placeholder="请选择">
                    <el-option
                      v-for="item in signYearList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="报警与提示" label-width="90px">
                  <el-select v-model="formFilter.warnTip" placeholder="请选择">
                    <el-option
                      v-for="item in warnTipList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="签约与竣工" label-width="90px">
                  <el-select v-model="formFilter.signAndFinish" placeholder="请选择">
                    <el-option
                      v-for="item in signAndFinishList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="归档情况">
                  <el-select v-model="formFilter.fileConditionn" placeholder="请选择">
                    <el-option
                      v-for="item in fileConditionnList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分类管控">
                  <el-select v-model="formFilter.classCondition" placeholder="请选择">
                    <el-option
                      v-for="item in classConditionList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-row>
                  <el-col :span="15" class="TextAlignL">
                    <el-form-item label="收款情况">
                      <el-select v-model="formFilter.receivablesContion" placeholder="请选择">
                        <el-option
                          v-for="item in receivablesContionList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="履约保证金" label-width="90px">
                      <el-select v-model="formFilter.performBond" placeholder="请选择">
                        <el-option
                          v-for="item in performBondList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="质量保证金" label-width="90px">
                      <el-select v-model="formFilter.qualityBond" placeholder="请选择">
                        <el-option
                          v-for="item in qualityBondList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="出货率(大于输入数的)" label-width="150px">
                      <el-input v-model="formFilter.shipmentRate"></el-input>
                    </el-form-item>
                    <el-form-item label="收款率(小于输入数的)" label-width="150px">
                      <el-input v-model="formFilter.receivablesRate"></el-input>
                    </el-form-item>
                    <el-form-item label="进入质保期项目" label-width="110px">
                      <el-select v-model="formFilter.inQuality" placeholder="请选择">
                        <el-option
                          v-for="item in inQualityList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="分包项目情况" label-width="100px">
                      <el-select v-model="formFilter.subItems" placeholder="请选择">
                        <el-option
                          v-for="item in subItemsList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" :offset="1">
                    <section>
                      <p style="text-align: left;">排序</p>
                      <div class="sortBlock">
                        <el-menu
                          default-active="按签约价"
                          class="el-menu-vertical-demo">
                          <el-menu-item v-for="(item, idx) in sortList" :key="idx" :index="item">
                            <span slot="title">{{item}}</span>
                          </el-menu-item>
                        </el-menu>
                      </div>
                    </section>
                    <section>
                      <p style="text-align: left;padding-top: 5px;">模糊查询</p>
                      <div class="vagueSearchBlock">
                        <el-input class="MarginT_10" v-model="formFilter.vagueSearch" placeholder="" size="mini"></el-input>
                        <P style='font-size: 12px;margin-top: 5px;padding: 0 5px;'>可以中间夹带*来查询，*代表任意字符</P>
                      </div>
                    </section>
                  </el-col>
                </el-row>
              </el-col>
            </el-form>
          </el-row>
        </section>
      </el-col>
      <el-col :span="14" class="ResultBlock BgGray">
        <el-table id="resultTable"
          v-loading="loading"
          :data="resultData"
          border
          @row-dblclick="goDetail"
          style="width: 100%">
          <el-table-column
            fixed
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            fixed
            prop="contractNo"
            label="合同号"
            show-overflow-tooltip
            width="180">
          </el-table-column>
          <el-table-column
            fixed
            prop="projectName"
            label="项目名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="projectCode"
            label="项目编号"
            show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column
            prop="signDate"
            label="合同签约日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="signPrice"
            label="合同签约价"
            width="180">
          </el-table-column>
          <el-table-column
            prop="settlePrice"
            label="合同结算价"
            width="180">
          </el-table-column>
          <el-table-column
            prop="budgetGrossProfit"
            label="预算毛利率"
            width="180">
          </el-table-column>
          <el-table-column
            prop="noSignNo"
            label="未签约先放号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="classManage"
            label="分类管控"
            width="180">
          </el-table-column>
          <el-table-column
            prop="process"
            label="总进度"
            width="180">
          </el-table-column>
          <el-table-column
            prop="noCompleted"
            label="已完工但未竣工"
            width="180">
          </el-table-column>
          <el-table-column
            prop="shipmentRate"
            label="出货率"
            width="180">
          </el-table-column>
          <el-table-column
            prop="receivablesRate"
            label="收款率"
            width="180">
          </el-table-column>
          <el-table-column
            prop="completedDate"
            label="竣工日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="guaranteePeriod"
            label="质保期(月)"
            width="180">
          </el-table-column>
          <el-table-column
            prop="guaranteeStart"
            label="质保起"
            width="180">
          </el-table-column>
          <el-table-column
            prop="guaranteeEnd"
            label="质保至"
            width="180">
          </el-table-column>
          <el-table-column
            prop="signDepartment"
            label="签约部门"
            width="180">
          </el-table-column>
          <el-table-column
            prop="businessmen"
            label="商务人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="projectManager"
            label="项目经理"
            width="180">
          </el-table-column>
          <el-table-column
            prop="note"
            label="备注"
            width="180">
          </el-table-column> -->
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import $ from 'jquery'
export default {
  name: 'FilterTable',
  data () {
    return {
      loading: true,
      formFilter: {
        signDepartment: -1,
        contractPrice: -1,
        signYear: -1,
        warnTip: -1,
        signAndFinish: -1,
        fileConditionn: -1,
        classCondition: -1,
        receivablesContion: -1,
        performBond: -1,
        qualityBond: -1,
        shipmentRate: '',
        receivablesRate: '',
        inQuality: -1,
        subItems: -1,
        sort: '',
        vagueSearch: ''
      },
      resultData: [],
      signDepartmentList: [
        {label: '全部', value: -1},
        {label: '系统集成部', value: 0},
        {label: '济南分公司', value: 1},
        {label: '北京分公司', value: 2},
        {label: '昆明分公司', value: 3},
        {label: '武汉分公司', value: 4},
        {label: '合肥分公司', value: 5}
      ],
      contractPriceList: [
        {label: '全部', value: -1},
        {label: '99万元以下', value: 0},
        {label: '100-999万元', value: 1},
        {label: '1000-2999万元', value: 2},
        {label: '3000万元以上', value: 3}
      ],
      signYearList: [
        {label: '全部', value: -1},
        {label: '2015', value: 0},
        {label: '2016', value: 1},
        {label: '2017', value: 2},
        {label: '2018', value: 3},
        {label: '2019', value: 4}
      ],
      warnTipList: [
        {label: '全部', value: -1},
        {label: '具有报警的项目', value: 0}
      ],
      signAndFinishList: [
        {label: '全部', value: -1},
        {label: '未签约先放号', value: 0},
        {label: '签约后长期无工程信息', value: 1},
        {label: '已完工但未竣工', value: 2}
      ],
      fileConditionnList: [
        {label: '全部', value: -1},
        {label: '档案全部交齐', value: 0},
        {label: '归档未完成', value: 1}
      ],
      classConditionList: [
        {label: '全部', value: -1},
        {label: '精品项目', value: 0},
        {label: '一般项目', value: 1},
        {label: '难收尾项目', value: 2}
      ],
      receivablesContionList: [
        {label: '全部', value: -1},
        {label: '收款全部完成', value: 0},
        {label: '未收预收款', value: 1}
      ],
      performBondList: [
        {label: '全部', value: -1},
        {label: '具有履约保证金的项目', value: 0}
      ],
      qualityBondList: [
        {label: '全部', value: -1},
        {label: '具有质量保证金的项目', value: 0}
      ],
      shipmentRateList: [],
      inQualityList: [
        {label: '全部', value: -1},
        {label: '无质保的项目', value: 0},
        {label: '有质保的项目', value: 1}
      ],
      subItemsList: [
        {label: '全部', value: -1},
        {label: '具有分包的项目', value: 0}
      ],
      sortList: ['按签约价', '按结算价', '按毛利率', '按总进度', '按出货率', '按收款率', '按商务人', '按项目经理']
    }
  },
  computed: {
    ...mapState({
    })
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions([
      'updateContractNo'
    ]),
    goDetail (row) {
      this.updateContractNo(row.contractNo)
      // this.updateContractNo('110079')
      this.$router.push({name: 'InfoDynamicTable'})
    },
    getList () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += '<FSQL>select FContractNo 合同号,b.fname 项目名称,b.FNumber 项目编号 from t_RPContract a left join t_Item_3001 b on a.fbase=b.FItemID order by FContractNo</FSQL>'
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
        Info.map((item, idx) => {
          let obj = {
            contractNo: item['合同号'],
            projectName: item['项目名称'],
            projectCode: item['项目编号']
          }
          this.resultData.push(obj)
          if (idx + 1 === Info.length) {
            this.loading = false
          }
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.FilterTable{
  padding: 5px;
  .FilterBlock{
    padding: 10px;
    border: 1px solid #7bbfea;
    background: aliceblue;
  }
}
.sortBlock{
  height: 200px;
  overflow-y: scroll;
}
.vagueSearchBlock{
  height: 100px;
  padding: 0 5px;
}
</style>
