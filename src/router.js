import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import RegAndLog from '@/views/RegAndLog.vue'
import UserRegister from '@/components/Register.vue'
import UserLogin from "@/components/Login.vue"
import HotelRegister from "@/views/HotelRegister.vue"


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { //首页
      path: '/',
      name: 'home',
      component: Home
    },

    { //用户注册与登录界面
      path: '/userLogin',
      name: 'userLogin',

      component: RegAndLog,

      children:[
        {
          path:'registerPage',
          component:UserRegister
        },

        {
          path:'loginPage',
          component:UserLogin
        }
      ]
    },

    { //发布房源起始页
      path:'/merchant-web/store',
      name:'merchant-register',
      component:HotelRegister
    }


  ]
})
