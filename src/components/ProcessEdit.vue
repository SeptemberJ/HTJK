<template>
  <div class="ProcessEdit">
    <el-dialog @close="closeDialog" :close-on-click-modal="false"
      :title="processName"
      :visible.sync="dialogProcessVisible"
      width="750px">
      <section>
        <p v-if="processName != '放号'" class="TextAlignL MarginB_10"><b>已上传的文件：</b></p>
        <!-- 之前文件列表 -->
        <!-- 合同签订 -->
        <section v-if="processName == '合同签订'">
          <p v-if="fileList['合同签订']['销售合同'].length == 0" class="TextAlignL PaddingL_28">无相关文件</p>
          <div v-else>
            <span class="secondTit">销售合同</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['合同签订']['销售合同']" :key="idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '销售合同')"></i>
              </span>
            </p>
          </div>
        </section>
        <!-- 进场施工 -->
        <section v-if="processName == '进场施工'">
          <p v-if="fileList['进场施工']['开工报告'].length == 0 && fileList['进场施工']['工程交底会议'].length == 0 && fileList['进场施工']['项目流转单'].length == 0" class="TextAlignL PaddingL_28">无相关文件</p>
          <div v-else>
            <span class="secondTit" v-if="fileList['进场施工']['开工报告'].length > 0">开工报告</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['进场施工']['开工报告']" :key="idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '开工报告')"></i>
              </span>
            </p>
            <span class="secondTit" v-if="fileList['进场施工']['工程交底会议'].length > 0">工程交底会议</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['进场施工']['工程交底会议']" :key="'工程交底会议' + idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '工程交底会议')"></i>
              </span>
            </p>
            <span class="secondTit" v-if="fileList['进场施工']['项目流转单'].length > 0">项目流转单</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['进场施工']['项目流转单']" :key="'项目流转单' + idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '项目流转单')"></i>
              </span>
            </p>
          </div>
        </section>
        <!-- 设备到现场 -->
        <section v-if="processName == '设备到现场'">
          <p v-if="fileList['设备到现场']['设备签收单'].length == 0" class="TextAlignL PaddingL_28">无相关文件</p>
          <div v-else>
            <span class="secondTit" v-if="fileList['设备到现场']['设备签收单'].length > 0">设备签收单</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['设备到现场']['设备签收单']" :key="idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                <span style="padding-right: 10px;">{{file.fpercent}}</span>
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '设备签收单')"></i>
              </span>
            </p>
          </div>
        </section>
        <!-- 隐蔽验收 -->
        <section v-if="processName == '隐蔽验收'">
          <p v-if="fileList['隐蔽验收']['试气报告'].length == 0 && fileList['隐蔽验收']['试压报告'].length == 0 && fileList['隐蔽验收']['灌水试验报告'].length == 0" class="TextAlignL PaddingL_28">无相关文件</p>
          <div v-else>
            <span class="secondTit" v-if="fileList['隐蔽验收']['试气报告'].length > 0">试气报告</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['隐蔽验收']['试气报告']" :key="idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                <span style="padding-right: 10px;">{{file.fpercent}}</span>
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '试气报告')"></i>
              </span>
            </p>
            <span class="secondTit" v-if="fileList['隐蔽验收']['试压报告'].length > 0">试压报告</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['隐蔽验收']['试压报告']" :key="'试压报告' + idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                <span style="padding-right: 10px;">{{file.fpercent}}</span>
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '试压报告')"></i>
              </span>
            </p>
            <span class="secondTit" v-if="fileList['隐蔽验收']['灌水试验报告'].length > 0">灌水试验报告</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['隐蔽验收']['灌水试验报告']" :key="'灌水试验报告' + idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                <span style="padding-right: 10px;">{{file.fpercent}}</span>
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '灌水试验报告')"></i>
              </span>
            </p>
          </div>
        </section>
        <!-- 安装调试 -->
        <section v-if="processName == '安装调试'">
          <p v-if="fileList['安装调试']['调试验收单'].length == 0 && fileList['安装调试']['设备移交单'].length == 0" class="TextAlignL PaddingL_28">无相关文件</p>
          <div v-else>
            <span class="secondTit" v-if="fileList['安装调试']['调试验收单'].length > 0">调试验收单</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['安装调试']['调试验收单']" :key="idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                <span style="padding-right: 10px;">{{file.fpercent}}</span>
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '调试验收单')"></i>
              </span>
            </p>
            <span class="secondTit" v-if="fileList['安装调试']['设备移交单'].length > 0">设备移交单</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['安装调试']['设备移交单']" :key="'设备移交单' + idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                <span style="padding-right: 10px;">{{file.fpercent}}</span>
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '设备移交单')"></i>
              </span>
            </p>
          </div>
        </section>
        <!-- 竣工验收 -->
        <section v-if="processName == '竣工验收'">
          <p v-if="fileList['竣工验收']['竣工图'].length == 0" class="TextAlignL PaddingL_28">无相关文件</p>
          <div v-else>
            <span class="secondTit" v-if="fileList['竣工验收']['竣工图'].length > 0">竣工图</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['竣工验收']['竣工图']" :key="idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '竣工图')"></i>
              </span>
            </p>
          </div>
        </section>
        <!-- 审价结算 -->
        <section v-if="processName == '审价结算'">
          <p v-if="fileList['审价结算']['审计报告'].length == 0" class="TextAlignL PaddingL_28">无相关文件</p>
          <div v-else>
            <span class="secondTit" v-if="fileList['审价结算']['审计报告'].length > 0">审计报告</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['审价结算']['审计报告']" :key="idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '审计报告')"></i>
              </span>
            </p>
          </div>
        </section>
        <!-- 项目移交 -->
        <section v-if="processName == '项目移交'">
          <p v-if="fileList['项目移交']['同竣工验收资料'].length == 0" class="TextAlignL PaddingL_28">无相关文件</p>
          <div v-else>
            <span class="secondTit" v-if="fileList['项目移交']['同竣工验收资料'].length > 0">同竣工验收资料</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['项目移交']['同竣工验收资料']" :key="idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '同竣工验收资料')"></i>
              </span>
            </p>
          </div>
        </section>
        <!-- 质保开始 -->
        <section v-if="processName == '质保开始'">
          <p v-if="fileList['质保开始']['调试验收单'].length == 0" class="TextAlignL PaddingL_28">无相关文件</p>
          <div v-else>
            <span class="secondTit" v-if="fileList['质保开始']['调试验收单'].length > 0">调试验收单</span>
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['质保开始']['调试验收单']" :key="idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '调试验收单')"></i>
              </span>
            </p>
          </div>
        </section>
        <!-- 质保结束 -->
        <section v-if="processName == '质保结束'">
          <p v-if="fileList['质保结束']['文件'].length == 0" class="TextAlignL PaddingL_28">无相关文件</p>
          <div v-else>
            <!-- <span class="secondTit" v-if="fileList['质保结束']['文件'].length > 0">文件</span> -->
            <p class="TextAlignL MarginB_10 PaddingL_28" v-for="(file, idx) in fileList['质保结束']['文件']" :key="idx">
              <span class="TextIndent">{{idx + 1}}.  <a :href="file.fileUrl">{{file.fileName}}</a></span>
              <span style="float:right;">
                {{file.fileDate}}
                <i class="el-icon-delete CursorPointer" style="margin-left: 20px;" @click="deleteFile(file, '文件')"></i>
              </span>
            </p>
          </div>
        </section>
        <!-- 新增文件 -->
        <div v-if="processStatus != 2">
          <p class="TextAlignL MarginT_20 MarginB_20"><b>上传新文件：（ 文件格式需为doc/pdf ）</b></p>
          <!-- 合同签订 -->
          <section v-if="processName == '合同签订'">
            <el-form :model="formHtqd" :rules="rulesFile" ref="formHtqd" label-width="100px" label-position="left">
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="销售合同" prop="fileName" class="TextAlignL">
                      <el-row>
                        <el-upload
                          class="upload-demo"
                          ref="upload_formHtqd"
                          v-model="formHtqd.fileName"
                          :action="uploadAdr"
                          accept=".pdf,.doc,.PDF"
                          :file-list="curFileList_formHtqd"
                          :on-change="(file, fileList)=>{changeFile(file, fileList, 'formHtqd')}"
                          :before-upload="beforeUpload"
                          :on-success="(val)=>{handleUploadSuccess(val, '销售合同', 'formHtqd')}"
                          :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formHtqd')}"
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                        </el-upload>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="9">
                    <el-form-item label="完成比列" prop="percent" class="TextAlignL">
                      <el-input v-model="formHtqd.percent" style="width: 150px;">
                        <el-button slot="append">%</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="12" class="TextAlignR">
                    <el-button type="primary" v-if="processStatus != 2" @click="uploadFile('formHtqd', '销售合同')">提 交</el-button>
                  </el-col>
              </el-row>
            </el-form>
          </section>
          <!-- 进场施工 -->
          <section v-if="processName == '进场施工'">
            <el-form :model="formJcsg_kgbg" :rules="rulesFile" ref="formJcsg_kgbg" label-width="120px" label-position="left">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="开工报告" prop="fileName" class="TextAlignL">
                    <el-row>
                      <el-upload
                        class="upload-demo"
                        ref="upload_formJcsg_kgbg"
                        v-model="formJcsg_kgbg.fileName"
                        :action="uploadAdr"
                        accept=".pdf,.doc,.PDF"
                        :file-list="curFileList_formJcsg_kgbg"
                        :on-change="(file, fileList)=>{changeFile(file, fileList, 'formJcsg_kgbg')}"
                        :before-upload="beforeUpload"
                        :on-success="(val)=>{handleUploadSuccess(val, '开工报告', 'formJcsg_kgbg')}"
                        :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formJcsg_kgbg')}"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                      </el-upload>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="TextAlignR">
                  <el-button type="primary" @click="uploadFile('formJcsg_kgbg', '开工报告')">提 交</el-button>
                </el-col>
              </el-row>
            </el-form>
            <el-form :model="formJcsg_gcjdhy" :rules="rulesFile" ref="formJcsg_gcjdhy" label-width="120px" label-position="left">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工程交底会议" prop="fileName" class="TextAlignL">
                    <el-row>
                      <el-upload
                        class="upload-demo"
                        ref="upload_formJcsg_gcjdhy"
                        v-model="formJcsg_gcjdhy.fileName"
                        :action="uploadAdr"
                        accept=".pdf,.doc,.PDF"
                        :file-list="curFileList_formJcsg_gcjdhy"
                        :on-change="(file, fileList)=>{changeFile(file, fileList, 'formJcsg_gcjdhy')}"
                        :before-upload="beforeUpload"
                        :on-success="(val)=>{handleUploadSuccess(val, '工程交底会议', 'formJcsg_gcjdhy')}"
                        :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formJcsg_gcjdhy')}"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                      </el-upload>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="TextAlignR">
                  <el-button type="primary" @click="uploadFile('formJcsg_gcjdhy', '工程交底会议')">提 交</el-button>
                </el-col>
              </el-row>
            </el-form>
            <el-form :model="formJcsg_xmlzd" :rules="rulesFile" ref="formJcsg_xmlzd" label-width="120px" label-position="left">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="项目流转单" prop="fileName" class="TextAlignL">
                    <el-row>
                      <el-upload
                        class="upload-demo"
                        ref="upload_formJcsg_xmlzd"
                        v-model="formJcsg_xmlzd.fileName"
                        :action="uploadAdr"
                        accept=".pdf,.doc,.PDF"
                        :file-list="curFileList_formJcsg_xmlzd"
                        :on-change="(file, fileList)=>{changeFile(file, fileList, 'formJcsg_xmlzd')}"
                        :before-upload="beforeUpload"
                        :on-success="(val)=>{handleUploadSuccess(val, '项目流转单', 'formJcsg_xmlzd')}"
                        :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formJcsg_xmlzd')}"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                      </el-upload>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="TextAlignR">
                  <el-button type="primary" v-if="processStatus != 2" @click="uploadFile('formJcsg_xmlzd', '项目流转单')">提 交</el-button>
                </el-col>
              </el-row>
            </el-form>
          </section>
          <!-- 设备到现场 -->
          <section v-if="processName == '设备到现场'">
            <el-form :model="formSbdxc" :rules="rulesFile" ref="formSbdxc" label-width="100px" label-position="left">
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="设备签收单" prop="fileName" class="TextAlignL">
                      <el-row>
                        <el-upload
                          class="upload-demo"
                          ref="upload_formSbdxc"
                          v-model="formSbdxc.fileName"
                          :action="uploadAdr"
                          accept=".pdf,.doc,.PDF"
                          :file-list="curFileList_formSbdxc"
                          :on-change="(file, fileList)=>{changeFile(file, fileList, 'formSbdxc')}"
                          :before-upload="beforeUpload"
                          :on-success="(val)=>{handleUploadSuccess(val, '设备签收单', 'formSbdxc')}"
                          :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formSbdxc')}"
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                        </el-upload>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="完成比列" prop="percent" class="TextAlignL">
                      <el-input v-model="formSbdxc.percent" style="width: 150px;">
                        <el-button slot="append">%</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3" class="TextAlignR">
                    <el-button type="primary" v-if="processStatus != 2" @click="uploadFile('formSbdxc', '设备签收单')">提 交</el-button>
                  </el-col>
              </el-row>
            </el-form>
          </section>
          <!-- 隐蔽验收 -->
          <section v-if="processName == '隐蔽验收'">
            <el-form :model="formYbys_sqbg" :rules="rulesFile" ref="formYbys_sqbg" label-width="120px" label-position="left">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="试气报告" prop="fileName" class="TextAlignL">
                    <el-row>
                      <el-upload
                        class="upload-demo"
                        ref="upload_formYbys_sqbg"
                        v-model="formYbys_sqbg.fileName"
                        :action="uploadAdr"
                        accept=".pdf,.doc,.PDF"
                        :file-list="curFileList_formYbys_sqbg"
                        :on-change="(file, fileList)=>{changeFile(file, fileList, 'formYbys_sqbg')}"
                        :before-upload="beforeUpload"
                        :on-success="(val)=>{handleUploadSuccess(val, '试气报告', 'formYbys_sqbg')}"
                        :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formYbys_sqbg')}"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                      </el-upload>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="完成比列" prop="percent" class="TextAlignL">
                    <el-input v-model="formYbys_sqbg.percent" style="width: 150px;">
                      <el-button slot="append">%</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" class="TextAlignR">
                  <el-button type="primary" @click="uploadFile('formYbys_sqbg', '试气报告')">提 交</el-button>
                </el-col>
              </el-row>
            </el-form>
            <el-form :model="formYbys_sybg" :rules="rulesFile" ref="formYbys_sybg" label-width="120px" label-position="left">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="试压报告" prop="fileName" class="TextAlignL">
                    <el-row>
                      <el-upload
                        class="upload-demo"
                        ref="upload_formYbys_sybg"
                        v-model="formYbys_sybg.fileName"
                        :action="uploadAdr"
                        accept=".pdf,.doc,.PDF"
                        :file-list="curFileList_formYbys_sybg"
                        :on-change="(file, fileList)=>{changeFile(file, fileList, 'formYbys_sybg')}"
                        :before-upload="beforeUpload"
                        :on-success="(val)=>{handleUploadSuccess(val, '试压报告', 'formYbys_sybg')}"
                        :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formYbys_sybg')}"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                      </el-upload>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="完成比列" prop="percent" class="TextAlignL">
                    <el-input v-model="formYbys_sybg.percent" style="width: 150px;">
                      <el-button slot="append">%</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" class="TextAlignR">
                  <el-button type="primary" @click="uploadFile('formYbys_sybg', '试压报告')">提 交</el-button>
                </el-col>
              </el-row>
            </el-form>
            <el-form :model="formYbys_gssybg" :rules="rulesFile" ref="formYbys_gssybg" label-width="120px" label-position="left">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="灌水试验报告" prop="fileName" class="TextAlignL">
                    <el-row>
                      <el-upload
                        class="upload-demo"
                        ref="upload_formYbys_gssybg"
                        v-model="formYbys_gssybg.fileName"
                        :action="uploadAdr"
                        accept=".pdf,.doc,.PDF"
                        :file-list="curFileList_formYbys_gssybg"
                        :on-change="(file, fileList)=>{changeFile(file, fileList, 'formYbys_gssybg')}"
                        :before-upload="beforeUpload"
                        :on-success="(val)=>{handleUploadSuccess(val, '灌水试验报告', 'formYbys_gssybg')}"
                        :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formYbys_gssybg')}"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                      </el-upload>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="完成比列" prop="percent" class="TextAlignL">
                    <el-input v-model="formYbys_gssybg.percent" style="width: 150px;">
                      <el-button slot="append">%</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" class="TextAlignR">
                  <el-button type="primary" v-if="processStatus != 2" @click="uploadFile('formYbys_gssybg', '灌水试验报告')">提 交</el-button>
                </el-col>
              </el-row>
            </el-form>
          </section>
          <!-- 安装调试 -->
          <section v-if="processName == '安装调试'">
            <el-form :model="formAzts_tsysd" :rules="rulesFile" ref="formAzts_tsysd" label-width="120px" label-position="left">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="调试验收单" prop="fileName" class="TextAlignL">
                    <el-row>
                      <el-upload
                        class="upload-demo"
                        ref="upload_formAzts_tsysd"
                        v-model="formAzts_tsysd.fileName"
                        :action="uploadAdr"
                        accept=".pdf,.doc,.PDF"
                        :file-list="curFileList_formAzts_tsysd"
                        :on-change="(file, fileList)=>{changeFile(file, fileList, 'formAzts_tsysd')}"
                        :before-upload="beforeUpload"
                        :on-success="(val)=>{handleUploadSuccess(val, '调试验收单', 'formAzts_tsysd')}"
                        :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formAzts_tsysd')}"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                      </el-upload>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="完成比列" prop="percent" class="TextAlignL">
                    <el-input v-model="formAzts_tsysd.percent" style="width: 150px;">
                      <el-button slot="append">%</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" class="TextAlignR">
                  <el-button type="primary" @click="uploadFile('formAzts_tsysd', '调试验收单')">提 交</el-button>
                </el-col>
              </el-row>
            </el-form>
            <el-form :model="formAzts_sbyjd" :rules="rulesFile" ref="formAzts_sbyjd" label-width="120px" label-position="left">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="设备移交单" prop="fileName" class="TextAlignL">
                    <el-row>
                      <el-upload
                        class="upload-demo"
                        ref="upload_formAzts_sbyjd"
                        v-model="formAzts_sbyjd.fileName"
                        :action="uploadAdr"
                        accept=".pdf,.doc,.PDF"
                        :file-list="curFileList_formAzts_sbyjd"
                        :on-change="(file, fileList)=>{changeFile(file, fileList, 'formAzts_sbyjd')}"
                        :before-upload="beforeUpload"
                        :on-success="(val)=>{handleUploadSuccess(val, '设备移交单', 'formAzts_sbyjd')}"
                        :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formAzts_sbyjd')}"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                      </el-upload>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="完成比列" prop="percent" class="TextAlignL">
                    <el-input v-model="formAzts_sbyjd.percent" style="width: 150px;">
                      <el-button slot="append">%</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" class="TextAlignR">
                  <el-button type="primary" @click="uploadFile('formAzts_sbyjd', '设备移交单')">提 交</el-button>
                </el-col>
              </el-row>
            </el-form>
          </section>
          <!-- 竣工验收 -->
          <section v-if="processName == '竣工验收'">
            <el-form :model="formJgys" :rules="rulesFile" ref="formJgys" label-width="100px" label-position="left">
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="竣工图" prop="fileName" class="TextAlignL">
                      <el-row>
                        <el-upload
                          class="upload-demo"
                          ref="upload_formJgys"
                          v-model="formJgys.fileName"
                          :action="uploadAdr"
                          accept=".pdf,.doc,.PDF"
                          :file-list="curFileList_formJgys"
                          :on-change="(file, fileList)=>{changeFile(file, fileList, 'formJgys')}"
                          :before-upload="beforeUpload"
                          :on-success="(val)=>{handleUploadSuccess(val, '竣工图', 'formJgys')}"
                          :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formJgys')}"
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                        </el-upload>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="TextAlignR">
                    <el-button type="primary" v-if="processStatus != 2" @click="uploadFile('formJgys', '竣工图')">提 交</el-button>
                  </el-col>
              </el-row>
            </el-form>
          </section>
          <!-- 审价结算 -->
          <section v-if="processName == '审价结算'">
            <el-form :model="formSjjs" :rules="rulesFile" ref="formSjjs" label-width="100px" label-position="left">
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="审计报告" prop="fileName" class="TextAlignL">
                      <el-row>
                        <el-upload
                          class="upload-demo"
                          ref="upload_formSjjs"
                          v-model="formSjjs.fileName"
                          :action="uploadAdr"
                          accept=".pdf,.doc,.PDF"
                          :file-list="curFileList_formSjjs"
                          :on-change="(file, fileList)=>{changeFile(file, fileList, 'formSjjs')}"
                          :before-upload="beforeUpload"
                          :on-success="(val)=>{handleUploadSuccess(val, '审计报告', 'formSjjs')}"
                          :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formSjjs')}"
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                        </el-upload>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="TextAlignR">
                    <el-button type="primary" v-if="processStatus != 2" @click="uploadFile('formSjjs', '审计报告')">提 交</el-button>
                  </el-col>
              </el-row>
            </el-form>
          </section>
          <!-- 项目移交 -->
          <section v-if="processName == '项目移交'">
            <el-form :model="formXmyj" :rules="rulesFile" ref="formXmyj" label-width="130px" label-position="left">
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="同竣工验收资料" prop="fileName" class="TextAlignL">
                      <el-row>
                        <el-upload
                          class="upload-demo"
                          ref="upload_formXmyj"
                          v-model="formXmyj.fileName"
                          :action="uploadAdr"
                          accept=".pdf,.doc,.PDF"
                          :file-list="curFileList_formXmyj"
                          :on-change="(file, fileList)=>{changeFile(file, fileList, 'formXmyj')}"
                          :before-upload="beforeUpload"
                          :on-success="(val)=>{handleUploadSuccess(val, '同竣工验收资料', 'formXmyj')}"
                          :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formXmyj')}"
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                        </el-upload>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="TextAlignR">
                    <el-button type="primary" v-if="processStatus != 2" @click="uploadFile('formXmyj', '同竣工验收资料')">提 交</el-button>
                  </el-col>
              </el-row>
            </el-form>
          </section>
          <!-- 质保开始 -->
          <section v-if="processName == '质保开始'">
            <el-form :model="formZbks" :rules="rulesFile" ref="formZbks" label-width="130px" label-position="left">
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="调试验收单" prop="fileName" class="TextAlignL">
                      <el-row>
                        <el-upload
                          class="upload-demo"
                          ref="upload_formZbks"
                          v-model="formZbks.fileName"
                          :action="uploadAdr"
                          accept=".pdf,.doc,.PDF"
                          :file-list="curFileList_formZbks"
                          :on-change="(file, fileList)=>{changeFile(file, fileList, 'formZbks')}"
                          :before-upload="beforeUpload"
                          :on-success="(val)=>{handleUploadSuccess(val, '调试验收单', 'formZbks')}"
                          :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formZbks')}"
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                        </el-upload>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="TextAlignR">
                    <el-button type="primary" @click="uploadFile('formZbks', '调试验收单')">提 交</el-button>
                  </el-col>
              </el-row>
            </el-form>
          </section>
          <!-- 质保结束 -->
          <section v-if="processName == '质保结束'">
            <el-form :model="formZbjs" :rules="rulesFile" ref="formZbjs" label-width="130px" label-position="left">
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="文件" prop="fileName" class="TextAlignL">
                      <el-row>
                        <el-upload
                          class="upload-demo"
                          ref="upload_formZbjs"
                          v-model="formZbjs.fileName"
                          :action="uploadAdr"
                          accept=".pdf,.doc,.PDF"
                          :file-list="curFileList_formZbjs"
                          :on-change="(file, fileList)=>{changeFile(file, fileList, 'formZbjs')}"
                          :before-upload="beforeUpload"
                          :on-success="(val)=>{handleUploadSuccess(val, '文件', 'formZbjs')}"
                          :on-remove="(file, fileList)=>{removeFile(file, fileList, 'formZbjs')}"
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" icon="el-icon-upload" type="">选取文件</el-button>
                        </el-upload>
                      </el-row>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="TextAlignR">
                    <el-button type="primary" @click="uploadFile('formZbjs', '文件')">提 交</el-button>
                  </el-col>
              </el-row>
            </el-form>
          </section>
        </div>
      </section>
      <section>
        <el-form :model="formAppend" ref="formAppend" label-width="100px" label-position="left">
          <el-form-item v-if="processName == '竣工验收' && processStatus != 2" label="竣工日期" prop="jgDate" class="TextAlignL">
            <el-row>
              <el-col :span="20">
                <el-date-picker
                  v-model="formAppend.jgDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item v-if="processName == '审价结算' && processStatus != 2" label="审价金额" prop="sjPrice" class="TextAlignL">
            <el-row>
              <el-col :span="20">
                <el-input v-model="formAppend.sjPrice" style="width: 200px;"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item v-if="processName == '质保开始' && processStatus != 2" label="质保开始日期" prop="zbksDate" class="TextAlignL">
            <el-row>
              <el-col :span="20">
                <el-date-picker
                  v-model="formAppend.zbksDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer TextAlignC" style="width: 100%;display: inline-block;">
        <el-button type="danger" @click="finish" v-if="processStatus != 2">确认完成</el-button>
        <el-button type="danger" @click="backUnFinished" v-if="processStatus == 2 || processStatus == 3">反确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';
