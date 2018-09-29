// layout
import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }
/**
 * 根目录
 * 根据菜单生成的路由都在根目录下
 */
export const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'index',
        name: 'index',
        meta,
        component: () => import('@/pages/index')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('@/pages/page1'),
        meta: { meta, title: '页面 1' }
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('@/pages/page2'),
        meta: { meta, title: '页面 2' }
      },
      {
        path: '/page3',
        name: 'page3',
        component: () => import('@/pages/page3'),
        meta: { meta, title: '页面 3' }
      }
    ]
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
