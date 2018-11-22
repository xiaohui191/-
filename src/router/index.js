import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login/login'

// 内容管理页面
import content_list from '@/views/content/content_list'
import content_istration from '@/views/content/content_istration'
import content_istration_modify from '@/views/content/content_istration_modify'

// 报价管理页面
import offerIstration_country from '@/views/offer_istration/offerIstration_country'

//会员管理
import member_list from '@/views/member/member_list'
import member_information from '@/views/member/member_information'

//财务管理
import finance_remittance from '@/views/finance/finance_remittance'
import finance_recharge from '@/views/finance/finance_recharge'
import finance_account_detail from '@/views/finance/finance_account_detail'
import finance_account_detail_person from '@/views/finance/finance_account_detail_person'
import pay_record from '@/views/finance/pay_record'
import integral_details from '@/views/finance/integral_details'

//库存管理
import stock_storage from '@/views/stock/stock_storage'
import stock_list from '@/views/stock/stock_list'

//订单管理
import order_list from '@/views/order/order_list'
import order_print from '@/views/order/order_print'


// 系统管理
import system_integral from '@/views/system/system_integral'
import system_list from '@/views/system/system_list'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta:{
        title:'欢迎快递管理后台'
      }
    },
    {
      path: '/content_istration',
      name: 'content_istration',
      component: content_istration,
      meta:{
        title:'内容管理列表'
      }
    },
    {
      path: '/content_istration_modify',
      name: 'content_istration_modify',
      component: content_istration_modify,
      meta:{
        title:'内容管理列表'
      }
    },
    {
      path: '/content_list',
      name: 'content_list',
      component: content_list,
      meta:{
        title:'内容管理列表'
      }
    },
    {
      path:'/member_list',
      name: 'member_list',
      component: member_list,
      meta:{
        title:'会员管理列表'
      },
    },
    {
      path:'/member_list/member_information',
      name: 'member_information',
      component: member_information,
      meta:{
        title:'会员编辑'
      }
    },
    {
      path:'/finance_remittance',
      name: 'finance_remittance',
      component: finance_remittance,
      meta:{
        title:'汇款确认'
      }
    },{
      path:'/finance_recharge',
      name: 'finance_recharge',
      component: finance_recharge,
      meta:{
        title:'账户充值'
      }
    },
    {
      path:'/finance_account_detail',
      name: 'finance_account_detail',
      component: finance_account_detail,
      meta:{
        title:'账户充值'
      }
    },{
      path:'/finance_account_detail/finance_account_detail_person',
      name: 'finance_account_detail_person',
      component: finance_account_detail_person,
      meta:{
        title:'账户充值'
      }
    },{
      path:'/pay_record',
      name: 'pay_record',
      component: pay_record,
      meta:{
        title:'付款记录'
      }
    },{
      path:'/integral_details',
      name: 'integral_details',
      component: integral_details,
      meta:{
        title:'积分明细'
      }
    },{
      path:'/stock_storage',
      name: 'stock_storage',
      component: stock_storage,
      meta:{
        title:'快递入库'
      }
    },{
      path:'/stock_list',
      name: 'stock_list',
      component: stock_list,
      meta:{
        title:'入库列表'
      }
    },{
      path:'/order_list',
      name: 'order_list',
      component: order_list,
      meta:{
        title:'订单列表'
      }
    },{
      path:'/order_print',
      name: 'order_print',
      component: order_print,
      meta:{
        title:'订单打印'
      }
    },{
      path:'/offerIstration_country',
      name: 'offerIstration_country',
      component: offerIstration_country,
      meta:{
        title:'报价管理列表'
      }
    },{
      path:'/system_integral',
      name: 'system_integral',
      component: system_integral,
      meta:{
        title:'系统管理列表'
      }
    },{
      path:'/system_list',
      name: 'system_list',
      component: system_list,
      meta:{
        title:'系统管理列表'
      }
    }
  ]
})

export default router;

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
