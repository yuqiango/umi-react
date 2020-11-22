
const chalk = require('chalk')
const _ = require('lodash')
// const utl = require('./utl/utl')
const path = require('path')
const fs = require('fs')
const request = require('request')
const wget = require('wget')
 
const FONT_FILE_TYPE_EOT = 'eot'
const FONT_FILE_TYPE_WOFF = 'woff'
const FONT_FILE_TYPE_WOFF2 = 'woff2'
const FONT_FILE_TYPE_TTF = 'ttf'
const FONT_FILE_TYPE_SVG = 'svg'
 
const icon = [{  // 自动维护图标
  aliUrl: '//at.alicdn.com/t/font_1877713_oyk9q7n9kr9.css', // 暂时只支持使用阿里巴巴图标库
  dir: './src/assets/fonts'  // 公共图标
}]
 
 
const postUrl = (_url,fn) => {
  request(_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      fn(body)
    }else {
      throw new Error("gen Icon error")
    }
  })
}
 
const downIcon = (iconUrl,dir)=> {
  postUrl('https:'+iconUrl,(chunk)=>{
    let form = 0
    let to = form
    let urlList = []
    let count = 0
    while (form !== -1 && to !== -1){
      count++
      if(count > 3000) throw new Error("gen icon failed")
      form = to + 1
      form = chunk.indexOf("url(",form)
      to = chunk.indexOf(")",form+1)
      if(form !== -1 && to !== -1){
        urlList.push(chunk.substr(form+5,to - form-6))
      }
    }
    urlList = _.uniq( urlList.map(_url => _url.split("#")[0]) )
    count = urlList.length
    urlList.forEach(_url => {
      let __url = _url.split("?")[0]
      let {ext} = path.parse(__url)
      let fileName = "iconfont"+ext
      let filePath = path.join(dir,fileName)
      fs.existsSync(filePath) && fs.unlinkSync(filePath)
      if(__url[0] !== '/') return
      let download = wget.download("https:"+__url, filePath, {})
      chunk.split(_url).join("")
      download.on('error', function(err) {
        throw err
      })
    })
    urlList.forEach(_url => {
      let strs = _url.split('?')[0].split('.')
      let type = strs[strs.length - 1]
      if(_url[0] !== '/') return
      chunk = chunk.replace(_url, './iconfont.' + type)
      chunk = chunk.replace(_url, './iconfont.' + type)
    })

    // chunk = chunk.replace('./iconfont', "./assets/fonts/iconfont");    //去掉空格
    chunk = chunk.replace(/\.\/iconfont/g, "./assets/fonts/iconfont");    //去掉空格
    console.log(chunk)
    fs.writeFileSync(path.join('./src', 'fonts.css'),chunk)
  })
}


// 删除文件方法
const delDir = (path)=>{
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      fs.rmdirSync(path);
  }
}

// 删除文件夹
delDir(path.resolve(icon[0].dir));

// 重新创建文件夹 
fs.mkdir('./src/assets/fonts/',function(error){
  if(error){
      console.log(error);
      return false;
  }
  console.log('创建目录成功');
    // 循环获取文件
  for(let item of icon){
 
    downIcon(item.aliUrl,path.resolve(item.dir));

  }
})




// fs.readFile(path.join('./src', 'iconfont.css'), 'utf8', function (err, data) {
//   if (err) throw err;
//   // let list = JSON.parse(data)
//   // let list2 = JSON.stringify(data)
//   console.log(data)
// })



