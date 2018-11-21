<template>
  <el-dialog :title="!roleItem.roleId? '新增' : '修改'"
             :visible.sync="roleFormVisible">
    <el-form ref="roleForm"
             :rules="roleFormRules"
             :model="roleItem"
             hide-required-asterisk='true'
             label-width="100px">
      <el-form-item label='角色名称'
                    prop='roleName'>
        <el-input v-model='roleItem.roleName' />
      </el-form-item>
      <el-form-item label='备注'
                    prop='remark'>
        <el-input v-model='roleItem.remark' />
      </el-form-item>
      <el-form-item label='角色权限'
                    prop=''>
        <el-tree :data="menuTreeData"
                 :props="menuListTreeProps"
                 show-checkbox
                 :default-checked-keys='keys'
                 node-key="menuId"
                 default-expand-all
                 ref="menuTree"
                 @current-change="menuTreeCurrentChangeHandle ">
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="roleFormVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="submitRoleFormHandle()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getMenuList } from '@/api/sys/menu';
import { addRole, updateRole, roleInfo } from '@/api/sys/role';
export default {
  name: 'roleForm',
  data () {
    return {
      keys: '',
      menuTreeData: [],
      roleFormVisible: true,
      roleItem: {
        roleId: 0,
        roleName: '',
        remark: '',
        menuIds: []
      },
      roleFormRules: {
        title: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      menuListTreeProps: {
        label: 'title',
        children: 'children'
      }
    };
  },
  methods: {
    /**
     * 初始化表单
     */
    initForm (roleId) {
      // 先清除表单信息
      this.roleItem.roleId = roleId || 0
      getMenuList().then(res => {
        this.menuTreeData = res;
        this.roleFormVisible = true
        this.$nextTick(() => {
          this.$refs['roleForm'].resetFields()
        })
      }).then(() => {
        // 修改
        if (this.roleItem.roleId !== 0) {
          roleInfo(roleId).then(res => {
            this.roleItem = res.role;
            this.keys = res.menuIds;
          })
        }
      })
    },
    /**
     * 提交菜单
     */
    submitRoleFormHandle () {
      this.$refs['roleForm'].validate((valid) => {
        // 获取选中的菜单
        this.roleItem.menuIds = this.$refs.menuTree.getCheckedKeys();
        if (valid) {
          if (this.roleItem.roleId !== 0) {
            updateRole(this.roleItem).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.roleFormVisible = false;
              this.$emit('refreshDataList')
            })
          } else {
            addRole(this.roleItem).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.roleFormVisible = false;
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
