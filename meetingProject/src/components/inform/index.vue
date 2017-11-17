<template>
  <div class="inform">
        <div class="message">
            <div class="nameDepart"><span>姓名:</span><span style="margin-left:20px">XXX</span><span style="margin-left:50px">部门:</span><span style="margin-left:20px">社保局</span></div>
            <div class="number"><span>电话号码:</span><span style="margin-left:20px">12345678977</span></div>
        </div>
        <div class="content">
           <router-link v-for="item in list" :to="{ path: 'informDetail', query: { content: item.content}}" class="router_link">
                <div class="list">
                    <span class="status">{{item.title}}</span>
                    <p class="word">{{item.content}}</p>
                    <span class="time">{{item.sendTime}}</span>
                </div>
            </router-link>
        </div>
  </div>
</template>
<script>
   
    export default{
        components:{
         
        },
        data:function(){
            return{
                 URL:'http://www.zaichongqing.com/jj_project/wapMeeting/manager/msgList',
                 list:[]
            
            }
        },
        methods:{
            getMessage:function(){
                var _this = this;
                _this.$http.get(this.URL, {
                    params: {phone:2}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                _this.list = response.data.data.list;
                         
                            }
                        }
                    })
            },
        },
        created:function(){
            this.$nextTick(function(){
                 this.getMessage();
            })
          
        },

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
.inform {
     background-color: #f0f0f0;
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
    .content{
        .router_link{
            .list{
                padding: 0 30px 20px 30px;
                background-color: #fff;
                margin-top: 30px;
                overflow: hidden;
                .status{
                    display: inline-block;
                    padding: 10px 30px;
                    background-color: #5ab155;
                    border-radius: 0 0 25px 25px;
                    font-size: 26px;
                    color: #fff;
                    float: left;
                }
                .word{
                    margin-top: 20px;
                    font-size: 28px;
                    color: #575757;
                    float: left;
                    line-height: 35px;
                }
                .time{
                    float: right;
                    font-size: 24px;
                    color: #aeaeae;
                    margin-top: 20px;
                }
            }
        }
        
    }
}
</style>


