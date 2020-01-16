var exactedData = require('./exactData.js')

module.exports = function(content) {
  var data = exactedData(content)
  return data
}