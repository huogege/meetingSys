<template>
  <div class="index ">
        <div class="top">
            <div class="message" v-show="meetingUser!=''">
                <div class="nameDepart"><span >部门:</span><span style="margin-left:.5rem">{{meetingUser['dept']}}</span></div>
                <div class="number"><span>电话号码:</span><span style="margin-left:.2rem;color:#fff!important">{{meetingUser['phone']}}</span></div>
                <div class="name">{{meetingUser['name']}}</div>
            </div>
            <div class="newMessage oneRowHide" v-show="oneMessage!=''"> 
                    <router-link :to="{ path: 'inform', query: { name : meetingUser.name,phone:meetingUser.phone,dept:meetingUser.dept }}" class="router_link">
                        新消息：{{oneMessage == ''? '您当前没有任何消息!':oneMessage}}
                    </router-link>
            </div>

         <div class="meetingStatus">
                <div class="list" :key="item.id" v-for="item in inList" @click = "setLocalStorage(item.id)">
                    <router-link  :to="{ path: 'meetingDetail', query: { mid : item.id,way:way }}" class="router_link" >
                        <div class="status">
                            <span class="word">会议进行中</span>
                            <span class="time">已进行:{{formatMsgTime(item.stime,nowTime)}}</span>
                        </div>        
                        <div class="content">
                            <div class="left">
                                <h1 class="title oneRowHide">{{item.title}}</h1>
                                <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间 : </span>{{formatTime(item.stime,'yyyy-MM-dd  hh:mm')}}</p>
                                <p class="location over_text_2"><span class="icon_2">&#8195;</span><span>会议地点 : </span>{{item.addr}}</p>
                            </div>
                        </div>
                     </router-link>
                     <div class="right">
                        <span class="icon"></span>
                        <span class="word">扫码签到</span>
                    </div>
            </div>
                <div class="list" :key="item.id" v-for="item in soonList" @click = "setLocalStorage(item.id)">
                    <router-link   :to="{ path: 'meetingDetail', query: {mid:item.id,way:way}}" class="router_link">
                        <div class="status">
                            <span class="word" style="background-color:#f1a54d">会议即将进行</span>
                        </div>        
                        <div class="content">
                            <div class="left">
                                <h1 class="title oneRowHide">{{item.title}}</h1>
                                <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间  :</span>{{formatTime(item.stime,'yyyy-MM-dd  hh:mm')}}</p>
                                <p class="location over_text_2"><span class="icon_2">&#8195;</span><span>会议地点 : </span>{{item.addr}}</p>
                            </div>
                        </div>
                    </router-link>    
                    <!-- <div class="right" @click="attend()">
                        <mt-button class="word">点击签到</mt-button>
                    </div> -->
                </div>
           
             <div @click = "setLocalStorage(item.id)" :key="item.id" class="list" v-for="(item,index) in changeList" :class="index == changeList.length-1? 'marginNone':''">
                         <div class="joinStatus" v-show="item.qr_type == 2&&item.status !==4">
                            <mt-button class="button2Reclass" :class="item.cj_status == 2?'findOthers':item.cj_status == 3?'grid': item.cj_status == 4? 'grid':''" @click="changeWord1Fun(item.cj_status,item.id)">{{item.cj_status == 2?changeWord1 = '找人代会':item.cj_status == 3?changeWord1 = '暂不参会': item.cj_status == 4?changeWord1 = '已找人代会':''}}</mt-button>
                            <mt-button  class="button2Reclass" :class="item.cj_status == 2?'refuse':item.cj_status == 3?'join': item.cj_status == 4? 'refuse':''" @click="changeWord2Fun(item.cj_status,item.id)">{{item.cj_status == 2?changeWord2 = '不参会':item.cj_status == 3?changeWord2 = '参会': item.cj_status == 4?changeWord2 = '不参会':''}}</mt-button>
                        </div>
                        <div class="joinStatus" v-show="item.qr_type !== 2" style="height:.8rem;"></div>
                        <div class="endSign" v-show="item.status == 4"></div>
                    <router-link :to="{ path: 'meetingDetail', query: { mid:item.id,way:way }}" class="router_link">  
                    <div class="status2">
                        
                        <h1 class="title oneRowHide">{{item.title}}</h1>
                    </div>      
                    <div class="content">
                        <div class="left" style="padding-right:.5rem;;">
                            <p class="from oneRowHide"><span class="icon_3">&#8195;</span><span>发起单位 : </span>{{item.unit}}</p>
                            <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间 : </span>{{formatTime(item.stime,'yyyy-MM-dd  hh:mm')}}</p>
                            <p class="location over_text_2"><span class="icon_2">&#8195;</span><span>会议地点 : </span>{{item.addr}}</p>
                        </div>
                    </div>
                </router-link>
          
            </div>  
             
            <router-link v-show="changeList.length>0||inList.length>0||soonList.length>0"  :to="{ path: 'meetingList'}" class="router_link" style="display:grid">
                <mt-button  class="buttonReclass moreMeeting">更多会议</mt-button>     
            </router-link>   
        </div>
    </div>
