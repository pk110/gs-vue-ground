import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      // +++++++++++++++++++++ 首页
      path: '/',
      redirect: '/manager/index'
    },
    {
      // +++++++++++++++++++++ 登录
      path: '/manager/login',
      name:'siderBar',
      component:  resolve => require(['@/pages/siderBar'], resolve),
      children:[{
        // +++++++++++++++++++++ 首页
        path: '/manager/index',
        name:'index',
        component:  resolve => require(['@/pages/index'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/orders',
        name:'orders',
        component:  resolve => require(['@/pages/orders'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/map',
        name:'map',
        component:  resolve => require(['@/pages/map'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/BannerSet',
        name:'BannerSet',
        component:  resolve => require(['@/pages/BannerSet'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/hot',
        name:'hot',
        component:  resolve => require(['@/pages/hot'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/hotDetail',
        name:'hotDetail',
        component:  resolve => require(['@/pages/hotDetail'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/brandsList',
        name:'brandsList',
        component:  resolve => require(['@/pages/brandsList'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/brandsDishes',
        name:'brandsDishes',
        component:  resolve => require(['@/pages/brandsDishes'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/brandsDishesDetail',
        name:'brandsDishesDetail',
        component:  resolve => require(['@/pages/brandsDishesDetail'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/brandsStore',
        name:'brandsStore',
        component:  resolve => require(['@/pages/brandsStore'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/tags',
        name:'tags',
        component:  resolve => require(['@/pages/tags'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/comment',
        name:'comment',
        component:  resolve => require(['@/pages/comment'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/dishesManager',
        name:'dishesManager',
        component:  resolve => require(['@/pages/dishesManager'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/foodesManager',
        name:'foodesManager',
        component:  resolve => require(['@/pages/foodesManager'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/foodesManagerDetail',
        name:'foodesManagerDetail',
        component:  resolve => require(['@/pages/foodesManagerDetail'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/money',
        name:'money',
        component:  resolve => require(['@/pages/money'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/flux',
        name:'flux',
        component:  resolve => require(['@/pages/flux'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/pageList',
        name:'pageList',
        component:  resolve => require(['@/pages/pageList'], resolve)
      },{
        // +++++++++++++++++++++ 首页
        path: '/manager/storeFace',
        name:'storeFace',
        component:  resolve => require(['@/pages/storeFace'], resolve)
      }]
    },{
      // +++++++++++++++++++++ 错误
      path: '/manager/error',
      name:'error',
      component:  resolve => require(['@/pages/error'], resolve)
    }
  ]
})
