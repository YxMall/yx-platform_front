<template>
  <d2-container>
    <template slot="header">
      <el-form :inline="true"
               class="d2-pl-15 d2-pt-15"
               ref="params">
        <el-form-item label="原文件名"
                      prop="oldFileName">
          <el-input placeholder="输入原文件名进行过滤"
                    v-model="params.oldFileName">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-show="isAuth('sys:file:list')"
                     @keyup.enter.native="getSysFileTableData"
                     @click="getSysFileTableData">
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
                   v-show="isAuth('sys:file:upload')"
                   @click="dialogVisible=true">
          <d2-icon name="cloud-upload" />
          上传
        </el-button>
      </el-button-group>
    </template>
    <el-table :data="sysfileList"
              border
              stripe
              class="d2-pt-5"
              style="width: 100%;">
      <el-table-column prop="id"
                       header-align="center"
                       align="center"
                       label="id">
      </el-table-column>
      <el-table-column prop="oldFileName"
                       show-overflow-tooltip='true'
                       header-align="center"
                       align="center"
                       label="原文件名">
      </el-table-column>
      <el-table-column prop="fileName"
                       show-overflow-tooltip='true'
                       header-align="center"
                       align="center"
                       label="文件名">
      </el-table-column>
      <el-table-column prop="path"
                       header-align="center"
                       align="center"
                       v-if="false"
                       label="path">
      </el-table-column>
      <el-table-column prop="fileType"
                       header-align="center"
                       align="center"
                       label="文件类型">
      </el-table-column>
      <el-table-column label="文件地址"
                       align="center"
                       show-overflow-tooltip='true'
                       width="180">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <a :href="scope.row.url"
               target="_blank">{{ scope.row.url}}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文件大小"
                       align="center"
                       width="180">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium">{{ scope.row.fileSize | bytesToSize}}</el-tag>
          </div>
        </template>
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
                     type="success"
                     circle
                     icon="el-icon-download"
                     v-show="isAuth('sys:file:download')"
                     @click="downloadSysFileHandle(scope.row)">
          </el-button>
          <el-button size="small"
                     type="danger"
                     circle
                     icon="el-icon-delete"
                     v-show="isAuth('sys:file:delete')"
                     @click="deleteSysFileHandle(scope.row)">
          </el-button>
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
    <el-dialog title="上传"
               :visible.sync="dialogVisible">
      <div style="display: flex;justify-content:center">
        <el-upload class="upload-file"
                   drag
                   :on-success='uploadSuccessHandle'
                   :headers='headers'
                   action="/sys/file/upload"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import util from '@/libs/util'
import { getSysFileData, deleteSysFile, downloadSysFile } from '@/api/sys/file';
export default {
  name: 'sysfile',
  data () {
    return {
      dialogVisible: false,
      sysfileList: [],
      sysfileFormVisible: false,
      params: {
        oldFileName: '',
        totalCount: 0,
        currPage: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    headers: function () {
      return { 'accessToken': util.cookies.get('accessToken') }
    }
  },
  filters: {
    bytesToSize: function (bytes) {
      if (bytes === 0) { return '0 B' }
      let k = 1024
      let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      let i = Math.floor(Math.log(bytes) / Math.log(k))
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
    }
  },
  mounted () {
    this.getSysFileTableData()
  },
  methods: {
    handleSizeChange (val) {
      this.params.pageSize = val;
      this.getSysFileTableData();
    },
    handleCurrentChange (val) {
      this.params.currPage = val;
      this.getSysFileTableData();
    },
    uploadSuccessHandle (response, file, fileList) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.dialogVisible = false
      this.getSysFileTableData()
    },
    getSysFileTableData () {
      getSysFileData(this.params).then(res => {
        const { list, totalCount } = res
        this.sysfileList = list
        this.params.totalCount = totalCount;
      })
    },
    /**
     * 打开表单
     */
    addOrUpdateHandle (id) {
      this.sysfileFormVisible = true;
      this.$nextTick(() => {
        this.$refs.sysfileForm.initForm(id)
      })
    },
    deleteSysFileHandle (row) {
      this.$confirm('此操作将永久[' + row.oldFileName + ']文件删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSysFile(row).then(res => {
          this.msgUtil.isDelSuccess(res)
          this.getSysFileTableData()
        })
      })
    },
    downloadSysFileHandle (row) {
      downloadSysFile(row).then(data => {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', row.fileName)
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>

<style>
</style>
