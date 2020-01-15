var root_url = window.location.href;
var titles_data = [{
  "name": "订单问题",
  "href": "./Organization/Chapter1.html",
  "children": [{
    "name": "下单时发现库存不足怎么办？",
    "href": "./Organization/Chapter1.html#3_1"
  }, {
    "name": "为什么结算购物车时已经发送并结算但是没有生成订单？",
    "href": "./Organization/Chapter1.html#3_2"
  }, {
    "name": "订单提交并通过审核后，临时需要修改收货地址怎么办？",
    "href": "./Organization/Chapter1.html#3_3"
  }, {
    "name": "下完单突然不想要了怎么办？",
    "href": "./Organization/Chapter1.html#3_4"
  }]
}, {
  "name": "售后问题",
  "href": "./Organization/Chapter2.html",
  "children": [{
    "name": "2019年售后流程",
    "href": "./Organization/Chapter2.html#1_1"
  }]
}, {
  "name": "物流问题",
  "href": "./Organization/Chapter3.html",
  "children": [{
    "name": "如何查询物流情况？",
    "href": "./Organization/Chapter3.html#1_1"
  }, {
    "name": "可以自己选择物流公司么？",
    "href": "./Organization/Chapter3.html#1_2"
  }, {
    "name": "能否保证原箱发货？",
    "href": "./Organization/Chapter3.html#1_3"
  }, {
    "name": "大件能不能协商运费？",
    "href": "./Organization/Chapter3.html#1_4"
  }, {
    "name": "为什么收到的快递是到付件？",
    "href": "./Organization/Chapter3.html#1_5"
  }]
}]
var renderMenus = function(id) {
  var objDOM = ''
  titles_data.forEach(function(item) {
    var child_obj = '';
    var url_data = ''
    item.children.forEach(function(itemChild, index) {
      if (url_data) {
        url_data += '&';
      }
      url_data += index + '=' + index
      child_obj += `
                <div class="subitem">
                  <a href="${itemChild.href}">${itemChild.name}</a>
                </div>
              `
    })
    var obj = `
      <div class="item">
        <div class="menu">
          <a href='` + root_url + `?mode=` + encodeURI(item.name) + `'>${item.name}</a>
        </div>
        <div class="submenus">
        ` + child_obj + `
        </div>
      </div>
      `
    objDOM += obj
  })
  document.getElementById(id).innerHTML = objDOM
}
var navi = function(name, id) {
    titles_data.forEach(function(item) {
      if (item.name === name) {
        var html = ''
        var img_src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAZlBMVEUAAAC/v7++vr6/v7/Dw8PCwsLAwMC+vr6+vr6+vr6/v7++vr6/v7+/v7+/v7++vr6/v7+/v7/BwcG/v7+/v7+/v7+/v7++vr6/v7+/v7/AwMC/v7++vr6/v7/Gxsa+vr6/v7+/v79ZmMjRAAAAIXRSTlMA7f1QJiphWp1K+5akV+hTaKsgESfO3cO1bzOOQz4K94F3YTXoAAACAklEQVR42u3c7W7aQBBG4QFaGwJ1QlwbA+Vj7v8m66oKSpRdiZ/vjM5zB0ezWq+QBgMAAICk1XE9bdurBXca/L9tb5Ft/aH7Y3Ht/LOVRXXxL142FtTk7hlm0i/dU8xk456jpPFZhtPVuueYycU9yUwWnmQmZ09S0nee5HSdlllm8kqJHEr0UKKHEj2U6KFET5u/JNyrvlaypORZlFASCCV6KNFDiR5K9FCihxI9lOhpPUtJQ4kcSvRQoocSPdWSXxZM4xWUPIsSSgKhRA8leijRQ4meN0rkUKInf8ntZMHUSrpwe7+1ksmiqZXEW2CulAwWzjHLSOzuJWeLZ/SC0eJpvOTdwrnevOBi8RxSvFNmey84WjyTFzQWz+AF4VYczHovCfcCrn3bwz2ArV94wcHCOXiOS2vvOT7slY61BVPpeIk2kL2X3S2Wfx0Zrqx9kh9Rah2LnxZKlo4dHVLo0EKHFjq00KGFDi10aKFDCx1a1nRIoUMLHVro0FLt+GGh0KGFDi10aKFDCx1atnRIoUMLHVro0EKHFjq00KGFDi10aMnScaZDyr3W8dtCaZN0WJfjXNkqyTxs5yVduA4bih3RFr1mY455mA055mG2TtJhr986ot27H8YU85hdcsxjtrn5wxjxvnp4PzwWnq8W29vgsyngvxZ9cz2FPlQAAAB4zl8PBfm3CW4TVgAAAABJRU5ErkJggg==`;
        item.children.forEach(function(itemChild) {
          html += `
                  <div class="_submenus">
                    <a href=${itemChild.href}>${itemChild.name}</a>
                    <a href=${itemChild.href}>
                    <img src="${img_src}" style="width: 20px; height: 20px"/>
                    </a>
                  </div>
                `
        })
        document.getElementById(id).innerHTML = html
      }
    })
  }
  // 移动端页面不要导航操作
if (window.location.href.indexOf('Chapter') === -1) { // 非章节页面即第一页时执行如下逻辑
  document.body.innerHTML = "<div class='mobile_adapter' id='mobile_adapter'></div>"
    // document.body.style.visibility = 'visible'
  var param = decodeURI(window.location.search)
  if (param) {
    param = param.substr(6)
    navi(param, 'mobile_adapter')
  } else {
    renderMenus('mobile_adapter')
  }
} else {
  document.getElementsByClassName('book-header')[0].style.display = 'none'
  document.getElementsByClassName('fa-angle-left')[0].style.display = 'none'
  document.getElementsByClassName('fa-align-justify')[0].style.display = 'none'
  document.getElementsByClassName('fa-angle-right')[0].style.display = 'none'
  if (document.getElementsByClassName('fa-align-justify')[0]) {}
}