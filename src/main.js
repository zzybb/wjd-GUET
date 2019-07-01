import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/index.js'
import apiConfig from './api/configs.js'
import './plugins/element.js'
import {Message} from "element-ui";
import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false;
Vue.use(BaiduMap,{
  ak:'cErYPqrDK2whh5YBm1bHMpGRV3Up03pN'
});

Vue.prototype.$api = api;
Vue.prototype.$myconfig = apiConfig;
Vue.prototype.$message = Message;
Vue.filter('spliceString', function (value) {
  const numSub = 11;
  if(value == null){
    return "";
  }
  if(value.length > numSub){
    return value.substring(0, numSub - 1) + "...";
  }
  return value;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
