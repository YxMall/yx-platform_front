import { getAllDict } from '@/api/sys/dict-data'

export default {
  namespaced: true,
  state: {
    // 字典信息
    dictData: []
  },
  actions: {
    /**
     * @description 设置数据字典
     * @param {Object} state vuex state
     * @param {*} info info
     */
    setDictData ({ state, dispatch }) {
      return new Promise(async resolve => {
        getAllDict().then(data => {
          // 设置字典信息
          dispatch('set', data)
          resolve()
        })
      })
    },
    /**
     * @description 设置字典数据
     * @param {Object} state vuex state
     * @param {*} data data
     */
    set ({ state, dispatch }, data) {
      return new Promise(async resolve => {
        // store 赋值
        state.dictData = data
        // 持久化
        await dispatch(
          'd2admin/db/set',
          {
            dbName: 'sys',
            path: 'user.dict',
            value: data,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取字典数据
     * @param {Object} state vuex state
     */
    load ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.dictData = await dispatch(
          'd2admin/db/get',
          {
            dbName: 'sys',
            path: 'user.dict',
            defaultValue: [],
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    }
  }
}
