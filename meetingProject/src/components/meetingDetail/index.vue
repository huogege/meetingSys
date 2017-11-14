<template>
  <div class="meetingDetail">
        <div class="blackBar"></div>
       <div class="meetingStatus">
            <div class="list">
                <div class="status" v-if="meeting.status ==1">
                    <span class="word">编辑中</span>
                </div>
                   <div class="status" v-if="meeting.status ==2">
                    <span class="word">未开始(发布中)</span>
                </div>  
                <div class="status" v-if="meeting.status ==3">
                    <span class="word">会议进行中</span>
                    <span class="time">已进行:{{formatMsgTime(meeting.stime,meeting.etime)}}</span>
                </div>     
                <div class="status" v-if="meeting.status ==4">
                    <span class="word">已结束</span>
                </div>       
                <div class="content">
                    <div class="left">
                        <h1 class="title oneRowHide">{{meeting.title}}</h1>
                        <p class="from"><span class="icon_4">&#8195;</span><span>发起单位:</span><span>{{meeting.unit}}</span></p>
                        <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间:</span>{{format(meeting.stime,'yyyy-MM-dd  hh:mm')}}</p>
                        <p class="location "><span class="icon_3">&#8195;</span><span>会议地点:</span>{{meeting.addr}}</p>
                        <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>预计时长:</span>30min</p>
                    </div>
                    <div class="right">
                        <span class="icon"></span>
                        <span class="word">扫码签到</span>
                    </div>
                </div>
            </div>         
        </div>
        <div class="joinPerson">
            <p class="title">
                <span class="icon_8">&#8195;</span>
                <span class="word">参与人员</span>
                <span class="total">共33人</span>
            </p>
            <div class="content">
                <p class="list">
                    <span class="cell">社保局-张德兰</span>
                    <span class="cell">社保局-张德兰</span>
                    <span class="cell">社保局-张德兰</span>
                </p>
               
                <p class="list">
                    <span class="cell">社保局-张德兰</span>
                    <span class="cell">社保局-张德兰</span>
                    <span class="cell">社保局-张德兰</span>
                </p>
            </div>
        </div>
        <div class="meetingContent">
            <p class="title">
                <span class="icon_9">&#8195;</span>
                <span class="word">会议纪要</span>
            </p>
            <p class="content">监督学习认为人要把的 AI 来人要把的 AI 来说，你需要准备几千张照片，然后手把手教机器——哪张照片是猫，哪张照片是狗人要把的 AI 来说，你需要准备几千张照片，然后手把手教机器——哪张照片是猫，哪张照片是狗人要把的 AI 来说，你需要准备几千张照片，然后手把手教机器——哪张照片是猫，哪张照片是狗人要把的 AI 来说，你需要准备几千张照片，然后手把手教机器——哪张照片是猫，哪张照片是狗说，你需要准备几千张照片，然后手把手教机器——哪张照片是猫，哪张照片是狗。机器会从中学习到分辨猫狗的细节，从毛发到眼睛到耳朵，然后举一反三得去判断一张它从没见过的照片是猫猫还是狗狗。
而无监督学习认为机器要去自己摸索，自己发现规律。</p>
        </div>
        <div class="menuWrapper">
             <router-link :to="{ path: 'meetingStatistics', query: { name: '统计页面'}}" class="router_link">
                <div class="submenu">
                    <span class="icon icon11">&#8195;</span>
                    <span class="word">资料</span>
                </div>
              </router-link>
             <router-link :to="{ path: 'meetingStatistics', query: { name: '统计页面'}}" class="router_link">
                <div class="submenu">
                    <span class="icon icon12">&#8195;</span>
                    <span class="word">笔记</span>
                </div>
              </router-link>
             <router-link :to="{ path: 'select2', query: { name: '投票页'}}" class="router_link">
                <div class="submenu">
                    <span class="icon icon13">&#8195;</span>
                    <span class="word">投票</span>
                </div>
              </router-link>
            <router-link :to="{ path: 'meetingStatistics', query: { name: '统计页面'}}" class="router_link">
                <div class="submenu">
                    <span class="icon icon14">&#8195;</span>
                    <span class="word">统计</span>
                </div>
            </router-link>
        </div>
  </div>
