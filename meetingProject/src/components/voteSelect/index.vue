<template>
<div class="select2" :class="isVote == true? 'mengceng' : ''">
    <div class="icon3" v-show="isVote"></div>
    <div class="title">
         <p class="word">{{voteModel.title}}<span style="font-size:.26rem;float:right;margin-right:1rem;">单选</span></p>    
    </div>
    <div class="content">
        <div class="list" v-for="(item,index) in voteOptionModels" @click="handleSelect(index,item.id)">
            <p class="word">{{item.options}}</p>
            <span class="icon" :class="index == currentSelect ? 'choose' : ''">&#8195;</span>
        </div>
    </div>
    <div class="insureStatus">
            <mt-button type="default" class="insure" @click="vote">确认投票</mt-button>
    </div>
</div>
 
</template>

<script>
  import fn from "../../common/js/index.js";

  var url = "http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingVoteInfo";
  var url2 = "http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingVoteDo"
  export default {
    data () {
      return {
        isVote:false,
        voteModel:'',
        voteOptionModels:[],
        currentSelect:0,
        oid:'',
        action:''

      };
    },
    methods:{
        handleSelect:function(index,oid){
            this.currentSelect = index;
            this.oid = oid;
        },
         request:function(params){
                var _this = this;
                var mid = fn.QueryString('mid');      
                var vid =  fn.QueryString('vid');   
                var action = fn.QueryString('action');
                var phone = localStorage.phone;
                _this.action = action;
                _this.$http.get(url, {
                    params:{phone:phone,mid:mid,vid:vid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                   _this.voteModel = response.data.data.voteModel;
                                    _this.voteOptionModels = response.data.data.voteOptionModels;
                                    _this.oid = response.data.data.voteOptionModels[0].id;
                                    _this.isVote = response.data.data.isVote;
                                    
                            
                            }
                        }
                    })
        },
        vote:function(){
            var _this = this;
            var mid = fn.QueryString('mid');      
            var vid =  fn.QueryString('vid'); 
            var phone = localStorage.phone;
            _this.$http.get(url2, {
                    params:{phone:phone,mid:mid,vid:vid,oid:_this.oid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            console.log("success")
                           _this.$router.push({path: 'voteResult', query: {mid: mid,vid:vid,action:_this.action}});
                        }
                    })
        },
        backCkick:function(){
            var _this= this;
            var mid = fn.QueryString('mid');
            if (window.history && window.history.pushState) {
                $(window).bind('popstate', function () {
                          $(window).unbind('popstate');
                        _this.$router.push({path: '/meetingDetail', query: {mid:mid}});  
                      
                        
                });
            }
        }
    },
    created:function(){
        this.request();
        //this.backCkick();
    }
  }
</script>
<style lang="less" scoped>
    .mengceng:after{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #666;
        opacity: .4;
        content: "";
    }
    .select2{
        .icon3{
            z-index: 5;
            width: 3.24rem;
            height: 3.33rem;
            position: absolute;
            left: 0;
            right: 0;
            top: 4rem;
            margin: auto;
            background-image: url("./icon_3.png");
            background-size: 3.24rem 3.33rem;
            background-position: center;
            background-repeat: no-repeat;
        }
         .title{
              padding-left: .5rem;
            .word{
                line-height: 1.5rem;
                font-size: .34rem;
                padding-left: .1rem;
                font-weight: 700;
                
            }
        }
        .content{
             padding-left: .5rem;
             min-height: 8rem;
            .list{
                border-top: 1px solid #666;
                font-size: .3rem;
                line-height: 1rem;
                .colorCircle{
                    font-size: .24rem;
                    background-color: red;
                    border-radius: 50%;
                }
                .icon{
                    display: inline-block;
                    height: .4rem;;
                    width: .4rem;
                    border: 2px solid #3879d9;
                    float: right;
                    vertical-align: middle;
                    border-radius: 50%;
                    margin: .28rem 1rem 0 0 ;
                } 
                .choose{
                    background-image: url("./icon_1.png");
                    background-size: .66rem .66rem;
                    background-repeat: no-repeat;
                    background-position: center;
                    
                } 
                .word{
                   display: inline-block;
                    width: 75%;
                    text-align: justify;
                    line-height: .7rem;
                }
            }
           
        }
         .insureStatus{
                font-size: .3rem;
                margin-top: 2rem;
                text-align: center;
                .icon{
                    background-image: url("./icon_2.png");
                    background-size: 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .revise{
                    color: #2d95ff;
                }
                .insure{
                 display: inline-block;
                    width: 1.8rem;
                    height: .7rem;
                    line-height: .7rem;
                    font-size: .3rem;
                    color: #fff;
                    background-color: #2d95ff;
                    border-radius: .4rem;
                }
            }
    }
</style>
