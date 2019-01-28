import request from '@/plugin/axios'

const PREFIX_URL = '/sys/user/'
/**
 * 获取分页信息
 * @param {分页过滤条件} params
 */
export function getUserData (params) {
  return request({
    url: `${PREFIX_URL}list`,
    method: 'get',
    params
  })
}

/**
 *禁用启用用户
 * @param {用户id，状态} params
 */
export function enableStatus (params) {
  return request({
    url: `${PREFIX_URL}isEnable`,
    method: 'get',
    params
  })
}

/**
 * 用户名是否存在
 */
export function checkName (params) {
  return request({
    url: `${PREFIX_URL}checkName`,
    method: 'post',
    data: params
  })
}

/**
 *  获取用户信息
 * @param {用户Id} params
 */
export function userInfo (userId) {
  return request({
    url: `${PREFIX_URL}get/${userId}`,
    method: 'get'
  })
}

/**
 * 添加用户
 * @param {用户信息} params
 */
export function addUser (params) {
  return request({
    url: `${PREFIX_URL}add`,
    method: 'post',
    data: params
  })
}

/**
 * 修改用户
 * @param {用户信息} params
 */
export function updateUser (params) {
  return request({
    url: `${PREFIX_URL}update`,
    method: 'put',
    data: params
  })
}

/**
 * 删除用户
 * @param {用户信息} params
 */
export function deleteUser (userId) {
  return request({
    url: `${PREFIX_URL}delete/${userId}`,
    method: 'delete'
  })
}

/**
 *  获取当前用户信息
 * @param {用户Id} params
 */
export function getCurrentUserInfo () {
  return request({
    url: `${PREFIX_URL}getCurrentUser`,
    method: 'get'
  })
}

/**
 * 修改用户信息
 * @param {用户信息} params
 */
export function updateCurrentUser (params) {
  return request({
    url: `${PREFIX_URL}updateCurrentUser`,
    method: 'put',
    data: params
  })
}
