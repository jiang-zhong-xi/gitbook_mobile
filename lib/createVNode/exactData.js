function create(summary) {
  // 匹配出文本和文本前的空格数
  // 其中 \\s+? 匹配出空格数
  // \\*\\s 匹配出*和空格
  // [\\S\\s]*? 匹配出剩余的文本
  // g 全局遍历
  var rule_all = new RegExp(`(\\s*?)\\*\\s?([\\S\\s]*?)\\n`, 'g')
  var titles = [{level: -1, name: 'root'}]; // 保存所有标题(未区分等级)
  do{ // 一行行遍历出标题相关文本和等级
    result = rule_all.exec(summary);
    if (result && result[1].length > 0) {
      titles.push({level: result[1].length, name: result[2]})
    }
  }while (result)
  var vnode = {level: -1, name: 'root', children: []} // 包含等级的对象
  var seperator = new RegExp(`\\[([\\S\\s]+)\\]\\(([\\S\\s]+)\\)`) // 从原始标题文本中匹配出标题和连接地址
  // if (titles[0]) { // 初始化只包含titles数组第一个
  //   vnode = {level: titles[0].level, name: init[1], href: init[2]}
  // }
  var current = vnode // 当前最新的标题对象
  var parent = vnode // 当前标题的父标题，目的是添加当前标题的同级标题
  var recall = vnode // 如果当前标题的等级高于上一个标题的等级，则回溯，从根节点遍历出当前标题的父标题然后把当前标题推进去
  titles.reduce((pre, next, index) => {
    var result = seperator.exec(next.name)
    var item = {level: next.level, name: result[1], href: result[2]}
    if (pre.level < next.level) { // 如果当前标题等级小于上个标题,则往下添加
      parent = current // 当前标题改变量赋值给父标题变量
      current.children = [] // 父标题标题添加子标题数组
      current.children.push(item) // 添加到父标题中
      current = current.children[0] // 把当前标题变量赋值为当前的标题
    } else if (pre.level === next.level) { // 同级标题添加到父标题的的子节点数组里
      parent.children.push(item)
      current = parent.children[parent.children.length - 1] // 把当前标题变量赋值为当前的标题
    } else { // 从根节点从新匹配
      recall = getGrand(vnode, next, vnode) || vnode
      recall.children.push(item)
      current = recall.children[recall.children.length - 1] // 把当前标题变量赋值为当前的标题
      parent = recall // 父标题
    }
    // console.log(pre.level, next)
    return next
  })
  return vnode
}
// 递归查出当前标题的父标题
function getGrand(obj, current, parent) {
  // console.log(obj)
  if (obj.level !== current.level) {
    if (obj.children) {
      for (let i = 0; i < obj.children.length; i++) {
        return getGrand(obj.children[i], current, obj)
      }
    } else {
      return 0
    }
  } else {
    return parent
  }
}
module.exports = create
