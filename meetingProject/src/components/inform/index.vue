<template>
  <div class="inform">
        <div class="message">
            <div class="nameDepart"><span >部门:</span><span style="margin-left:.2rem">{{dept}}</span></div>
            <div class="number"><span>电话号码:</span><span style="margin-left:.2rem">{{phone}}</span></div>
            <div class="name">{{name}}</div>
        </div>
        <div class="content">
            <myScroll class="wrapper"
                    ref = "scroll"
                    :data="list"
                    :pullup="pullup"
                    @scrollToEnd="getMessage(num,page)"
                   >
                    <ul class="wrapper-content"  >
                        <router-link v-for="item in list" :to="{ path: 'informDetail', query: { content: item.content,from:item.senduser,time:item.sendtime}}" class="router_link">
                            <div class="list">
                                <span class="status">{{item.title}}</span>
                                <p class="word">{{item.content}}</p>
                                <span class="time">{{item.sendTime}}</span>
                            </div>
                        </router-link>
                    </ul>
                    <div class="loading-wrapper"></div>
                 </myScroll>          
        </div>
        <button>按钮</button>
  </div>
</template>
<script>
     import fn from "../../common/js/index.js"; 
     import myScroll from '../../components/scroll/index.vue'
    export default{
        components:{
             'myScroll':myScroll,
        },
        data:function(){
            return{
                URL:'http://www.zaichongqing.com/jj_project/wapMeeting/manager/msgList',
                list:[],
                dept:'',            //部门
                name:'',            //用户姓名
                phone:'',           //用户电话
                page:1,
                num:10,
                pullup:true,
                listenScroll:true,  
            
            }
        },
        methods:{
            getMessage:function(num,page){
                var _this = this;
                _this.$http.get(this.URL, {
                    params: {phone:2,num:num,page:page}
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
            this.name = decodeURIComponent(fn.QueryString('name'));
            this.phone = decodeURIComponent(fn.QueryString('phone'));
            this.dept = decodeURIComponent(fn.QueryString('dept'));
          
        },

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
.inform {
     background-color: #f0f0f0;
    .message {
        font-size: .3rem;
        color: #fff;
        height: 1rem;
        padding: .25rem .5rem;
        background-image: url("./bmg_1.png");
        background-position: center;
        background-repeat: no-repeat;
        .nameDepart {
            margin-bottom: .2rem;
        }
        .name{
            position: absolute;
            right: .4rem;
            top: .5rem;
            font-size: .4rem;
        }
    }   
    .content{
        .wrapper{
            position: absolute;
            top: 1.5rem;
            bottom: 0;
            left: 0;
            overflow: hidden;
             background-color: #f1f1f1;
            .router_link{
                .list{
                    padding: 0 .3rem .2rem .3rem;
                    background-color: #fff;
                    margin-top: .3rem;
                    overflow: hidden;
                    .status{
                        display: inline-block;
                        padding: .1rem .3rem;
                        min-width:1rem; 
                
                        text-align: center;
                        background-color: #5ab155; 
                        border-radius: 0 0 .2rem .2rem;
                        font-size: .26rem;
                        color: #fff;
                        float: left;
                    }
                    .word{
                        margin-top: .2rem;
                        min-width: 3rem;;
                        font-size: .28rem;
                        color: #575757;
                        float: left;
                        line-height: .35rem;
                    }
                    .time{
                        float: right;
                        font-size: .24rem;
                        color: #aeaeae;
                        margin-top: 20px;
                    }
                }
            }
        } 
    }
}
</style>


