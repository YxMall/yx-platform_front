import request from '@/plugin/axios'

// 路径前缀
const PREFIX_URL = '/sys/file/'
/**
 * 获取分页信息
 * @param {*} params
 */
export function getSysFileData (params) {
  return request({
    url: `${PREFIX_URL}list`,
    method: 'get',
    params
  })
}

/**
 * 删除
 * @param {id}
 */
export function deleteSysFile (row) {
  return request({
    url: `${PREFIX_URL}delete`,
    method: 'delete',
    data: row
  })
}

/**
 * 下载文件
 * @param {数据} row
 */
export function downloadSysFile (row) {
  return request({
    url: `${PREFIX_URL}/download?path=${row.path}&fileName=${row.fileName}`,
    method: 'get',
    responseType: 'blob'
  })
}
