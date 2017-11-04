import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage/index'
import Inform from '@/components/inform/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/inform',
      name: 'inform',
      component: Inform
    }
  ]
})
