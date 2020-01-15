var exactedData = require('./exactData.js')
var createVNode = require('./createVNode.js')

module.exports = function(content) {
  var data = exactedData(content)
  var vnode = createVNode(data)
  return vnode
}