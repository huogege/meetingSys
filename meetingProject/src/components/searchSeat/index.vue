<template>
<div class="searchSeat">
    <mt-search class="mt_search"
        v-model="value"
        cancel-text="取消"
        placeholder="搜索"
        :result.sync="result"
         @change.native="request"
        >
        <mt-cell class="mt_cell"
      
         v-for="item in result"
        :key="item.id"
        :title="item.seatname"
       
       >
        {{item.seatname ? item.seatname + item.seatnum + '（' + item.name + '）' : item}}
        </mt-cell>
    </mt-search>
</div>

</template>
<script>
import fn from "../../common/js/index.js";   
import url from "../../common/js/url.js";

var jjURL = url.jjURL;
export default {
  data:function(){
      return{
        value:'',
        mid:'',
        result:[]
      }
  },
  methods:{
      request:function(){
          console.log(1);
           var _this = this;
            _this.$http.post(jjURL+ 'getUserSeat', _this.$qs.stringify({ 
                    mid:12,    
                    name:_this.value
                    }))
                .then(function (response) {
                    if(response.status == "200" && response.data.rtnCode == "0000"){
                        
                        if(response.data.data.isHave){
                           _this.result=response.data.data.meetingSeat;
                           
                        
                        }else{
                            _this.result= ['无数据'];
                        }
                    }else{
                        //alert("网络连接错误")
                    }
                })
      }
  },

  created:function(){
    this.mid = localStorage.getItem('mid');
  }
}
</script>


