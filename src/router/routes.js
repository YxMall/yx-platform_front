// layout
// import layoutHeaderAside from '@/layout/header-aside'

// const meta = { requiresAuth: true }
/**
 * 根目录
 * 根据菜单生成的路由都在根目录下
 */
export const frameIn = [
  {
    path: '/',
    name: 'layout'
  }
]

/**
 * 非后台动态生成的菜单 但是也需要添加到框架路由
 */
export const notDynamicFrameIn = [
  // 消息详情
  {
    title: '消息详情',
    path: '/notify/detail/:id',
    name: 'notifyDetail',
    component: () => import('@/pages/oa/notify-record/notify-detail')
  }
]

/**
 * 在主框架之外显示
 */
export const frameOut = [
  // 页面重定向使用 必须保留
  {
    path: '/redirect/:path*',
    component: () => import('@/pages/redirect')
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  }
]

/**
 * 错误页面
 */
export const errorPage = [
  // 401
  {
    path: '/401',
    name: '401',
    component: () => import('@/pages/error-page/401')
  },
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page/404')
  }
]

// 重新组织后导出
export default frameOut
