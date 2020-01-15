function getData(HTML) {
  console.log(HTML)
  var titles_data = [];
  var rule = new RegExp(`<li class="chapter " data-level="\\d\\.\\d.\\d" data-path=".*?/Chapter\\d.html">[\\s\\S]*?<a href=".*?/Chapter\\d.html">([\\s\\S]*?)</a>[\\s\\S]*?(?=(<li class="chapter " data-level="\\d\\.\\d.\\d" data-path=".*?/Chapter\\d.html">|<li class="divider"></li>))`,'g');
  do {
    result = rule.exec(HTML);
    if (result && result[0]){
      var obj = {};
      obj.name = result[1].trim();
      obj.children =[];
      var rule2 = new RegExp(`<li class="chapter " data-level="\\d.\\d.\\d.\\d" data-path=".*?/Chapter\\d.html">[\\s\\S]*?<a href="(.*?/Chapter\\d.html#\\d_\\d)">([\\s\\S]*?)</a>`,'g');
      do {
        result2 = rule2.exec(result[0]);
        if (result2 && result2[1]) {
          var childrenObj = {
            name: result2[2].trim(),
            href: result2[1].trim()
          };
          obj.children.push(childrenObj);
        }
      }while(result2 !== null)
      titles_data.push(obj);
    }
  }while(result != null)
  console.log(titles_data)
  return titles_data
}
module.exports = getData
