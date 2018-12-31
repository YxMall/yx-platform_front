<template>
  <el-dialog :title="!dictdataItem.dataId? '新增' : '修改'"
             :visible.sync="dictdataFormVisible">
    <el-form ref="dictdataForm"
             :rules="dictdataFormRules"
             :model="dictdataItem"
             hide-required-asterisk='true'
             label-width="100px">
      <el-form-item label="key"
                    prop="dataKey">
        <el-input v-model="dictdataItem.dataKey"
                  placeholder="请输入key"></el-input>
      </el-form-item>
      <el-form-item label="value"
                    prop="dataValue">
        <el-input v-model="dictdataItem.dataValue"
                  placeholder="请输入value"></el-input>
      </el-form-item>
      <el-form-item label="类型"
                    prop="dictCode">
        <el-input disabled="true"
                  v-model="dictdataItem.dictCode"
                  placeholder="字典数据类型"></el-input>
      </el-form-item>
      <el-form-item label="排序 "
                    prop="sort">
        <el-tooltip class="item"
                    effect="dark"
                    content="数字越大越靠前"
                    placement="right-start">
          <el-input-number v-model="dictdataItem.sort"
                           placeholder="排序 "></el-input-number>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dictdataFormVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="submitDictDataFormHandle()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addDictData, updateDictData, dictdataInfo } from '@/api/sys/dict-data';
export default {
  name: 'dictdataForm',
  data () {
    return {
      dictdataFormVisible: true,
      dictdataItem: {
        dataId: 0,
        dataKey: '',
        dataValue: '',
        dictCode: '',
        sort: '',
        remark: ''
      },
      dictdataFormRules: {
        dataKey: [
          { required: true, message: '字典数据键不能为空', trigger: 'blur' }
        ],
        dataValue: [
          { required: true, message: '字典数据值不能为空', trigger: 'blur' }
        ],
        dictCode: [
          { required: true, message: '字典数据类型不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 初始化表单
     */
    initForm (id, dictCode) {
      // 先清除表单信息
      this.dictdataItem.dataId = id || 0
      // 修改
      if (this.dictdataItem.dataId !== 0) {
        dictdataInfo(id).then(res => {
          this.dictdataItem = res.data;
        })
      }
      this.dictdataFormVisible = true
      this.$nextTick(() => {
        this.$refs['dictdataForm'].resetFields()
        this.dictdataItem.dictCode = dictCode
      })
    },
    /**
     * 提交菜单
     */
    submitDictDataFormHandle () {
      this.$refs['dictdataForm'].validate((valid) => {
        if (valid) {
          if (this.dictdataItem.dataId !== 0) {
            updateDictData(this.dictdataItem).then(res => {
              this.msgUtil.isUpdateSuccess(res)
              this.dictdataFormVisible = false;
              this.$emit('refreshDataList')
            })
          } else {
            addDictData(this.dictdataItem).then(res => {
              this.msgUtil.isAddSuccess(res)
              this.dictdataFormVisible = false;
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
