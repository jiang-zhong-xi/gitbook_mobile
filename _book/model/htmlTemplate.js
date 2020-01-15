const create = require('../utils/index.js');
const accessData = require('../lib/accessData.js');

  
function integrate(html) {
  var titles_data = accessData(html);
  console.log("titles_data", titles_data);
  return `
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
          
          <body>
          
            <script type="text/javascript">
              (${create})(${JSON.stringify(titles_data)})
            </script>
          </body>
          
          </html>
        `
}
module.exports = integrate;