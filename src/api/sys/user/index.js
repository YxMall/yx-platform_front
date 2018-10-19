import request from '@/plugin/axios'

/**
 * 获取分页信息
 * @param {分页过滤条件} params
 */
export function getUserData (params) {
  return request({
    url: '/user/list',
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
    url: '/user/isEnable',
    method: 'get',
    params
  })
}

/**
 * 用户名是否存在
 */
export function checkName (params) {
  return request({
    url: '/user/checkName',
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
    url: '/user/' + userId,
    method: 'get'
  })
}

/**
 * 添加用户
 * @param {用户信息} params
 */
export function addUser (params) {
  return request({
    url: '/user',
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
    url: '/user',
    method: 'put',
    data: params
  })
}

/**
 * 修改用户
 * @param {用户信息} params
 */
export function deleteUser (userId) {
  return request({
    url: '/user' + userId,
    method: 'delete'
  })
}
