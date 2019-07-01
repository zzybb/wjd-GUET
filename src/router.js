import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import RegAndLog from '@/views/RegAndLog.vue'
import UserRegister from '@/components/Register.vue'
import UserLogin from "@/components/Login.vue"
import HotelRegister from "@/views/HotelRegister.vue"
import createUnitHouse from "@/views/createunitHouse.vue"
import ListDetail from '@/views/ListDetail.vue'
import calendar from '@/components/Calendar.vue'
import SearchHouseLay1 from '@/views/SearchHouseLay1.vue'
import MerchantSystem from "@/views/MerchantSystem.vue"
import UpdateHotel from '@/components/merchant-system/UpdateHotel.vue'
import bookingSystem from '@/views/OrderInfo.vue'
import orderBody from '@/components/OrderCompon/order-body.vue'
import orderSlide from '@/components/OrderCompon/order-base.vue'
import orderPay from '@/components/OrderCompon/orderPay.vue'
import orderSuccess from '@/components/OrderCompon/orderSuccess.vue'
import ClientSystem from '@/views/ClientSystem.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'*',
      component:(resolve) => require(['./views/error404.vue'], resolve)
    },
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
          name:'registerPage',

          component:UserRegister
        },

        {
          path:'loginPage',
          name:'loginPage',
          meta:{
            isLogin: true
          },
          component:UserLogin
        }
      ]
    },

    { //发布房源起始页
      path:'/merchant-web/store',
      name:'merchant-register',
      component:HotelRegister
    },

    { //开始发布房源具体信息
      path:'/createunitHouse',
      name:'createunitHouse',
      meta:{
        requireAuth: true

      },
      component:createUnitHouse
    },

    { //点击搜索后跳转的房屋列表
      path:'/unitList',
      name:'unitList',
      component:SearchHouseLay1


    },

    { //酒店详情
      path:'/detail/:hotelId',
      name:'HotelDetail',
      component:ListDetail
    },

    { //商户系统
      path:'/storemanagement',
      name:'manageSystem',
      meta:{
        requireAuth: true

      },
      component:MerchantSystem,
      children: [
        {
          path:'detail/:hotelId',
          name:'UpdateHotel',
          components:{
            UpdateHotel
          }
        }
      ]
    },
    { //用户系统
      path:'/clientSystem',
      name:'clientSystem',
      meta:{
        requireAuth: true
      },
      component:ClientSystem

    },

    { //订单预定界面
      path:'/booking',
      name:'bookingSystem',
      meta:{
        requireAuth: true
      },
      component:bookingSystem,
      children: [
        {
          path:'orderInfo',
          name:'orderInfo',
          components: {
            orderBody,
            orderSlide
          }
        },
        {
          path:'orderPay',
          name:'orderPay',
          components:{
            orderPay
          }
        },
        {
          path:'orderSuccess',
          name:'orderSuccess',
          components:{
            orderSuccess
          }
        }
      ]
    },

    { //测试用路由（不要管这个）
      path:'/test',
      component:calendar
    },


  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem("token")) {
      next();
    }
    else {
      next({
        path: '/userLogin/loginPage',
      })
    }
  }else if(to.meta.isLogin){
    if (localStorage.getItem("token")){
      next({
        name:'home'
      })
    }else{
      next();
    }
  }
  else {
    next();
  }
});

export default router
