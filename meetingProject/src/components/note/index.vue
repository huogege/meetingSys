<template>
    <div class="note">
        <h1 class="title">会议:{{title}}</h1>
        <h2 class="time">{{time}}</h2>
        <div class="content">
            <textarea v-model="text" class="textarea" placeholder="亲，点击文字开始记录您的会议笔记" name="会议内容" id="note" cols="30" rows="20"></textarea>
        </div>
        <div class="menu">
            <ul>
                <li>
                    <div @click="delateText" class="delate"></div>
                </li>
                <li>
                    <div class="photo"></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import fn from "../../common/js/index.js";    
    var url = 'http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingData';
    var mid = fn.QueryString('mid');
    var title = decodeURIComponent(fn.QueryString('title'));
    var time = decodeURIComponent(fn.QueryString('time'));
    export default{
        components:{
         
        },
        data:function(){
            return{
                text:'',
                title:'',
                time:''
            }
        },
        methods:{
            delateText:function(){
                this.text = '';
            }
        },
        mounted:function(){
          this.title = title;
          this.time = time;
        },

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
    .note{
        padding: .4rem .36rem;
        .title{
            font-size: .36rem;
            line-height: .5rem;
        }
        .time{
            font-size: .24rem;
            color: #9e9e9e;
            line-height: .6rem;
            border-bottom: 1px solid #9e9e9e;
        }
        .content{
            .textarea{
                width:100%;
                min-height: 3rem;
                border: none;
                font-size: .3rem;
                line-height: .4rem;
            }
        }
        .menu{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
             ul{
                 overflow: hidden;
                 li{
                    padding: .8rem 0;
                     width: 50%;
                     float: left;
                    
                    .delate{
                        height: 1.2rem;
                        background-image: url("./delate.png");
                        background-size: .9rem;
                        border-right: 1px solid #9e9e9e;
                        background-repeat: no-repeat;
                        background-position: center;
                    }
                  .photo{
                      height: 1.2rem;;
                        background-image: url("./photo.png");
                        background-size: 1.14rem;
                        background-repeat: no-repeat;
                        background-position: center;                       
                    }
                 }
             }
        }
    }
</style>


