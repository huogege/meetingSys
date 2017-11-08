import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/components/indexPage/index'
import inform from '@/components/inform/index'
import informDetail from '@/components/informDetail/index'
import meetingDetail from '@/components/meetingDetail/index'
import meetingStatistics from '@/components/meetingStatistics/index'
import select1 from '@/components/select1/index'
import select2 from '@/components/select2/index'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: '首页',
      component: indexPage
    },
    {
      path: '/inform',
      name: '通知',
      component: inform
    },
    {
      path: '/informDetail',
      name: '通知详情',
      component: informDetail
    },
    {
      path: '/meetingDetail',
      name: '会议详情详情',
      component: meetingDetail
    },
    {
      path: '/meetingStatistics',
      name: '会议统计',
      component: meetingStatistics
    },
    {
      path: '/select1',
      name: '选择1',
      component: select1
    },
    {
      path: '/select2',
      name: '投票',
      component: select2
    },
  ]
})
