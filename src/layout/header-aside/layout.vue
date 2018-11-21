<template>
  <div class="d2-layout-header-aside-group"
       :style="styleLayoutMainGroup"
       :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content"
         flex="dir:top">
      <!-- 顶栏 -->
      <div class="d2-theme-header"
           :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
           flex-box="0"
           flex>
        <div class="logo-group"
             :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}"
             flex-box="0">
          <img v-if="asideCollapse"
               :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img v-else
               :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`">
        </div>
        <div class="toggle-aside-btn"
             @click="handleToggleAside"
             flex-box="0">
          <d2-icon name="bars" />
        </div>
        <d2-menu-header flex-box="1" />
        <!-- 顶栏右侧 -->
        <div class="d2-header-right"
             flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <d2-header-search @click="handleSearchClick" />
          <d2-header-error-log />
          <d2-header-fullscreen />
          <d2-header-theme />
          <d2-header-size />
          <d2-header-user />
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container"
           flex-box="1"
           flex>
        <!-- 主体 侧边栏 -->
        <div flex-box="0"
             ref="aside"
             class="d2-theme-container-aside"
             :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }">
          <d2-menu-side />
        </div>
        <!-- 主体 -->
        <div class="d2-theme-container-main"
             flex-box="1"
             flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-show="searchActive"
                 class="d2-theme-container-main-layer"
                 flex="dir:top">
              <d2-panel-search ref="panelSearch"
                               @close="searchPanelClose" />
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-show="!searchActive"
                 class="d2-theme-container-main-layer"
                 flex="dir:top">
              <!-- tab -->
              <div class="d2-theme-container-main-header"
                   flex-box="0">
                <d2-tabs />
              </div>
              <!-- 页面 -->
              <div class="d2-theme-container-main-body"
                   flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view />
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { mapState, mapGetters, mapMutations } from 'vuex'
import mixinSearch from './mixins/search'
export default {
  name: 'd2-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    'd2-menu-side': () => import('./components/menu-side'),
    'd2-menu-header': () => import('./components/menu-header'),
    'd2-tabs': () => import('./components/tabs'),
    'd2-header-fullscreen': () => import('./components/header-fullscreen'),
    'd2-header-search': () => import('./components/header-search'),
    'd2-header-size': () => import('./components/header-size'),
    'd2-header-theme': () => import('./components/header-theme'),
    'd2-header-user': () => import('./components/header-user'),
    'd2-header-error-log': () => import('./components/header-error-log')
  },
  data () {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px',
      stompClient: '',
      timer: ''
    }
  },
  computed: {
    ...mapState('d2admin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse
    }),
    ...mapGetters('d2admin', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup () {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    }
  },
  created () {
    this.initWebSocket();
  },
  beforeDestroy: function () {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
    clearInterval(this.timer);
  },
  methods: {
    ...mapMutations({
      menuAsideCollapseToggle: 'd2admin/menu/asideCollapseToggle'
    }),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside () {
      this.menuAsideCollapseToggle()
    },
    initWebSocket () {
      this.connection();
      let that = this;
      // 断开重连机制,尝试发送消息,捕获异常发生时重连
      this.timer = setInterval(() => {
        try {
          that.stompClient.send("test");
        } catch (err) {
          console.log("断线了: " + err);
          that.connection();
        }
      }, 5000);
    },
    connection () {
      // 建立连接对象
      let socket = new SockJS('/endpointChat');
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      // 定义客户端的认证信息,按需求配置
      let headers = {
        accessToken: util.cookies.get('accessToken')
      }
      // 向服务器发起websocket连接
      this.stompClient.connect(headers, () => {
        this.stompClient.subscribe('/topic/public', (msg) => {
          // 订阅服务端提供的某个topic
          console.log('广播成功')
          console.log(msg);  // msg.body存放的是服务端发送给我们的信息
        }, headers);
        this.stompClient.send("/app/chat.addUser",
          headers,
          JSON.stringify({ sender: '', chatType: 'JOIN' }),
        )   //用户加入接口
      }, (err) => {
        // 连接发生错误时的处理函数
        console.log('失败')
        console.log(err);
      });
    },
    disconnect () {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    },  // 断开连接

  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
</style>
