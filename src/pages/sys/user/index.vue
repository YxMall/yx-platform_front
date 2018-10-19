<template>
  <d2-container>
    <template slot="header">
      <el-form :inline="true"
               :model="params"
               class="d2-pl-15 d2-pt-15"
               ref="params">
        <el-form-item label="状态"
                      prop="status">
          <el-select v-model="params.status"
                     placeholder="状态选择"
                     style="width: 100px;">
            <el-option label="全部"
                       value="" />
            <el-option label="启动"
                       value="1" />
            <el-option label="禁用"
                       value="0" />
          </el-select>
        </el-form-item>

        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="params.username"
                    clearable
                    placeholder="用户"
                    style="width: 100px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
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
      <el-button-group>
        <el-button type="primary"
                   @click="addOrUpdateHandle(0)">
          <d2-icon name="plus" />
          添加
        </el-button>
      </el-button-group>
    </template>
    <el-table :data="data"
              border
              stripe
              class="d2-pt-5"
              style="width: 100%;">
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
      <el-table-column prop="avatar"
                       label="头像"
                       align="center">
        <template slot-scope="scope">
          <img :src="scope.row.avatar"
               style="width:45px;height:45px;border-radius:5px" />
        </template>
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
      <el-table-column prop="status"
                       label="状态"
                       align="center">
        <template slot-scope="scope">
          <status-tag :value="scope.row.status"
                      :id="scope.row.userId"
                      @change="(val) => {
              handleSwitchChange(val, scope.$index) }">
            <d2-icon name="check-circle"
                     style="font-size: 20px; line-height: 32px; color: #67C23A;"
                     slot="active" />
            <d2-icon name="times-circle"
                     style="font-size: 20px; line-height: 32px; color: #F56C6C;"
                     slot="inactive" />
          </status-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime"
                       label="创建时间"
                       sortable
                       align="center">
      </el-table-column>
      <el-table-column header-align="center"
                       align="center"
                       width="300"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="small"
                     type="success"
                     @click="addOrUpdateHandle(scope.row.roleId)">
            <d2-icon name='edit' />
            更换头像</el-button>
          <el-button size="small"
                     type="primary"
                     @click="addOrUpdateHandle(scope.row.userId)">
            <d2-icon name='edit' />
            修改</el-button>
          <el-button size="small"
                     type="danger"
                     @click="deleteUserHandle(scope.row.userId)">
            <d2-icon name='trash' />
            删除</el-button>
        </template>
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
    <user-form v-if="userFormVisible"
               @refreshDataList='getUserTableData'
               ref="userForm">
    </user-form>
  </d2-container>
</template>

<style lang="scss" scoped>
</style>

<script>
import statusTag from '../status-tag'
import userForm from './user-form'
import { getUserData, deleteUser } from '@/api/sys/user';
export default {
  name: 'user',
  components: {
    statusTag,
    userForm
  },
  data () {
    return {
      userFormVisible: false,
      data: [],
      params: {
        username: '',
        status: '',
        totalCount: 0,
        currPage: 1,
        pageSize: 10
      }
    };
  },
  mounted () {
    this.getUserTableData();
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
    getUserTableData () {
      getUserData(this.params).then(res => {
        const { list, totalCount } = res
        this.data = list
        this.params.totalCount = totalCount;
      })
    },
    handleSwitchChange (val, index) {
      const oldValue = this.data[index]
      this.$set(this.data, index, {
        ...oldValue,
        status: val
      })
      // 注意 这里并没有把修改后的数据传递出去 如果需要的话请自行修改
    },
    /**
     * 打开用户表单
     */
    addOrUpdateHandle (userId) {
      this.userFormVisible = true;
      this.$nextTick(() => {
        this.$refs.userForm.initForm(userId)
      })
    },
    //删除用户
    deleteUserHandle (userId) {
      this.$confirm('此操作将永久ID为[' + userId + ']用户删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(userId).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getUserTableData();
        })
      })
    }
  }
};
</script>
