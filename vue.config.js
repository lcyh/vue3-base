const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.join(__dirname, 'src'))
    config.plugin('html').tap((args) => {
      args[0].templateParameters = {
        title: '埋点管理系统',
        favicon: '/favicon.ico'
      }
      return args
    })
  },
  configureWebpack () {
    return {
      plugins: [
        AutoImport({
          resolvers: [ElementPlusResolver()]
        }),
        Components({
          resolvers: [ElementPlusResolver()]
        })
      ]
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/_mixin.scss";
          @import "@/assets/styles/_variable.scss";
        `
      }
    }
  },
  devServer: {
    port: 8090,
    hot: true,
    compress: true,
    disableHostCheck: true,
    allowedHosts: ['.biligame.com'],
    proxy: {
      '/api': {
        target: 'http://bapi.bilibili.co/mock/5071',
        changeOrigin: true,
        pathRewrite: { '/api': '' }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
