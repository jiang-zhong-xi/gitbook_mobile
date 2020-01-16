const fs = require('fs');
var path = require('path');
var dir = process.cwd();

function read(relativePath) {
  var fullPath = path.join(dir + relativePath)
  return new Promise((resolve, reject) => {
    fs.readFile(fullPath, function (err, data) {
      if (err) {
        reject(relativePath, '读取失败');
        return console.error(err);
      }
      resolve(data.toString())
    });
  });
}
function write(relativePath, content) {
  var fullPath = path.join(dir + relativePath)
  return new Promise((resolve, reject) => {
    fs.writeFile(fullPath, content, (err) => {
      if (err) {
        reject(relativePath, '写入失败');
        throw err;
      }
      resolve(relativePath);
    })
  })
}
// 复制文件
async function copy(relativeSource, relativeDest) {
  // 如果目录不存在则新建
  function exist(path) {
    return new Promise((resolve, reject) => {
      fs.access(path, fs.constants.F_OK, (err) => {
        if(err){
          fs.mkdirSync(path);
        }
        resolve(path);
      });
    })
  }
  // 判断文件为文件还是文件夹
  function getFileStat(currentSourcePath, allPath) {
    return new Promise((resolve, reject) => {
      fs.stat(currentSourcePath, function(err,stats){  //stats  该对象 包含文件属性
        if(err){
          throw err
        }
        if (stats.isFile()) {
          allPath.push({path: currentSourcePath, folder: false})
          resolve({path: currentSourcePath, folder: false})
        } 
        if (stats.isDirectory()){
          allPath.push({path: currentSourcePath, folder: true})
          readAllFiles(currentSourcePath, allPath)
          .then(res => {
            allPath.concat(res)
            resolve(currentSourcePath)
          })
        }
      })
    })
  }
  // 读取所有文件,并存储路径
  function readAllFiles(source, allPath) {
    let paths = fs.readdirSync(source); //同步读取当前目录
    return Promise.all(paths.map(p => {
      return getFileStat(path.join(source + '/' + p), allPath)
    }))
  }
  // 把所有文件写到对应目录
  async function writeAllFiles(paths, relativeSource, relativeDest) {
    for (let { path, folder } of paths) {
      let dest = path.replace(relativeSource, relativeDest)
      if(folder){ // 是目录并且该目录不存在就去创建该目录
        await exist(dest)
        // console.log(path)
      } else { // 如果是个文件则拷贝
        await new Promise((resolve, reject) => {
          console.log(path)
          let readable = fs.createReadStream(path) //创建读取流
          let writable = fs.createWriteStream(dest) //创建写入流
          readable.pipe(writable)
          resolve()
        })
      }
    }
  }
  var source = path.join(dir + relativeSource)
  var paths = [{path: source, folder: true}]
  await readAllFiles(source, paths)
  await writeAllFiles(paths, relativeSource.replace('/', '\\'), relativeDest.replace('/', '\\'))
}
module.exports = {
  read: read,
  write: write,
  copy: copy
}
