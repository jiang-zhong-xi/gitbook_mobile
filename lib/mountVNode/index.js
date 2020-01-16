module.exports = function(){
  mount(elementVnode, document.getElementById('app'))
}
function mount(vnode, container) {
  const { flags } = vnode
  if (flags & VNodeFlags.ELEMENT) {
    // 挂载普通标签
    mountElement(vnode, container)
  } else if (flags & VNodeFlags.COMPONENT) {
    // 挂载组件
    mountComponent(vnode, container)
  } else if (flags & VNodeFlags.TEXT) {
    // 挂载纯文本
    mountText(vnode, container)
  } else if (flags & VNodeFlags.FRAGMENT) {
    // 挂载 Fragment
    mountFragment(vnode, container)
  } else if (flags & VNodeFlags.PORTAL) {
    // 挂载 Portal
    mountPortal(vnode, container)
  }
}

function mountElement(vnode, container, isSVG){
  isSVG = isSVG || vnode.flags & VNodeFlags.ELEMENT_SVG
  // 支持SVG
  const el = isSVG
      ? document.createElementNS('http://www.w3.org/2000/svg', vnode.tag)
      : document.createElement(vnode.tag)
  vnode.el = el
  
    // 拿到 VNodeData
  const data = vnode.data
  if (data) {
    // 如果 VNodeData 存在，则遍历之
    for(let key in data) {
      // key 可能是 class、style、on 等等
      switch(key) {
        case 'style':
          // 如果 key 的值是 style，说明是内联样式，逐个将样式规则应用到 el
          for(let k in data.style) {
            el.style[k] = data.style[k]
          }
          break;
        case 'class':
          if (isSVG) {
            el.setAttribute('class', data[key])
          } else {
            attachClass(data.class, el)
          }
          break;
        default:
          if (key[0] === 'o' && key[1] === 'n') {
            // 事件
            el.addEventListener(key.slice(2), data[key])
          } else if (domPropsRE.test(key)) {
            // 当作 DOM Prop 处理
            el[key] = data[key]
          } else {
            // 当作 Attr 处理
            el.setAttribute(key, data[key])
          }
          break
      }
    }
  }
  var { childFlags, children} = vnode
  // 检测如果没有子节点则无需递归挂载
  if (childFlags !== ChildrenFlags.NO_CHILDREN) {
    if (childFlags & ChildrenFlags.SINGLE_VNODE) {
      // 如果是单个子节点则调用 mount 函数挂载
      mount(children, el, isSVG)
    } else if (childFlags & ChildrenFlags.MULTIPLE_VNODES) {
      // 如果是单多个子节点则遍历并调用 mount 函数挂载
      for (let i = 0; i < children.length; i++) {
        mount(children[i], el, isSVG)
      }
    }
  }
  
  container.appendChild(el)
}
function attachClass(classs, el){
  if (typeof classs === 'string') {
    el.className += ' ' + classs
  } else {
    if(classs instanceof Array) {
      for (let i = 0; i<classs.length; i++) {
        attachClass(classs[i], el)
      }
    } else {
      for(var keys in classs) {
        if (classs[keys]) {
          attachClass(keys, el)
        }
      }
    }
  }
}

function mountText(vnode, container) {
  const el = document.createTextNode(vnode.children)
  vnode.el = el
  container.appendChild(el)
}
