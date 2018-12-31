<template>
  <d2-container>
    <template slot="header">
      <el-form :inline="true"
               class="d2-pl-15 d2-pt-15"
               ref="params">
        <el-form-item label="配置key"
                      prop="key">
          <el-input placeholder="输入配置key过滤"
                    v-model="params.key">
          </el-input>
        </el-form-item>
        <el-form-item label="备注"
                      prop="remark">
          <el-input placeholder="输入备注进行过滤"
                    v-model="params.key">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="getConfigTableData">
            <d2-icon name="search" />
            查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click=" this.$refs[params].resetFields()">
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
    <el-table :data="configList"
              border
              stripe
              class="d2-pt-5"
              style="width: 100%;">
      <el-table-column prop="configId"
                       label="配置ID"
                       align="center">
      </el-table-column>
      <el-table-column prop="configKey"
                       label="配置key"
                       align="center">
      </el-table-column>
      <el-table-column show-overflow-tooltip
                       prop="configValue"
                       label="配置value"
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
                     @click="addOrUpdateHandle(scope.row.configId)">
            <d2-icon name='edit' />
            修改</el-button>
          <el-button size="small"
                     type="danger"
                     @click="deleteConfigHandle(scope.row.configId)">
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
    <config-form v-if="configFormVisible"
                 @refreshDataList='getConfigTableData'
                 ref="configForm">
    </config-form>
  </d2-container>
</template>

<script>
import configForm from './config-form';
import { getConfigData, deleteConfig } from '@/api/sys/config';
export default {
  name: 'config',
  components: {
    configForm
  },
  data () {
    return {
      configList: [],
      configFormVisible: false,
      params: {
        key: '',
        remark: '',
        totalCount: 0,
        currPage: 1,
        pageSize: 10
      }
    };
  },
  mounted () {
    this.getConfigTableData();
  },
  methods: {
    handleSizeChange (val) {
      this.params.pageSize = val;
      this.getConfigTableData();
    },
    handleCurrentChange (val) {
      this.params.currPage = val;
      this.getConfigTableData();
    },
    getConfigTableData () {
      getConfigData(this.params).then(res => {
        const { list, totalCount } = res
        this.configList = list
        this.params.totalCount = totalCount;
      })
    },
    /**
     * 打开角色表单
     */
    addOrUpdateHandle (configId) {
      this.configFormVisible = true;
      this.$nextTick(() => {
        this.$refs.configForm.initForm(configId)
      })
    },
    deleteConfigHandle (configId) {
      this.$confirm('此操作将永久ID为[' + configId + ']配置删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteConfig(configId).then(res => {
          this.msgUtil.isDelSuccess(res)
          this.getConfigTableData();
        })
      })
    }
  }
}
</script>

<style>
</style>
