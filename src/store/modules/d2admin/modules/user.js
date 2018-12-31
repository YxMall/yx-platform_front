// 设置文件
import setting from '@/setting.js'
import { GetUserInfo } from '@/api/sys/login'
export default {
  namespaced: true,
  state: {
    // 用户信息
    info: setting.user.info,
    permission: setting.user.permission
  },
  actions: {
    /**
     * @description 获取用户信息
     * @param {Object} state vuex state
     * @param {*} info info
     */
    getUserInfo ({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        GetUserInfo()
          .then(res => {
            const { info, menu, permission } = res
            dispatch('set', info)
            // 设置用户权限
            state.permission = permission
            // 初始化菜单
            commit('d2admin/menu/headerSet', menu, { root: true })
            // 初始化菜单
            commit('d2admin/menu/asideSet', menu, { root: true })
            // 初始化菜单搜索功能
            commit('d2admin/search/init', menu, { root: true })
            // 根据菜单初始化路由
            commit('d2admin/router/GenerateRoutes', menu, { root: true })
            // 用户登录后从持久化存储加载一系列的设置
            dispatch('d2admin/account/load', null, { root: true })
            // 初始化字典数据
            dispatch('d2admin/dict/setDictData', null, { root: true })
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set ({ state, dispatch }, info) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = info
        // 持久化
        await dispatch(
          'd2admin/db/set',
          {
            dbName: 'sys',
            path: 'user.info',
            value: info,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     */
    load ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = await dispatch(
          'd2admin/db/get',
          {
            dbName: 'sys',
            path: 'user.info',
            defaultValue: setting.user.info,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    }
  }
}
