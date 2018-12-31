<template>
  <d2-container>
    <template slot="header">
      <el-form :inline="true"
               class="d2-pl-15 d2-pt-15"
               ref="params">
        <el-form-item label="参数名"
                      prop="key">
          <el-input placeholder="输入参数名进行过滤"
                    v-model="params.key">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-show="isAuth('sys:dictindex:list')"
                     @keyup.enter.native="getDictIndexTableData"
                     @click="getDictIndexTableData">
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
                   v-show="isAuth('sys:dictindex:add')"
                   @click="addOrUpdateHandle(0)">
          <d2-icon name="plus" />
          添加
        </el-button>
      </el-button-group>
    </template>
    <el-table :data="dictindexList"
              border
              stripe
              class="d2-pt-5"
              style="width: 100%;">
      <el-table-column prop="dictId"
                       header-align="center"
                       align="center"
                       label="ID">
      </el-table-column>
      <el-table-column header-align="center"
                       align="center"
                       label="字典数据类型">
        <template slot-scope="scope">
          <span class="dict-title"
                @click="handleDictDetail(scope.row)">{{scope.row.dictCode}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dictTitle"
                       header-align="center"
                       align="center"
                       label="字典标题">
      </el-table-column>
      <el-table-column header-align="center"
                       align="center"
                       label="排序 ">
        <template slot-scope="scope">
          <el-tag>{{scope.row.sort}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime"
                       header-align="center"
                       align="center"
                       label="修改时间">
      </el-table-column>
      <el-table-column prop="createTime"
                       header-align="center"
                       align="center"
                       label="创建时间">
      </el-table-column>
      <el-table-column prop="remark"
                       header-align="center"
                       align="center"
                       label="备注">
      </el-table-column>
      <el-table-column header-align="center"
                       align="center"
                       width="300"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="small"
                     type="primary"
                     v-show="isAuth('sys:dictindex:update')"
                     @click="addOrUpdateHandle(scope.row.dictId)">
            <d2-icon name='edit' />
            修改</el-button>
          <el-button size="small"
                     type="danger"
                     v-show="isAuth('sys:dictindex:delete')"
                     @click="deleteDictIndexHandle(scope.row.dictId)">
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
    <dictindex-form v-if="dictindexFormVisible"
                    @refreshDataList='getDictIndexTableData'
                    ref="dictindexForm">
    </dictindex-form>
  </d2-container>
</template>

<script>
import dictindexForm from './dict-index-form';
import { getDictIndexData, deleteDictIndex } from '@/api/sys/dict-index';
export default {
  name: 'dictindex',
  components: {
    dictindexForm
  },
  data () {
    return {
      dictindexList: [],
      dictindexFormVisible: false,
      params: {
        key: '',
        totalCount: 0,
        currPage: 1,
        pageSize: 10
      }
    };
  },
  mounted () {
    this.getDictIndexTableData();
  },
  methods: {
    /**
  * 显示字典详情
  */
    handleDictDetail (row) {
      this.$router.push({
        path: `/sys/dictdata/${row.dictCode}`
      })
    },
    handleSizeChange (val) {
      this.params.pageSize = val;
      this.getDictIndexTableData();
    },
    handleCurrentChange (val) {
      this.params.currPage = val;
      this.getDictIndexTableData();
    },
    getDictIndexTableData () {
      getDictIndexData(this.params).then(res => {
        const { list, totalCount } = res
        this.dictindexList = list
        this.params.totalCount = totalCount;
      })
    },
    /**
     * 打开表单
     */
    addOrUpdateHandle (id) {
      this.dictindexFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dictindexForm.initForm(id)
      })
    },
    deleteDictIndexHandle (id) {
      this.$confirm('此操作将永久ID为[' + id + ']删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDictIndex(id).then(res => {
          this.msgUtil.isDelSuccess(res)
          this.getDictIndexTableData();
        })
      })
    }
  }
}
</script>

<style scoped>
.dict-title {
  cursor: pointer;
  color: #20a0ff;
}
</style>
