<template>
  <div class="ProcessEdit">
    <el-dialog @close="closeDialog" :close-on-click-modal="false"
      :title="processName"
      :visible.sync="dialogProcessVisible"
      width="650px">
      <section>
        <p v-if="processName != '放号'" class="TextAlignL MarginB_10"><b>已上传的文件：</b></p>
        <p v-if="processName != '放号' && fileList.length == 0" class="TextAlignL PaddingL_28">无相关文件</p>
        <div v-if="fileList.length > 0">
          <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList" :key="idx">
            {{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a>
            <span v-if="processName == '隐蔽验收' ||  processName == '安装调试'" style="float:right;width: 50px;text-align:right;">{{file.fpercent}}</span>
            <span style="float:right;">{{file.fileDate}}</span>
          </p>
        </div>
        <div v-if="processName != '放号' && processStatus != 2">
          <p class="TextAlignL MarginT_20"><b>上传新文件：{{formFile.fileName}}</b></p>
          <el-form :model="formFile" :rules="rulesFile" ref="formFile" label-width="100px" label-position="left">
            <el-form-item label="文件" prop="fileName" class="TextAlignL">
              <el-upload
                class="upload-demo"
                ref="upload"
                v-model="formFile.fileName"
                :action="uploadAdr"
                accept=".pdf,.doc,.PDF"
                :limit="1"
                :on-change="changeFile"
                :before-upload="beforeUpload"
                :on-remove="removeFile"
                :on-success="handleUploadSuccess"
                :auto-upload="false">
                <el-button slot="trigger" size="small" icon="el-icon-upload" type="">请选取上传的文件</el-button>
                <div slot="tip" class="el-upload__tip" style="display: inline-block;padding-left: 10px;margin-top: 0;">（ 文件格式需为doc/pdf ）</div>
              </el-upload>
            </el-form-item>
            <el-form-item v-if="processName == '隐蔽验收' || processName == '安装调试'" label="完成比列" prop="percent" class="TextAlignL">
              <el-input v-model="formFile.percent" style="width: 200px;">
                <el-button slot="append">%</el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </section>
      <span slot="footer" class="dialog-footer TextAlignC" style="width: 100%;display: inline-block;">
        <el-button type="danger" @click="finish" :disabled="processStatus == 2">确认完成</el-button>
        <el-button type="primary" v-if="processStatus != 2 && processName != '放号'" @click="uploadFile('formFile')">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';
import $ from 'jquery'
export default {
  name: 'ProcessEdit',
  props: ['processName', 'contractNo', 'curTimeStamp', 'processStatus'],
  data () {
    return {
      dialogProcessVisible: true,
      fileUrl: '',
      formFile: {
        fileName: '',
        percent: ''
      },
      rulesFile: {
        fileName: [
          { required: true, message: '请选择需要上传的文件!', trigger: 'change' }
        ],
        percent: [
          { required: true, message: '请输入完成比例!', trigger: 'change' }
        ]
      },
      fileList: [],
      ifShowUpload: false
    }
  },
  computed: {
    uploadAdr () {
      return 'http://plant.fs-elliott.cn:8082/fushengJK/uploadFileZT?mulu=' + `${this.contractNo}`
    }
  },
  watch: {
    curTimeStamp: {
      handler (newVal) {
        this.getFileList()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    closeDialog () {
      this.$emit('toggleProcessDialog', false)
    },
    handleUploadSuccess (response) {
      // this.fileUrl = response.filePath
      this.formFile.fileName = response.filename
      this.submit(response.filename)
    },
    removeFile (file, fileList) {
      this.formFile.fileName = ''
    },
    changeFile (file) {
      this.formFile.fileName = file.name
    },
    uploadFile (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
        } else {
          this.$message({
            message: '请将信息补充完整！',
            type: 'warning'
          })
        }
      })
    },
    submit (filename) {
      let Percent = (this.processName === '隐蔽验收' || this.processName === '安装调试') ? this.formFile.percent : 0
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<PIC_UPLoad xmlns="http://tempuri.org/">'
      tmpData += '<FContractNo>' + this.contractNo + '</FContractNo>'
      tmpData += '<FType>' + this.processName + '</FType>'
      tmpData += '<FPath>' + filename + '</FPath>'
      tmpData += '<FPercent>' + Percent + '</FPercent>'
      tmpData += '</PIC_UPLoad>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'

      this.Http.post('PIC_UPLoad', tmpData
      ).then(res => {
        let xml = res.data
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // 提取数据
        let Result = xmlDoc.getElementsByTagName('PIC_UPLoadResponse')[0].getElementsByTagName('PIC_UPLoadResult')[0]
        let HtmlStr = $(Result).html()
        let Info = (JSON.parse(HtmlStr))[0]
        if (Info.code === '1') {
          this.$message({
            message: '上传成功!',
            type: 'success'
          })
          this.$emit('toggleProcessDialog', false)
          this.$emit('refresh')
        } else {
          this.$message({
            message: '上传失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 查询之前上传的文件
    getFileList () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL>select fcontractno 合同号,ftype 阶段,'http://plant.fs-elliott.cn:8082/zetian_file/'+fcontractno+'/'+fpath 文件路径,convert(varchar(50),fdate,23)fdate,isnull(fper,0)fper from Z_FILE where fcontractno='" + this.contractNo + "' and ftype='" + this.processName + "'</FSQL>"
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
        this.fileList = Info.map(item => {
          item.fileDate = item.fdate ? item.fdate : ''
          item.fpercent = item.fper + '%'
          item.fileUrl = item['文件路径']
          let startiIdx = item['文件路径'].indexOf(this.contractNo) + this.contractNo.length + 1
          item.fileName = item['文件路径'].slice(startiIdx)
          return item
        })
        if (this.processName === '隐蔽验收' || this.processName === '安装调试') {
          this.ifShowUpload = true
        } else {
          this.ifShowUpload = Info.length === 0
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 确认流程
    finish () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<jindu xmlns="http://tempuri.org/">'
      tmpData += '<FContractNo>' + this.contractNo + '</FContractNo>'
      tmpData += '<FType>' + this.processName + '</FType>'
      tmpData += '</jindu>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'

      this.Http.post('jindu', tmpData
      ).then(res => {
        let xml = res.data
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // 提取数据
        let Result = xmlDoc.getElementsByTagName('jinduResponse')[0].getElementsByTagName('jinduResult')[0]
        let HtmlStr = $(Result).html()
        let Info = (JSON.parse(HtmlStr))[0]
        console.log(Info)
        if (Info.code === '1') {
          this.$message({
            message: '确认成功!',
            type: 'success'
          })
          this.$emit('toggleProcessDialog', false)
          this.$emit('refresh')
        } else {
          this.$message({
            message: '确认失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    beforeUpload (file) {
      // var reader = new FileReader()
      // reader.readAsArrayBuffer(file)
      // reader.onload = (e) => {
      //   console.log(this.buf2hex(e.target.result))
      // }
    },
    buf2hex (buffer) {
      return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
    }
  }
}
</script>

<style lang='less' scoped>
</style>
