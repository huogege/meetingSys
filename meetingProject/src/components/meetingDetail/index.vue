<template>
  <div class="meetingDetail" v-show="meetingDetailShow">
        <div class="blackBar"></div>
       <div class="meetingStatus">
            <div class="list">              
                <div class="content">
                    <div class="left">
                        <h1 class="title oneRowHide">{{meeting.title}}</h1>
                        <p class="from"><span class="icon_3">&#8195;</span><span>发起单位 : </span><span>{{meeting.unit}}</span></p>
                        <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间 : </span>{{format(meeting.stime,'yyyy-MM-dd  hh:mm')}}</p>
                        <p class="location "><span class="icon_2">&#8195;</span><span>会议地点 : </span>{{meeting.addr}}</p>
                        <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>预计时长 : </span>{{meeting.estime}}</p>
                    </div>
                    <div class="right" @click="attend()">
                        <mt-button class="word">{{signWord}}</mt-button>
                    </div>
                </div>
            </div>         
        </div>
        <div class="joinPerson">
            <p class="title">
                <span class="icon_8">&#8195;</span>
                <span class="word">当前人员</span>
                <mt-button class="editUser" type="primary" @click="editUser">修改</mt-button>       
            </p>
            <div class="content">
                <div class="list">
                    <span class="cell">{{inputName}}</span>
                    <span class="cell">{{inputDept}}</span>
                    <span class="cell">{{inputPost}}</span>
                    <span class="cell" style="width:50%">{{inputPhone}}</span>
                </div>
            </div>
        </div>
        <div class="joinPerson">
            <p class="title">
                <span class="icon_15">&#8195;</span>
                <span class="word">座位号</span> 
                <mt-button class="editUser" type="primary" @click="search">搜索</mt-button>       
            </p>
            <div class="content">
                <div class="list" >
                    <span class="cell" style="width:100%">{{seatName}}</span>
                </div>
            </div>
        </div>
        <div class="joinPerson">
            <p class="title">
                <span class="icon_8">&#8195;</span>
                <span class="word">参与人员</span>
                <span class="total">共{{userList.length}}人</span>
            </p>
            <div class="content">
                <div class="list">
                    <span v-for="item in userList" class="cell">{{item.dept}}-{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="meetingContent">
            <p class="title">
                <span class="icon_9">&#8195;</span>
                <span class="word">会议纪要</span>
            </p>
            <p class="content">{{meeting.memo}}</p>
        </div>
        <div class="menuWrapper">
             <router-link :to="{ path: 'material', query: { mid: mid}}"  class="router_link">
                <div class="submenu">
                    <span class="icon icon11">&#8195;</span>
                    <span class="word">资料</span>
                </div>
              </router-link>
             <router-link :to="{ path: 'note', query: { title:title,mid:mid,time:time}}"  class="router_link">
                <div class="submenu">
                    <span class="icon icon12">&#8195;</span>
                    <span class="word">笔记</span>
                </div>
              </router-link>
             <router-link :to="{ path: 'voteList', query: { mid: mid,action:'meetingVoteList'}}"  class="router_link">
                <div class="submenu">
                    <span class="icon icon13">&#8195;</span>
                    <span class="word">投票</span>
                </div>
              </router-link>
            <router-link :to="{ path: 'statisticsList', query: { mid: mid,action:'meetingCountList'}}"  class="router_link">
                <div class="submenu">
                    <span class="icon icon14">&#8195;</span>
                    <span class="word">统计</span>
                </div>
            </router-link>
        </div>
        <mt-popup
            v-model="popup1Visible"
            style="width:75%;border-radius:20px">
            <mt-field label="姓名" placeholder="请输入当前人员名字" type="username" v-model="inputName" style="border-radius:20px"></mt-field>
            <mt-field label="部门" placeholder="请输入部门" type="username" v-model="inputDept"></mt-field>
            <mt-field label="职位" placeholder="请输入职位" type="username" v-model="inputPost"></mt-field>
            <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="inputPhone"></mt-field>
            <mt-button style="margin-left: 37%;width: 26%;" type="primary"  @click.native="updateUserInfo">完成</mt-button>
        </mt-popup>
        <mt-popup
              v-model="popup2Visible"
              autofocus="true"
              style="width:80%;fontSize:16px;height:80%"
              :result="searchResult"
        >
             <mt-search
                v-model="searchName"
                cancel-text="取消"
                placeholder="搜索"

                >
           
            </mt-search>
        </mt-popup>    
       
  </div>
</template>
<script>
  
    import {Toast,Popup,Search } from 'mint-ui';
    import fn from "../../common/js/index.js";
    import url from "../../common/js/url.js";
    var jjURL = url.jjURL;
    if(fn.QueryString('sign_source')){
        var sign_source = fn.QueryString('sign_source');
        localStorage.setItem('sign_source',sign_source)
    }
    if(fn.QueryString('mid')){
        var mid = fn.QueryString('mid');
        localStorage.setItem('mid',mid)
    }
     if(fn.QueryString('phone')){
        var phone = fn.QueryString('phone');
        localStorage.setItem('phone',phone)
    }
     if(fn.QueryString('openid')){
        var openid = fn.QueryString('openid');
        localStorage.setItem('openid',openid)
    }
      if(fn.QueryString('userName')){
        var userName = fn.QueryString('userName');
        localStorage.setItem('userName',userName)
    }
    //var url = 'http://http://sz.cqjjnet.com/jj_project/wapMeeting/manager/meetingInfo'
    export default{
        components:{
         
        },
        data:function(){
            return{
                meetingDetailShow:false,
                meeting:{
                     type:Object
                },
                userList:[],
                mid:'',
                title:'',
                time:'',
                phone:'',
              

                popup1Visible:false,
                popup2Visible:false,
                inputName:'',
                inputDept:'',
                inputPost:'',
                inputPhone:'',
                sign_source:'',
                seatName:'',

                searchName:'',
                signWord:'点击签到'
            }
        },
        methods:{
            format:fn.format,
            formatMsgTime:fn.formatMsgTime,
            request:function(mid,phone,openid){
                var _this = this;
                _this.$http.get(jjURL+'meetingInfo', {
                    params:{phone:phone,mid:mid}
                    })
                    .then(function (response) {
                       if(response.status == "200" && response.data.rtnCode == "0000"){
                           if(response.data.data!=''){
                                _this.meeting = response.data.data.meeting;
                                _this.userList = response.data.data.meeting.userlist;
                                _this.title = response.data.data.meeting.title;
                                _this.time = fn.format(response.data.data.meeting.stime,'yyyy-MM-dd  hh:mm');
                           }
                        }         
                    });
                    _this.getMeetingUser(phone);
                    _this.getUserByOpenId(openid);
              
    
            },
            getMeetingUser:function(phone){
                var _this = this;
                _this.$http.get(jjURL+'getMeetingUser ', {
                    params:{phone:phone}
                    })
                    .then(function (response) {
                       if(response.status == "200" && response.data.rtnCode == "0000"){
                           if(response.data.data.meetingUser!=null){
                                _this.inputName = response.data.data.meetingUser.name;
                                 _this.inputDept = response.data.data.meetingUser.dept;
                                  _this.inputPost = response.data.data.meetingUser.post;
                                   _this.inputPhone = response.data.data.meetingUser.phone;          
                           }
                        }         
                    });
            },
            getUserByOpenId:function(openid){
                var _this = this;
                _this.$http.get(jjURL+'getUserByOpenId ', {
                    params:{openid:openid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data.meetingUser!=null){
                                _this.inputName = response.data.data.meetingUser.name;
                                _this.inputDept = response.data.data.meetingUser.dept;
                                _this.inputPost = response.data.data.meetingUser.post;
                                _this.inputPhone = response.data.data.meetingUser.phone;
                                _this.phone = response.data.data.meetingUser.phone; 
                            }
                        }         
                    });
            },
            updateUserInfo:function(){
                var _this = this;
                if(_this.phone == _this.inputPhone){
                   alert("电话号码不能与原号码相同");
                   return false;
                }else{
                    _this.$http.post(jjURL+ 'updateUserInfo', _this.$qs.stringify({ 
                        name:_this.inputName, 
                        phone:_this.inputPhone, 
                        oldphone:_this.phone,
                        dept:_this.inputDept,
                        post: _this.inputPost
                        }))
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            _this.popup1Visible = false;
                            Toast({
                                message: '修改成功！',
                                iconClass: 'icon icon-success'
                            });
                        }else{
                            alert("网络连接错误")
                        }
                    })
                }
            },
            attend:function(){
                var _this = this;
                if(_this.signWord == '点击签到'){
                     _this.$http.post(jjURL+ 'meetingQd', _this.$qs.stringify({ 
                        mid:_this.mid,    
                        phone:_this.phone || null
                        }))
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            _this.signWord = '已签到'
                            Toast({
                                message: '签到成功！',
                                iconClass: 'icon icon-success'
                            });
                        }else{
                            alert("网络连接错误")
                        }
                    })
                }else{
                    alert("已签到，请勿重复签到！")
                }
               
            },
            getUserSeat:function(mid,userName){
                var _this = this;
                _this.$http.post(jjURL+ 'getUserSeat', _this.$qs.stringify({ 
                        mid:mid,    
                        name:userName
                        }))
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                           
                            if(response.data.data.isHave){
                                var thisData = response.data.data.meetingSeat;
                                _this.seatName = thisData.seatname + thisData.seatnum + '（' + thisData.name + '）';
                            }else{
                                _this.seatName = '无数据';
                            }
                        }else{
                            //alert("网络连接错误")
                        }
                    })
            },
          
            search:function(){
                this.popup2Visible = true;
            },
            editUser:function(){
                this.popup1Visible = true;
            }
           /* backCkick:function(){
                var _this= this;
                console.log(fn)
                var path = decodeURIComponent(fn.QueryString('way'));
                console.log(fn.QueryString('way'))
                if (window.history && window.history.pushState) {
                    $(window).bind('popstate', function () {
                            $(window).unbind('popstate');   
                            _this.$router.push({path: path, query: {}});  
                             
                    });
                }
            },*/
        }, 
        created:function(){
            
           //数据处理都必须在export defalut 里面，不然可能导致渲染的时候拿不到数据
            this.sign_source = localStorage.getItem('sign_source');
            this.mid = localStorage.getItem('mid');
            this.openid = localStorage.getItem('openid');
            this.phone = localStorage.getItem('phone');
            this.userName = localStorage.getItem('userName');
            this.meetingDetailShow = true;
            this.request(this.mid,this.phone,this.openid); 
            this.getUserSeat(this.mid,this.userName);
        },
        computed:{
            searchResult (){
                
            },
        }

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
.meetingDetail {
    background-color: #f1f1f1;
    height: 100%;
    position: absolute;
    width: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .blackBar{
        height: .3rem;
        background-color: #f1f1f1;
    }
    .meetingStatus {
        background-color: #f1f1f1;
        padding-bottom: .3rem;
    }
    .list{
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
             &:last-child{
                margin-bottom: 0;
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
                    font-weight: 700;
                    margin-bottom: .4rem;
                }
                .icon_2 {
                    background-image: url("./icon_2.png");
                    background-repeat: no-repeat;
                    background-position: center;
                    margin-right: .2rem;
                     background-size:.23rem .28rem;
                }
                .icon_3 {
                    background-image: url("./icon_3.png");
                    background-repeat: no-repeat;
                    background-position: center;
                    margin-right: .2rem;
                      background-size:.24rem .24rem;
                }
                .icon_4 {
                    background-image: url("./icon_4.png");
                    background-repeat: no-repeat;
                    background-position: center;
                    margin-right: .2rem;
                    background-size:.24rem .24rem;
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
                    margin: 0 auto;
                    background-size:.85rem .72rem;
                }
                .word {
                    height: .5rem;
                    font-size: .24rem;
                    margin-top: .2rem;
                    color: #178aff;
                    border-radius: .2rem
                }
            }
        }
    }
    .joinPerson{
        position: relative;
        padding-bottom: .3rem;
        margin-bottom: .3rem;
        background-color: #fff;
        .title{
            font-size: .3rem;
            padding: .35rem;
            .editUser{
                   position: absolute;
                    top: .16rem;
                    right: .1rem;
                    font-size: .24rem;
                    border-radius: .1rem;
                    height: .6rem;
                    }
            .icon_8{
                background-image: url("./icon_8.png");
                background-repeat: no-repeat;
                background-position: center;
                background-size: .25rem .28rem;
                margin-right: .2rem;
            }
            .icon_15{
                background-image: url("./icon_15.png");
                background-repeat: no-repeat;
                background-position: center;
                background-size: .25rem .28rem;
                margin-right: .2rem;
            }
            .total{
                font-size: .24rem;
                color: #575757;
                float: right;
            }
        }
        .content{
            .list{
                font-size: .28rem;
                color: #575757;
                text-align: center;
                overflow: hidden;
            }
            .cell{
                display: block;
                width: 33.3%;
                float: left;
                text-align: left;
                text-indent: .35rem;
                margin-bottom: .4rem;
                font-size:.24rem;
                &:last-child{
                    margin: 0;
                }
            }
        }
    }
    .meetingContent{
        padding-bottom: .3rem;
        margin-bottom: .3rem;
        background-color: #fff;
        .title{
            font-size: .3rem;
            padding: .35rem;
            .icon_9{
                background-image: url("./icon_9.png");
                background-repeat: no-repeat;
                background-position: center;
                background-size: .26rem .27rem;
                margin-right: .2rem;
            }
        }
        .content{
            font-size: .24rem;
            color: #575757;
            line-height: .4rem;
            text-align: justify;
            padding: 0 .35rem .35rem .35rem;
        }
    }
    .menuWrapper{
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        width: 100%;
        .router_link{
            flex: 1;
            .submenu{
                display: flex;
                flex-direction: row;
                flex: 1;
                height: .88rem;
                background-color: #fff;
                .word{
                    color: #575757;
                    font-size: .28rem;
                    line-height: .88rem;
                }
                .icon{
                    display: inline-block;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .icon11{
                    background-image: url("./icon_11.png");
                    background-size: .33rem .32rem;
                }
                .icon12{
                    background-image: url("./icon_12.png");
                    background-size: .31rem .31rem;
                }
                .icon13{
                    background-image: url("./icon_13.png");
                    background-size: .3rem .29rem;
                }
                .icon14{
                    background-image: url("./icon_14.png");
                    background-size: .3rem .26rem;
                }
            }
        }
    }
   
}

</style>


