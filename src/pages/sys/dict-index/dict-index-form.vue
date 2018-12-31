<template>
  <el-dialog :title="!dictindexItem.id? '新增' : '修改'"
             :visible.sync="dictindexFormVisible">
    <el-form ref="dictindexForm"
             :rules="dictindexFormRules"
             :model="dictindexItem"
             hide-required-asterisk='true'
             label-width="100px">
      <el-form-item label="字典类型"
                    prop="dictCode">
        <el-input v-model="dictindexItem.dictCode"
                  placeholder="请输入字典数据类型"></el-input>
      </el-form-item>
      <el-form-item label="字典标题"
                    prop="dictTitle">
        <el-input v-model="dictindexItem.dictTitle"
                  placeholder="请输入字典数据标题"></el-input>
      </el-form-item>
      <el-form-item label="排序 "
                    prop="sort">
        <el-tooltip class="item"
                    effect="dark"
                    content="数字越大越靠前"
                    placement="right-start">
          <el-input-number v-model="dictindexItem.sort"
                           placeholder="排序 "></el-input-number>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="备注"
                    prop="remark">
        <el-input v-model="dictindexItem.remark"
                  placeholder="请输入备注信息"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dictindexFormVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="submitDictIndexFormHandle()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addDictIndex, updateDictIndex, dictindexInfo } from '@/api/sys/dict-index';
export default {
  name: 'dictindexForm',
  data () {
    return {
      dictindexFormVisible: true,
      dictindexItem: {
        dictId: 0,
        dictCode: '',
        dictTitle: '',
        sort: '',
        remark: ''
      },
      dictindexFormRules: {
        dictCode: [
          { required: true, message: '字典数据代码  不能为空', trigger: 'blur' }
        ],
        dictTitle: [
          { required: true, message: '字典数据标题不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '排序 不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 初始化表单
     */
    initForm (dictId) {
      // 先清除表单信息
      this.dictindexItem.dictId = dictId || 0
      // 修改
      if (this.dictindexItem.dictId !== 0) {
        dictindexInfo(dictId).then(res => {
          this.dictindexItem = res.data;
        })
      }
      this.dictindexFormVisible = true
      this.$nextTick(() => {
        this.$refs['dictindexForm'].resetFields()
      })
    },
    /**
     * 提交菜单
     */
    submitDictIndexFormHandle () {
      this.$refs['dictindexForm'].validate((valid) => {
        if (valid) {
          if (this.dictindexItem.dictId !== 0) {
            updateDictIndex(this.dictindexItem).then(res => {
              this.msgUtil.isUpdateSuccess(res)
              this.dictindexFormVisible = false;
              this.$emit('refreshDataList')
            })
          } else {
            addDictIndex(this.dictindexItem).then(res => {
              this.msgUtil.isAddSuccess(res)
              this.dictindexFormVisible = false;
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
