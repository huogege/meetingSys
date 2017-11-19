<template>
    <div class="note">
        <h1 class="title">会议:{{title}}</h1>
        <h2 class="time">{{time}}<span @click="submit" class="submit">完成</span></h2>
        <div class="content">
            <textarea v-model="text" class="textarea" placeholder="亲，点击文字开始记录您的会议笔记" name="会议内容" id="note" cols="30" rows="20"></textarea>
        </div>
        <div class="menu">
            <ul>
                <li>
                    <div @click="delateText" class="delate"></div>
                </li>
                <li>
                    <div @click="handleClick" class="photo"></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import fn from "../../common/js/index.js";    
    var url = 'http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingNote'; 
    var url2 = 'http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingNoteUpdate';
    export default{
        components:{
         
        },
        data:function(){
            return{
                text:'',
                title:'',
                time:'',
                nid:''
            }
        },
        methods:{
            delateText:function(){
                this.text = '';
            },
            request1:function(params){
                var _this = this;
                var mid = fn.QueryString('mid');      //数据处理都必须在export defalut 里面，不然可能导致渲染的时候拿不到数据
                _this.$http.get(url, {
                    params:{phone:2,mid:mid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                  _this.text =  response.data.data.note;
                                  //  _this.nid  = response.data.data.

                            }
                        }
                    })
            },
            request2:function(params){
                var _this = this;
                var mid = fn.QueryString('mid');      //数据处理都必须在export defalut 里面，不然可能导致渲染的时候拿不到数据
                _this.$http.get(url, {
                    params:{phone:2,mid:mid,content:this.text}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!='' && response.data.rtnCode == "0000"){
                                  
                                    alert("您的笔记已保存")

                            }
                        }
                    })
            },
            handleClick:function(){
                alert("还在开发中！")
            },
            submit:function(){
                if(this.text == ''){
                    alert("请您完成笔记再提交哦！")
                }else{
                    this.request2();
                }
            }
        },
        created:function(){
            var title = decodeURIComponent(fn.QueryString('title'));
            var time = decodeURIComponent(fn.QueryString('time'));
            this.title = title;
            this.time = time;
            this.request1();
       
        },
        mounted:function(){
            
        }

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
            .submit{
                float:right;
                color:#fff;
                padding: 0 .25rem;
                border-radius:.2rem;
                background-color: #2d95ff;
            }
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


