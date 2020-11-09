const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const path = require('path')

const serverConfig = require('../../webpack.server.js')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()


serverCompiler.outputFileSystem = mfs

let bundle;
serverCompiler.watch({}, (err, status) => {
  if(err) throw(err)
  status = status.toJson()
  status.errors.forEach(err=> console.log(err))
  status.hasWarnings.forEach(warn=> console.log(warn))
  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')


  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))


})

const handleSSr = async (ctx) => {
  if(!bundle) {
    ctx.body = '请稍后'
    return
  }

  


}