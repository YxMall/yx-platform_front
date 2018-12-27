<template>
  <d2-container>
    <template slot="header">
      <el-form :inline="true"
               class="d2-pl-15 d2-pt-15"
               ref="params">
        <el-form-item label="标题"
                      prop="title">
          <el-input placeholder="输入参数名进行过滤"
                    v-model="params.title">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-show="isAuth('oa:notify:list')"
                     @keyup.enter.native="getNotifyTableData"
                     @click="getNotifyTableData">
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
                   v-show="isAuth('oa:notify:add')"
                   @click="addOrUpdateHandle(0)">
          <d2-icon name="plus" />
          发布通知
        </el-button>
      </el-button-group>
    </template>
    <el-table :data="notifyList"
              border
              stripe
              class="d2-pt-5"
              style="width: 100%;">
      <el-table-column prop="id"
                       header-align="center"
                       align="center"
                       label="Id">
      </el-table-column>
      <el-table-column prop="title"
                       header-align="center"
                       align="center"
                       label="标题">
      </el-table-column>
      <el-table-column prop="content"
                       show-overflow-tooltip='true'
                       header-align="center"
                       align="center"
                       label="内容">
      </el-table-column>
      <el-table-column prop="status"
                       header-align="center"
                       align="center"
                       label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1"
                  size="small"
                  type="success">正常</el-tag>
          <el-tag v-else
                  size="small"
                  type="danger">删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createUserName"
                       header-align="center"
                       align="center"
                       label="创建用户">
      </el-table-column>
      <el-table-column prop="updateTime"
                       header-align="center"
                       align="center"
                       label="更新时间">
      </el-table-column>
      <el-table-column prop="createTime"
                       header-align="center"
                       align="center"
                       label="创建时间">
      </el-table-column>
      <el-table-column header-align="center"
                       align="center"
                       width="300"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="small"
                     type="primary"
                     v-show="isAuth('oa:notify:update')"
                     @click="addOrUpdateHandle(scope.row.id)">
            <d2-icon name='edit' />
            修改</el-button>
          <el-button size="small"
                     type="danger"
                     v-show="isAuth('oa:notify:delete')"
                     @click="deleteNotifyHandle(scope.row.id)">
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
    <notify-form v-if="notifyFormVisible"
                 @refreshDataList='getNotifyTableData'
                 ref="notifyForm">
    </notify-form>

  </d2-container>
</template>

<script>
import notifyForm from './notify-form';
import { getNotifyData, deleteNotify } from '@/api/oa/notify';
export default {
  name: 'notify',
  components: {
    notifyForm
  },
  data () {
    return {
      notifyList: [],
      notifyFormVisible: false,
      params: {
        title: '',
        totalCount: 0,
        currPage: 1,
        pageSize: 10
      }
    };
  },
  mounted () {
    this.getNotifyTableData();
  },
  methods: {
    handleSizeChange (val) {
      this.params.pageSize = val;
      this.getNotifyTableData();
    },
    handleCurrentChange (val) {
      this.params.currPage = val;
      this.getNotifyTableData();
    },
    getNotifyTableData () {
      getNotifyData(this.params).then(res => {
        const { list, totalCount } = res
        this.notifyList = list
        this.params.totalCount = totalCount;
      })
    },
    /**
     * 打开表单
     */
    addOrUpdateHandle (id) {
      this.notifyFormVisible = true;
      this.$nextTick(() => {
        this.$refs.notifyForm.initForm(id)
      })
    },
    deleteNotifyHandle (id) {
      this.$confirm('此操作将永久ID为[' + id + ']删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNotify(id).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getNotifyTableData();
        })
      })
    }
  }
}
</script>

<style>
</style>