</div>
</template>
<script>
    import fn from "../../common/js/index.js";
    import url from "../../common/js/url.js";
    const jjURL = url.jjURL;
    export default{
        components:{
         
        },
        data:function(){
            return{     
                URL1:jjURL+'doMeeting' ,  //进行会议或即将进行会议
                URLS:jjURL+'meetingAll',
                URL2:jjURL+'meetingAll',//全部会议
                URL3:jjURL+'notStartMeeting',// 未开始会议
                URL4:jjURL+'endMeeting',     //已结束会议   
                URL5:jjURL+'msgList'  ,     //消息 
                URL6:jjURL+'meetingCj',    //参会确认
               meetingUser:'' ,
               currentItem:0,
               pullup:true,
               listenScroll:true,  
               inList:[],
               soonList:[], 
               changeList:[],
               oneMessage:'',
               nowTime:'',    
               page:1,
               num:5,

               changeWord1:'',
               changeWord2:'',

               way:'/',
               phone:''

            }
        },
        methods:{
            formatTime:fn.format,
            formatMsgTime:fn.formatMsgTime,
            request1:function(url,params){
                 var _this = this;
                _this.$http.get(url, {
                    params: params
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                if(response.data.data.meetingUser){
                                     _this.meetingUser = response.data.data.meetingUser;
                                }
                                if(response.data.data.list>0){ _this.inList =  response.data.data.list;}
                                if(response.data.data.soonlist.length>0){_this.soonList =  response.data.data.soonlist;}
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
                                if(response.data.data.list.list.length>0){
                                     _this.changeList = response.data.data.list.list;
                                    
                                }      
                            }
                        }
                    })
            },
            getMessage:function(){
                var _this = this;
                _this.$http.get(this.URL5, {
                    params: {phone:_this.phone,num:1}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                if(response.data.data.list.length>0){
                                      _this.oneMessage = response.data.data.list[0].content;
                                }
                              
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
                        phone:_this.phone,
                    }
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            callback()    
                        }
                    })
            },
            changeWord1Fun:function(status,id,name){
              switch (status){
                case 2:   //找人代会
                    this.$router.push({path: 'daihuiren', query: {mid: id,way:'/'}});  
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
                        _this.$router.push({path: '/blackPage', query: {way:'/'}});       //跳到一个空白页，再调回来,实现当前页面的刷新。

                    })  
                break;
                case 3:  //参会
                    _this.meetingInsue(2,id,function(){
                        _this.changeWord2 = '暂不参会';
                        alert("您的会议状态已改为：参会");
                         _this.$router.push({path: '/blackPage',query: {way:'/'}});

                    })
                break;
                case 4:  //不参会
                    _this.meetingInsue(3,id,function(){
                        _this.changeWord2 = '参会';
                        alert("您的会议状态已改为：暂不参会");
                         _this.$router.push({path: '/blackPage', query: {way:'/'}});


                    })   
                break;
              }
            },
            setLocalStorage:function(id){
                if(localStorage.getItem("mid")){
                       localStorage.removeItem("mid");  
                }
                localStorage.setItem("mid", id);
            },
            // attend:function(){
            //     this.$http.post(jjURL+ 'meetingQd', this.$qs.stringify({ 
            //             mid:this.mid,    
            //             phone:this.phone || null
            //             }))
            //         .then(function (response) {
            //             if(response.status == "200" && response.data.rtnCode == "0000"){
            //                 Toast({
            //                     message: '签到成功！',
            //                     iconClass: 'icon icon-success'
            //                 });
            //             }else{
            //                 alert("网络连接错误")
            //             }
            //         })
            // },
            getMeetingUser:function(phone){
                var _this = this;
                _this.$http.get(jjURL+'getMeetingUser ', {
                    params:{phone:phone}
                    })
                    .then(function (response) {
                       if(response.status == "200" && response.data.rtnCode == "0000"){
                           if(response.data.data.meetingUser == null){
                              alert("检测到后台没有您的名单，点击确定转到注册页");
                               _this.$router.push({path: '/userRegist', query: {}});
                           }
                        }         
                    });
            },
           
        }, 
        created (){
            var timer = setInterval(()=>{
                this. phone = localStorage.getItem('phone');
                
                if(this.phone !=null){
                    clearInterval(timer);
                    this.request1(this.URL1,{phone:this.phone,num:1000});
                    this.request2(this.URLS,{phone:this.phone,num:this.num});    
                    this.getMessage();
                }
            },"200")
           
        }
        
    }
