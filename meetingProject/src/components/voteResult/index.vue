<template>
<div class="select1">
    <div class="title">
         <p class="word">{{voteModel.title}}<span style="font-size:.26rem;margin-left:1rem;">单选</span></p>    
    </div>
    <div class="content">
        <div class="list" v-for="item in voteOptionModels">
            <span class="word oneRowHide">{{item.options}}</span>
            <span class="bar" :style="{width:item.percent*0.035+'rem',backgroundColor:'#'+('00000'+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6)}" ref="bar"></span>
            <span class="icon">{{item.nums}}</span>
        </div>
         <div class="insureStatus">
            <span class="insure" style="background-color:#ccc" >已投票</span>
        </div>
    </div>
</div>
 
</template>

<script>
import fn from "../../common/js/index.js";
var url = "http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingVoteInfo"
export default {
    data () {
      return {
        voteOptionModels:[],
        voteModel:[]
      };
    },
    methods:{
        request:function(params){
                var _this = this;
                var mid = fn.QueryString('mid');      
                var vid =  fn.QueryString('vid');     
                _this.$http.get(url, {
                    params:{phone:2,mid:mid,vid:vid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                _this.voteModel = response.data.data.voteModel;
                                    _this.voteOptionModels = response.data.data.voteOptionModels;
                                      _this.voteModel = response.data.data.voteModel;
                                    _this.oid = response.data.data.voteOptionModels[0].id;
                                                       
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
<style lang="less">
    .select1{
        padding-left: .5rem;
         .title{
            .word{
                line-height: 1.5rem;
                font-size: .34rem;
                padding-left: .1rem;
                
            }
        }
        .content{
            .list{
                border-top: 1px solid #666;
                font-size: .3rem;
                line-height: 1rem;
                border-bottom: 1px solid #ccc;
                .word{
                    display: inline-block;
                    width: 2rem;
                }
                .bar{
                    display: inline-block;
                    height: .2rem;
                    width: 0rem;
                    background-color: #ee472c;
                    border-radius: .2rem;
                }
                .icon{
                   display: inline-block;
                   float: right;
                   height: .5rem;
                   padding: 0 .1rem;
                   line-height: .5rem;
                   border-radius: .2rem;
                   margin-right: .5rem;
                   margin-top: .25rem;
                   background-color: #e4ebee;
                   text-align: center;
                   
                } 
            }
             .insureStatus{
                font-size: .3rem;
                margin-top: 8rem;

                .insure{
                    display: inline-block;
                    padding: .2rem .4rem;;
                    color: #fff;
                    background-color: #2d95ff;
                    border-radius: .4rem;
                    margin: 0 auto;
                    margin-left: 2.25rem;
                }
            }
            
        }
    }
</style>
