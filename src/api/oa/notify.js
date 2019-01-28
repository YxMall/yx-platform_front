import request from '@/plugin/axios'

const PREFIX_URL = '/oa/notify/'
/**
 * 获取通知分页信息
 * @param {*} params
 */
export function getNotifyData (params) {
  return request({
    url: `${PREFIX_URL}sendList`,
    method: 'get',
    params
  })
}

/**
 * 获取通知信息
 * @param {id}  Id
 */
export function notifyInfo (id) {
  return request({
    url: `${PREFIX_URL}get/${id}`,
    method: 'get'
  })
}

/**
 * 添加通知
 * @param  params
 */
export function addNotify (params) {
  return request({
    url: `${PREFIX_URL}add`,
    method: 'post',
    data: params
  })
}

/**
 * 修改通知
 * @param  params
 */
export function updateNotify (params) {
  return request({
    url: `${PREFIX_URL}update`,
    method: 'put',
    data: params
  })
}

/**
 * 删除通知
 * @param {id}  Id
 */
export function deleteNotify (id) {
  return request({
    url: `${PREFIX_URL}delete/${id}`,
    method: 'delete'
  })
}
