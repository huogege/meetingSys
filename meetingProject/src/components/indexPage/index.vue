<template>
  <div class="index">
      <div class="message" v-if="data1 && data1['meetingUser']!= null">
          <div class="nameDepart"><span>姓名:</span><span style="margin-left:20px">{{data1['meetingUser'].name}}</span><span style="margin-left:50px">部门:</span><span style="margin-left:20px">{{data1['meetingUser'].dept}}</span></div>
          <div class="number"><span>电话号码:</span><span style="margin-left:20px">{{data1['meetingUser'].phone}}</span></div>
      </div>
    <div class="newMessage oneRowHide"> 
        <a class="a_link" href="#/inform">新消息：12月12号，组织部邀请您参加“元旦活动讨论新消息...</a>
    </div>

      <div class="meetingStatus" v-if="data1&&data1.list.length>0">
            <router-link v-for="item in data1.list" :to="{ path: 'meetingDetail', query: { mid : item.id }}" class="router_link">
                <div class="list">
                    <div class="status">
                        <span class="word">会议进行中</span>
                        <span class="time">已进行:{{formatMsgTime(item.stime,nowTime)}}</span>
                    </div>        
                    <div class="content">
                        <div class="left">
                            <h1 class="title oneRowHide">{{item.title}}</h1>
                            <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间:</span>{{formatTime(item.stime,'yyyy-MM-dd  hh:mm')}}</p>
                            <p class="location "><span class="icon_2">&#8195;</span><span>会议地点:</span>{{item.addr}}</p>
                        </div>
                        <div class="right">
                            <span class="icon"></span>
                            <span class="word">扫码签到</span>
                        </div>
                    </div>
                </div>
            </router-link>
            <router-link v-for="item in data1.soonlist" :to="{ path: 'meetingDetail', query: { mid : item.id }}" class="router_link">
                <div class="list">
                    <div class="status">
                        <span class="word" style="background-color:#f1a54d">会议即将进行</span>
                    </div>        
                    <div class="content">
                        <div class="left">
                            <h1 class="title oneRowHide">{{item.title}}</h1>
                            <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间:</span>{{formatTime(item.stime,'yyyy-MM-dd  hh:mm')}}</p>
                            <p class="location "><span class="icon_2">&#8195;</span><span>会议地点:</span>{{item.addr}}</p>
                        </div>
                        <div class="right">
                            <span class="icon"></span>
                            <span class="word">扫码签到</span>
                        </div>
                    </div>
                </div>
            </router-link>
            

               
      </div>
      <div class="meetingType">
            <div class="menu">
                <div class="submenu" v-for="(item,index) in submenuArr" :class="index == currentItem ? 'active' : ''" @click="selectItem(index,item.name)">{{item.name}}</div>
            </div>
            <div class="menu_content" v-if="data2&&data2.length>0">
                 <myScroll class="wrapper"
                    :data="data2"
                    :pullup="pullup"
                    @scrollToEnd="request2(URLS,{phone:2,num:num,page:page})"
                   >
                    <ul class="wrapper-content">
                        <div class="list" v-for="item in data2">
                            <router-link :to="{ path: 'meetingDetail', query: { mid : item.id }}" class="router_link">
                                <div class="status2">
                                    <h1 class="title oneRowHide">{{item.title}}</h1>
                                    <div class="joinStatus" v-show="item.cj_status == 1">
                                        <span class="findOthers">找人开会</span>
                                        <span class="refuse">不参与</span>
                                    </div>
                                    <div class="joinStatus" v-show="item.cj_status == 2">
                                        <span class="findOthers">已确认参会</span>
                                    </div>
                                    <div class="joinStatus" v-show="item.cj_status == 3">
                                        <span class="refuse">不参与</span>
                                    </div>
                                    <div class="joinStatus" v-show="item.cj_status == 4">
                                        <span class="findOthers">已找人开会</span>
                                        <span class="refuse">不参与</span>
                                    </div>
                                </div>        
                                <div class="content">
                                    <div class="left" style="padding-right:50px;;">
                                        <p class="from"><span class="icon_3">&#8195;</span><span>发起单位</span>{{item.unit}}</p>
                                        <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间:</span>{{formatTime(item.stime,'yyyy-MM-dd  hh:mm')}}</p>
                                        <p class="location over_text_2"><span class="icon_2">&#8195;</span><span>会议地点</span>{{item.addr}}</p>
                                    </div>
                                </div>
                            </router-link>
                        </div>    
                    </ul>
                    <div class="loading-wrapper"></div>
                 </myScroll>
                
            </div>
      </div>
  </div>
