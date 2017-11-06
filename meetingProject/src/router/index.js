import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage/index'
import Inform from '@/components/inform/index'
import informDetail from '@/components/informDetail/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: IndexPage
    },
    {
      path: '/inform',
      name: '通知',
      component: Inform
    },
    {
      path: '/informDetail',
      name: '通知详情',
      component: informDetail
    }
  ]
})
