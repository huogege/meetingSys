<template>
  <div class="meetingStatistics">
      <div class="eat">
          <p class="word">会后是否用餐？</p>
            <router-link :to="{ path: 'select1', query: { name: '住宿页'}}" class="router_link">
                <span class="click">点击填写</span>
            </router-link>
      </div>
      <div class="live">
          <p class="word">今晚(10.23)是否需要住宿？</p>
           <router-link :to="{ path: 'meetingStatistics', query: { name: '住宿页'}}" class="router_link">
                <span class="click">点击填写</span>
           </router-link>
      </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .meetingStatistics{
        padding-top: .4rem;
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
            padding: .2rem; 
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
