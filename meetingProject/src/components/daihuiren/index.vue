<template>
  <div class="daihuiren">
        <ul class="top">
            <li>
                <span>待会人姓名:</span>
                <input type="text" v-model="cjname" @change="checkName(cjname)">
            </li>
             <li>
                <span>待会人电话:</span>
                <input type="text" v-model="cjphone" @change="checkPhone(cjphone)">
            </li>
        </ul>
        <ul class="bottom">
            <li><mt-button @click="meetingInsue(cjname,cjphone)" class="buttonReclass" type="primary">确定</mt-button></li>
            <router-link :to="{ path: path, query: {}}" class="router_link">
                <li><mt-button class="buttonReclass" type="default">取消</mt-button></li>
            </router-link>
        </ul>

    </div>
</template>
<script>
import fn from "../../common/js/index.js";   
import url from "../../common/js/url.js";
var jjURL = url.jjURL;
export default {
  data:function(){
      return{
          cjname:'',
          cjphone:'',
          mid :'',
          URL6:jjURL+'meetingCj',
          path:'',
          phone:''

      }
  },
  methods:{
     checkPhone: function (value){ 
        if(!(/^1[34578]\d{9}$/.test(value))){ 
            alert("您的手机号码输入有误，请重填"); 
            this.cjphone = '';
            return false; 
        } 
    },
    checkName:function(value){
         if(!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(value))){ 
            alert("您的输入有误，请重填"); 
            this.cjphone = '';
            return false; 
        }
    },
     meetingInsue:function (cjphone,cjname){
                var _this = this;
                if(_this.cjname != '' && _this.cjphone!=''){
                     _this.$http.post(_this.URL6,  _this.$qs.stringify({
                        cj_status:4,
                        mid:_this.mid,
                        phone:_this.phone,
                        cjphone:cjphone || null,
                        cjname:cjname || null
                    }))
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            alert("您的代会人信息已保存！")   
                            _this.$router.push({path: '/', query: {}});  
                        }else{
                            alert("网络连接错误")
                        }
                    })
                }else{
                    alert("请您完善姓名和电话号码")
                }
               
            },
  },
  created:function(){
      this.phone = localStorage.getItem('phone');
      this.mid = localStorage.getItem('mid');
      this.path = decodeURIComponent(fn.QueryString('way'));

  }
}
</script>

<style lang="less" scoped>
    @import "../../common/css/common.less";
    .daihuiren{
        font-size: .32rem;

        background-color: #fff;
        .top{
            height: 5rem;
            position: absolute;
            top: 2rem;
            left: 0;
            right: 0;
            margin: auto;
            padding: .5rem;
            li{
                border: 1px solid #2d95ff;
                border-radius: .2rem;
                overflow: hidden;
                margin-bottom: .2rem;
                span{
                    float: left;
                    line-height: 1rem;
                    text-indent: .2rem;
                    color: #2d95ff;
                }
                input{
                    float: left;
                    line-height: 1rem;
                    text-indent: .2rem;
                }
            }
        }
        .bottom{
            position: absolute;
            bottom: 2rem;
            left: 0;
            right: 0;
            margin: auto;
            padding: .5rem;
             li{
                width: 50%;
                overflow: hidden;
                margin-bottom: .2rem;
                float: left;
                text-align: center;
                .btn{
                    border: 1px solid #2d95ff;
                    border-radius: .2rem;
                    line-height: 1rem;
                    background-color: #2d95ff;
                    color: #fff;
                    padding: .2rem .4rem;
                }
            }
        }
    }
</style>

