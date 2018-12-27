<template>
  <div>
    <el-dialog :title="!notifyItem.id? '发布消息' : '修改'"
               fullscreen='true'
               :visible.sync="notifyFormVisible">
      <el-form ref="notifyForm"
               :rules="notifyFormRules"
               :model="notifyItem"
               hide-required-asterisk='true'
               label-width="100px">
        <el-form-item label="标题"
                      prop="title">
          <el-input v-model="notifyItem.title"
                    placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="内容"
                      prop="content">
          <tinymce :height="300"
                   v-model="notifyItem.content" />
        </el-form-item>
        <el-form-item label="接收者"
                      prop="subscribeType">
          <el-radio-group @change="subscribeTypeChangeHandle"
                          v-model="notifyItem.subscribeType">
            <el-radio label="all"
                      border>全部</el-radio>
            <el-radio label="user"
                      border>选择用户</el-radio>
          </el-radio-group>
          <div>
            当前选中用户：
            <div>
              <div v-if="notifyItem.subscribeType=='all'">
                <el-tag type="success"> 选中全部</el-tag>
              </div>
              <div v-else>
                <span v-for="user in selectUserData"
                      :key="user.userId">
                  <el-tag type="success"
                          style='margin-right:3px'> {{user.username}}</el-tag>
                </span>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="notifyFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitNotifyFormHandle()">确 定</el-button>
      </span>
    </el-dialog>
    <user-table ref="userTable"
                @refreshSelectUserList='getSelectionUserList'
                :userTableVisible.sync="userTableVisible" />
  </div>
</template>

<script>
import userTable from '@/pages/common/user-table';
import { addNotify, updateNotify, notifyInfo } from '@/api/oa/notify';
export default {
  name: 'notifyForm',
  data () {
    return {
      selectUserData: [],
      userTableVisible: false,
      notifyFormVisible: true,
      notifyItem: {
        id: 0,
        subscribeType: 'all',
        //接收消息用户ID
        notifyUserIds: [],
        title: '',
        content: '',
        status: ''
      },
      notifyFormRules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    userTable
  },
  methods: {
    /**
     * 初始化表单
     */
    initForm (id) {
      // 先清除表单信息
      this.notifyItem.id = id || 0
      // 修改
      if (this.notifyItem.id !== 0) {
        notifyInfo(id).then(res => {
          this.notifyItem = res.data;
        })
      }
      this.$nextTick(() => {
        this.$refs['notifyForm'].resetFields();
      })
      this.notifyItem.notifyUserIds = []
      this.notifyFormVisible = true
    },
    //获取选中的用户列表
    getSelectionUserList () {
      this.selectUserData = this.$refs.userTable.multipleSelection;
    },
    /**
     * 选择框值发生改变
     */
    subscribeTypeChangeHandle (label) {
      this.userTableVisible = label == 'user';
    },
    /**
     * 提交菜单
     */
    submitNotifyFormHandle () {
      this.$refs['notifyForm'].validate((valid) => {
        if (valid) {
          //获取选中发送的用户
          this.notifyItem.notifyUserIds = this.$refs.userTable.getSelectionUserIds();
          if (this.notifyItem.id !== 0) {
            updateNotify(this.notifyItem).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.notifyFormVisible = false;
              this.$emit('refreshDataList')
            })
          } else {
            addNotify(this.notifyItem).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.notifyFormVisible = false;
              this.$emit('refreshDataList')
            })
          }
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-upload-btn {
  margin-bottom: 6px;
}
</style>
