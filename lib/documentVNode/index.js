var fs = require('../../utils/fs.js');

module.exports = function (VNode) {
  // 把VNode分到多个html中,第一个html两级标题
  create(VNode)
}
var htmlTemplate = `
    <html>
          <head>
            <meta charset="UTF-8">
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
            <title>常见问题 · 小红马</title>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="description" content="">
            <meta name="generator" content="GitBook 3.2.3">
            <link rel="stylesheet" href="./index.css">
          </head>
          
          <body></body>
          
          </html>
`
function create(obj, init) {
  if (obj.children) {
    if (obj.level == -1) {
      var html = ``
      for (let i = 0; i < obj.children.length; i++) {
        create(obj.children[i])
        html += `<div class='item'>
                    <div class='menu'>
                      <a href="${getUrl(obj.children[i])}" class="item">
                      ${obj.children[i].name}
                      </a>
                    </div>`
          var item = obj.children[i]
          if (item && item.children) {
            html += `<div class='submenus'>`
            for (let j = 0; j < item.children.length; j++) {
              html += `<div class="subitem">
                          <a href="${getUrl(item.children[i])}">
                            ${item.children[j].name}
                          </a>
                        </div>`
            }
            html += '</div>'
          }
        html += '</div>'
      }
      var directory = '/_mobile/index.html'
    } else {
      var html =''
      for (let i = 0; i < obj.children.length; i++) {
        html += "<div class='_submenus'>"
        if(obj.children[i].children){
          html += `<a href="${getUrl(obj.children[i])}">` + obj.children[i].name + '</a>'
        } else {
          html += `<a href="${getUrl(obj.children[i])}">` + obj.children[i].name + '</a>'
        }
        html += "</div>"
        create(obj.children[i])
      }
      var directory = '/_mobile/' + obj.name + '.html'
    }
    var rule = new RegExp('(<body>)(</body>)')
    html = htmlTemplate.replace(rule, '$1'+html+'$2')
    fs.write(directory, html)
  }
}
function getUrl(obj) {
  if(obj.children){
    return obj.name + '.html'
  } else {
    return obj.href.replace('md', 'html')
  }
}