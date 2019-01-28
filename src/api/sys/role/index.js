import request from '@/plugin/axios'

const PREFIX_URL = '/sys/role/'

/**
 * 获取角色分页信息
 * @param {*} params
 */
export function getRoleData (params) {
  return request({
    url: `${PREFIX_URL}/list`,
    method: 'get',
    params
  })
}

/**
 * 获取全部角色
 * @param {*} params
 */
export function getAllRole () {
  return request({
    url: `${PREFIX_URL}/all`,
    method: 'get'
  })
}

/**
 * 获取角色信息
 * @param {角色ID}  roleId
 */
export function roleInfo (roleId) {
  return request({
    url: `${PREFIX_URL}/get/${roleId}`,
    method: 'get'
  })
}

/**
 * 添加角色
 * @param  params
 */
export function addRole (params) {
  return request({
    url: `${PREFIX_URL}/add`,
    method: 'post',
    data: params
  })
}

/**
 * 修改角色
 * @param  params
 */
export function updateRole (params) {
  return request({
    url: `${PREFIX_URL}/update`,
    method: 'put',
    data: params
  })
}

/**
 * 删除角色
 * @param {角色Id} roleId
 */
export function deleteRole (roleId) {
  return request({
    url: `${PREFIX_URL}/delete/${roleId}`,
    method: 'delete'
  })
}
