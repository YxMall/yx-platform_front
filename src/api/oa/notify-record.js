import request from '@/plugin/axios'

const PREFIX_URL = '/oa/notifyRecord/'
/**
 * 获取当前账号未读信息数量
 */
export function getUnreadCount () {
  return request({
    url: `${PREFIX_URL}getUnreadCount`,
    method: 'get'
  })
}

/**
 * 获取通知通告发送记录分页信息
 * @param {*} params
 */
export function getNotifyRecordData (params) {
  return request({
    url: `${PREFIX_URL}list`,
    method: 'get',
    params
  })
}

/**
 * 修改
 */
export function updateRecord (record) {
  return request({
    url: `${PREFIX_URL}update`,
    method: 'put',
    data: record
  })
}

/**
 * 修改
 */
export function deleteRecord (recordIds) {
  return request({
    url: `${PREFIX_URL}delete`,
    method: 'delete',
    data: recordIds
  })
}

/**
 * 获取通知详情
 * @param {id}  Id
 */
export function notifyRecordInfo (id) {
  return request({
    url: `${PREFIX_URL}get/${id}`,
    method: 'get'
  })
}
