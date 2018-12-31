import util from './util.js'
import { Message } from 'element-ui'

// 提示消息map
let msgMap = new Map()

const msgUtil = {}

/**
 * 初始化map
 */
function initMsgMap () {
  if (msgMap) {
    let dictList = util.getDict('message').dictList
    dictList.forEach((item, index, array) => {
      msgMap.set(item.dataKey, item.dataValue)
    })
  }
}

/**
 * 是否新增成功
 */
msgUtil.isAddSuccess = function (result) {
  initMsgMap()
  result.code === 200
    ? Message({
      message: msgMap.get('addSuccess'),
      type: 'success'
    })
    : Message.error(msgMap.get('addError'))
}

/**
 * 是否新增成功
 */
msgUtil.isUpdateSuccess = function (result) {
  initMsgMap()
  result.code === 200
    ? Message({
      message: msgMap.get('updateSuccess'),
      type: 'success'
    })
    : Message.error(msgMap.get('updateError'))
}

/**
 * 是否删除成功
 */
msgUtil.isDelSuccess = function (result) {
  initMsgMap()
  result.code === 200
    ? Message({
      message: msgMap.get('delSuccess'),
      type: 'success'
    })
    : Message.error(msgMap.get('delError'))
}
export default msgUtil
