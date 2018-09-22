import request from '@/plugin/axios'
import qs from 'qs'

export function AccountLogin (params) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: '/auth/login',
    method: 'post',
    data: qs.stringify(params)
  })
}
