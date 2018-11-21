<template>
  <d2-container>
    <template slot="header">
      <el-form :inline="true"
               class="d2-pl-15 d2-pt-15"
               ref="params">
        <el-form-item label="菜单名称"
                      prop="menuName">
          <el-input placeholder="输入关键字进行过滤"
                    v-model="menuName">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-show="isAuth('sys:menu:list')"
                     @click="getMenuData">
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
                   v-show="isAuth('sys:menu:add')"
                   @click="addOrUpdateHandle(0)">
          <d2-icon name="plus" />
          添加
        </el-button>
      </el-button-group>
    </template>
    <el-table :data="dataList"
              border
              class="d2-pt-5"
              style="width: 100%;">
      <el-table-column prop="menuId"
                       header-align="center"
                       align="center"
                       width="80"
                       label="ID">
      </el-table-column>
      <table-tree-column prop="title"
                         header-align="center"
                         treeKey="menuId"
                         width="150"
                         label="名称">
      </table-tree-column>
      <el-table-column prop="name"
                       header-align="center"
                       width="150"
                       label="前端组件名称">
      </el-table-column>
      <el-table-column header-align="center"
                       align="center"
                       width="150"
                       label="图标">
        <template slot-scope="scope">
          <d2-icon-svg :name="scope.row.icon || ''"> </d2-icon-svg>
        </template>
      </el-table-column>
      <el-table-column prop="type"
                       header-align="center"
                       align="center"
                       label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0"
                  size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1"
                  size="small"
                  type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2"
                  size="small"
                  type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum"
                       header-align="center"
                       align="center"
                       label="排序号">
      </el-table-column>
      <el-table-column prop="path"
                       header-align="center"
                       align="center"
                       width="150"
                       :show-overflow-tooltip="true"
                       label="菜单URL">
      </el-table-column>
      <el-table-column prop="perms"
                       header-align="center"
                       align="center"
                       width="150"
                       :show-overflow-tooltip="true"
                       label="授权标识">
      </el-table-column>
      <el-table-column header-align="center"
                       align="center"
                       width="300"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="small"
                     type="primary"
                     v-show="isAuth('sys:menu:update')"
                     @click="addOrUpdateHandle(scope.row.menuId)">
            <d2-icon name='edit' />
            修改</el-button>
          <el-button size="small"
                     type="danger"
                     v-show="isAuth('sys:menu:delete')"
                     @click="deleteMenuHandle(scope.row.menuId)">
            <d2-icon name='trash' />
            删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <menu-form v-if="menuFormVisible"
               @refreshDataList='getMenuData'
               ref="menuForm"></menu-form>
  </d2-container>
</template>

<script>
import menuForm from './menu-form';
import { getMenuList, deleteMenu } from '@/api/sys/menu';
export default {
  name: 'menu',
  components: {
    menuForm
  },
  data () {
    return {
      menuName: '',
      dataList: [],
      menuFormVisible: fa
    };
  },
  mounted () {
    this.getMenuData();
  },
  methods: {
    /**
     * 获取数据
     */
    getMenuData () {
      getMenuList(this.menuName).then(res => {
        this.dataList = res;
      })
    },
    /**
     * 移除菜单
     */
    deleteMenuHandle (menuId) {
      this.$confirm('此操作将永久ID' + menuId + '菜单删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenu(menuId).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getMenuData();
        })
      })
    },
    /**
     * 打开菜单表单
     */
    addOrUpdateHandle (menuId) {
      this.menuFormVisible = true;
      this.$nextTick(() => {
        this.$refs.menuForm.initForm(menuId)
      })
    }
  }
}
</script>
