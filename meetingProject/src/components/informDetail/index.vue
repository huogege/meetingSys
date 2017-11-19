<template>
  <div class="informDetail">
     <div class="message">
         <span class="from">发件人:{{from}}</span>
         <span class="time">{{format( time,'yyyy-MM-dd  hh:mm')}}</span>
     </div>
     <div class="content">
       <p>{{content}}</p>
     </div>
  </div>
</template>
<script>
    import fn from "../../common/js/index.js"; 
      export default{
        data:function(){
            return{
               from:'',
               time:'',
               content :''   
            }
        },
        methods:{
          format:fn.format
        },
        created:function(){
            this.from = decodeURIComponent(fn.QueryString('from'));
            this.time =fn.QueryString('time');
            this.content = decodeURIComponent(fn.QueryString('content'))
        },
        mounted:function(){
          
        }

      }

    
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .informDetail{
    padding-left: .4rem;
    border-top: 1px solid #666;
    .message{
      height:160px;
      border-bottom:1px solid #666;
      .from{
        margin-right: 150px;
        font-size: 32px;
      }
      .time{
        font-size: 24px;
        color:#9e9e9e;
      }
    }
    .content{
      padding: 30px 40px 30px 0;
      p{
        font-size: 28px;
        color: #575757;
        line-height: 40px;
        text-align: justify;
        margin-top: 20px;
      }
    }
  }
</style>