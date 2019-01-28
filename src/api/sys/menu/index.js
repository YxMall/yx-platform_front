import request from '@/plugin/axios'

const PREFIX_URL = '/sys/menu/'

export function getMenuList (params) {
  return request({
    url: `${PREFIX_URL}/list`,
    method: 'get',
    params
  })
}

/**
 * 获取菜单信息
 * @param {*} params
 */
export function menuInfo (params) {
  return request({
    url: `${PREFIX_URL}/get/${params}`,
    method: 'get'
  })
}

/**
 * 删除
 * @param {*} menuId
 */
export function deleteMenu (menuId) {
  return request({
    url: `${PREFIX_URL}/delete/${menuId}`,
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
    url: `${PREFIX_URL}/update`,
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
    url: `${PREFIX_URL}/add`,
    method: 'post',
    data: params
  })
}
