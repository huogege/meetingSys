<template>
  <div class="index">
        <div class="top" ref="top">
            <div class="menu">
                <div class="submenu" v-for="(item,index) in submenuArr" :class="index == currentItem ? 'active' : ''" @click="selectItem(index,item.name)">{{item.name}}</div>
            </div>
        </div>
   
    <div class="meetingType" >
            <div class="menu_content">
                 <myScroll class="wrapper"
                    ref = "scroll"
                    :data="changeList"
                    :pullup="pullup"
                    @scrollToEnd="request2(URLS,{phone:2,num:num,page:page})"
                   >
                    <ul class="wrapper-content"  >
                        <div class="list" v-for="item in changeList">
                                  <div class="joinStatus" v-show="item.qr_type == 2">
                                    <span class="findOthers" @click="changeWord1Fun(item.cj_status,item.id)">{{item.cj_status == 2?changeWord1 = '找人代会':item.cj_status == 3?changeWord1 = '暂不参会': item.cj_status == 4?changeWord1 = '已找人代会':''}}</span>
                                    <span class="refuse" @click="changeWord2Fun(item.cj_status,item.id)">{{item.cj_status == 2?changeWord2 = '不参会':item.cj_status == 3?changeWord2 = '参会': item.cj_status == 4?changeWord2 = '不参会':''}}</span>
                                </div>

                                <router-link :to="{ path: 'meetingDetail', query: { mid : item.id }}" class="router_link">  
                                <div class="status2">
                                    
                                    <h1 class="title oneRowHide">{{item.title}}</h1>
                                   
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
    var phone = fn.phone;
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
                URL5: 'http://www.zaichongqing.com/jj_project/wapMeeting/manager/msgList'  ,     //消息 
                  URL6:'http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingCj',    //参会确认
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
               meetingUser:'' ,
               inList:[],
               soonList:[], 
               changeList:[],
               oneMessage:'',
               nowTime:'',    
               page:1,
               num:5,


               changeWord1:'',
               changeWord2:''


            }
        },
        methods:{
            formatTime:fn.format,
            formatMsgTime:fn.formatMsgTime,
            selectItem:function(index,name){
                if(index != this.currentItem){
                    this.currentItem = index;
                    if(index == 0){
                         this.changeList = [];
                         this.page = 1;
                         this.URLS = this.URL2;
                         this.request2(this.URLS,{phone:phone,num:this.num,page:1});
                    }else if(index == 1){
                          this.changeList = [];
                        this.page = 1;
                         this.URLS = this.URL3;
                         this.request2(this.URLS,{phone:phone,num:this.num,page:1});
                    }else if(index ==2){
                          this.changeList = [];
                         this.page = 1;
                         this.URLS = this.URL4;
                         this.request2(this.URLS,{phone:phone,num:this.num,page:1});
                    }
                   
                } 
              

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
                                    _this.changeList = thisData.concat(_this.changeList);
                                    _this.page++;
                                    console.log(_this.changeList)
                        
                                }else if(params.page > pageAll){
                                    return false
                                }
                            }
                        }
                    })
            },
            getMessage:function(){
                var _this = this;
                _this.$http.get(this.URL5, {
                    params: {phone:phone,num:1}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                _this.oneMessage = response.data.data.list[0].content;
                            }
                        }
                    })
            },
            meetingInsue:function(cj_status,mid,callback){
                var _this = this;
                _this.$http.get(this.URL6, {
                    params: {
                        cj_status:cj_status,
                        mid:mid,
                        phone:phone,
                    }
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            callback()    
                        }
                    })
            },
            changeWord1Fun:function(status,id,name){
              console.log(status);
              switch (status){
                case 2:   //找人代会
                    this.$router.push({path: 'daihuiren', query: {mid: id}});  
                break;
                case 3:   //赞不参与
                    return false;
                break;
                case 4:   //已找人代会
                    return false;
                break;
              }

            },
            changeWord2Fun:function(status,id,name){
               var status = status;
               var _this = this;
               switch (status){
                case 2:   //不参与
                    _this.meetingInsue(3,id,function(){
                        _this.changeWord2 = '参会';
                        alert("您的会议状态已改为：暂不参会");
                        window.location.reload();

                    })  
                break;
                case 3:  //参会
                    _this.meetingInsue(2,id,function(){
                        _this.changeWord2 = '暂不参会';
                        alert("您的会议状态已改为：参会");
                          window.location.reload();


                    })
                break;
                case 4:  //不参会
                    _this.meetingInsue(3,id,function(){
                        _this.changeWord2 = '参会';
                        alert("您的会议状态已改为：暂不参会");
                          window.location.reload();


                    })   
                break;
              }
            },
           
        }, 
        created:function(){
            this.$nextTick(function(){
                this.request2(this.URLS,{phone:phone,num:this.num,page:1});    
                this.getMessage();
            })
           
        },
        mounted:function(){   
         
           
        }
        

    }
</script>


<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";

.index {
    .img_box{
        width: 7.5rem;
        height: 4rem;
    }
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
            width: 7.5rem;
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
              .joinStatus{
                        font-size: .24rem;
                        float: right;
                        margin: .35rem .2rem 0 ;
                    }
                .grid{
                    display: inline-block;
                     padding: .15rem .2rem;
                    border: 1px solid #9e9e9e;
                    border-radius: .15rem;
                    color: #9e9e9e;
                    margin-left: .1rem;
                    }
                .refuse{
                    display: inline-block;
                      padding: .15rem .2rem;
                    border: 1px solid #ff7e30;
                   border-radius: .15rem;
                    color: #ff7e30;
                    margin-left: .1rem;
                }
                .findOthers{
                    display: inline-block;
                   padding: .15rem .2rem;
                    border: 1px solid #178aff;
                  border-radius: .15rem;
                    color: #178aff;
                }
                .join{
                    display: inline-block;
                  padding: .15rem .2rem;
                    border: 1px solid #7dd43c;
                    border-radius: .15rem;
                    color: #7dd43c;
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
                    padding: 0 0 .35rem .35rem;
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
    .meetingType{
         background-color: #f1f1f1;
        
        .menu_content{
            .wrapper{
                position: absolute;
                top: .96rem;
                bottom: 0rem;
                left: 0;
                overflow: hidden;
                background-color: #f1f1f1;
            }
        }
       
    }
}
</style>


