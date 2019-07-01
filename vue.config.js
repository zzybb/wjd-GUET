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
        target: 'http://10.12.0.180:8080/',
        ws: true,
        changeOrigin: true
      },
    }
  }
};

