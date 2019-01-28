<template>
  <d2-container>
    <el-tabs v-model="activeName"
             @tab-click="configTabHandle">
      <el-tab-pane label="云存储配置"
                   name="cloudStorage">
        <el-card class="box-card">
          <el-form ref="cloudStorageForm"
                   :rules="cloudStorageFormRules"
                   :model="cloudStorageForm"
                   hide-required-asterisk='true'
                   label-width="120px">
            <el-form-item label="云存储类型"
                          prop="ossType"
                          required>
              <el-select v-model="cloudStorageForm.ossType"
                         placeholder="请选择云存储类型">
                <el-option v-for="dict in CurrentTypeList"
                           :key="dict.dataKey"
                           :label="dict.dataValue"
                           :value="dict.dataKey"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="域名"
                          prop="domain">
              <el-input v-model="cloudStorageForm.domain"
                        :placeholder="`请输入${currentStorageName}域名`" />
            </el-form-item>
            <el-form-item label="region"
                          v-if="cloudStorageForm.ossType==0"
                          prop="region">
              <el-input v-model="cloudStorageForm.region"
                        :placeholder="`请输入${currentStorageName}region`" />
            </el-form-item>
            <el-form-item label="EndPoint"
                          v-if="cloudStorageForm.ossType==1"
                          prop="endpoint">
              <el-input v-model="cloudStorageForm.endpoint"
                        :placeholder="`请输入${currentStorageName}EndPoint`" />
            </el-form-item>
            <el-form-item label="AccessKeyId"
                          prop="accessKeyId">
              <el-input v-model="cloudStorageForm.accessKeyId"
                        type='password'
                        :placeholder="`请输入${currentStorageName}AccessKeyId`" />
            </el-form-item>
            <el-form-item label="AccessKeySecret"
                          prop="accessKeySecret">
              <el-input v-model="cloudStorageForm.accessKeySecret"
                        type='password'
                        :placeholder="`请输入${currentStorageName}AccessKeySecret`" />
            </el-form-item>
            <el-form-item label="BucketName"
                          prop="bucketName">
              <el-input v-model="cloudStorageForm.bucketName"
                        :placeholder="`请输入${currentStorageName}桶名`" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="saveConfigHandle(cloudStorageForm,'cloudStorageForm')">保存并启用</el-button>
              <el-button @click="resetFormHandle('cloudStorageForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="短信配置"
                   name="mobileSms">
        <el-card class="box-card">
          <el-form ref="mobileForm"
                   :rules="mobileFormRules"
                   :model="mobileForm"
                   hide-required-asterisk='true'
                   label-width="120px">
            <el-form-item label="短信平台"
                          prop="ossType">
              <el-select v-model="mobileForm.mobileType"
                         placeholder="请选择短信平台">
                <el-option v-for="dict in CurrentTypeList"
                           :key="dict.dataKey"
                           :label="dict.dataValue"
                           :value="dict.dataKey"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模板ID"
                          prop="templateId">
              <el-input v-model="mobileForm.templateId"
                        placeholder="请输入短信模板ID" />
            </el-form-item>
            <el-form-item label="签名"
                          prop="sign">
              <el-input v-model="mobileForm.sign"
                        placeholder="请输入短信签名" />
            </el-form-item>
            <el-form-item label="appId"
                          prop="appId">
              <el-input v-model="mobileForm.appId"
                        type='password'
                        placeholder="请输入短信应用appID" />
            </el-form-item>
            <el-form-item label="appKey"
                          prop="appKey">
              <el-input v-model="mobileForm.appKey"
                        type='password'
                        placeholder="请输入短信应用appkey" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="saveConfigHandle(mobileForm,'mobileForm')">保存并启用</el-button>
              <el-button @click="resetFormHandle('mobileForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="邮件配置"
                   name="email">邮件配置</el-tab-pane>
    </el-tabs>
  </d2-container>
</template>

<script>
import util from '@/libs/util.js'
import { saveOrUpdateConfig, configInfo } from '@/api/sys/config'
export default {
  name: 'sysConfig',
  data () {
    return {
      activeName: 'cloudStorage',
      config: {
        configId: '',
        configKey: '',
        configValue: ''
      },
      cloudStorageForm: {
        ossType: '0',
        region: '',
        domain: '',
        endpoint: '',
        accessKeyId: '',
        accessKeySecret: '',
        bucketName: ''
      },
      cloudStorageFormRules: {
        domain: [
          { required: true, message: '请输入域名', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请输入region', trigger: 'blur' }
        ],
        endpoint: [
          { required: true, message: '请输入endpoint', trigger: 'blur' }
        ],
        accessKeyId: [
          { required: true, message: '请输入accessKeyId', trigger: 'blur' }
        ],
        accessKeySecret: [
          { required: true, message: '请输入accessKeySecret', trigger: 'blur' }
        ],
        bucketName: [
          { required: true, message: '请输入桶名', trigger: 'blur' }
        ]
      },
      mobileForm: {
        mobileType: '1',
        templateId: '',
        sign: '',
        appId: '',
        appKey: ''
      },
      mobileFormRules: {
        mobileType: [
          { required: true, message: '请选择短信平台', trigger: 'blur' }
        ],
        templateId: [
          { required: true, message: '请输入短信模板ID', trigger: 'blur' }
        ],
        sign: [
          { required: true, message: '请输入短信签名', trigger: 'blur' }
        ],
        appId: [
          { required: true, message: '请输入短信应用appID', trigger: 'blur' }
        ],
        appKey: [
          { required: true, message: '请输入短信应用appkey', trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    // 当前配置类型列表
    CurrentTypeList: function () {
      return util.getDict(this.activeName).dictList
    },
    // 当前存储系统名
    currentStorageName: function () {
      return this.CurrentTypeList.find(storage => storage.dataKey === this.cloudStorageForm.ossType).dataValue
    }
  },
  mounted () {
    this.configTabHandle('', '')
  },
  methods: {
    /**
     * 配置tab切换
     */
    configTabHandle (tab, event) {
      configInfo(this.activeName).then(res => {
        if (res.data) {
          this.config = res.data
          switch (this.activeName) {
            case 'cloudStorage':
              this.cloudStorageForm = JSON.parse(res.data.configValue)
              break;
            case 'mobileSms':
              this.mobileForm = JSON.parse(res.data.configValue)
              break;
          }
        } else {
          this.config.configId = null
        }
      })
    },
    /**
     * 重置表单
     */
    resetFormHandle (formName) {
      this.$refs[formName].resetFields()
    },
    /**
     * 保存配置
     * data 配置数据
     * formName  表单名字
     */
    saveConfigHandle (data, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.config.configKey = this.activeName
          this.config.configValue = JSON.stringify(data)
          saveOrUpdateConfig(this.config).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  width: 580px;
}
</style>
