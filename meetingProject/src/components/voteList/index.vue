<template>
  <div class="meetingStatistics">
      <div class="noContent" v-show="list.length == 0">当前没有投票</div>
      <div class="eat" v-for="item in list">
          <p class="word">{{item.title}}</p>
         <span class="click" @click="handleClick(item.id,item.status)">投票</span>
      </div>
  </div>
</template>
<script>
    import fn from "../../common/js/index.js";    
    var url = 'http://www.zaichongqing.com/jj_project/wapMeeting/manager/';
    var phone = JSON.parse(localStorage.getItem('userInfor')).phone;
    export default{
        components:{
         
        },
        data:function(){
            return{
                list:[],
                mid:'',
                path:'',
                action:''
            }
        },
        methods:{
            request:function(params){
                var _this = this;
                var mid = fn.QueryString('mid');      //数据处理都必须在export defalut 里面，不然可能导致渲染的时候拿不到数据
                var action = fn.QueryString('action');  

                _this.action = action;
                _this.mid = mid;
                _this.$http.get(url+action, {
                    params:{phone:phone,mid:mid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                if(response.data.data.list){
                                      _this.list =  response.data.data.list;   
                                }                                                    
                            }
                        }
                    })
            },

            backCkick:function(){
                var _this= this;
                var mid = fn.QueryString('mid');
                if (window.history && window.history.pushState) {
                    $(window).bind('popstate', function () {                     
                            _this.$router.push({path: '/meetingDetail', query: {mid:mid}});
                              $(window).unbind('popstate');  
                         
                            
                    });
                }
            },
            handleClick:function(vid,status){
                switch(status){
                    case 1:
                        alert("该投票还未开始，宁可以查看其它投票");
                    break;
                    case 2:
                        this.$router.push({path: 'voteSelect', query: { mid: this.mid,vid:vid,action:this.action}});  
                    break;
                    case 3:
                         this.$router.push({path: 'voteResult', query: { mid: this.mid,vid:vid,action:this.action}});  
                    break;
                    default:
                }
            }
        },
        created:function(){
           // this.backCkick();
            var mid = fn.QueryString('mid');
            var title = decodeURIComponent(fn.QueryString('title'));
            var time = decodeURIComponent(fn.QueryString('time'));
            this.title = title;
            this.time = time;
            this.request();
            
       
        },
        mounted:function(){
            
        }

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
   
    .meetingStatistics{
        padding-top: .2rem;
         .noContent{
            font-size: .32rem;
            background-color: #f1f1f1;
            line-height: 1rem;
            text-indent: .2rem;
        }
        .word{
            font-size: .32rem;
            float: left;
            line-height: 1.52rem;
            margin-right: 7%;
            margin-left: 13%;
            width: 53%;
        }
        .click{
            display: inline-block;
            padding: .1rem.3rem; 
            font-size: .26rem;
            color: #fff;
            background-color: #2d95ff;
            border-radius: .4rem;

        }
        .eat{
            height: 1.52rem;
            background-image: url("./bmg_1.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100%;
            margin-bottom: .4rem;
        }
        .live{
            height: 1.52rem;
            background-image: url("./bmg_2.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100%;
        }
    }
    
</style>
