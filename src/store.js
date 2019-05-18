import Vue from 'vue'
import Vuex from 'vuex'
import merchantForm from './modules/merchantReg'

Vue.use(Vuex);




export default new Vuex.Store({
  modules:{
    merchantForm
  }
})
