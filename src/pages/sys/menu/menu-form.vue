<template>
  <el-dialog :title="!menuItem.menuId? '新增' : '修改'"
             :visible.sync="menuFormVisible">
    <el-form ref="menuForm"
             :rules="menuFormRules"
             :model="menuItem"
             hide-required-asterisk='true'
             label-width="100px">
      <el-form-item label="类型"
                    prop='type'>
        <el-radio-group v-model="menuItem.type">
          <el-radio :label="0">目录</el-radio>
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">功能</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='菜单名称'
                    prop='title'>
        <el-input v-model='menuItem.title' />
      </el-form-item>
      <el-form-item label='组件名称'
                    prop='name'
                    v-if='menuItem.type===1'>
        <el-input v-model='menuItem.name' />
      </el-form-item>
      <el-form-item label='父级菜单'
                    prop='parentName'>
        <el-popover placement="bottom-start"
                    width="400"
                    v-model='popoverVisible'
                    ref="menuTreePopover"
                    trigger="click">
          <el-tree :data="menuTreeData"
                   :props="menuListTreeProps"
                   node-key="menuId"
                   check-strictly='false'
                   default-expand-all
                   ref="menuTree"
                   @current-change="menuTreeCurrentChangeHandle ">
          </el-tree>
          <el-input v-model='menuItem.parentName'
                    slot="reference" />
        </el-popover>
      </el-form-item>
      <el-form-item label='请求地址'
                    prop='path'>
        <el-input v-model='menuItem.path' />
      </el-form-item>
      <el-form-item label='权限标识'
                    prop='perms'>
        <el-input v-model='menuItem.perms' />
      </el-form-item>
      <el-form-item label='图标'
                    prop='icon'
                    v-if='menuItem.type!==2'>
        <el-input v-model='menuItem.icon' />
      </el-form-item>
      <el-form-item label='排序'
                    prop='orderNum'
                    v-if='menuItem.type!==2'>
        <el-input-number v-model="menuItem.orderNum"
                         controls-position="right"
                         :min="0"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="menuFormVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="submitMenuFormHandle()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getMenuList, menuInfo, updateMemu, addMemu } from '@/api/sys/menu';
export default {
  name: 'menuForm',
  data () {
    return {
      menuTreeData: [],
      menuFormVisible: true,
      popoverVisible: false,
      menuItem: {
        menuId: 0,
        parentId: null,
        parentName: null,
        name: '',
        title: '',
        path: '',
        perms: '',
        type: 0,
        icon: '',
        orderNum: 0
      },
      menuFormRules: {
        title: [
          { required: true, message: '请输入菜单标题', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择菜单类型', trigger: 'change' }
        ]
      },
      menuListTreeProps: {
        label: 'title',
        children: 'children'
      }
    }
  },
  methods: {
    /**
     * 初始化表单
     */
    initForm (id) {
      // 先清除表单信息
      this.menuItem.menuId = id || 0
      getMenuList().then(res => {
        this.menuTreeData = [{ 'menuId': '0', 'title': '菜单', 'children': res, 'parentId': '-1' }]
        this.menuFormVisible = true
        this.$nextTick(() => {
          this.$refs['menuForm'].resetFields()
        })
      }).then(() => {
        // 修改
        if (this.menuItem.menuId !== 0) {
          menuInfo(id).then(res => {
            this.menuItem = res;
            this.menuTreeSetCurrentNode()
          })
        } else {
          this.menuItem.parentId = null;
          this.menuTreeSetCurrentNode()
        }
      })
    },
    // 菜单树选中
    menuTreeCurrentChangeHandle (data, node) {
      this.menuItem.parentId = data.menuId
      this.menuItem.parentName = data.title
      this.popoverVisible = false
    },
    // 菜单树设置当前选中节点
    menuTreeSetCurrentNode () {
      this.menuItem.parentName = this.$refs.menuTree.getNode(this.menuItem.parentId).label;
    },
    /**
     * 提交菜单
     */
    submitMenuFormHandle () {
      this.$refs['menuForm'].validate((valid) => {
        if (valid) {
          if (this.menuItem.menuId !== 0) {
            updateMemu(this.menuItem).then(res => {
              this.msgUtil.isUpdateSuccess(res)
              this.menuFormVisible = false;
              this.$emit('refreshDataList')
            })
          } else {
            addMemu(this.menuItem).then(res => {
              this.msgUtil.isAddSuccess(res)
              this.menuFormVisible = false;
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
