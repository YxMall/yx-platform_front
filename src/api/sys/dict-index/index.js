import request from '@/plugin/axios'

const PREFIX_URL = '/sys/dictindex/'

/**
 * 获取数据字典索引表分页信息
 * @param {*} params
 */
export function getDictIndexData (params) {
  return request({
    url: `${PREFIX_URL}/list`,
    method: 'get',
    params
  })
}

/**
 * 获取数据字典索引表信息
 * @param {dictId}
 */
export function dictindexInfo (dictId) {
  return request({
    url: `${PREFIX_URL}/get/${dictId}`,
    method: 'get'
  })
}

/**
 * 添加数据字典索引表
 * @param  params
 */
export function addDictIndex (params) {
  return request({
    url: `${PREFIX_URL}/add`,
    method: 'post',
    data: params
  })
}

/**
 * 修改数据字典索引表
 * @param  params
 */
export function updateDictIndex (params) {
  return request({
    url: `${PREFIX_URL}/update`,
    method: 'put',
    data: params
  })
}

/**
 * 删除数据字典索引表
 * @param {dictId}
 */
export function deleteDictIndex (dictId) {
  return request({
    url: `${PREFIX_URL}/delete/${dictId}`,
    method: 'delete'
  })
}