</template>
<script>
    import fn from "../../common/js/index.js";
    var mid = fn.QueryString('mid');
    var url = 'http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingInfo'
    export default{
        components:{
         
        },
        data:function(){
            return{
                 meeting:{
                     type:Object
                 }
              
            }
        },
        methods:{
            format:fn.format,
            formatMsgTime:fn.formatMsgTime,
            request:function(params){
                 var _this = this;
                _this.$http.get(url, {
                    params: params
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                 _this.meeting = response.data.data.meeting;
                                 //debugger
                            }
                        }
                    })
            },
        }, 
        created:function(){
          this.request({phone:2,mid:mid})
        },

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
.meetingDetail {
    background-color: #f1f1f1;
    height: 100%;
    position: absolute;
    width: 100%;
    .blackBar{
        height: 30px;
        background-color: #f1f1f1;
    }
    .meetingStatus {
        background-color: #f1f1f1;
        padding-bottom: 30px;
    }
    .list{
            background-color: #fff;
            margin-bottom: 30px;
            .status {
                height: 50px;
                .word {
                    float: left;
                    display: inline-block;
                    padding: 10px 40px 10px 20px;
                    border-radius: 0 20px 20px 0;
                    color: #fff;
                    background-color: #57cb4e;
                    font-size: 26px;
                }
                .time {
                    line-height: 50px;
                    font-size: 26px;
                    color: #666;
                    float: right;
                    vertical-align: middle;
                    margin-right: 20px;
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
                    padding: 35px 0 35px 35px;
                .title{
                    font-size: 34px;
                    width: 530px;
                    font-weight: 500;
                    margin-bottom: 40px;
                }
                .icon_2 {
                    background-image: url("./icon_2.png");
                    background-repeat: no-repeat;
                    background-position: center;
                    margin-right: 20px;
                }
                .icon_3 {
                    background-image: url("./icon_3.png");
                    background-repeat: no-repeat;
                    background-position: center;
                    margin-right: 20px;
                }
                .icon_4 {
                    background-image: url("./icon_4.png");
                    background-repeat: no-repeat;
                    background-position: center;
                    margin-right: 20px;
                }
                p{
                    font-size: 24px;
                    margin-bottom: 20px;
                    line-height: 35px;
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
                padding-top: 20px;
                text-align: center;
                .icon {
                    display: inline-block;
                    width: 100px;
                    height: 100px;
                    background-image: url("./icon_1.png");
                    background-repeat: no-repeat;
                    background-position: center;
                    margin: 0 auto;
                }
                .word {
                    font-size: 24px;
                    margin-top: 20px;
                    color: #178aff;
                }
            }
        }
    }
    .joinPerson{
        padding-bottom: 30px;
        margin-bottom: 30px;
        background-color: #fff;
        .title{
            font-size: 30px;
            padding: 35px;
            .icon_8{
                background-image: url("./icon_8.png");
                background-repeat: no-repeat;
                background-position: center;
                margin-right: 20px;
            }
            .total{
                font-size: 24px;
                color: #575757;
                margin-left: 50%;
            }
        }
        .content{
            .list{
                font-size: 28px;
                color: #575757;
                text-align: center;
            }
            .cell{
                margin-right: 20px;
                &:last-child{
                    margin: 0;
                }
            }
        }
    }
    .meetingContent{
        padding-bottom: 30px;
        margin-bottom: 30px;
        background-color: #fff;
        .title{
            font-size: 30px;
            padding: 35px;
            .icon_9{
                background-image: url("./icon_9.png");
                background-repeat: no-repeat;
                background-position: center;
                margin-right: 20px;
            }
        }
        .content{
            font-size: 28px;
            color: #575757;
            line-height: 40px;
            text-align: justify;
            padding: 0 35px 35px 35px;
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
                height: 88px;
                background-color: #fff;
                .word{
                    color: #575757;
                    font-size: 28px;
                    line-height: 88px;
                }
                .icon{
                    display: inline-block;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .icon11{
                    background-image: url("./icon_11.png");
                }
                .icon12{
                    background-image: url("./icon_12.png");
                }
                .icon13{
                    background-image: url("./icon_13.png");
                }
                .icon14{
                    background-image: url("./icon_14.png");
                }
            }
        }
    }
}

</style>


