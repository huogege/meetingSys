<template>
  <div class="inform">
        <div class="message">
            <div class="nameDepart"><span>姓名:</span><span style="margin-left:20px">XXX</span><span style="margin-left:50px">部门:</span><span style="margin-left:20px">社保局</span></div>
            <div class="number"><span>电话号码:</span><span style="margin-left:20px">12345678977</span></div>
        </div>
        <div class="content">
            <div class="list">
                <span class="status">会议邀请</span>
            </div>
        </div>
   
    
  </div>
</template>
<script>
   
    export default{
        components:{
         
        },
        data:function(){
            return{
                   
            
            }
        },
        methods:{
        },
        created:function(){
           
        },

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
.index {
    .message {
        font-size: 30px;
        color: #fff;
        height: 100px;
        padding: 25px 50px;
        background-image: url("./bmg_1.png");
        background-position: center;
        background-repeat: no-repeat;
        .nameDepart {
            margin-bottom: 20px;
        }
    }
}
</style>


