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
                        <router-link :key="item.id" v-for="item in list" :to="{ path: 'informDetail', query: { content: item.content,from:item.senduser,time:item.sendtime}}" class="router_link">
                            <div class="list">
                                <span class="status">{{item.title}}</span>
                                <div class="content"><p class="word oneRowHide"  :key="item.id" v-for="item in splitWords(item.content)">{{item}}</p></div>  
                                <span class="time">{{format( item.sendtime,'yyyy-MM-dd  hh:mm')}}</span>
                            </div>
                        </router-link>
                    </ul>
                    <div class="loading-wrapper"></div>
                 </myScroll>          
        </div>
      
  </div>
</template>
<script>
    import fn from "../../common/js/index.js"; 
    import myScroll from '../../components/scroll/index.vue'
    import url from "../../common/js/url.js";
    var jjURL = url.jjURL;
    export default{
        components:{
             'myScroll':myScroll,
        },
        data:function(){
            return{
                URL:jjURL+'msgList',
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
                    params: {phone:_this.phone,num:num,page:page}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                _this.list = response.data.data.list;
                         
                            }
                        }
                    })
            },
            splitWords:fn.splitWords,
            format:fn.format,
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
    .content{
        .wrapper{
            position: absolute;
            width: 100%;
            top: 1.5rem;
            bottom: .2rem;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            background-color: #f1f1f1;
            .router_link{
                .list{
                    padding: 0 .3rem .2rem .3rem;
                    background-color: #fff;
                    margin-top: .2rem;
                    overflow: hidden;
                  
                    .status{
                        position: absolute;
                        padding: .1rem .3rem;
                        text-align: center;
                        background-color: #5ab155; 
                        border-radius: 0 0 .2rem .2rem;
                        font-size: .26rem;
                        color: #fff;
                       
                    }
                    .content{
                        margin-top: .5rem;
                        .word{
                            margin-top: .2rem;
                          
                            font-size: .28rem;
                            color: #575757;
                        
                            line-height: .35rem;
                        }
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


