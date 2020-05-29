import Vue from 'vue'
import VueRouter from 'vue-router'
import InfoDynamicTable from '@/pages/InfoDynamicTable'
import FilterTable from '@/pages/FilterTable'
import Contract from '@/pages/Contract'
import Login from '@/pages/Login'
import Module from '@/pages/Module'
import BudgetAdd from '@/pages/Budget/BudgetAdd'
import BudgetList from '@/pages/Budget/BudgetList'
import BudgetDetail from '@/pages/Budget/BudgetDetail'
import ContractAdd from '@/pages/Subcontract/ContractAdd'
import ContractList from '@/pages/Subcontract/ContractList'
import ContractDetail from '@/pages/Subcontract/ContractDetail'
import Outlay from '@/pages/Outlay'
import Cost from '@/pages/Cost'
import store from '../vuex/store'
import {getCookie} from '@/util/utils'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {requireAuth: false}
    },
    {
      path: '/Index',
      name: 'Index',
      component: Module,
      meta: {requireAuth: true}
    },
    {
      path: '/BudgetList',
      name: 'BudgetList',
      component: BudgetList,
      meta: {requireAuth: true}
    },
    {
      path: '/BudgetAdd',
      name: 'BudgetAdd',
      component: BudgetAdd,
      meta: {requireAuth: true}
    },
    {
      path: '/BudgetDetail',
      name: 'BudgetDetail',
      component: BudgetDetail,
      meta: {requireAuth: true}
    },
    {
      path: '/ContractList',
      name: 'ContractList',
      component: ContractList,
      meta: {requireAuth: true}
    },
    {
      path: '/ContractAdd',
      name: 'ContractAdd',
      component: ContractAdd,
      meta: {requireAuth: true}
    },
    {
      path: '/ContractDetail',
      name: 'ContractDetail',
      component: ContractDetail,
      meta: {requireAuth: true}
    },
    {
      path: '/InfoDynamicTable',
      name: 'InfoDynamicTable',
      component: InfoDynamicTable,
      meta: {requireAuth: true}
    },
    {
      path: '/FilterTable',
      name: 'FilterTable',
      component: FilterTable,
      meta: {requireAuth: true}
    },
    {
      path: '/Cost',
      name: 'Cost',
      component: Cost,
      meta: {requireAuth: true}
    },
    {
      path: '/Outlay',
      name: 'Outlay',
      component: Outlay,
      meta: {requireAuth: true}
    },
    {
      path: '/Contract',
      name: 'Contract',
      component: Contract,
      meta: {requireAuth: true}
    },
    {path: '*', redirect: '/Login'}
  ]
})
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

// 登录控制
router.beforeEach((to, from, next) => {
  store.dispatch('changePath', to.name)
  if (to.meta.requireAuth) {
    if (getCookie('ZT_14a808c40bba58c2c')) {
      next()
    } else {
      localStorage.clear()
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
  store.dispatch('changePath', to.name)
})
export default router
