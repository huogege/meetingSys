<template>
<div class="select1">
    <div class="title">
         <p class="word">会后是否用餐？<span style="font-size:.26rem;margin-left:1rem;">单选</span></p>    
    </div>
    <div class="content">
        <div class="list">
            是
            <span class="icon">&#8195;</span>
        </div>
         <div class="list">
            是
            <span class="icon choose">&#8195;</span>
        </div>
        <div class="insureStatus">
            <span class="icon">&#8195;</span>
            <span class="revise">修改</span>
            <span class="insure">确认修改</span>
        </div>
    </div>
</div>
 
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
<style lang="less">
    .select1{
        padding-left: 1rem;
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
            .insureStatus{
                font-size: .3rem;
                margin-top: 8rem;
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
                    padding: .2rem .4rem;;
                    color: #fff;
                    background-color: #2d95ff;
                    border-radius: .4rem;
                    margin-left: 1rem;
                
                }
            }
        }
    }
</style>
