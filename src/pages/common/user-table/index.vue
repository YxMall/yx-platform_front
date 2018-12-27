<template>
  <el-dialog title="用户列表"
             append-to-body
             @close="userTableCloseHandle"
             :visible.sync="userTableVisible">
    <el-form :inline="true"
             :model="params"
             class="d2-pl-15 d2-pt-15"
             ref="params">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="params.username"
                  clearable
                  placeholder="用户" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   v-show="isAuth('sys:user:list')"
                   @click="handleFormSubmit">
          <d2-icon name="search" />
          查询
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="handleFormReset">
          <d2-icon name="refresh" />
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userData"
              ref="userTable"
              @selection-change="handleSelectionChange"
              stripe>
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="userId"
                       label="ID"
                       align="center">
      </el-table-column>
      <el-table-column prop="username"
                       label="姓名"
                       align="center">
      </el-table-column>
      <el-table-column prop="nickName"
                       label="昵称"
                       align="center">
      </el-table-column>
      <el-table-column prop="gender"
                       label="性别"
                       align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.gender">男</el-tag>
          <el-tag v-else
                  type="danger">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱"
                       align="center">
      </el-table-column>
      <el-table-column prop="mobile"
                       label="手机号"
                       align="center">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="params.currPage"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="10"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="params.totalCount">
    </el-pagination>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="closeUserTableHandle">取 消</el-button>
      <el-button type="primary"
                 @click="submitUserTableHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUserData } from '@/api/sys/user';
export default {
  name: 'userTable',
  data () {
    return {
      multipleSelection: [],
      userData: [],
      params: {
        username: '',
        status: 1,
        totalCount: 0,
        currPage: 1,
        pageSize: 10
      }
    }
  },
  props: {
    userTableVisible: false
  },
  mounted () {
    this.initUserTable();
  },
  methods: {
    handleFormReset (params) {
      this.$refs.params.resetFields();
    },
    handleSizeChange (val) {
      this.params.pageSize = val;
      this.getUserTableData();
    },
    handleCurrentChange (val) {
      this.params.currPage = val;
      this.getUserTableData();
    },
    handleFormSubmit () {
      this.getUserTableData();
    },
    /**
     * 初始化用户列表
     */
    initUserTable () {
      let rows = this.multipleSelection
      if (rows) {
        rows.forEach(row => {
          this.$refs.userTable.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.userTable.clearSelection();
      }
      this.getUserTableData();
    },
    getUserTableData () {
      getUserData(this.params).then(res => {
        const { list, totalCount } = res
        this.userData = list
        this.params.totalCount = totalCount;
      })
    },
    // 关闭用户列表
    closeUserTableHandle () {
      //清除选中的行
      this.multipleSelection = new Array()
      this.hiddenUserTableHandle()
    },
    /**
     * 确定
     */
    submitUserTableHandle () {
      this.$emit('refreshSelectUserList')
      this.hiddenUserTableHandle()
    },
    /**
     * 隐藏用户列表显示
     */
    hiddenUserTableHandle () {
      this['userTableVisible'] = false
      this.$emit('update:userTableVisible', this['userTableVisible'])
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    /**
     * 获取选中的用户ID
     */
    getSelectionUserIds () {
      let userIds = this.multipleSelection.map((value, key, arr) => {
        return value.userId
      })
      return userIds
    }
  }
}
</script>

<style>
</style>
