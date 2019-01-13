<template>
  <div>
    <el-tooltip effect='dark'
                content='通知'
                placement='bottom'>
      <!-- <router-link to='/oa/notifyrecord'> -->
      <el-button class='d2-ml-0 d2-mr btn-text can-hover'
                 type='text'
                 @click='dialogVisible = true'>
        <el-badge :value='unReadMsgCount'
                  class='item'>
          <d2-icon name='bell-o'
                   style='font-size: 16px' />
        </el-badge>
      </el-button>
      <!-- </router-link> -->
    </el-tooltip>
  </div>
</template>

<script>
import { getUnreadCount } from '@/api/oa/notify-record';
import util from '@/libs/util'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { mapState } from 'vuex'
export default {
  name: 'headerNotify',
  data () {
    return {
      unReadMsgCount: 0,
      stompClient: '',
      timer: ''
    }
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  created () {
    this.initWebSocket()
    this.setUnreadCount()
  },
  beforeDestroy: function () {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
    clearInterval(this.timer);
  },
  methods: {
    /**
     * 设置未读消息数量
     */
    setUnreadCount () {
      getUnreadCount().then(res => {
        this.unReadMsgCount = res;
      })
    },
    /**
     * 初始化websocket通信
     */
    initWebSocket () {
      this.connection();
      let that = this;
      // 断开重连机制, 尝试发送消息, 捕获异常发生时重连
      this.timer = setInterval(() => {
        try {
          that.stompClient.send('test');
        } catch (err) {
          console.log('断线了: ' + err);
          that.connection();
        }
      }, 5000);
    },
    connection () {
      // 建立连接对象
      let socket = new SockJS(process.env.VUE_APP_API + 'endpointChat');
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      // 定义客户端的认证信息,按需求配置
      let headers = {
        accessToken: util.cookies.get('accessToken')
      }
      // 向服务器发起websocket连接
      this.stompClient.connect(headers, () => {
        this.stompClient.subscribe('/topic/notifications', (res) => {
          // 订阅服务端提供的某个topic
          this.setUnreadCount()
          this.$notify({
            title: '新消息',
            type: 'success',
            message: JSON.parse(res.body).title
          });
        }, headers);
        this.stompClient.subscribe('/user/' + this.info.username + '/queue/notifications', (res) => {
          // 订阅服务端提供的某个topic
          this.setUnreadCount()
          this.$notify({
            title: '新消息',
            type: 'success',
            message: JSON.parse(res.body).title
          });
        }, headers)
        // 用户加入接口
        this.stompClient.send('/app/chat.addUser',
          headers,
          JSON.stringify({ sender: '', chatType: 'JOIN' }),
        )
      }, (err) => {
        // 连接发生错误时的处理函数
        console.log('失败')
        console.log(err);
      });
    },
    // 断开连接
    disconnect () {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    }
  }
}
</script>
