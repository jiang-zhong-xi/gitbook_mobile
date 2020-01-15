(function getData() {
  var titles_dom = document.querySelectorAll(".summary > .chapter > .articles > .chapter") // 获取所有相关节点
  var titles_data = []
  titles_dom.forEach(function(item) {
    var title_obj = {}; // 标题数据对象
    title_obj.name = item.querySelector('a').innerHTML.trim();
    if (title_obj.name.split('')[1] === '.' || title_obj.name.split('')[1] === '、') {
      title_obj.name = title_obj.name.substr(2);
    }
    title_obj.href = item.querySelector('a').href;
    title_obj.children = []
    item.querySelectorAll('.articles > .chapter > a').forEach(function(item, index) { // 章节节点
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
  console.log(JSON.stringify(titles_data))
})()