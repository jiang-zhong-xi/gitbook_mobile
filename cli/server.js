var http = require('http');
var url = require('url');
var send = require('send');
var readerOriginFile = require('../lib/readOriginFile')
var createVNode = require('../lib/createVNode/index.js')

function Server() {
    this.running = null;
    this.dir = null;
    this.port = 0;
    this.sockets = [];
}
Server.prototype.isRunning = function() {
    return !!this.running;
};
// dir,port 监听目录,端口
Server.prototype.start = function(_dir, port) {
  var that = this;
  port = port || 8005;
  var dir = process.cwd();
  console.log('服务已经启动，端口'+port);
  
  async function create() {
     var summary = await readerOriginFile('/test/SUMMARY.md')
     var vnode = await createVNode(summary)
     return vnode
  }
  create().then(res => {
    console.log(res)
  })
  // fs.copyFolder(path.join(dir+'/_book'), path.join(dir+'/_mobile'))
  // .then(res => {
  //   fs.read(path.join(dir+'/_book/index.html'))
  //   .then(content => {
  //     var html = htmlTemplate(content);
  //     fs.write(path.join(dir+'/_mobile/index.html'), html)
  //     .then(res => {
        
  //       fs.write(path.join(dir+'/_mobile/index.css'), style());
        
  //       fs.read(path.join(dir+'/_mobile/styles/website.css'))
  //       .then(content => {
  //         content += `
  //           .book-header, .fa-angle-left, .fa-align-justify, .fa-angle-right, .fa-align-justify {
  //             display: none;
  //           }
  //         `;
  //         fs.write(path.join(dir+'/_mobile/styles/website.css'), content);
  //       })
  //     })
  //   })
  // })
  
  that.running = http.createServer(function(req, res){
    function error(err) {
      res.statusCode = err.status || 500;
      res.end(err.message);
    }
    // Redirect to directory's index.html
    function redirect() {
      var resultURL = urlTransform(req.url, function(parsed) {
          parsed.pathname += '/';
          return parsed;
      });
      res.statusCode = 301;
      res.setHeader('Location', resultURL);
      res.end('Redirecting to ' + resultURL);
    }
    res.setHeader('X-Current-Location', req.url);
    
    // Send file
    send(req, url.parse(req.url).pathname, {
        root: _dir
    })
    .on('error', error)
    .on('directory', redirect)
    .pipe(res);
  });
  that.running.listen(port, function(err) {
      if (err) return d.reject(err);
      that.port = port;
      that.dir = dir;
  });
};
function urlTransform(uri, fn) {
    return url.format(fn(url.parse(uri)));
}

module.exports = Server;
