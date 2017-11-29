<template>
<div class="select1">
    <div class="title">
         <p class="word">{{voteModel.title}}<span style="font-size:.26rem;margin-left:1rem;">单选</span></p>    
    </div>
    <div class="content">
        <div class="list" v-for="item in voteOptionModels">
            <span class="word oneRowHide">{{item.options}}</span>
            <span class="barContent">
                  <span class="bar" :style="{width:item.percent*0.045+'rem',backgroundColor:'#'+('00000'+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6)}" ref="bar"></span>
            </span>
          
            <span class="icon">{{item.nums}}</span>
        </div>

    </div>
     <div class="insureStatus">
         <mt-button type="default" class="insure" style="background-color:#ccc" >{{voteWord}}</mt-button>
            <router-link :to="{ path: 'voteList', query: { mid: mid,action:action}}" class="router_link">
               <mt-button type="default" class="insure">回到列表</mt-button>
            </router-link>
        </div>
</div>
 
</template>

<script>
import fn from "../../common/js/index.js";
var url = "http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingVoteInfo"
var phone = JSON.parse(localStorage.getItem('userInfor')).phone;
export default {
    data () {
      return {
        voteOptionModels:[],
        voteModel:[],
        action:'',
        mid:'',
        voteWord:'已投票'
      };
    },
    methods:{
        request:function(params){
                var _this = this;
                var mid = fn.QueryString('mid');      
                var vid =  fn.QueryString('vid');   
                var action =  fn.QueryString('action');   
                _this.action = action;
                _this.mid = mid;
                _this.$http.get(url, {
                    params:{phone:phone,mid:mid,vid:vid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                var thisData = response.data.data;
                                _this.voteModel = thisData.voteModel;
                                    _this.voteOptionModels = thisData.voteOptionModels;
                                    _this.voteModel = thisData.voteModel;
                                    _this.oid = thisData.voteOptionModels[0].id;
                                    if(thisData.isVote){
                                        _this.voteWord = '已投票'
                                    }else{
                                         _this.voteWord = '投票结束'
                                    }
                                    
                            }
                        }
                    })
        },
    },
    created:function(){
        this.request();
    }
}
        
</script>
<style lang="less" scoped>
    .select1{
         .title{
             margin-left: .5rem;
            .word{
                line-height: 1.5rem;
                font-size: .34rem;
                padding-left: .1rem;
                
            }
        }
        .content{
             margin-left: .5rem;
            min-height: 7rem;
            .list{
                border-top: 1px solid #666;
                font-size: .3rem;
                line-height: 1rem;
                border-bottom: 1px solid #ccc;
                .word{
                    display: block;
                    padding-right: .5rem;
                    line-height: .5rem;
                    text-align: justify;
                }
                .barContent{
                         position: relative;
                        display: inline-block;
                        height: .2rem;
                        width: 4.5rem;
                        border: 1px solid  #575757;
                         border-radius: .2rem;
                     .bar{
                         position: absolute;
                         top: 0;
                         left: 0;
                        display: inline-block;
                        height: .2rem;
                        width: 0rem;
                        background-color: #ee472c;
                        border-radius: .2rem;
                    }
                }
                .icon{
                   display: inline-block;
                   height: .5rem;
                   padding: 0 .1rem;
                   line-height: .5rem;
                   border-radius: .2rem;
                   margin-left: .5rem;
                   background-color: #e4ebee;
                   text-align: center;
                   
                } 
            }
            
            
        }
         .insureStatus{
                font-size: .3rem;
                text-align: center;
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
