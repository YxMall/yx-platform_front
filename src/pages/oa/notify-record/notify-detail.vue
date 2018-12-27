<template>
  <d2-container>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix d2-text-center">
        <router-link to="/oa/notifyrecord">
          <el-button style="float: left; padding: 3px 0"
                     title="返回"
                     type="text">
            <d2-icon name='chevron-left' />
            返回
          </el-button>
        </router-link>
        <h3 v-text="record.title"></h3>
      </div>
      <div style="border-bottom: 1px solid #ebeef5;padding: 18px 20px;">
        <el-tag>发送者： <span style="font-weight:bold;font-size:16px"
                v-text="record.createUserName"></span>
        </el-tag>
        <el-tag class="d2-ml-20	">发送时间： <span v-text="record.createTime"
                style="font-weight:bold;font-size:16px"></span>
        </el-tag>
      </div>
      <div v-html="record.content" />
    </el-card>

  </d2-container>
</template>

<script>
import { notifyRecordInfo, updateRecord } from '@/api/oa/notify-record';
export default {
  name: 'notify-detail',
  data () {
    return {
      readStatus: '',
      record: {
        id: 0,
        title: '',
        content: '',
        createUserName: '',
        createTime: ''
      }
    }
  },
  created () {
    this.record.id = this.$route.params.id

    this.handleNotifyDetail()
  },
  methods: {
    /**
     * 标记已读
     */
    handleTagReadStatus () {
      let updateRecordData = { "readStatus": true, "readDate": new Date().getTime(), "recordsId": [this.record.id] }
      updateRecord(updateRecordData).then((res) => {
        console.log(res)
      })
    },
    /**
     * 获取详情
     */
    handleNotifyDetail () {
      notifyRecordInfo(this.record.id).then((res) => {
        this.record = res
        console.log(this.record.readStatus)
        if (!this.record.readStatus) {
          this.handleTagReadStatus()
        }
      })
    }

  }
}
</script>

<style>
</style>
