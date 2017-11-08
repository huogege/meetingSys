<template>
  <div class="index">
      <div class="message">
          <div class="nameDepart"><span>姓名:</span><span style="margin-left:20px">XXX</span><span style="margin-left:50px">部门:</span><span style="margin-left:20px">社保局</span></div>
          <div class="number"><span>电话号码:</span><span style="margin-left:20px">12345678977</span></div>
      </div>
    <div class="newMessage oneRowHide"> 
        <a class="a_link" href="#/inform">新消息：12月12号，组织部邀请您参加“元旦活动讨论新消息...</a>
    </div>

      <div class="meetingStatus">
            <router-link :to="{ path: 'meetingDetail', query: { name: '通知内容1'}}" class="router_link">
                <div class="list">
                    <div class="status">
                        <span class="word">会议进行中</span>
                        <span class="time">已进行:33min</span>
                    </div>        
                    <div class="content">
                        <div class="left">
                            <h1 class="title oneRowHide">关于十九大会议精神的贯彻讨论关于十九大会议精神的贯彻讨论</h1>
                            <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间:</span>2017-10-18  9:30江津区大同路11号区常委会办公室</p>
                            <p class="location "><span class="icon_2">&#8195;</span><span>会议地点</span>江津区大同路11号区常委会办公室江津区大同路11号区常委会办公室</p>
                        </div>
                        <div class="right">
                            <span class="icon"></span>
                            <span class="word">扫码签到</span>
                        </div>
                    </div>
                </div>
            </router-link>
            

            <div class="list">
                <div class="status">
                    <span class="word">会议进行中</span>
                    <span class="time">已进行:33min</span>
                </div>        
                <div class="content">
                    <div class="left">
                        <h1 class="title oneRowHide">关于十九大会议精神的贯彻讨论关于十九大会议精神的贯彻讨论</h1>
                        <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间:</span>2017-10-18  9:30江津区大同路11号区常委会办公室</p>
                        <p class="location "><span class="icon_2">&#8195;</span><span>会议地点</span>江津区大同路11号区常委会办公室江津区大同路11号区常委会办公室</p>
                    </div>
                    <div class="right">
                        <span class="icon"></span>
                        <span class="word">扫码签到</span>
                    </div>
                </div>
            </div>         
      </div>
      <div class="meetingType">
            <div class="menu">
                <div class="submenu" v-for="(item,index) in submenuArr" :class="index == currentItem ? 'active' : ''" @click="selectItem(index,item.name)">{{item.name}}</div>
            </div>
            <div class="menu_content">
                <div class="list">
                    <div class="status2">
                        <h1 class="title oneRowHide">关于十九大会议精神的贯彻讨论关于十九大会议精神的贯彻讨论</h1>
                        <div class="joinStatus">
                            <span class="findOthers">找人开会</span>
                            <span class="refuse">不参与</span>
                        </div>
                    </div>        
                    <div class="content">
                        <div class="left" style="padding-right:50px;;">
                            <p class="from"><span class="icon_3">&#8195;</span><span>发起单位</span>区常委会</p>
                            <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间:</span>2017-10-18  9:30江津区大同路11号区常委会办公室</p>
                            <p class="location over_text_2"><span class="icon_2">&#8195;</span><span>会议地点</span>江津区大同路11号区常委会办公室江津区大同路11号区常委会办公室江津区大同路11号区常委会办公室江津区大同路11号区常委会办公室</p>
                        </div>
                    </div>
                </div>    
                 <div class="list">
                    <div class="status2">
                        <h1 class="title oneRowHide">关于十九大会议精神的贯彻讨论关于十九大会议精神的贯彻讨论</h1>
                        <div class="joinStatus">
                            <span class="findOthers">找人开会</span>
                            <span class="refuse">不参与</span>
                        </div>
                    </div>        
                    <div class="content">
                        <div class="left" style="padding-right:50px;;">
                            <p class="from"><span class="icon_3">&#8195;</span><span>发起单位</span>区常委会</p>
                            <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间:</span>2017-10-18  9:30江津区大同路11号区常委会办公室</p>
                            <p class="location over_text_2"><span class="icon_2">&#8195;</span><span>会议地点</span>江津区大同路11号区常委会办公室江津区大同路11号区常委会办公室江津区大同路11号区常委会办公室江津区大同路11号区常委会办公室</p>
                        </div>
                    </div>
                </div>    
            </div>
      </div>
  </div>
</template>
<script>
   
    export default{
        components:{
         
        },
        data:function(){
            return{
                   
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
               currentItem:0
            }
        },
        methods:{
             selectItem:function(index,name){
                this.currentItem = index;
                console.log(index);
                this.loadData(name,index);
                console.log(this.store);

            },
        }, 
        created:function(){
           
        },

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
.index {
    .message {
        font-size: 30px;
        color: #fff;
        height: 100px;
        padding: 25px 50px;
        background-image: url("./bmg_1.png");
        background-position: center;
        background-repeat: no-repeat;
        .nameDepart {
            margin-bottom: 20px;
        }
    }
    .newMessage {
        height: 70px;
        line-height: 70px;
        color: #575757;
        font-size: 24px;
        background-image: url("./icon_5.png");
        background-repeat: no-repeat;
        background-position: 25px;
        text-indent: 70px;
        background-color: #f3f3f3;
        .a_link{
            display: grid;
            text-align: center;
        }
    }
    .meetingStatus {
        background-color: #f1f1f1;
        padding-bottom: 30px;
    }
     .list {
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
            .status2{
                display: flex;
                padding: 35px 10px 0 35px;
                .title {
                    width: 60%;
                    font-size: 34px;
                    width: 530px;
                    font-weight: 500;
                }
                .joinStatus{
                    font-size: 24px;
                    width: 40%;
                    
                }
                .refuse{
                    display: inline-block;
                    padding: 5px 10px;
                    border: 1px solid #ff7e30;
                    border-radius: 5px;
                    color: #ff7e30;
                    margin-left: 10px;
                }
                .findOthers{
                    display: inline-block;
                    padding: 5px 10px;
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
    .meetingType{
         background-color: #f1f1f1;
        .menu{
               display:flex;
               border-bottom:1px solid #e5e5e5;
               .submenu{
                    flex:1;
                    height:90px;
                    line-height:90px;
                    text-align:center;
                    font-size:28px;
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


