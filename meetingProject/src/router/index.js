import Vue from 'vue'
import Router from 'vue-router'


import indexPage from '@/components/indexPage/index'
import meetingList from '@/components/meetingList/index'
import inform from '@/components/inform/index'
import informDetail from '@/components/informDetail/index'
import meetingDetail from '@/components/meetingDetail/index'
import statisticsList from '@/components/statisticsList/index'  //会议统计列表
import statisticsSelect from '@/components/statisticsSelect/index'   //统计选择
import voteList from '@/components/voteList/index'  //调查列表
import voteSelect from '@/components/voteSelect/index'  //调查选择
import voteResult from '@/components/voteResult/index'  //调查结果
import material from '@/components/material/index'
import note from '@/components/note/index'

import daihuiren from '@/components/daihuiren/index'  
import blackPage from '@/components/blackPage/index'

import userRegist from '@/components/userRegist/index' 

import searchSeat from '@/components/searchSeat/index' 

import setWechatTitle from '../common/js/setWechatTitle'   //标题文件

Vue.use(Router)

var router =  new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: indexPage
    },
    {
      path: '/meetingList',
      name: '更多会议',
      component: meetingList
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
      path: '/daihuiren',
      name: '通知详情',
      component: daihuiren
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
      name: '调查列表',
      component: voteList
    },
    {
      path: '/voteSelect',
      name: '调查选择',
      component: voteSelect
    },
    {
      path: '/voteResult',
      name: '调查结果',
      component: voteResult
    },
    {
      path: '/blackPage',
      name: '',
      component: blackPage
    },
    {
      path: '/userRegist',
      name: '注册',
      component: userRegist
    },
    {
      path: '/searchSeat',
      name: '搜索座位号',
      component: searchSeat
    },
  ]
});
router.afterEach((transition) => {
  var title = transition.name;
  setWechatTitle(title)
});

export default router;

