import request from '@/plugin/axios'
/**
 * 获取当前账号未读信息数量
 */
export function getUnreadCount () {
  return request({
    url: '/oa/notifyRecord/getUnreadCount',
    method: 'get'
  })
}

/**
 * 获取通知通告发送记录分页信息
 * @param {*} params
 */
export function getNotifyRecordData (params) {
  return request({
    url: '/oa/notifyRecord/list',
    method: 'get',
    params
  })
}

/**
 * 修改
 */
export function updateRecord (record) {
  return request({
    url: '/oa/notifyRecord/update',
    method: 'put',
    data: record
  })
}

/**
 * 修改
 */
export function deleteRecord (recordIds) {
  return request({
    url: '/oa/notifyRecord/delete',
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
    url: '/oa/notifyRecord/get/' + id,
    method: 'get'
  })
}
