<template>
  <div class="meetingStatistics">
      <div class="noContent" v-show="list.length == 0">当前没有统计</div>
      <div class="eat" v-for="item in list">
          <p class="word">{{item.title}}</p>
            <router-link :to="{ path:'statisticsSelect', query: { mid: mid,vid:item.id,action:action}}" class="router_link">
                <span class="click">投票</span>
            </router-link>
      </div>
  </div>
</template>
<script>
    import fn from "../../common/js/index.js";    
    var url = 'http://www.zaichongqing.com/jj_project/wapMeeting/manager/';
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
                var phone = localStorage.phone;
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
        },
        created:function(){
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
