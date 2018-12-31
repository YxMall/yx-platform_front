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
                     v-show="isAuth('sys:dictdata:list')"
                     @keyup.enter.native="getDictDataTableData"
                     @click="getDictDataTableData">
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
                   v-show="isAuth('sys:dictdata:add')"
                   @click="addOrUpdateHandle(0)">
          <d2-icon name="plus" />
          添加
        </el-button>
      </el-button-group>
    </template>
    <el-table :data="dictdataList"
              border
              stripe
              class="d2-pt-5"
              style="width: 100%;">
      <el-table-column prop="dataId"
                       header-align="center"
                       align="center"
                       label="ID">
      </el-table-column>
      <el-table-column prop="dataKey"
                       header-align="center"
                       align="center"
                       label="key">
      </el-table-column>
      <el-table-column prop="dataValue"
                       header-align="center"
                       align="center"
                       label="value">
      </el-table-column>
      <el-table-column prop="dictCode"
                       header-align="center"
                       align="center"
                       label="字典类型">
      </el-table-column>
      <el-table-column header-align="center"
                       align="center"
                       label="排序 ">
        <template slot-scope="scope">
          <el-tag type="success">{{scope.row.sort}}</el-tag>
        </template>
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
                     v-show="isAuth('sys:dictdata:update')"
                     @click="addOrUpdateHandle(scope.row.dataId)">
            <d2-icon name='edit' />
            修改</el-button>
          <el-button size="small"
                     type="danger"
                     v-show="isAuth('sys:dictdata:delete')"
                     @click="deleteDictDataHandle(scope.row.dataId)">
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
    <dictdata-form v-if="dictdataFormVisible"
                   @refreshDataList='getDictDataTableData'
                   ref="dictdataForm">
    </dictdata-form>
  </d2-container>
</template>

<script>
import dictdataForm from './dict-data-form';
import { getDictDataData, deleteDictData } from '@/api/sys/dict-data';
export default {
  name: 'dictdata',
  components: {
    dictdataForm
  },
  data () {
    return {
      dictdataList: [],
      dictdataFormVisible: false,
      params: {
        key: '',
        dictCode: '',
        totalCount: 0,
        currPage: 1,
        pageSize: 10
      }
    };
  },
  mounted () {
    this.params.dictCode = this.$route.params.code
    this.getDictDataTableData();
  },
  methods: {
    handleSizeChange (val) {
      this.params.pageSize = val;
      this.getDictDataTableData();
    },
    handleCurrentChange (val) {
      this.params.currPage = val;
      this.getDictDataTableData();
    },
    getDictDataTableData () {
      getDictDataData(this.params).then(res => {
        const { list, totalCount } = res
        this.dictdataList = list
        this.params.totalCount = totalCount;
      })
    },
    /**
     * 打开表单
     */
    addOrUpdateHandle (id) {
      this.dictdataFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dictdataForm.initForm(id, this.params.dictCode)
      })
    },
    deleteDictDataHandle (id) {
      this.$confirm('此操作将永久ID为[' + id + ']删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDictData(id).then(res => {
          this.msgUtil.isDelSuccess(res)
          this.getDictDataTableData();
        })
      })
    }
  }
}
</script>

<style>
</style>
