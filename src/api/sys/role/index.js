import request from '@/plugin/axios'

/**
 * 获取角色分页信息
 * @param {*} params
 */
export function getRoleData (params) {
  return request({
    url: '/role/list',
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
    url: '/role/all',
    method: 'get'
  })
}

/**
 * 获取角色信息
 * @param {角色ID}  roleId
 */
export function roleInfo (roleId) {
  return request({
    url: '/role/' + roleId,
    method: 'get'
  })
}

/**
 * 添加角色
 * @param  params
 */
export function addRole (params) {
  return request({
    url: '/role',
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
    url: '/role',
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
    url: '/role/' + roleId,
    method: 'delete'
  })
}
