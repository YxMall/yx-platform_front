export default {
  layout: () => import('@/layout/header-aside'),
  router: () => import('@/pages/router'),
  index: () => import('@/pages/index'),
  page1: () => import('@/pages/page1'),
  page2: () => import('@/pages/page2'),
  user: () => import('@/pages/sys/user'),
  menu: () => import('@/pages/sys/menu'),
  role: () => import('@/pages/sys/role'),
  apiDoc: () => import('@/pages/sys/api-doc')
}
