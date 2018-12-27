<template>
  <d2-container>
    <template slot="header">
      <el-form :inline="true"
               class="d2-pl-15 d2-pt-15"
               ref="params">
        <el-form-item label="角色名称"
                      prop="roleName">
          <el-input placeholder="输入关键字进行过滤"
                    v-model="params.roleName">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-show="isAuth('sys:role:list')"
                     @keyup.enter.native="getRoleTableData"
                     @click="getRoleTableData">
            <d2-icon name="search" />
            查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="this.$refs.params.resetFields()">
            <d2-icon name="refresh" />
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <el-button-group>
        <el-button type="primary"
                   v-show="isAuth('sys:role:add')"
                   @click="addOrUpdateHandle(0)">
          <d2-icon name="plus" />
          添加
        </el-button>
      </el-button-group>
    </template>
    <el-table :data="roleList"
              border
              stripe
              class="d2-pt-5"
              style="width: 100%;">
      <el-table-column prop="roleId"
                       label="角色ID"
                       align="center">
      </el-table-column>
      <el-table-column prop="roleName"
                       label="角色名称"
                       align="center">
      </el-table-column>
      <el-table-column prop="remark"
                       label="备注"
                       align="center">
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
                     type="primary"
                     v-show="isAuth('sys:role:update')"
                     @click="addOrUpdateHandle(scope.row.roleId)">
            <d2-icon name='edit' />
            修改</el-button>
          <el-button size="small"
                     type="danger"
                     v-show="isAuth('sys:role:delete')"
                     @click="deleteRoleHandle(scope.row.roleId)">
            <d2-icon name='trash' />
            删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="params.currPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="params.totalCount">
      </el-pagination>
    </template>
    <role-form v-if="roleFormVisible"
               @refreshDataList='getRoleTableData'
               ref="roleForm">
    </role-form>
  </d2-container>
</template>

<script>
import roleForm from './role-form';
import { getRoleData, deleteRole } from '@/api/sys/role';
export default {
  name: 'role',
  components: {
    roleForm
  },
  data () {
    return {
      roleList: [],
      roleFormVisible: false,
      params: {
        roleName: '',
        totalCount: 0,
        currPage: 1,
        pageSize: 10
      }
    };
  },
  mounted () {
    this.getRoleTableData();
  },
  methods: {
    handleSizeChange (val) {
      this.params.pageSize = val;
      this.getRoleTableData();
    },
    handleCurrentChange (val) {
      this.params.currPage = val;
      this.getRoleTableData();
    },
    getRoleTableData () {
      getRoleData(this.params).then(res => {
        const { list, totalCount } = res
        this.roleList = list
        this.params.totalCount = totalCount;
      })
    },
    /**
     * 打开角色表单
     */
    addOrUpdateHandle (roleId) {
      this.roleFormVisible = true;
      this.$nextTick(() => {
        this.$refs.roleForm.initForm(roleId)
      })
    },
    deleteRoleHandle (roleId) {
      this.$confirm('此操作将永久ID为[' + roleId + ']角色删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(roleId).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getRoleTableData();
        })
      })
    }
  }
}
</script>

<style>
</style>
