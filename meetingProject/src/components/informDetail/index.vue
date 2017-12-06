<template>
  <div class="informDetail">
     <p class="message">
         <span class="from">发件人:{{from}}</span>
         <span class="time">{{format( time,'yyyy-MM-dd  hh:mm')}}</span>
     </p>
     <div class="content">
       <p v-for="item in splitWords(content)">{{item}}</p>
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
          format:fn.format,
          splitWords:fn.splitWords
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
      height:1.6rem;
      line-height: 1.6rem;
      border-bottom:1px solid #666;
      .from{
        font-size: .32rem;
        float: left;
      }
      .time{
        font-size: .24rem;
        color:#9e9e9e;
        float: right;
        margin-right: .4rem;
      }
    }
    .content{
      padding: .3rem .4rem .3rem 0;
      p{
        font-size: .28rem;
        color: #575757;
        line-height: .4rem;
        text-align: justify;
        margin-top: .2rem;
      }
    }
  }
</style>