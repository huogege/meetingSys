<template>
  <div class="daihuiren">
        <ul class="top">
            <li>
                <span>姓名:</span>
                <input type="text" v-model="name" @change="checkName(name)">
            </li>
            <li>
                <span>电话:</span>
                <input type="text" v-model="phone" @change="checkPhone(phone)">
            </li>
            <li>
                <span>部门:</span>
                <input type="text" v-model="dept" @change="checkDept(dept)">
            </li>
            <li>
                <span>职务:</span>
                <input type="text" v-model="post" @change="checkPost(post)">
            </li>
        </ul>
        <ul class="bottom">
            <li><mt-button @click="meetingInsue(phone,name,dept,post)" class="buttonReclass" type="primary">确定</mt-button></li>
            
            <li><mt-button class="buttonReclass" type="default">取消</mt-button></li>
         
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
          name:'',
          phone:'',
          dept:'',
          post:'',
          mid :'',
          path:'',

      }
  },
  methods:{
        checkPhone: function (value){ 
            if(!(/^1[34578]\d{9}$/.test(value))){ 
                alert("您的手机号码输入有误，请重填"); 
                this.phone = '';
                return false; 
            } 
        },
        checkName:function(value){
            if(!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(value))){ 
                alert("您的输入有误，请重填"); 
                this.name = '';
                return false; 
            }
        },
        checkPost:function(value){
            if(!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(value))){ 
                alert("您的输入有误，请重填"); 
                this.post = '';
                return false; 
            }
        },
        checkDept:function(value){
            if(!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(value))){ 
            alert("您的输入有误，请重填"); 
            this.dept = '';
            return false; 
        }
    },
     meetingInsue:function (phone,name,dept,post){
                var _this = this;
                var mid = fn.QueryString("mid");
                var sign_source = fn.QueryString("sign_source");
                var openid = fn.QueryString("openid");
                if(phone != '' && name!='' && dept!=''&&  post!=''){
                   this.$http.post(jjURL+'wxUserMeeting', _this.$qs.stringify({ 
                        openid:openid,
                        mid:mid || null,     //需使用qs库格式化数据才能正确使用post
                        phone:phone || null,
                        name:name || null,
                        dept:dept || null,
                        post:post || null}))
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(openid){
                                localStorage.setItem('openid',openid)
                            }
    
                            localStorage.setItem('mid',mid);                   
                            localStorage.setItem('userName',name);                                                         
                            localStorage.setItem('phone',phone);   
                            alert("注册成功！");                        
                            _this.$router.push({path: '/meetingDetail', query: {sign_source:sign_source}});
                        }else{
                            alert("网络连接错误")
                        }
                    })
                }else{
                    alert("请您完善信息")
                }
               
            },
  },
  created:function(){
   

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
            margin: 0 auto;
            margin-top: 2rem;
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
                    color: #656b79;
                }
            }
        }
        .bottom{
    
            margin: 0 auto;
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

