const fs = require('fs');
function read(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function (err, data) {
      if (err) {
        reject(path, '读取失败');
        return console.error(err);
      }
      resolve(data.toString())
    });
  });
}
function write(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        reject(path, '写入失败');
        throw err;
      }
      resolve(path);
    })
  })
}
function checkIsExist(source, dest) {
  return new Promise((resolve, reject) => {
    fs.access(dest, fs.constants.F_OK, (err) => {
      if(err){
        fs.mkdirSync(dest);
      }
      resolve({source, dest});
    });
  })
}
// 复制文件 如果当前是目录而不是文件,那么再去检查
function copy(source, dest) {
  let paths = fs.readdirSync(source); //同步读取当前目录
  var promises = [];
  paths.forEach(function(path){
    var _source=source+'/'+path;
    var _dest=dest+'/'+path;
    var promise = new Promise((resolve, reject) => {
      fs.stat(_source,function(err,stats){  //stats  该对象 包含文件属性
        if(err){
          reject(_source,'属性信息读取异常');
          throw err
        }
        if(stats.isFile()){ //如果是个文件则拷贝 
          let  readable=fs.createReadStream(_source);//创建读取流
          let  writable=fs.createWriteStream(_dest);//创建写入流
          readable.pipe(writable);
          resolve(_dest);
        }else if(stats.isDirectory()){ //是目录则 递归 
          checkIsExist(_source, _dest)
          .then(({source, dest}) => {
            copy(source, dest)
            .then(res => {
              resolve(res);
            })
          })
        }
      });
    })
    promises.push(promise);
  });
  return Promise.all(promises)
}
// 复制文件,分两步:1 检查文件夹是否存在 2 复制文件
async function copyFolder(source, dest) {
  await checkIsExist(source, dest);
  return await copy(source, dest);
}
module.exports = {
  read: read,
  write: write,
  copyFolder: copyFolder
}
