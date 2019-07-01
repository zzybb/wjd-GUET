import Vue from 'vue'
import Vuex from 'vuex'
import merchantForm from './modules/merchantReg'
import Order from './modules/Order'
import clientSystem from './modules/client-system'

Vue.use(Vuex);




export default new Vuex.Store({
  modules:{
    merchantForm,
    Order,
    clientSystem
  }
})
