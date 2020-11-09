const Koa = require('koa')
console.log('start ...')
const app = new Koa()
const pageRouter = require('./routers/dev.ssr')

console.log(pageRouter)
app.use(async (ctx, next) => {
  try {
    console.log('request width path' + ctx.path)
    await next()
  } catch (err) {
    console.log(err)
    ctx.body = err.message
  }
})


// app.use(pageRouter.routes()).use(pageRouter.allowedMethods())


const HOST = process.env.HOST || '0.0.0.0'

const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log('server is listening on' + PORT + ':' + HOST)
})