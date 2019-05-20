import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/index.js'
import apiConfig from './api/configs.js'
import './plugins/element.js'
import {Message} from "element-ui";

Vue.config.productionTip = false

Vue.prototype.$api = api;
Vue.prototype.$myconfig = apiConfig;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
