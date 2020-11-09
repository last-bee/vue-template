const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')
console.log('-----serverConfig-----')
const serverConfig = require('../../webpack.server.js')
console.log('-----serverCompiler-----')

const serverCompiler = webpack(serverConfig)

console.log('serverCompiler')
const mfs = new MemoryFS()
const serverRender = require('./server.render')
console.log('serverRender')

serverCompiler.outputFileSystem = mfs

let bundle;
console.log('---serverCompiler---')

serverCompiler.watch({}, (err, status) => {
  if(err) throw('err')
  status = status.toJson()
  console.log('status')

  status.errors.forEach(err=> console.log(err))
  status.hasWarnings.forEach(warn=> console.log(warn))
  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')


  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('bundle')


})

const handleSSr = async (ctx) => {
  if(!bundle) {
    ctx.body = '请稍后'
    return
  }
  console.log('---clientManifestResp---')
  const clientManifestResp = await axios.get('http://127.0.0.1:8080/vue-ssr-client-mainfest.json')

  const clientManifest = clientManifestResp.data
  console.log('---clientManifest---')

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })
  await serverRender(ctx, renderer, template)
}
console.log('---router---')

const router = new Router()
router.get('*', handleSSr)

module.exports = router