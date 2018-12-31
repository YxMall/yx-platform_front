export default {
  layout: () => import('@/layout/header-aside'),
  router: () => import('@/pages/router'),
  index: () => import('@/pages/index'),
  user: () => import('@/pages/sys/user'),
  menu: () => import('@/pages/sys/menu'),
  role: () => import('@/pages/sys/role'),
  config: () => import('@/pages/sys/config'),
  upload: () => import('@/pages/sys/upload'),
  demo: () => import('@/pages/sys/demo'),
  apiDoc: () => import('@/pages/sys/api-doc'),
  dictIndex: () => import('@/pages/sys/dict-index'),
  notify: () => import('@/pages/oa/notify'),
  notifyRecord: () => import('@/pages/oa/notify-record')
}

// import common from './routes/common'
// import sys from './routes/sys'
// import oa from './routes/oa'
// export default {
//   common,
//   sys,
//   oa
// }
