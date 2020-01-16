var fs = require('../../utils/fs.js');
var style = require('../../utils/style.js')
module.exports = function() {
  var dir = process.cwd();
  fs.read('/_mobile/styles/website.css')
  .then(content => {
    content += `
      .book-header, .fa-angle-left, .fa-align-justify, .fa-angle-right, .fa-align-justify {
        display: none;
      }
    `;
    fs.write('/_mobile/styles/website.css', content)
  })
  fs.write('/_mobile/index.css', style())
}