</template>
<script>
    

    import BScroll from 'better-scroll'
    import myScroll from '../../components/scroll/index.vue'
    import fn from "../../common/js/index.js";
    export default{
        components:{
            'myScroll':myScroll,
        },
        data:function(){
            return{     
                URL1:'http://www.zaichongqing.com/jj_project/wapMeeting/manager/doMeeting' ,  //进行会议或即将进行会议
                URLS:'http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingAll',
                URL2:'http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingAll',//全部会议
                URL3:'http://www.zaichongqing.com/jj_project/wapMeeting/manager/notStartMeeting',// 未开始会议
                URL4:'http://www.zaichongqing.com/jj_project/wapMeeting/manager/endMeeting',     //已结束会议          
               submenuArr:[
                   {
                       name:'全部会议',
                       type:0,
                       data:[]
                   },
                    {
                       name:'未开始会议',
                       type:1,
                       data:[]
                   },
                    {
                       name:'已结束会议',
                       type:2,
                       data:[]
                   }
               ],
               currentItem:0,
               pullup:true,
               listenScroll:true,   
               data1:[],  
               nowTime:'',     
               data2:[],
               page:1,
               num:5


            }
        },
        methods:{
            formatTime:fn.format,
            formatMsgTime:fn.formatMsgTime,
            selectItem:function(index,name){
                if(index != this.currentItem){
                    this.currentItem = index;
                    if(index == 0){
                         this.data2 = [];
                         this.page = 1;
                         this.URLS = this.URL2;
                         this.request2(this.URLS,{phone:2,num:this.num,page:1});
                    }else if(index == 1){
                          this.data2 = [];
                        this.page = 1;
                         this.URLS = this.URL3;
                         this.request2(this.URLS,{phone:2,num:this.num,page:1});
                    }else if(index ==2){
                          this.data2 = [];
                         this.page = 1;
                         this.URLS = this.URL4;
                         this.request2(this.URLS,{phone:2,num:this.num,page:1});
                    }
                   
                } 
              

            },
            request1:function(url,params){
                 var _this = this;
                _this.$http.get(url, {
                    params: params
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                 _this.data1 = response.data.data;
                                 _this.nowTime =  response.data.data.params.nowtime;
                                
                            }
                        }
                    })
            },
            request2:function(url,params){
                 var _this = this;
                _this.$http.get(url, {
                    params: params
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                var pageAll = Math.ceil(response.data.data.list.total/_this.num);
                                if(response.data.data.list.total>0 && params.page <= pageAll){
                                     var thisData = response.data.data.list.list;
                                    _this.data2 = thisData.concat(_this.data2);
                                    _this.page++;
                                    console.log(_this.data2)
                        
                                }else if(params.page > pageAll){
                                    return false
                                }
                            }
                        }
                    })
            },
           
        }, 
        created:function(){
            this.$nextTick(() => {
                  this.request1(this.URL1,{phone:2,num:1000});
                this.request2(this.URLS,{phone:2,num:this.num,page:1});
            })
          
        },

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
.index {
    .message {
        font-size: .3rem;
        color: #fff;
        height: 1rem;
        padding: .25rem .5rem;
        background-image: url("./bmg_1.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size:100%;
        .nameDepart {
            margin-bottom: .2rem;
        }
    }
    .newMessage {
        height: .7rem;
        line-height: .7rem;
        color: #575757;
        font-size: .24rem;
        background-image: url("./icon_5.png");
        background-repeat: no-repeat;
        background-position: .25rem;
        background-size:.3rem .3rem;
        text-indent: .7rem;
        background-color: #f3f3f3;
        .a_link{
            display: grid;
            text-align: center;
        }
    }
    .meetingStatus {
        background-color: #f1f1f1;
        padding-bottom: .3rem;
    }
     .list {
            background-color: #fff;
            margin-bottom: .3rem;
            .status {
                height: .5rem;
                .word {
                    float: left;
                    display: inline-block;
                    padding: .1rem .4rem .1rem .2rem;
                    border-radius: 0 .2rem .2rem 0;
                    color: #fff;
                    background-color: #57cb4e;
                    font-size: .26rem;
                }
                .time {
                    line-height: .5rem;
                    font-size: .26rem;
                    color: #666;
                    float: right;
                    vertical-align: middle;
                    margin-right: .2rem;
                }
            }
            .status2{
                display: flex;
                padding: .35rem .1rem 0 .35rem;
                .title {
                    width: 60%;
                    font-size: .34rem;
                    width: 5.3rem;
                    font-weight: 500;
                }
                .joinStatus{
                    font-size: .24rem;
                    width: 44%;
                    
                }
                .refuse{
                    display: inline-block;
                    padding: .05rem .1rem;
                    border: 1px solid #ff7e30;
                    border-radius: 5px;
                    color: #ff7e30;
                    margin-left: .1rem;
                }
                .findOthers{
                    display: inline-block;
                    padding: .05rem .1rem;
                    border: 1px solid #178aff;
                    border-radius: 5px;
                    color: #178aff;
                }
            }
             &:last-child{
                margin-bottom: 0;
            }
        }
        .content {
            display: flex;
            width: 100%;
            .left {
                    flex: 3;
                    width: 75%;
                    padding: .35rem 0 .35rem .35rem;
                .title{
                    font-size: .34rem;
                    width: 5.3rem;
                    font-weight: 500;
                    margin-bottom: .4rem;
                }
                .icon_2 {
                    background-image: url("./icon_2.png");
                    background-repeat: no-repeat;
                    background-position: center;
                     background-size:.23rem .28rem;
                    margin-right: .2rem;
                }
                .icon_3 {
                    background-image: url("./icon_3.png");
                    background-repeat: no-repeat;
                    background-position: center;
                     background-size:.24rem .24rem;
                    margin-right: .2rem;
                }
                .icon_4 {
                    background-image: url("./icon_4.png");
                    background-repeat: no-repeat;
                    background-position: center;
                     background-size:.24rem .24rem;
                    margin-right: .2rem;
                }
                p{
                    font-size: .24rem;
                    margin-bottom: .2rem;
                    line-height: .35rem;
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
            }
            .right {
                flex: 1;
                width: 25%;
                display: flex;
                flex-direction: column;
                padding-top: .2rem;
                text-align: center;
                .icon {
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    background-image: url("./icon_1.png");
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size:.85rem .72rem;
                    margin: 0 auto;
                }
                .word {
                    font-size: .24rem;
                    margin-top: .2rem;
                    color: #178aff;
                }
            }
        }
    .meetingType{
         background-color: #f1f1f1;
        .menu{
               display:flex;
               border-bottom:1px solid #e5e5e5;
               .submenu{
                    flex:1;
                    height:.9rem;
                    line-height:.9rem;
                    text-align:center;
                    font-size:.28rem;
                    color:#666;
                    background-color: #fff;
               }
               .active{
                   border-bottom:5px solid #2d95ff;
                   color:#2d95ff;
               }
        }
       
    }
}
</style>


