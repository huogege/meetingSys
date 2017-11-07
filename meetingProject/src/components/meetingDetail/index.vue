<template>
  <div class="index">
      <div class="meetingStatus">
            <div class="list">
                <div class="status">
                    <span class="word">会议进行中</span>
                    <span class="time">已进行:33min</span>
                </div>        
                <div class="content">
                    <div class="left">
                        <h1 class="title oneRowHide">关于十九大会议精神的贯彻讨论关于十九大会议精神的贯彻讨论</h1>
                        <p class="time oneRowHide"><span class="icon_4">&#8195;</span><span>开始时间:</span>2017-10-18  9:30江津区大同路11号区常委会办公室</p>
                        <p class="location "><span class="icon_3">&#8195;</span><span>会议地点</span>江津区大同路11号区常委会办公室江津区大同路11号区常委会办公室</p>
                    </div>
                    <div class="right">
                        <span class="icon"></span>
                        <span class="word">扫码签到</span>
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
                   
              
            }
        },
        methods:{
          
        }, 
        created:function(){
           
        },

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
.index {
  
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
}
</style>


