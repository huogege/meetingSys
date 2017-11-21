import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/components/indexPage/index'
import inform from '@/components/inform/index'
import informDetail from '@/components/informDetail/index'
import meetingDetail from '@/components/meetingDetail/index'
import statisticsList from '@/components/statisticsList/index'  //会议统计列表
import statisticsSelect from '@/components/statisticsSelect/index'   //统计选择
import voteList from '@/components/voteList/index'  //投票列表
import voteSelect from '@/components/voteSelect/index'  //投票选择
import voteResult from '@/components/voteResult/index'  //投票结果
import material from '@/components/material/index'
import note from '@/components/note/index'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
      path: '/material',
      name: '资料',
      component: material
    },
    {
      path: '/note',
      name: '会议笔记',
      component: note
    },
    {
      path: '/statisticsList',
      name: '统计列表',
      component: statisticsList
    },
    {
      path: '/statisticsSelect',
      name: '统计选择',
      component: statisticsSelect
    },
    {
      path: '/voteList',
      name: '投票列表',
      component: voteList
    },
    {
      path: '/voteSelect',
      name: '投票选择',
      component: voteSelect
    },
    {
      path: '/voteResult',
      name: '投票结果',
      component: voteResult
    },
  ]
})
