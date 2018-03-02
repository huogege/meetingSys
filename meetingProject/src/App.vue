
<template>
  <div id="app">
    <mt-header title="会议" class="header" v-show="headerShow">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
    </mt-header>
     <transition :name="transitionName" >  
      <router-view class="child-view" :class="headerShow == true ? 'topClass' : ''"></router-view>  
    </transition>  
  </div>
</template>

<script>
import { Header } from "mint-ui";
import fn from "./common/js/index.js";
export default {
  name: "app",
  data() {
    return {
      transitionName: "slide-left",
      headerShow: false
    };
  },
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果
  watch: {
    $route(to, from) {
      if (to.path == "/") {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    try { //判断是否在APP打开
               if(window.AppJsObj){					
                  var flag = fn.ismobile();
                  if (flag == "1") {
                    this.headerShow = true;
                  } 
               }else{
                
               }          
             } catch(e) {
             }
    
  }
};
</script>
<style lang="less" scoped>
#app {
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }
  .child-view {
    position: absolute;
    left: 0;
    top: 0rem;
    width: 100%;
    height: 100%;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .topClass {
    top: .8rem;
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
}
</style>


