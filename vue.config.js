// vue.config.js
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    //路径配置
    config.resolve.alias
        .set('assets', resolve('src/assets'))
        .set('styles', resolve('src/assets/styles'))
        .set('@$',resolve('src'))
  },

  devServer: {
    proxy: {
      '/wjd': { //后台接口
        target: 'http://192.168.1.100:8080/',
        ws: true,
        changeOrigin: true
      },
      '/image':{ //图片服务器地址
        target: 'http://192.168.1.100:8090/',
        ws:true,
        changeOrigin: true,
        pathRewrite: {
          '^/image':''
        }
      }
    }
  }
};

