// polyfill
import 'babel-polyfill'
// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'

// 多国语
import i18n from './i18n'
// 核心插件
import d2Admin from '@/plugin/d2admin'

// 菜单和路由设置
import router from './router'

// 权限
import { isAuth } from '@/libs/auth.util'

import msgUtil from '@/libs/msg.util.js'
// 核心插件
Vue.use(d2Admin)
Vue.prototype.msgUtil = msgUtil // 全局方法
Vue.prototype.isAuth = isAuth // 权限方法
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
