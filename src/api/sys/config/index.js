import request from '@/plugin/axios'

export function getConfigData (params) {
  return request({
    url: '/config/list',
    method: 'get',
    params
  })
}

/**
 * 删除
 * @param {*} params
 */
export function deleteConfig (configId) {
  return request({
    url: '/config/delete/' + configId,
    method: 'delete'
  })
}

/**
 *  获取用户信息
 * @param {用户Id} params
 */
export function configInfo (configId) {
  return request({
    url: '/config/get/' + configId,
    method: 'get'
  })
}

/**
 * 添加配置
 * @param  params
 */
export function addConfig (params) {
  return request({
    url: '/config/add',
    method: 'post',
    data: params
  })
}

/**
 * 修改配置
 * @param  params
 */
export function updateConfig (params) {
  return request({
    url: '/config/edit',
    method: 'put',
    data: params
  })
}
