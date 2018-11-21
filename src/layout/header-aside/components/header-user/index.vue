<template>
  <div class="user-wrapper">
    <div class="avatar-wrapper">
      <img :src='info.avatar'
           class="user-avatar">
    </div>
    <el-dropdown size="small"
                 class="user-menu-wrapper">
      <span class="btn-text">你好 {{info.username}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="editUserInfoHandle">
          <d2-icon name="pencil-square-o"
                   class="d2-mr-5" />
          修改信息
        </el-dropdown-item>
        <el-dropdown-item @click.native="logOff">
          <d2-icon name="power-off"
                   class="d2-mr-5" />
          注销
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <edit-user v-if="userFormVisible"
               ref="userForm" />
  </div>
</template>

<script>
import editUser from '@/pages/sys/user/edit-user'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      userFormVisible: false
    }
  },
  components: {
    editUser
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        vm: this,
        confirm: true
      })
    },
    /**
     * 编辑自己信息
     */
    editUserInfoHandle () {
      this.userFormVisible = true;
      this.$nextTick(() => {
        this.$refs.userForm.initForm()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-wrapper {
    margin: 0px 10px;
    height: 60px;
    line-height: 60px;
}
.avatar-wrapper {
    float: left;
    padding-top: 10px;
    .user-avatar {
        width: 35px;
        height: 35px;
        border-radius: 16px;
    }
}
</style>

