export default {
  'layout': () =>
    import('@/layout/header-aside'),
  'router': () =>
    import('@/pages/router'),
  'index': () =>
    import('@/pages/index'),
  'page1': () =>
    import('@/pages/page1'),
  'page2': () =>
    import('@/pages/page2'),
  'page3': () =>
    import('@/pages/page3'),
  'user': () =>
    import('@/pages/sys/user')
}
