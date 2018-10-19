import request from '@/plugin/axios'

export function getMenuList (params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params
  })
}

/**
 * 删除
 * @param {*} params
 */
export function menuInfo (params) {
  return request({
    url: '/menu/' + params,
    method: 'get'
  })
}

/**
 * 删除
 * @param {*} params
 */
export function deleteMenu (params) {
  return request({
    url: '/menu/' + params,
    method: 'delete'
  })
}

/**
 * 更新
 * @param {*} params
 */
export function updateMemu (params) {
  // chirld不需要提交 先删除
  delete params.children
  return request({
    url: '/menu',
    method: 'put',
    data: params
  })
}
/**
 * 新增
 */
export function addMemu (params) {
  // chirld不需要提交 先删除
  delete params.children
  return request({
    url: '/menu',
    method: 'post',
    data: params
  })
}
