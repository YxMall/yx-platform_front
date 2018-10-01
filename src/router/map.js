export default {
  'layout': () =>
    import('@/layout/header-aside'),
  'router': () =>
    import('@/pages/router'),
  'index': () =>
    import('@/pages/index'),
  'page1': () =>
    import('@/pages/page1')
}
