<template>
  <d2-container>
    <el-tabs v-model="message"
             @tab-click='handleMessagTableClick'>
      <el-tab-pane :label="`未读消息${message === 'unread'?'('+params.totalCount+')':''}`"
                   name="unread">
        <div class="handle-row">
          <el-button type="primary"
                     @click="handleAllRead()">
            <d2-icon name="tags" />全部标为已读</el-button>
        </div>
        <el-table :data="unreadList"
                  @row-click="handleNotifyDetail"
                  :show-header="false"
                  style="width: 100%">
          <el-table-column>
            <template slot-scope="scope">
              <router-link to="/notify/detail">
                <span class="message-title">{{scope.row.title}}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column width="180">
            <template slot-scope="scope">
              <div style="display:flex">
                <img :src='scope.row.avatar'
                     class="d2-mt-5	"
                     style="width:30px;height:30px;margin-right:10px;border-radius:15px" />
                <span style="line-height:43px">{{scope.row.createUserName}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime"
                           width="180"></el-table-column>
          <el-table-column width="120">
            <template slot-scope="scope">
              <el-button size="small"
                         @click="handleRead(scope.row.id)">
                <d2-icon name="tag" />
                标为已读</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="`已读消息${message === 'read'?'('+params.totalCount+')':''}`"
                   name="read">
        <template v-if="message === 'read'">
          <div class="handle-row">
            <el-button type="danger"
                       @click="handleAllDel()">
              <d2-icon name='trash-o' />
              删除全部
            </el-button>
          </div>
          <el-table :data="readList"
                    @row-click="handleNotifyDetail"
                    :show-header="false"
                    style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180">
              <template slot-scope="scope">
                <div style="display:flex">
                  <img :src='scope.row.avatar'
                       class="d2-mt-5	"
                       style="width:30px;height:30px;margin-right:10px;border-radius:15px" />
                  <span style="line-height:43px">{{scope.row.createUserName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="readDate"
                             width="180"></el-table-column>
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button type="danger"
                           size="small"
                           @click="handleDel(scope.row.id)">
                  <d2-icon name='trash-o' />删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </template>
      </el-tab-pane>

      <el-tab-pane :label="`回收站${message === 'recycle'?'('+params.totalCount+')':''}`"
                   name="recycle">
        <template v-if="message === 'recycle'">
          <div class="handle-row">
            <el-button type="danger"
                       @click="HandleClearRecycle()">
              <d2-icon name='recycle' />
              清空回收站
            </el-button>
          </div>
          <el-table :data="recycleList"
                    @row-click="handleNotifyDetail"
                    :show-header="false"
                    style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180">
              <template slot-scope="scope">
                <div style="display:flex">
                  <img :src='scope.row.avatar'
                       class="d2-mt-5	"
                       style="width:30px;height:30px;margin-right:10px;border-radius:15px" />
                  <span style="line-height:43px">{{scope.row.createUserName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="readDate"
                             width="180"></el-table-column>
            <el-table-column width="300">
              <template slot-scope="scope">
                <el-button type="danger"
                           size="small"
                           @click="HandleClear([scope.row.id])">
                  <d2-icon name='minus' />彻底删除</el-button>
                <el-button @click="handleRestore(scope.row.id)">
                  <d2-icon name='window-restore' />
                  还原</el-button>
              </template>
            </el-table-column>
          </el-table>

        </template>
      </el-tab-pane>
    </el-tabs>
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
  </d2-container>
</template>

<script>
import { getNotifyRecordData, updateRecord, deleteRecord } from '@/api/oa/notify-record';
export default {
  name: 'notify-record',
  data () {
    return {
      message: 'unread',
      params: {
        totalCount: 0,
        currPage: 1,
        pageSize: 10,
        readStatus: 0,
        status: 1
      },
      // 记录对象
      record: {
        readStatus: null,
        status: null,
        readDate: null,
        recordsId: []
      },
      showHeader: false,
      unreadList: [],// 未读
      readList: [],// 已读
      recycleList: []// 回收站
    }
  },
  mounted () {
    this.getMessageList()
  },
  methods: {
    handleSizeChange (val) {
      this.params.pageSize = val
      this.getMessageList()
    },
    handleCurrentChange (val) {
      this.params.currPage = val
      this.getMessageList();
    },
    // 全部标记为已读
    handleAllRead () {
      this.$confirm('确定要标记所有消息为已读?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let tagReadId = this.unreadList.map(function (item, index, input) {
          return item.id;
        })
        this.handleRead(tagReadId)
      })
    },
    // 标记已读
    handleRead (recordIds) {
      this.record.readStatus = true
      this.record.readDate = new Date().getTime()
      this.record.status = null
      this.record.recordsId = this.record.recordsId.concat(recordIds)
      updateRecord(this.record).then((res) => {
        this.$message({
          message: '标记已读成功',
          type: 'success'
        })
        this.getMessageList()
      })
    },
    // 全部逻辑删除
    handleAllDel () {
      this.$confirm('确定要所有消息移入回收站?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let deleteIds = this.readList.map(function (item, index, input) {
          return item.id;
        })
        this.handleDel(deleteIds)
      })
    },
    // 逻辑删除单条
    handleDel (recordIds) {
      this.record.readStatus = null
      this.record.readDate = null
      this.record.status = false
      this.record.recordsId = this.record.recordsId.concat(recordIds)
      updateRecord(this.record).then((res) => {
        this.$message({
          message: '消息移入回收站成功',
          type: 'success'
        })
        this.getMessageList()
      })
    },
    /**
     * 彻底删除
     */
    HandleClear (recordIds) {
      deleteRecord(recordIds).then((res) => {
        this.$message({
          message: '消息彻底删除成功',
          type: 'success'
        })
        this.getMessageList()
      })
    },
    /**
     * 清空回收站
     */
    HandleClearRecycle () {
      this.$confirm('确定要清空回收站?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let deleteIds = this.recycleList.map(function (item, index, input) {
          return item.id;
        })
        this.HandleClear(deleteIds)
      })
    },


    /**
     * 还原消息
     */
    handleRestore (recordIds) {
      this.record.readStatus = null
      this.record.readDate = null
      this.record.status = true
      this.record.recordsId = this.record.recordsId.concat(recordIds)
      updateRecord(this.record).then((res) => {
        this.$message({
          message: '消息还原成功',
          type: 'success'
        })
        this.getMessageList()
      })
    },
    handleMessagTableClick (elm) {
      this.params.readStatus = elm.name !== 'unread';
      this.params.status = elm.name !== 'recycle'
      this.getMessageList()
    },
    /**
     * 显示通知详情
     */
    handleNotifyDetail (row, event, column) {
      this.$router.push({
        path: `/notify/detail/${row.id}`,
      })
    },
    /**
     * 获取消息列表
     */
    getMessageList () {
      // 参数转boolean转0 1
      this.params.readStatus = this.params.readStatus ? 1 : 0
      this.params.status = this.params.status ? 1 : 0
      getNotifyRecordData(this.params).then(res => {
        const { list, totalCount } = res
        let msg = this.message
        switch (msg) {
          case 'unread':
            this.unreadList = list
            break
          case 'read':
            this.readList = list
            break
          case 'recycle':
            this.recycleList = list
            break
        }
        this.params.totalCount = totalCount;
      })
    }
  }
}

</script>

<style>
.message-title {
  cursor: pointer;
  color: #20a0ff;
}
.handle-row {
  margin-bottom: 20px;
}
</style>
