import request from '@/plugin/axios'

export function getUserData (params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}