</script>


<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
.indexBefore:before{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    
}
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
        background-size:7.5rem 1.5rem;
        .nameDepart {
            margin-bottom: .2rem;
            margin-top: .1rem;
            span{
                 font-weight: 700;
            }
        }
        .name{
            position: absolute;
            right: .1rem;
            top: .55rem;
            font-size: .4rem;
            width: 2rem;
            text-align: center;
            margin-left: .2rem;
            font-weight: 700;
        }
        .number{
            span{
                font-weight: 700;
            }
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
        .moreMeeting{
            width: 100%;
            font-size: .32rem;
            line-height: .8rem;
            text-align: center;
            background-image: url("./bottom.png");
            background-repeat: no-repeat;
            background-position: 28%;
            background-size:.4rem .4rem;
        }
    }
    .marginNone{
        margin: 0!important;
    }

    .list {
            background-color: #fff;
            margin-bottom: .3rem;
            width: 7.5rem;
            position: relative;
             .endSign{
                width: 1.28rem;
                height: .72rem;
                position: absolute;
                top: .2rem;
                right: .25rem;
                background-image: url("./icon_9.png");
                background-repeat: no-repeat;
                background-position: center;
                background-size:1.28rem .72rem;

            }
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
                        margin: .25rem .2rem 0 0;
                    }
                .grid{
                    display: inline-block;
            
                    border: 1px solid #9e9e9e;
                    border-radius: .15rem;
                    color: #9e9e9e;
                    margin-left: .1rem;
                    }
                .refuse{
                    display: inline-block;
                    
                    border: 1px solid #ff7e30;
                   border-radius: .15rem;
                    color: #ff7e30;
                    margin-left: .1rem;
                }
                .findOthers{
                    display: inline-block;
                 
                    border: 1px solid #178aff;
                  border-radius: .15rem;
                    color: #178aff;
                }
                .join{
                    display: inline-block;
                  
                    border: 1px solid #7dd43c;
                    border-radius: .15rem;
                    color: #7dd43c;
                }
            .status2{
                display: flex;
                padding: .25rem .1rem 0 .35rem;
                .title {
                    width: 60%;
                    font-size: .34rem;
                    width: 5.3rem;
                    font-weight: 700;
                    line-height: .6rem;
                }
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
                    margin-top: .1rem;
                    line-height: .35rem;
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
            }
            
        }
        .right {
                position: absolute;
                top: 0;
                right: 0;
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
                top: 5rem;
                bottom: -5rem;
                left: 0;
                overflow: hidden;
            }
        }
       
    }
}
</style>


