import request from '@/plugin/axios'
import qs from 'qs'

/**
 * 登录
 */
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

/**
 * 获取用户信息
 */
export function GetUserInfo () {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

/**
 * 获取古诗
 */
export function getSinglePoetry () {
  return request({
    url: 'https://api.apiopen.top/singlePoetry',
    method: 'get'
  })
}
