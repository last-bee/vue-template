const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text-html'
  const context = {
    url: ctx.path
  }

  try {
    const appString = renderer.renderToString(context)
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      script: context.renderScripts()
    })
    ctx.body = html
  } catch(err) {
    console.log(' render err ',err)
  }
}