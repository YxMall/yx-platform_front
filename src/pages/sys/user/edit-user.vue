<template>
  <el-dialog title="用户信息修改"
             :visible.sync="userFormVisible">
    <el-form ref="userForm"
             :rules="userFormRules"
             :model="userItem"
             hide-required-asterisk='true'
             label-width="100px">
      <el-form-item label='用户名'
                    prop='username'>
        <el-input clearable
                  autocomplete='off'
                  v-model='userItem.username' />
      </el-form-item>
      <el-form-item label='昵称'
                    prop='nickName'>
        <el-input clearable
                  autocomplete='off'
                  v-model='userItem.nickName' />
      </el-form-item>
      <el-form-item label='密码'
                    :class="{ 'is-required': !this.userItem.userId }"
                    prop='password'>
        <el-input type="password"
                  clearable
                  v-model='userItem.password'
                  autocomplete="off" />
      </el-form-item>
      <el-form-item label='头像'
                    prop='avatar'>
        <el-input type="hidden"
                  style="display:none;"
                  v-model='userItem.avatar'
                  autocomplete="off" />
        <img :src="this.userItem.avatar"
             v-show="this.userItem.avatar"
             class="d2-ml-20"
             style="width:60px;height:60px">
        <el-button class="d2-fr d2-mr-20"
                   @click="uploadAvatarHandle"
                   type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-form-item>
      <el-form-item label='性别'
                    prop='gender'>
        <el-radio-group v-model="userItem.gender">
          <el-radio :label="true">男 </el-radio>
          <el-radio :label="false">女 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='邮箱'
                    prop='email'>
        <el-input clearable
                  autocomplete='off'
                  v-model='userItem.email' />
      </el-form-item>
      <el-form-item label='手机'
                    prop='mobile'>
        <el-input clearable
                  autocomplete='off'
                  v-model='userItem.mobile' />
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="userFormVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="submitUserFormHandle()">确 定</el-button>
    </span>
    <avatar-upload field="file"
                   @crop-upload-success="cropUploadSuccess"
                   @crop-upload-fail="cropUploadFail"
                   v-model="avatarShow"
                   :width="300"
                   :height="300"
                   url="/oss/upload"
                   :headers="headers"
                   img-format="png">
    </avatar-upload>
  </el-dialog>
</template>

<script>
import avatarUpload from 'vue-image-crop-upload';
import util from '@/libs/util'
import { updateCurrentUser, getCurrentUserInfo, checkName } from '@/api/sys/user';
export default {
  name: 'edit-user',
  components: {
    'avatar-upload': avatarUpload
  },
  data () {
    var validatePassword = (rule, value, callback) => {
      if (!this.userItem.userId && !/\S/.test(value)) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    var validateUsername = (rule, value, callback) => {
      checkName(this.userItem).then(res => {
        if (!res) {
          callback(new Error('用户名已经存在'))
        } else {
          callback()
        }
      })
    }
    return {
      // 头像上传
      avatarShow: false,
      headers: {
        accessToken: util.cookies.get('accessToken')
      },
      userFormVisible: true,
      userItem: {
        userId: 0,
        username: '',
        nickName: '',
        avatar: '',
        password: '',
        email: '',
        mobile: '',
        gender: true
      },
      userFormRules: {
        password: [
          { validator: validatePassword, trigger: 'blur' },
          { pattern: /^[a-zA-Z]\w{5,17}$/, message: '以字母开头，长度在6~18之间，只能包含字母、数字和下划线' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/, message: '手机号格式错误' }
        ]
      }
    };
  },
  methods: {
    /**
     * 初始化表单
     */
    initForm () {
      getCurrentUserInfo().then(res => {
        this.userItem = res;
      })
      this.userFormVisible = true;
    },
    /**
     * 提交菜单
     */
    submitUserFormHandle () {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          updateCurrentUser(this.userItem).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.userFormVisible = false;
          })
        } else {
          return false;
        }
      });
    },
    /**
     * 上传头像
     */
    uploadAvatarHandle () {
      this.avatarShow = !this.avatarShow;
    },
    cropUploadSuccess (jsonData, field) {
      this.userItem.avatar = jsonData.data;
    },
    cropUploadFail (status, field) {
      this.$message.error('图片上传失败');
    }
  }
}
</script>

<style>
</style>
