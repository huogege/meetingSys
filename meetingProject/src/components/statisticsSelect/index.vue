<template>
<div class="select1">
    <div class="title">
         <p class="word">{{voteModel.title}}<span style="font-size:.26rem;margin-left:1rem;">单选</span></p>    
    </div>
    <div class="content">
        <div class="list" v-for="(item,index) in voteOptionModels" @click="handleSelect(index,item.id)">
            {{item.options}}
              <span class="icon" :class="index == currentSelect ? 'choose' : ''">&#8195;</span>
        </div>
    </div>
    <div class="insureStatus">
         <mt-button class="revise_btn">
            <span class="icon">&#8195;</span>
             <span @click= "revise" class="revise">修改</span>
         </mt-button>
        <mt-button type="primary"  @click="vote" class="insure">{{btn_word}}</mt-button >
    </div>
</div>
 
</template>

<script>
    import fn from "../../common/js/index.js";

  var url = "http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingVoteInfo";
  var url2 = "http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingCountUpdate"
  export default {
    data () {
      return {
        isVote:false,
        voteModel:'',
        voteOptionModels:[],
        currentSelect:0,
        oid:'',
        alert:'统计成功',
        btn_word:'确认统计'

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
                var phone = localStorage.phone;
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
                    params:{phone:phone,mid:mid,vid:vid,newoid :_this.oid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            alert(_this.alert);
                            _this.handleSelect = function(){
                                alert("请您先点击修改")
                            };
                        }
                    })
        },
        revise:function(){
            this.alert = "修改统计成功！";
            this.btn_word = "确认修改";
            this.handleSelect = function(index,oid){
                this.currentSelect = index;
                this.oid = oid;
            }
         }
    },
    created:function(){
        this.request();
    }
  }
</script>
<style lang="less" scoped>
    .select1{
         .title{
                padding-left: .5rem;
            .word{
                line-height: 1.5rem;
                font-size: .34rem;
                padding-left: .1rem;
                
            }
        }
        .content{
               padding-left: .5rem;
               min-height: 7rem;
            .list{
                border-top: 1px solid #666;
                font-size: .3rem;
                line-height: 1rem;
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
            }
         
        }
           .insureStatus{
                font-size: .3rem;
                margin-top: 1rem;
                text-align: center;
                .icon{
                    background-image: url("./icon_2.png");
                    background-size: 100%;
                    background-repeat: no-repeat;
                    background-position: left;
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
                .revise_btn{
                    display: inline-block;
                    width: 1.8rem;
                    height: .7rem;
                    line-height: .7rem;
                    font-size: .3rem;
                    color: #fff;
                    border-radius: .4rem;
                }
            }
    }
</style>
