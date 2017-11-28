<template>
  
</template>
<script>
 import fn from "../../common/js/index.js"; 
export default {
  data(){
       return{

       }
  },
  created:function(){
       var path = decodeURIComponent(fn.QueryString('way'));
       this.$router.push({path: path, query: {}});  
  }
}
</script>
