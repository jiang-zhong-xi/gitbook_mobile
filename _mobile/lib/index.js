/**
 * 1、能根据标签自动获取标题和章节
 * 2、能够识别到移动端后进行页面调整
 * 使用方法：_book/index.html中删去 name为HandheldFriendly、viewport的meta，_book/gitbook中添加如下代码
 *  var script = document.createElement("script");
 *  script.src = 'http://test.mall.redhoma.cn/aiqinmy/lib/index.js'
 *  document.body.appendChild(script);
 * 
 * 另：为避免移动端有闪过PC页面在 /index.html中添加
 * <style>
    body {
      visibility: hidden
    }
  </style>
 */
var titles_dom = document.querySelectorAll(".summary > .chapter > .articles > .chapter") // 获取所有相关节点
var titles_data = [] // 所有数据
titles_dom.forEach(function(item) {
  var title_obj = {}; // 标题数据对象
  title_obj.name = item.querySelector('a').innerHTML.trim();
  if (title_obj.name.split('')[1] === '.' || title_obj.name.split('')[1] === '、') {
    title_obj.name = title_obj.name.substr(2);
  }
  title_obj.href = item.querySelector('a').href;
  title_obj.children = []
  item.querySelectorAll('.articles > .chapter > a').forEach(function(item, index){ // 章节节点
    if (index) {
      var adapter_obj = {};
      adapter_obj.name = item.innerHTML.trim();
      if (adapter_obj.name.split('')[1] === '.' || adapter_obj.name.split('')[1] === '、') {
        adapter_obj.name = adapter_obj.name.substr(2);
      }
      adapter_obj.href = item.href;
      title_obj.children.push(adapter_obj);
    }
  })
  titles_data.push(title_obj)
})
// titles_data = JSON.parse(`[{"name":"一、订单问题","href":"http://localhost:4000/Organization/Chapter1.html","children":[{"name":"1.下单时发现库存不足怎么办？","href":"http://localhost:4000/Organization/Chapter1.html#3_1"},{"name":"2.为什么结算购物车时已经发送并结算但是没有生成订单？","href":"http://localhost:4000/Organization/Chapter1.html#3_2"},{"name":"3.订单提交并通过审核后，临时需要修改收货地址怎么办？","href":"http://localhost:4000/Organization/Chapter1.html#3_3"},{"name":"4.下完单突然不想要了怎么办？","href":"http://localhost:4000/Organization/Chapter1.html#3_4"}]},{"name":"二、售后问题","href":"http://localhost:4000/Organization/Chapter2.html","children":[{"name":"2019年售后流程","href":"http://localhost:4000/Organization/Chapter2.html#1_1"}]},{"name":"三、物流问题","href":"http://localhost:4000/Organization/Chapter3.html","children":[{"name":"1.如何查询物流情况？","href":"http://localhost:4000/Organization/Chapter3.html#1_1"},{"name":"2.可以自己选择物流公司么？","href":"http://localhost:4000/Organization/Chapter3.html#1_2"},{"name":"3.能否保证原箱发货？","href":"http://localhost:4000/Organization/Chapter3.html#1_3"},{"name":"4.大件能不能协商运费？","href":"http://localhost:4000/Organization/Chapter3.html#1_4"},{"name":"5.为什么收到的快递是到付件？","href":"http://localhost:4000/Organization/Chapter3.html#1_5"}]}]`)

var renderMenus = function(id) {
  var objDOM = ''
  titles_data.forEach(function(item) {
    var child_obj = '';
    var url_data = ''
    item.children.forEach(function(itemChild, index){
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
    let root_url = window.location.href
    var obj = `
      <div class="item">
        <div class="menu">
          <a href='`+root_url+`?mode=`+encodeURI(item.name)+`'>${item.name}</a>
        </div>
        <div class="submenus">
        `+child_obj+`
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
                      <img src="${img_src}"/>
                    </a>
                  </div>
                `
      })
      document.getElementById(id).innerHTML = html
    }
  })
}
try {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    // 移动端页面不要导航操作
    if (window.location.href.indexOf('Chapter') === -1) { // 非章节页面即第一页时执行如下逻辑
      document.body.innerHTML = "<div class='mobile_adapter' id='mobile_adapter'></div>"
      document.body.style.visibility = 'visible'
      var link = document.createElement("link");
      link.href = 'http://mall.redhoma.cn/question/lib/index.css';
      link.rel = 'stylesheet';
      document.body.appendChild(link);
        var param = decodeURI(window.location.search)
        if(param) {
          param = param.substr(6)
          navi(param, 'mobile_adapter')
        } else {
          renderMenus('mobile_adapter')
        }
    } else {
      var roll = window.setInterval(function(){
        if (document.getElementsByClassName('fa-align-justify')[0]) {
          document.getElementsByClassName('fa-angle-left')[0].style.visibility = 'hidden'
          document.getElementsByClassName('fa-align-justify')[0].style.visibility = 'hidden'
          document.getElementsByClassName('fa-angle-right')[0].style.visibility = 'hidden'
          console.log('no problem')
          window.clearInterval(roll)
        }
      }, 1)
    }
  } else {
    document.body.style.visibility = 'visible'
  }
} catch (e) {
  console.log(e)
}