import $ from 'jquery'
export default {
  name: 'ProcessEdit',
  props: ['processName', 'curEditIdx', 'curLuiChengIdx', 'contractNo', 'curTimeStamp', 'processStatus'],
  data () {
    return {
      dialogProcessVisible: true,
      fileUrl: '',
      formHtqd: {
        fileName: '',
        percent: ''
      },
      formJcsg_kgbg: {
        fileName: '',
        percent: ''
      },
      formJcsg_gcjdhy: {
        fileName: '',
        percent: ''
      },
      formJcsg_xmlzd: {
        fileName: '',
        percent: ''
      },
      formSbdxc: {
        fileName: '',
        percent: ''
      },
      formYbys_sqbg: {
        fileName: '',
        percent: ''
      },
      formYbys_sybg: {
        fileName: '',
        percent: ''
      },
      formYbys_gssybg: {
        fileName: '',
        percent: ''
      },
      formAzts_tsysd: {
        fileName: '',
        percent: ''
      },
      formAzts_sbyjd: {
        fileName: '',
        percent: ''
      },
      formJgys: {
        fileName: '',
        percent: ''
      },
      formSjjs: {
        fileName: '',
        percent: ''
      },
      formXmyj: {
        fileName: '',
        percent: ''
      },
      formZbks: {
        fileName: '',
        percent: ''
      },
      formZbjs: {
        fileName: '',
        percent: ''
      },
      formAppend: {
        fileName: '',
        percent: '',
        jgDate: '', // 竣工日期
        sjPrice: '', // 审价金额
        zbksDate: '' // 质保开始日期
      },
      rulesFile: {
        fileName: [
          { required: true, message: '请选择需要上传的文件!', trigger: 'change' }
        ],
        percent: [
          { required: true, message: '请输入完成比例!', trigger: 'change' }
        ]
      },
      curFileList_formHtqd: [],
      curFileList_formJcsg_kgbg: [],
      curFileList_formJcsg_gcjdhy: [],
      curFileList_formJcsg_xmlzd: [],
      curFileList_formSbdxc: [],
      curFileList_formYbys_sqbg: [],
      curFileList_formYbys_sybg: [],
      curFileList_formYbys_gssybg: [],
      curFileList_formAzts_tsysd: [],
      curFileList_formAzts_sbyjd: [],
      curFileList_formJgys: [],
      curFileList_formSjjs: [],
      curFileList_formXmyj: [],
      curFileList_formZbks: [],
      curFileList_formZbjs: [],
      fileList: {
        '合同签订': {'销售合同': []},
        '进场施工': {'开工报告': [], '工程交底会议': [], '项目流转单': []},
        '设备到现场': {'设备签收单': []},
        '隐蔽验收': {'试气报告': [], '试压报告': [], '灌水试验报告': []},
        '安装调试': {'调试验收单': [], '设备移交单': []},
        '竣工验收': {'竣工图': []},
        '审价结算': {'审计报告': []},
        '项目移交': {'同竣工验收资料': []},
        '质保开始': {'调试验收单': []},
        '质保结束': {'文件': []}
      },
      ifShowUpload: false,
      liuCheng: ['放号', '合同签订', '进场施工', '设备到现场', '隐蔽验收', '安装调试', '竣工验收', '审价结算', '项目移交', '质保开始', '质保结束']
    }
  },
  computed: {
    uploadAdr () {
      // return 'http://plant.fs-elliott.cn:8082/fushengJK/uploadFileZT?mulu=' + `${this.contractNo}`
      return 'http://192.168.1.13:8081/fushengJK/uploadFileZT?mulu=' + `${this.contractNo}`
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
    handleUploadSuccess (response, stage, formName) {
      // this.fileUrl = response.filePath
      this.formAppend.fileName = response.filename
      this.submit(response.filename, stage, formName)
    },
    removeFile (file, fileList, formName) {
      this['curFileList_' + formName] = []
      this.formAppend.fileName = ''
    },
    changeFile (file, fileList, formName) {
      this['curFileList_' + formName] = []
      this['curFileList_' + formName].push(file)
      this[formName].fileName = file.name
    },
    deleteFile (file, stage) {
      // 删除文件
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<PIC_UPLoad_DEL xmlns="http://tempuri.org/">'
      tmpData += '<FContractNo>' + this.contractNo + '</FContractNo>'
      tmpData += '<FType>' + this.processName + '</FType>'
      tmpData += '<FPath>' + file.fileName + '</FPath>'
      tmpData += '<FStage>' + stage + '</FStage>'
      tmpData += '</PIC_UPLoad_DEL>'
      tmpData += '</soap:Body>'
      tmpData += '</soap:Envelope>'

      this.Http.post('PIC_UPLoad_DEL', tmpData
      ).then(res => {
        let xml = res.data
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(xml, 'text/xml')
        // 提取数据
        let Result = xmlDoc.getElementsByTagName('PIC_UPLoad_DELResponse')[0].getElementsByTagName('PIC_UPLoad_DELResult')[0]
        let HtmlStr = $(Result).html()
        let Info = (JSON.parse(HtmlStr))[0]
        if (Info.code === '1') {
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
          this.getFileList()
          // this.$emit('toggleProcessDialog', false)
          // this.$emit('refresh')
        } else {
          this.$message({
            message: '删除失败!',
            type: 'error'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    uploadFile (formName, stage) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs['upload_' + formName].submit()
        } else {
          this.$message({
            message: '请将信息补充完整！',
            type: 'warning'
          })
        }
      })
    },
    submit (filename, stage, formName) {
      let Percent = (this.processName === '设备到现场' || this.processName === '隐蔽验收' || this.processName === '安装调试') ? this[formName].percent : 0
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<PIC_UPLoad xmlns="http://tempuri.org/">'
      tmpData += '<FContractNo>' + this.contractNo + '</FContractNo>'
      tmpData += '<FType>' + this.processName + '</FType>'
      tmpData += '<FPath>' + filename + '</FPath>'
      tmpData += '<FPercent>' + Percent + '</FPercent>'
      tmpData += '<FStage>' + stage + '</FStage>'
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
          this.getFileList()
          this.removeFile(null, null, formName)
          // this.$emit('toggleProcessDialog', false)
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
    initFileList () {
      this.fileList = {
        '合同签订': {'销售合同': []},
        '进场施工': {'开工报告': [], '工程交底会议': [], '项目流转单': []},
        '设备到现场': {'设备签收单': []},
        '隐蔽验收': {'试气报告': [], '试压报告': [], '灌水试验报告': []},
        '安装调试': {'调试验收单': [], '设备移交单': []},
        '竣工验收': {'竣工图': []},
        '审价结算': {'审计报告': []},
        '项目移交': {'同竣工验收资料': []},
        '质保开始': {'调试验收单': []},
        '质保结束': {'文件': []}
      }
    },
    // 查询之前上传的文件
    getFileList () {
      this.initFileList()
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<JA_LIST xmlns="http://tempuri.org/">'
      tmpData += "<FSQL>select fcontractno 合同号,ftype 阶段,fstage,'http://plant.fs-elliott.cn:8082/zetian_file/'+fcontractno+'/'+fpath 文件路径,convert(varchar(50),fdate,23)fdate,isnull(fper,0)fper from Z_FILE where fcontractno='" + this.contractNo + "' and ftype='" + this.processName + "'</FSQL>"
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
        console.log('orignFile', Info)
        Info.map(item => {
          item.fileDate = item.fdate ? item.fdate : ''
          item.fpercent = item.fper + '%'
          let startiIdx = item['文件路径'].indexOf(this.contractNo) + this.contractNo.length + 1
          item.fileName = item['文件路径'].slice(startiIdx)
          this.fileList[this.processName][item['fstage']].push(item)
        })
        console.log('fileList', this.fileList)
        if (this.processName === '隐蔽验收' || this.processName === '安装调试') {
          this.ifShowUpload = true
        } else {
          this.ifShowUpload = Info.length === 0
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 保存竣工日期
    saveJgDate () {
      if (!this.formAppend.jgDate) {
        this.$message({
          message: '请选择竣工日期!',
          type: 'warning'
        })
        return false
      } else {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<Jungong_Date xmlns="http://tempuri.org/">'
        tmpData += '<FContractNo>' + this.contractNo + '</FContractNo>'
        tmpData += '<FDate>' + this.formAppend.jgDate + '</FDate>'
        tmpData += '</Jungong_Date>'
        tmpData += '</soap:Body>'
        tmpData += '</soap:Envelope>'

        this.Http.post('Jungong_Date', tmpData
        ).then(res => {
          let xml = res.data
          let parser = new DOMParser()
          let xmlDoc = parser.parseFromString(xml, 'text/xml')
          // 提取数据
          let Result = xmlDoc.getElementsByTagName('Jungong_DateResponse')[0].getElementsByTagName('Jungong_DateResult')[0]
          let HtmlStr = $(Result).html()
          let Info = (JSON.parse(HtmlStr))[0]
          if (Info.code === '1') {
            this.surefinish()
          } else {
            this.$message({
              message: '竣工日期保存失败!',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    // 审价金额
    saveSjPrice () {
      if (!this.formAppend.sjPrice) {
        this.$message({
          message: '请输入审价金额!',
          type: 'warning'
        })
        return false
      } else {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<ShenJi_Amount xmlns="http://tempuri.org/">'
        tmpData += '<FContractNo>' + this.contractNo + '</FContractNo>'
        tmpData += '<FAmount>' + this.formAppend.sjPrice + '</FAmount>'
        tmpData += '</ShenJi_Amount>'
        tmpData += '</soap:Body>'
        tmpData += '</soap:Envelope>'

        this.Http.post('ShenJi_Amount', tmpData
        ).then(res => {
          let xml = res.data
          let parser = new DOMParser()
          let xmlDoc = parser.parseFromString(xml, 'text/xml')
          // 提取数据
          let Result = xmlDoc.getElementsByTagName('ShenJi_AmountResponse')[0].getElementsByTagName('ShenJi_AmountResult')[0]
          let HtmlStr = $(Result).html()
          let Info = (JSON.parse(HtmlStr))[0]
          if (Info.code === '1') {
            this.surefinish()
          } else {
            this.$message({
              message: '审价金额保存失败!',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    // 保存质保开始日期
    saveZbksDate () {
      if (!this.formAppend.zbksDate) {
        this.$message({
          message: '请选质保开始日期!',
          type: 'warning'
        })
        return false
      } else {
        var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
        tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
        tmpData += '<soap:Body> '
        tmpData += '<ZhibaoStart_Date xmlns="http://tempuri.org/">'
        tmpData += '<FContractNo>' + this.contractNo + '</FContractNo>'
        tmpData += '<FDate>' + this.formAppend.zbksDate + '</FDate>'
        tmpData += '</ZhibaoStart_Date>'
        tmpData += '</soap:Body>'
        tmpData += '</soap:Envelope>'

        this.Http.post('ZhibaoStart_Date', tmpData
        ).then(res => {
          let xml = res.data
          let parser = new DOMParser()
          let xmlDoc = parser.parseFromString(xml, 'text/xml')
          // 提取数据
          let Result = xmlDoc.getElementsByTagName('ZhibaoStart_DateResponse')[0].getElementsByTagName('ZhibaoStart_DateResult')[0]
          let HtmlStr = $(Result).html()
          let Info = (JSON.parse(HtmlStr))[0]
          if (Info.code === '1') {
            this.surefinish()
          } else {
            this.$message({
              message: '质保开始日期保存失败!',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    // 确认流程
    finish () {
      // 没上传文件前不能确认完成
      switch (this.processName) {
        case '放号':
          this.surefinish()
          break
        case '合同签订':
          if (this.fileList['合同签订']['销售合同'].length === 0) {
            this.$message({
              message: '文件尚未上传完整，目前不能确认完成!',
              type: 'warning'
            })
          } else {
            this.surefinish()
          }
          break
        case '进场施工':
          if (this.fileList['进场施工']['开工报告'].length === 0 || this.fileList['进场施工']['工程交底会议'].length === 0 || this.fileList['进场施工']['项目流转单'].length === 0) {
            this.$message({
              message: '文件尚未上传完整，目前不能确认完成!',
              type: 'warning'
            })
          } else {
            this.surefinish()
          }
          break
        case '设备到现场':
          if (this.fileList['设备到现场']['设备签收单'].length === 0) {
            this.$message({
              message: '文件尚未上传完整，目前不能确认完成!',
              type: 'warning'
            })
          } else {
            this.surefinish()
          }
          break
        case '隐蔽验收':
          if (this.fileList['隐蔽验收']['试气报告'].length === 0 || this.fileList['隐蔽验收']['试压报告'].length === 0 || this.fileList['隐蔽验收']['灌水试验报告'].length === 0) {
            this.$message({
              message: '文件尚未上传完整，目前不能确认完成!',
              type: 'warning'
            })
          } else {
            this.surefinish()
          }
          break
        case '安装调试':
          if (this.fileList['安装调试']['调试验收单'].length === 0 || this.fileList['安装调试']['设备移交单'].length === 0) {
            this.$message({
              message: '文件尚未上传完整，目前不能确认完成!',
              type: 'warning'
            })
          } else {
            this.surefinish()
          }
          break
        case '竣工验收':
          if (this.fileList['竣工验收']['竣工图'].length === 0) {
            this.$message({
              message: '文件尚未上传完整，目前不能确认完成!',
              type: 'warning'
            })
          } else {
            this.saveJgDate()
          }
          break
        case '审价结算':
          if (this.fileList['审价结算']['审计报告'].length === 0) {
            this.$message({
              message: '文件尚未上传完整，目前不能确认完成!',
              type: 'warning'
            })
          } else {
            this.saveSjPrice()
          }
          break
        case '项目移交':
          if (this.fileList['项目移交']['同竣工验收资料'].length === 0) {
            this.$message({
              message: '文件尚未上传完整，目前不能确认完成!',
              type: 'warning'
            })
          } else {
            this.surefinish()
          }
          break
        case '质保开始':
          if (this.fileList['质保开始']['调试验收单'].length === 0) {
            this.$message({
              message: '文件尚未上传完整，目前不能确认完成!',
              type: 'warning'
            })
          } else {
            this.saveZbksDate()
          }
          break
        case '质保结束':
          if (this.fileList['质保结束']['文件'].length === 0) {
            this.$message({
              message: '文件尚未上传完整，目前不能确认完成!',
              type: 'warning'
            })
          } else {
            this.surefinish()
          }
          break
      }
    },
    surefinish () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<jindu xmlns="http://tempuri.org/">'
      tmpData += '<FContractNo>' + this.contractNo + '</FContractNo>'
      tmpData += '<FType>' + this.processName + '</FType>'
      tmpData += '<FColor>' + 2 + '</FColor>'
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
        if (Info.code === '1') {
          this.$message({
            message: '确认成功!',
            type: 'success'
          })
          this.$emit('toggleProcessDialog', false)
          this.$emit('markRed', this.curEditIdx)
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
    backUnFinished () {
      var tmpData = '<?xml version="1.0" encoding="utf-8"?>'
      tmpData += '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"> '
      tmpData += '<soap:Body> '
      tmpData += '<jindu xmlns="http://tempuri.org/">'
      tmpData += '<FContractNo>' + this.contractNo + '</FContractNo>'
      tmpData += '<FType>' + this.processName + '</FType>'
      tmpData += '<FColor>10</FColor>'
      // tmpData += '<FColor>' + (this.curLuiChengIdx > this.curEditIdx ? 3 : 1) + '</FColor>'
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
        if (Info.code === '1') {
          this.$message({
            message: '反确认成功!',
            type: 'success'
          })
          this.$emit('toggleProcessDialog', false)
          this.$emit('refresh')
        } else {
          this.$message({
            message: '反确认失败!',
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
.secondTit{
  text-align: left;
  padding-left: 30px;
  display: block;
  margin-bottom: 5px;
}
.TextIndent{
  padding-left: 30px;
}
</style>
