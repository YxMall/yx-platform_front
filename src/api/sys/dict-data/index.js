import request from '@/plugin/axios'

// 路径前缀
const PREFIX_URL = '/sys/dictdata/'
/**
 * 获取数据字典数据分页信息
 * @param {*} params
 */
export function getDictDataData (params) {
  return request({
    url: `${PREFIX_URL}/list`,
    method: 'get',
    params
  })
}

/**
 * 获取数据字典数据
 * @param {dataId}  字典数据id
 */
export function dictdataInfo (dataId) {
  return request({
    url: `${PREFIX_URL}/get/${dataId}`,
    method: 'get'
  })
}

/**
 * 添加数据字典数据
 * @param  params
 */
export function addDictData (params) {
  return request({
    url: `${PREFIX_URL}/add`,
    method: 'post',
    data: params
  })
}

/**
 * 修改数据字典数据
 * @param  params
 */
export function updateDictData (params) {
  return request({
    url: `${PREFIX_URL}/update`,
    method: 'put',
    data: params
  })
}

/**
 * 删除数据字典数据
 * @param {data_id}  字典数据id
 */
export function deleteDictData (dataId) {
  return request({
    url: `${PREFIX_URL}/delete/${dataId}`,
    method: 'delete'
  })
}

/**
 * 获取全部字典数据
 * @param {dataId}  字典数据id
 */
export function getAllDict (dataId) {
  return request({
    url: `${PREFIX_URL}/getAllDict`,
    method: 'get'
  })
}
