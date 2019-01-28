import request from '@/plugin/axios'

// 路径前缀
const PREFIX_URL = '/sys/config/'
/**
 * 获取配置信息
 * @param  params
 */
export function configInfo (key) {
  return request({
    url: `${PREFIX_URL}/getConfig`,
    method: 'post',
    data: key
  })
}

/**
 * 添加配置
 * @param  params
 */
export function saveOrUpdateConfig (params) {
  return request({
    url: `${PREFIX_URL}/saveOrUpdate`,
    method: 'post',
    data: params
  })
}
