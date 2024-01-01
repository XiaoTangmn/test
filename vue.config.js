const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //开启代理服务器(方式一)
  // devServer: {
  //   //请求服务器的地址
  //      proxy: 'https://editor.588ku.com'
  //     }
})
