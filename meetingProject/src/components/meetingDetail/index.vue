<template>
  <div class="meetingDetail">
        <div class="blackBar"></div>
       <div class="meetingStatus">
            <div class="list">
                 
                <div class="content">
                    <div class="left">
                        <h1 class="title oneRowHide">{{meeting.title}}</h1>
                        <p class="from"><span class="icon_4">&#8195;</span><span>发起单位:</span><span>{{meeting.unit}}</span></p>
                        <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间:</span>{{format(meeting.stime,'yyyy-MM-dd  hh:mm')}}</p>
                        <p class="location "><span class="icon_3">&#8195;</span><span>会议地点:</span>{{meeting.addr}}</p>
                        <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>预计时长:</span>{{meeting.estime}}</p>
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
             <router-link :to="{ path: 'material', query: { mid: mid}}" class="router_link">
                <div class="submenu">
                    <span class="icon icon11">&#8195;</span>
                    <span class="word">资料</span>
                </div>
              </router-link>
             <router-link :to="{ path: 'note', query: { title:title,mid:mid,time:time}}" class="router_link">
                <div class="submenu">
                    <span class="icon icon12">&#8195;</span>
                    <span class="word">笔记</span>
                </div>
              </router-link>
             <router-link :to="{ path: 'meetingStatistics', query: { mid: mid,action:'meetingVoteList'}}" class="router_link">
                <div class="submenu">
                    <span class="icon icon13">&#8195;</span>
                    <span class="word">投票</span>
                </div>
              </router-link>
            <router-link :to="{ path: 'meetingStatistics', query: { mid: mid,action:'meetingCountList'}}" class="router_link">
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
    var url = 'http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingInfo'
    export default{
        components:{
         
        },
        data:function(){
            return{
                 meeting:{
                     type:Object
                 },
                 userList:[],
                 mid:'',
                 title:'',
                 time:''
              
            }
        },
        methods:{
            format:fn.format,
            formatMsgTime:fn.formatMsgTime,
            request:function(params){
                 var _this = this;
                 var mid = fn.QueryString('mid');      //数据处理都必须在export defalut 里面，不然可能导致渲染的时候拿不到数据
                 _this.mid = mid;
                _this.$http.get(url, {
                    params:{phone:2,mid:mid}
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
                    })
            },
        }, 
        created:function(){
      
            this.$nextTick(function(){
                this.request();
                console.log(this.userList);
                console.log(this.title)
            })
            
          
          
        },
        mounted:function(){
           
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
                    font-weight: 500;
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
                    font-size: .24rem;
                    margin-top: .2rem;
                    color: #178aff;
                }
            }
        }
    }
    .joinPerson{
        padding-bottom: .3rem;
        margin-bottom: .3rem;
        background-color: #fff;
        .title{
            font-size: .3rem;
            padding: .35rem;
            .icon_8{
                background-image: url("./icon_8.png");
                background-repeat: no-repeat;
                background-position: center;
                background-size: .25rem .28rem;
                margin-right: .2rem;
            }
            .total{
                font-size: .24rem;
                color: #575757;
                margin-left: 50%;
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
                display: inline-block;
                width: 33.3%;
                float: left;
                margin-bottom: .2rem;
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
            font-size: .28rem;
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


