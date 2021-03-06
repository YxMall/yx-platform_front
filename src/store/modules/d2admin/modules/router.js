import asyncRouterMap from '@/router/map'
import { frameIn, errorPage, notDynamicFrameIn } from '@/router/routes'
import util from '@/libs/util.js'
// const menuAside = []

function generateRouter (item) {
  return {
    path: item.path,
    name: item.name,
    meta: {
      title: item.title
    },
    redirect:
      item.children && item.children.length > 0
        ? { name: item.children[0].name }
        : '',
    component:
      item.name === 'layout'
        ? asyncRouterMap['layout']
        : item.children && item.children.length > 0
          ? asyncRouterMap['router']
          : asyncRouterMap[item.name]
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
      m.path = m.path || util.uuid()
      if (
        !/^https:\/\/|http:\/\//.test(m.path) &&
        m.path !== undefined &&
        m.path != null
      ) {
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
      // 添加非动态的路由
      addRoutes[0].children.push(...notDynamicFrameIn)
      state.addRoutes = addRoutes
      // 处理路由 得到每一级的路由设置
      this.commit('d2admin/page/init', addRoutes)
    }
  }
}
