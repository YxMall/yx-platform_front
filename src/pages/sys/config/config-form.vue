<template>
  <el-dialog :title="!configItem.configId? '新增' : '修改'"
             :visible.sync="configFormVisible">
    <el-form ref="configForm"
             :rules="configFormRules"
             :model="configItem"
             hide-required-asterisk='true'
             label-width="100px">
      <el-form-item label='配置Key'
                    prop='configKey'>
        <el-input v-model='configItem.configKey' />
      </el-form-item>
      <el-form-item label='配置value'
                    prop='configValue'>
        <el-input type="textarea"
                  :rows="15"
                  v-model="configItem.configValue" />
      </el-form-item>
      <el-form-item label="状态"
                    prop="status">
        <el-switch v-model="configItem.status"></el-switch>
      </el-form-item>
      <el-form-item label='备注'
                    prop='remark'>
        <el-input type="textarea"
                  v-model='configItem.remark' />
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="configFormVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="submitConfigFormHandle()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addConfig, updateConfig, configInfo } from '@/api/sys/config';
export default {
  name: 'configForm',
  data () {
    return {
      configFormVisible: true,
      configItem: {
        configId: 0,
        configKey: '',
        configValue: '',
        status: true,
        remark: ''
      },
      configFormRules: {
        configKey: [
          { required: true, message: '请输入配置key', trigger: 'blur' }
        ],
        configValue: [
          { required: true, message: '请输入配置value', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    /**
     * 初始化表单
     */
    initForm (configId) {
      // 先清除表单信息
      this.configItem.configId = configId || 0
      this.configFormVisible = true
      this.$nextTick(() => {
        this.$refs['configForm'].resetFields()
      })
      // 修改
      if (this.configItem.configId !== 0) {
        configInfo(configId).then(res => {
          this.configItem = res;
        })
      }
    },
    /**
     * 提交菜单
     */
    submitConfigFormHandle () {
      this.$refs['configForm'].validate((valid) => {
        if (valid) {
          if (this.configItem.configId !== 0) {
            updateConfig(this.configItem).then(res => {
              this.msgUtil.isUpdateSuccess(res)
              this.configFormVisible = false;
              this.$emit('refreshDataList')
            })
          } else {
            addConfig(this.configItem).then(res => {
              this.msgUtil.isAddSuccess(res)
              this.configFormVisible = false;
              this.$emit('refreshDataList')
            })
          }
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style>
</style>
