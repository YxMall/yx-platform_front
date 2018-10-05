import asyncRouterMap from '@/router/map'
import { frameIn, errorPage } from '@/router/routes'

const menuAside = []

function generateRouter (item) {
  return {
    path: item.path,
    name: item.icon,
    meta: {
      title: item.title
    },
    redirect: item.children && item.children.length > 0 ? { 'name': item.children[0].icon } : '',
    component: item.name === 'layout'
      ? asyncRouterMap['layout']
      : item.children && item.children.length > 0 ? asyncRouterMap['router'] : asyncRouterMap[item.icon]
  }
}

/**
 *将后台的菜单进行格式化
 * @param {*} asyncRouterMap
 */
function convertRouter (menu) {
  const addRoutes = []
  if (menu) {
    menu.forEach(m => {
      // 1为后台约定的菜单
      if (m.type === 1) menuAside.push(m)
      if (!(/^https:\/\/|http:\/\//.test(m.path)) && m.path !== undefined) {
        debugger
        // 截取path最后的为name 不可以重复
        // m['name'] = m.path.substring(m.path.lastIndexOf('/') + 1)
        let parent = generateRouter(m)
        if (m.children) {
          parent.children = convertRouter(m.children)
        }
        addRoutes.push(parent)
      }
    })
  }
  return addRoutes
}

export default {
  namespaced: true,
  state: {
    addRoutes: []
  },
  mutations: {
    GenerateRoutes (state, menu) {
      frameIn[0].children = menu
      let addRoutes = convertRouter(frameIn)
      addRoutes.push(...errorPage)
      state.addRoutes = addRoutes
      // 设置侧栏菜单数组
      this.commit('d2admin/menu/menuAsideSet', menuAside)
      console.log(menuAside)
      // 处理路由 得到每一级的路由设置
      this.commit('d2admin/page/init', addRoutes)
    }
  }
}
