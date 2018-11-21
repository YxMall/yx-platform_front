import store from '@/store/index'

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
  return store.state.d2admin.user.permission.indexOf(key) !== -1 || false
}
