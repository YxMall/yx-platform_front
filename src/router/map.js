export default {
  layout: () => import('@/layout/header-aside'),
  router: () => import('@/pages/router'),
  index: () => import('@/pages/index'),
  user: () => import('@/pages/sys/user'),
  menu: () => import('@/pages/sys/menu'),
  role: () => import('@/pages/sys/role'),
  schedule: () => import('@/pages/sys/schedule'),
  config: () => import('@/pages/sys/config'),
  sysFile: () => import('@/pages/sys/file'),
  demo: () => import('@/pages/sys/demo'),
  apiDoc: () => import('@/pages/sys/api-doc'),
  dictIndex: () => import('@/pages/sys/dict-index'),
  myNotify: () => import('@/pages/oa/notify-record'),
  notify: () => import('@/pages/oa/notify')
}
