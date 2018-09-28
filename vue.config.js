// https://www.npmjs.com/package/webpack-auto-inject-version
var WebpackAutoInject = require('webpack-auto-inject-version');


// vue.config.js
module.exports = {
    configureWebpack: {
      plugins: [
        new WebpackAutoInject({
            components: {
                AutoIncreaseVersion: true,
                InjectAsComment: true,
                InjectByTag: false
            }
        })
      ]
    }
  }