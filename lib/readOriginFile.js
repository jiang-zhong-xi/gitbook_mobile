var fs = require('../utils/fs.js');
var path = require('path');

module.exports = function(directory) {
  var dir = process.cwd();
  return fs.read(path.join(dir+directory))
}