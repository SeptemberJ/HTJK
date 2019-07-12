import Vue from 'vue'
import VueRouter from 'vue-router'
import InfoDynamicTable from '@/pages/InfoDynamicTable'
import FilterTable from '@/pages/FilterTable'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/InfoDynamicTable',
      name: 'InfoDynamicTable',
      component: InfoDynamicTable,
      meta: {requireAuth: false}
    },
    {
      path: '/',
      name: 'FilterTable',
      component: FilterTable,
      meta: {requireAuth: false}
    }
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
// router.beforeEach((to, from, next) => {
//   store.dispatch('changePath', to.name)
//   if (to.meta.requireAuth) {
//     if (getCookie('Fs_14a808c40bba58c2c')) {
//       next()
//     } else {
//       localStorage.clear()
//       next({
//         path: '/Login'
//       })
//     }
//   } else {
//     next()
//   }
//   store.dispatch('changePath', to.name)
// })
export default router
