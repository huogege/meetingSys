<template>
<div class="select2" :class="isVote == true? 'mengceng' : ''">
    <div class="icon3" v-show="isVote"></div>
    <div class="title">
         <p class="word">{{voteModel.title}}<span style="font-size:.26rem;float:right;margin-right:1rem;">单选</span></p>    
    </div>
    <div class="content">
        <div class="list" v-for="(item,index) in voteOptionModels" @click="handleSelect(index,item.id)">
            <p class="word">{{item.options}}</p>
            <span class="icon" :class="index == currentSelect ? 'choose' : ''">&#8195;</span>
        </div>
    </div>
    <div class="insureStatus">
            <mt-button type="default" class="insure" @click="vote">确认调查</mt-button>
    </div>
</div>
 
</template>

<script>
  import fn from "../../common/js/index.js";
  import urls from "../../common/js/url.js";
  var jjURL = urls.jjURL;
  var url = jjURL+"meetingVoteInfo";
  var url2 = jjURL+"meetingVoteDo"
  export default {
    data () {
      return {
        isVote:false,
        voteModel:'',
        voteOptionModels:[],
        currentSelect:0,
        oid:'',
        action:'',
        phone:''

      };
    },
    methods:{
        handleSelect:function(index,oid){
            this.currentSelect = index;
            this.oid = oid;
        },
         request:function(params){
                var _this = this;
                var mid = fn.QueryString('mid');      
                var vid =  fn.QueryString('vid');   
                var action = fn.QueryString('action');
                _this.action = action;
                _this.$http.get(url, {
                    params:{phone:_this.phone,mid:mid,vid:vid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                   _this.voteModel = response.data.data.voteModel;
                                    _this.voteOptionModels = response.data.data.voteOptionModels;
                                    _this.oid = response.data.data.voteOptionModels[0].id;
                                    _this.isVote = response.data.data.isVote;
                                    
                            
                            }
                        }
                    })
        },
        vote:function(){
            var _this = this;
            var mid = fn.QueryString('mid');      
            var vid =  fn.QueryString('vid'); 
            _this.$http.get(url2, {
                    params:{phone:_this.phone,mid:mid,vid:vid,oid:_this.oid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
    
                           _this.$router.push({path: 'voteResult', query: {mid: mid,vid:vid,action:_this.action}});
                        }
                    })
        },
        backCkick:function(){
            var _this= this;
            var mid = fn.QueryString('mid');
            if (window.history && window.history.pushState) {
                $(window).bind('popstate', function () {
                          $(window).unbind('popstate');
                        _this.$router.push({path: '/meetingDetail', query: {mid:mid}});  
                      
                        
                });
            }
        }
    },
    created:function(){
        this.phone = localStorage.getItem('phone');
        this.request();
        //this.backCkick();
    }
  }
</script>
<style lang="less" scoped>
    .mengceng:after{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #666;
        opacity: .4;
        content: "";
    }
    .select2{
        .icon3{
            z-index: 5;
            width: 3.24rem;
            height: 3.33rem;
            position: absolute;
            left: 0;
            right: 0;
            top: 4rem;
            margin: auto;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUQAAAFNCAYAAAB45RYOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxYjUxZWY0NC1jYWQwLTYyNGMtODRkYy0xMmUxODcwYTlmOGMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTgzNDk2REVDQUIwMTFFN0E0MDI5NDQ1NjI2NUJDMTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTgzNDk2RERDQUIwMTFFN0E0MDI5NDQ1NjI2NUJDMTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzY2MjcwNS0yNGY1LWYwNDQtOWUwZS00MjA4YjE2MDAwMmEiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5MTk5OTU4OC1iZmFkLTExZTctYWMzMC1lZDdlYWFhNzYwZTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5yPQm0AABTzklEQVR42ux9CZhcV3nl39Xdaqlbu1qtzdola/Ei75tsbLxiIEAwJkDYIUAICWQSkpAZMswMSWaSzBdIgCQMYUkIJhizGhsvGBsj75u8SLJk7fvaLbXU3ep13ul3ruqpXPXeq+56975X9Z/vu1+11NVVr17de+7511s3NDQkCoVCoRDJ6S1QKBQKJUSFQqFQQlQoFAolRIVCoVBCVCgUCiVEhUKhUEJUKBQKJUSFQqFQQlQoFIrRoWHhHav1LtQwtt6yZvjRmwd13oMZUvCzAcqaBr2/GdQ7p6hKQtRbUNOo94iwnpZCLmAxDBUhwgGQYRGSrFpwkxjvjTneuNIbM73xJEe7tzEMqaCoDkGghFibGMPvvBFkyJEjyQ0FiM+Q34BRhQWjVtDsjeu9cZk3LvTGVG9c7I0N3viON9bqlFKFqMgGciS+Rn7PIMNx/LmeRNdP0usvMgYDxDhMllBENaQOJ3gPt3rjd0iGjfzV+d54E57iPecvlRSVEBXpJcD6ABFO4BhLMhSSW583TnL0eKOXBNgXUIA1R4BFsNgbf+qNM0v8HmT5ijde5n1UKCEqUoJxJL/J3phIU6+R5AjC6/bGCQ783EVC7Cf51Wmg5FVY6Y2lEc+BcjzPG4/p7VJCVLj93iZzTCIZjgsowR6S31FvdHijM0CAQRVonMraFPPVOEeiA0gXiO9fVEJUQlRYRB1N3xYSYKs3pokfAcV3OEDl1+6NIyTBrgKTWFEezAYStkbwPfwByXO9NzZ6Yx1NaYUSoiKB72ciyQ9jakANQuUd98ZBEuFRDqjBvrhvoGkjJYFgyTHe81LAhrOQA0D0+QXx03Ke9cZObxzi96KbkhKiYoRqsJnE1+aNWSTDFv6uhypwvzf28efODH22ej4Gq6Rykk/7ESpeEbdpPk974xfeeD3vfSFw739O18TF/J7meWO5+AEXKMVnvPE8B4IvB6jcFUqIihCSMKSAgeRfRDbPoDqppzlsSPAAH49SCbr0/+F6m8T3XWKYFJ+Ggp/NGGlSt0kRCo6+gp97OU5WiER3eeNz3pjijdX8PIN8fXzWr3njC944zO8J/sQrvHGVN1aRGFd44w0kR/gZf+2N57yxW/IpTYo0LcYF379C74JbwPyd7o25JMIF4vsGe7jYsHh2UJEcpcLotbiYjP+ymY/B0ZjSe9rH+xccxqdazgbSSHP4NRwTaRJDPT5Cd4V5vSbeoxneOEv8YMvF/E5nkAD30pT+lTfuFt/vqHAIrVRJD6CuFnljGUkQ5WGTSHYgQTjot5MIj0veyZ+0xdDChW0ex0n2yvVMQvqEIkrTpB2dCDz2hxDrRhLZg3xNBKwOyav9tCa3E/7cbTSXz+RAas5F3jiXZjXI9V3i+ykfFt/nuI3XolCTuabQQnP4TJLhDH4PJ6geNnljD03jYwmbxCZ/cQJV6bgacE80c7QG/r+bm04nR3fB35n/jwso0a0kuUf4HS+harxc/Kj0hRyvo+KEVHncG0/xWhRKiFULKAvkDM4WP+EXimEW1eAeLhwQ4QaaYUkS4CSafhP1+z/tvhjXhVAxHuM4WoQg42IoQKZIxbmH3/8l4vslMQ9QEfMb4vsfEXz5OU1qEOp+/WqUEKsJ9SQemMZwusPZvpBKBebwczSb8PNhEmSl3z+YwD1Gv5LY62Kq5FNueiWf5I4xMAqCfInjG7QQUBd9Hc3p13LAUviJN+4V38/YLXb9xkqIikQwjzv/RVSEwGZO+KeoDLskUDlSAYwJLOYJUkPtuhLEGKrH6QHVd4RjNJsYVOO/euMBbpjorIOo9Pk0qz/qjZ+SGB+hNaFQQswUQEJnkwQx5nKH30AiNGkXnVK5IAlMcpO8PUG/gkRRF3A5LOD3eJijr8zXGiCpHiM53ueN73rjBm/czNf/kPhBGJDm98QP7iiUEDMBmMbXiO88X0lywkSHTwh5aJu4ACpFglNJghP11jvdACeQvI6RGI+USY79kq80gtWACPU9NJ+voasFjSYu5jy6l5vrLr39Sohpw1iaw2dxAp9HstpNNYjI4YviR40roU7gD2zjo5rD6UJQOXbwO+8YgTtkO8caKkJEoq8NWB34+W4SI56j6TpKiKkAiOl8TlBM2ilUgQ9xoj4kI49QBoGkX6RuTJf0JkMrTt+4pnBAKSJzABHjk2W+DvIdfyR+riKU4m+KXwmDYAyi05eK37n7XirT46I100qIjiY8Umje6I0baSqDqFCa9TOaNUjmHW3j0Ckkwsl6yzOLRs6V2VSLIMb2Ml8DZHeHN+4S/2yX3xbfx3glB6pnEJy5nxtyr952JURbwMS+SfzcsfO4I8Mk/rH4vsKDVIUjTc2opxKcSXNcUT0wKVDYKPdxrpQzT7q56e7j49s4FxGR/jPxfYz/IX4uo/a4VEJMHJdzZ76ZZsseKkJ0RXl0BDt/oZKYKfnKFUX1AhvdAvErlkzXorhBmG4qwm3il/z9gMQIt827uEm/kRv0w1IZl40SouI0rKRp/GbxS7AwyX5IEwb5hDuk/JQLgyaqTqjCnN7qmlt/qGGfRbWIDTaunxHpPms50FpsPdXiWRwgxu9QLW7WW62EWAmgugMpD+/jLowIItId4Oi+TXx/zUjRRIWAmlqNFtc2crQMEKRDIGWXlBeAeYikuIab9tXiFwQsIjHeTjXZrrdaCXGk5it2bSTI/hYnFVIo7uTkWiMjrzkeQyKcrkSoKEAd50Ur5xeIMW6ABGY3EreRjvN28atcMG8/LH5i95f5exCuOW9boYQY20T+iDdu4c6NQntE8f5NRlaREDSPZqhprIhBjG0kRvgYkdMaN53mODftzVSLsGzQWemztHb+3RtPiHbuVkKMAfjy3sQddhXVHJzT8MU8KCNLrsbknkky1PutKNeUnkXVuJsqMErZ4ffHaMVsET8a/VFaO+8Xv4nEf3rjq3yeQgmxKM6kKnwniRE7LPyEiOLBcT2STiMoq0Mts6bPKEa7TudzY91BKyUKfXwuBg67gu/7LZKvrz+bSvIh0f6LSogBoB74HO6e7xA/D/BhmsdQhyPxFaK3Htp8aY2xopJAIA41zcaNEzelBiYyWo69wHmOElMEClFlBd/iDyXZPpxKiBlAPScWyqH+iASGVAb4WP6Rk2ckrzmXr6sBE0VSmEjTdz/VX5zkbtQ7/wcV4zbxS03xGn9OS+bbfL2arnKpZUJESsJ7vfFuyRfjf8sb/yJ+CkO5mExSbdL1qrAA45ueQrXYEeNv4F+ET/Epms9/SlJEwAVpOp8XPz2nZhvR1iohnsNJcBN3W3Sl+T/iB04OljkhkKID/06rrtFhIBDQLKcfT1rsmNI6joaAujZKJ3hEZx9/NseMmiNHT/KxW0aeFF8tZjSOPEU6zfYY9wL3EhHmO6ka4TfH2dNoTDuJShF5tgdq8WbWGiGib93N9KPczAmBhpwInqDqpNxOIa1Ul7V2Hxu5eMzJfGaMc6SQ+7nIzQgeGlUrpWuttFK2kRyjgAjz3ZI/yuJ3xO+kg80dnXS+KDXYobuWFjL8esjJ+rj4eYbI2v+K+D7Dck3kMTS5a6ELTTPNsomSP6CqKYXz2PQiLEaWwQOjOkiUQ1W6npeQHLdItD+wl2QIUoT/EEFF1Ov/Hr93qMWnpYZaitUCIdaRvJBO82HugKgA+Jr4wZNyO1hP5etV473LkVSmBkZTFczx4IFRhiTbJX8uSkeVLXps1OeSFOPMb9yLfyD5/RfxOzl9Qvya6P8tfpPjo0qI1bHAYdJ+WvzkVKgCHDz+32kqj+S12qpsswABmgOUoATra2Tem88snBdHaWoeJIkMVsFnRG7tAZrRcT4Pkrl7uDmgSgslf2NpSd3N+zJU7ROjmnE+d7y38ItEEuo/i98BpBy00BSphoPc60nqppmARsXzRzNM5vfcT3LcLyPrdJ0m4Ds2Z/vEOWoAZ0N/SvxD0T5DExrZE0jN+RcZfdNjJURHQLNMpBW8mZ8TivDvxU9QLecMClStzJVs5xVC3c7kZ9Fa6njrYibHEE3KvRxZDNJgI0dlCnIWowIlffyc/0xXAlLTzqOVBVfRl2R0XZ6UEB0AKQS/y0eTbA2f4bNlKilE26ZmmAShDkxDiVowhZNSj8YHaYJxu0gsfRn7HDgnfLz4ZalRydyGFBFwgT/xtXxspFJ8vhrN52ojRERB0Qvuv1EhHiEZwjG8r8wd9cyMmsgw+87g0AOpkiPHsyVfKXIgQ+QwlfN6Ywy1i9//gKICA9UtCEy2kix/WW2kWE2ECF/Yb9JMXs7J+g3xu3rsK3PCLM6YoqqnElzATUFhR4HP4oBfbRvJMQs+NmNCb5Z4Uej7xO+2A18qukHdynl2jEqxasr9qokQ8UX9PslQKOv/n8RPLsXuD1/h7Ax9ZtNEYr5oow6XGMt5Z87ZQbpLR8qvuZ5W0B4SeZTSQ67u/6Aa/pA3riMp/oX4x6AqIaYI7xc/MraKX+5fe+Mn3NXiTo6lkp1Ea0zERVSF2kQiXSb1HI7DVGD7U37NEABIwkagJMyviN/h3JZ/InmiwOFSWmTgkbuUEN0DDuK3ih8BW8ld7Is0leOaLmO4s7dk4PMib85UIijSjWkcx0mMCMSkNbdxcmD9hJm/uH5kaSCJG0GXPxb/tL96uhDuVEJ0+yWiFA9NGuZx0v2N+C2O4uaNNdPUGZPyz9pG82aK8kwmN+1V/P420YJJIzFCEMCviPzDqOMF8Dn+lkSI5hBX82coZOT4ZrbZRlYJsZlk+GmS4T6S4bclvoN3Ms3kNAdPWknYSoTZB/y953LOvUzFmLYILYTBWSS8KB8oSO9/UwH/mTeuFD+9C///K8nomS1ZTdDFGcmf5K57jMRYDhm20UxOKxnCR3iZ+FUCSobVR4xIdL5G/MTvtKGeayNOiWofLTIka3eS7D/P9akK0RJ+gzsS5D26/6L65N4ydiQ4vOem9LMZf+Z80WBJLZjSyJVF1PYlSde5JqYhCvJYowKTqP1G0QNyFtFT9ELxy2Xxee5XQkz2S7qGyhDRLUTvEEBBl+u4B3CDaGalVKkvpOLV9JnaApQYgmXbJTqoYRtzOR+3hzwHZj8CLP/GNQqxgr6KqIOGr/QBJcRkCAM3GRUoiGohpeHLZZLhQvo40gYsBnTwblFuqFmASBbQetlAAkqLf3EWzegtEc+D0v1HugR+l+sUhIhsj0eUECs7WdC15lO8yfAZIq3mnyTecYxG/k9P2edqotk/W/lAQTRyc4QyQwVIWnoQtnEdbYkg6h5abRAwf+iN68kxfyL+Ub6pr2hJe1DFFKSjfhItvNCW6T+oDg/F/PvFKSTDeSR3JUNFMUymRbQiRWt0OtdSlG8bJP518btLIeiymoR4bgb4JvUKEdFWnPWAFkTIlEc2/DfFz+WKAyjDNCUxw5xYlUKCVqRTDCyhyYo2/0dScE2tVIibI563m0pxLNcuAqEoEdwr8avHVCEWwQeoDpF3COfsX3JyxDmHdkHKiAdm0DVKhooyAd/yFSlSi9O5tsJgyvzgU/yh+O6h94h/Vkuqm4+kVSFid0QLczhnEQiBU/Z/eeOJMkzStOR4NVIVztK1rRilWgQZPSPuU3SwthAw2RHyHChJnP/8t1wDbxS/KQRiAF+QlHYFSqNCrKeSQrI1Ej038QY+HPPvEalLi29uGj+LkqGiEoC6eg03fNeYzbUWhUfFr2hB9QqCM38gfpu+8UqI8cgQReZwwl4ifhQZide3l7FzpSXpGjmFqDQZq+tYUeE1AovjohRYeHNjbvY4vOpfxY9S4/nokIOgYuoaMKeNELHjwGd4HSU3MuB/HPNvW2P4NmyZyCDzZaLVJorkAGK5KgVKa77EC1zeJv7pfWi8gnSzP0yJ0k0tIaJsDak17yGpIGyP9v97Y/wtJsXiFHyGiZykM3S9KixgPOeba5fM4hjEjBSc74hf9wyVi3QcVLUsTNMNTVNQBWSIQ2zQzOBJ8cP26yQ6Y39sStTYHJoyephT8c1uPE2k4Gjk73Ly6hZsPYFHLCbUynZx4GecnDigt3Z4DcN8xjGjG8RNhUsd1+BLEh4sgbhBF3sEh5CO81viV+UgRtCRlpuZBsDXBmcrgigI16OV1+MxzdPl4v4wJaRELKnxhYmNydTlYlNDAGAyH5Pyox7nQjIDuXpoNnCoBslyCS2Up8UvYLANsxZfkvB+iC+TABGUQSXL+8WPVt8mKTji1TUhmlPMPkUJjYmMsrzvxzT3l4nboAWu4QKpvSgy8srMyX7mwPuJjkzG8byOIJASgoDcAaoS9B7cJ+ntWF0ptHEdPeGIXIy1ti7iXiOX+O+5ecKqQnodErbvqXVCnCT5QnBI/R+J7zeMg0Xi1qEME+8SqY1+heYwKzjBEVlslXQHjHJcbBhn8f+gWvaQHGGm7axSFYmN6UqSoota6PFcm6+EPAdr/S5+N7Np8n9M/HrnfS5vnktCrKO6+gAX2L30LxyI8bezxG1JHqoHLpXq7lCDe7yYY7ZkP2IOk24+B1QUGg1s4UApWmeVuS+uoPl8wMH7Y22ekOiA6Ndp6uMYgteKf0YLTvFz1m3bJSFCKn+au8kBKsNnYpg1k8VtuB7vf5lU5yHwIL4VHBOlugGFv1zyx9Zi8SIoAR92RxV8vgZaMM9RFdvGPBJbmEqFW+MrnHeoZEGg5THxT8zsdXXTXAA7yG9743U0ZXCG8t0S7Qxu4o7iSq1MpTKspiauqKZBJ5KVUtuH3JtD56FU4M96iaM7w5/JtM6rl/Amr0m9N4KkL0j4oW8wk78qvu9xKVUimj8/7OKGuVjY9dwN3k41eD9N5cMxbrDLjtKt3HGrIa2mgQSIxTJHFIUwZytfR9X4rITX7aYd5/I73+xgnmHNvijh6UAo60N+4n+n4Hgf7/d2FwvDNrALvJOSGrsDzng9GOPvFog7nx0iqXD85jK+0Cfxc8BdoSWF8TbvsziQAfEkFU9/Bj/LSn6ejZbft4Vrd2vIc2BWoxADriicpomz1k16jtUjTRscTLB3i3+OKxThbdwdos5Rnibuqj9gRl0o2Q4qoMYbuZ7LRcsJR2Mh3Cx+cwUEK+DvztpRm+akyfUOBMWxCCsQR4F8kcS9ihYkuoZbTcWxqXga+CFvFd8X+KD4OYddEXIaz3VV3tOWcTKcSzX+QfEDJUqGlVE8IEX09sNxmxMydv1LaMbaxkKu5VKAEkQA6J/FT49CBgqCLFb7h+Ysvg92p0/wy3iJHzwqJcA4Zl2Y9q00L7NIIrNJhO+RlNWKVhEaOT8+TmLMUgoW1uIiy+/ZwLUctp5gKaKzFfKRB6jIPyQWMzpsEQ2Sl98vfm4Uyq2QYhPnzFY4tl0kXyO15mLJXgAFJH6NIwVQq6gnMSJwAR8j+v/1ZuC64ReFL9RmsGg813RYGhDM6q9zDqO0D92vHuF9TdyfaIMQGyh/f4f/hk/grjJunm3ABLpcspVagyMW0PXkfMl+4CerQF4jEr7h/3pI/IBh2nEulZjNc06wpjskvOs3fLTfpihZQMsSeaKbqsFkRmUAfIeIcHbyg74Y47pc5BuiRO2yDJEh7g98nB/lo5Khe2Ajf4P4qSNzMjB/zhe7VV/mOISouYrKta9Rgb+FKjxx2FhAqFO+lfIcCdiosYxqUYSUHNtpIdjhL5XspKO0cdHdJCnsPKwYJkN8Pyg+aEo5KV4sdoNDWGNRne2RnI3m0EjXgQ/x93idmSZE7D7vpDrcQN9AVPE2vhjbKTY57kBZiBhix0TaEiLHeq5z+gF3EWp10+zXbaBlZHNjnRmx3lC0gdQmpOIg2IL4wxuTvsZcwgsXOYdX0lSG/F0v4bXKuJ5FDkxl+H2mZWBxgQDhZF6t5nGmgIWPhGMcrtSc0muEarNZiVXHtR42j9EgAgnbv+S/YWnekFVCxKJ9A+Uu6hK/GYPo5jgw/+DPOCPlC6qO9/O9GSFuRXGs4IaW1lSoiVS0tjBOov2sqGL7svjtxHD/0B0rsZZ7SREiSBAdsJHvhHpENHxFec5QxM2x3WgVfrjlKV9EcDe8h2ayqsLsA0EXuJGuk3Smdc3kurVp9YyLMJ3vFL+QAz/DtfWOpNZCEi86hvb+Jfz3fd74Xoy/W2h5wSORNu1VKMuoKM5QHqk6IID3fvFzXtOGM0mMNk3nKKCq7QkqShBiIpHxJAgIcvYPyfwo0L6LvoAwTBe7/fdMMm1a02swSa7xxi2S7gilYnRA8BDBscUpvLbzxV71zQSJLtFDbuI9kk8Vep8kEAStNCHCMYsE4ZtJOneI37whipxsN3w9R9LbALWZO+AVyhc1AawZ5OlembLraqAFZcusnxfxXr3kk/tIhB+TBCL3lSbEJdzxYDbvpDqM6nMIc9Bm9+m5Ep0D5QrYJT8gWn9ca4DqQcOIt0m6OrHDf32WpfdqlGjXEFqv/Zv4WSswsxG1n5pWQmzklwp1iCRsNHzcEGN3nGnxCx5PdZhGgATfK7XdtbrWAcXzbklXowhUmtnKd50p0YUR8CP+XPwALczmy6WCcYBKEuJ53ngTf94m/rkIR2LIZFtBDXNkaBoje6gpxaHd6i9UINPi/WK57VUEkKdrIx2uTqLdZ0i/+ab4bQPnUIRNriRJVAqvpR8EjSBxRsIuCU+zmVhpuRuBZSlVX/C5vlE0pUZxuqn6HnF7mFoQpkGLDfEyVcL9+0i9wZEOKOtDYwr4269LGyFC6l9LqQ8G/75EdxO2+WUjmTmNkbzrSIgKRSHG0mpIiz8ZRGWrh2IUN6CP6j+KXwaM595cKXGVq9BrQOFcSHUIU3mrhJfoITXHVp/Dekr+NOUb4lpQ9H+prntFCOCXf7ukpw56uaV1O17Cq1GgDHFcKUr6EH2+WioUpc9V4O8Rsb1G/ERJNMj8boy/s5lovEzS5aQGGf6G2C2RUmQX2NBx6NLKFFxLzqK4OCPGOsKZTJto/ZnGD3Wj/YCjgWlMioAK/IXoavtyDOlti6Ami/1W6VFAfffZus4VZa7TN4vdkrqw9Tvfwvu0RJjBhm8e478vp8XVONobPRpAFaJ5I8LyOCFrTYrUIT7buSkzlW/kNSkUI7Es3pKSDX6F2Ik6R3EF+iM84I0t4p/Xgt6goyq4GA0h1vMiXsOff0nGDsM0sdf+CDI6TVFlROEv0nWtGOWau8WSQgsDos428nmbJbxmeYiEiNHEezOqYO1oCBGdYpApjnwpRH1+TcZOgzrEjUxTQ87LORSK0QIm4du4/lwCddg2ulNFtQfbRzHWToH2BhlFxHk0hIiSnrfy55+K3902Sh3a6nW4UtKT13c21aFCUSlADb1LEuwLmKJ1Nk6ie4A+TZUIoLXaiH2tI/0wsNOv5C6B9t7m7IMw2Cr/aRX7fRVLYR53LIUiCSvobeK2ugnXYCO/N4o7Nouf7od0HPg3L5QRdrIaKSFiZ7iaP+PM1I0Rz4cvz0ZkuU7SkZ4g3L2hoOt17SoSAtxVt4jbwCEauiR9MFuLhMcD0DsB1SvmNE+IkPNsEiIipTgBC0mRt0v0wVG2FNtcSUcgpZETtVnXrCJhLJAKlq6NAFBiNrrOR3HIDvE74Zyk9XqJLUKEPX8pWXud+MGUzggfwGRLX8yKlExS7FBtulYVloDF7zK39QwLa3yyhMcgwEHolQjXHSpdLhjJNY2EEJFmcxXVIcgQTRwGU6AOkZ81JiWTc6WuUYVl3OxwE4bJbiNpPIxLwEG7xT/QrpfrsOxznMslRPjDcAzgUhLhgxKeagPV1mrhRsFETUPzBpjs1+raVDgA1sBbHYoCkHHS3ataJTxYApX4M5rPyJO8Ucr04efKfC6iPabSAjWEP41Qh61iJ/1lsbg/HwWO5TeJtvFSuAMI6XUO3z9pX2IuQmAhuIIg70v8N1x7M8pZk+UsXsji60k+PeLn/vRG/M0MC18CdsQ0tEhC2ZB2u1a4xtnizp84zYJFGMYpqFw55I213ugjL6xOihChgFBtgVA/0mx+HfF85CraSMRekgJ1iAl4lq5FRUrgcnNO2pc4TsLrlUGKOMvpOfGPJLhBykgLypXxPPjHLqJN/rg3norhU7ChDhc4nnwTOQEVirQAydpvdGi2J60So7jlGZrODRRxc+NyXVxCRD7dZfQRIM8HSZAHQ55fL3aOB1go7hOfbxY9C0WRPqABxPmO3nupBdINW/cwl5ESeDRgNscqDIlLiPAN3MiFD4flyzGen3RwoUHc+w5hKi/WtadIKVBDP97B+0IhJpmXGBVcATaQFEGEb4prsZZDiOfx+ffRPg+DjRPDIINdnmEL1Xy9rjlFigHfmSt3zhILpBtlNt/Lny+Jez1xCLGJSmiB+C12wLxHIp4/IeGbUZcCdXi9aGmeIv1AkMNFKzwENJIMqk6QcFfVcfFrm0+IH5leHOd6cjE/2Gq+GGqWt8VQk0mjTdyekzJX9BgARXaAzdt2JgZES9KNbKNU4raANXsV1+2oCXEpCdHI0G2jvMhKYIHDyYUv+kZdY4oMYbKMsNnBKDFPko0lRIkvU02HtmDozhVZUhvnYs/kCyEZG2Ux+yN8FkmbkVCq0x1OrnPFTsK5QlFJXCH2AyxNCa+VZgnPMYRr7wmaz6iDXh7FeVGEWEeTGY8HaTKfdGwuzxV3/d8aJd8HUqHIEpCze40jlZgkwjgHlXSoWnmF/4YfsW00hGj6HgI4VW+7hNcuJ517WGfhBofhYnGTxqBQVAJoeNBq+T2nS7LBlSjOQS4i8qZR53xelNkcRYgwlxGl6hY/8/tQhDxuyfjNjZL/l+qaUmQYEBRXOXjPJEVMi4RHm6ESHyQxrpCI0wKjCHEZJeZe8WuXu0Oea6MJrEt1eIlDMlYoKoUVYr9v4jxJ1s0Vxj1w8aHMeBvJ86wwKy+MEBv5xy00lV+g7CyFpE8AQ9qAq2DGWHETpVMoksBrHKyfJOMLYdyDCPMeb6wPWL1njoQQkdltOtSCEBGpGQp5nYkJ39RZ4q7X4EWi9cqK6sGZDlRikmeyT4zghk7Jxz8QJJ49EkI8i1IXoWs4JftGcUGVwBxHk6eBhKhQVBNs+8OTFDRxBBliIOjBgAq3K8olRHSSOIdsCrm5OeLNku69BvO91dHEQUWKlugpqg2IttrMmEj6OJEoDgIZ4mgBpB8tlRLdckoRIoIH5/IRL/KCY0LE7uIi97BONLKsqE7UO5jbsxN87SgO2hcQdos56uMQYh39C6Y7xA6OMPWWtIKa6WjS4B5M07WjqFKsErsdo2YkKGyaIz4LmjwgsII0nPkUfGPjEGIT5TQYFyHr7RLejDHpzja4RlelehfomlFUMUAINs8yh7maZDZKFBft5ABxzpMiaXSlCPEcXvh+EuJAyJskHV2eLm6iy8htWqRrRlHlsN1VO8nUuSgugsmMBtfwnSKw0hCHEFEKM4sSdHuEuWxDIbrKPVwl7mqmFQpbmGPZAktyPUdxEQLEu7muDcdFEiKefBF/t0HCI8z1krz/0IW5XCcRJT4KRRXhPIvvNUHKOAWvTDRLuHvvKAUeKu4Q4Jm/8I7V9XFM5mBAJazdV0vCKqpF3KS8zLfgClAo0oKzxK5bKqn0mzoJ76cA1982b3SREBcXknPhTYBNjSz2Pg4kZQ85NJdbHU4QhaJW0CzJd7e2ZfVFcdIB8avuEOA5o5BAc0VebDHt/Fckujt20omdUx1MDtyTZbpGFDWGlRbfK8l1HcVJhyV/pvzKQtFVSIjj+IR62tlHY5i01UaICyQ5H4dCkVacadFshiJtSvC1w4AWhlsDhDgxjBCnSr4TxAYJ73/YQNmZFGwcR1AMy3VtKGoQEEM2T7JMquChScIP1IK5jHaGPbyG2QvvWJ0rRYgTJX/wOmr/jtSYOgSW6NpQ1CiWWnyvJBO0w7gJlu9GEiPM6zlhChEvhAoV9D08JuHnpySt3lwQYpvoEQGK2oXNQoQk13cYN/XSZD7BtT4lyIOFhDiHKhHKEP7DgQiJndUdpBQW65pQ1DAmi73afQiv+gTN/zCgdO9g4DNPKkaIuLhWEhHs8Ocl/MiAJBVinbjJA1RCVKhKtAOs8aTS9qK4Cdav6aCNjJK5xQixgRIS/4fQ9KCEn7CXpEJsEfv1yyYvSaGoZdgUBUm1DYziJpjL+2gBTwgSaJB00GILyZlIxEaEuSdCctZn8EaFYY64O6JAoUgL5oi9Gv6k1nm9hLcCg+W7g8QIq3h6KUKcR0JEi5ywCHPS54tMcDQRFIpaR5PY6x8wIeHPUQonKfpO0FyeV4wQ6wOqr0fCS/aSJkQX/sO5uhYUimHYch0luc7DOAplychFRDbNeAlkluQK5CsYu5f2dX8NKcQ6VYgKhXVCRNwiqaqwMI4C742jQhwKmtdBQoRMXiD5Ltm9jgjRXKxNwI8wRteBQjEMm+IgqbzfMI5CMAWB480UQ4sX3rF6WiEhNvBFICe7JTwHMUlCTLqlWDG06RpQKE5hskWBkFT6XhhHDUm+fM983sYgIdaTqZFmg5KWLglPuWnK4A0KwwxdAwrFKdSJvcBKUiXAURzVT0IcJA82BAmxgX4DkFG7+FHmPocK0TZUISoUbtaEK0KE73ITxR/iJzODhAi/4UQqRcjJAyEKMSfJ5uu5aL01Xee/QuFkTSS13qN4qotmcxfJf1ahydwbIMcJUtqPl/Q5rrZN5iZxk/eoUCghJhtADeOqIYo+k8Rdb0xlI49N59i9fHKpPMQGCwRlE5Nczbi3zrhu+PGx9rWyp/eQLkEPr51ysUwZM7HoPam2+7Vq/FJ514K3yJ6uffLFLf+etsuz1VwlyfXeIOEduzrFb2IDYmxeeMfqcbkAS0/mzwiqHIl4k2oixMmuZtz/vfJ/Do/LpqyqapL7P2d/enjxx8GnV3285D0Z7f3CdXzzkr8ZJt00YHHLPHn7srfITfOuTePXNkGSLc81qEvQ6oziKhxJ2sHPinZkQ+YPEG0xidhjSIquCLHR8hc/Kc1ksvWWNbGe5+1uoUSAhWcDhdfxpfM/J29YdIO8cdFN8omHPyO/bH/SmRrDNTQ3jpNnD71w6jrw/yCmctHee8zZZ7GEOq6NI5ZUYp8DQjTqEJ9znLfWeswf1EveZ3iSirHLEWHZJsQpUuWASbb+8MbQ50xvniat46bJoe7DcrDr8Gm/WzHNP1Ui6jWK4a9e+pKc07pC5k08Q75+7RfkC8/+sxPz8K8v+vNhMtxxbNdp7w+TdSSbBe7FLx/8QLVPnYmWCLHR0euOI++BjIe8zbzOECJCzvAhmrK9sSGEmKRCHCP2k7IzEVAppQDjKEgQQBQJGRX5wI6H5U9f/Nui7/H6ERAAfH1X3/dbw6bq1XNXy6fO/9ipa7IFqFSQeldft3zuqb8re7Mohi1Ht0sNwNbaSCoJPIqrQIRwRrdRpU43f9BCEoR8PMFRCrkM3pgw6JEBFvD+J/5EvimvJkUTWAgqVeBN82+SS6dfUPS1Cn9XSOBBfHLRe4ZNduCrL37rVWZunM2ihmEr4yOpuEEYVyFovIsKGJ8TE++UQoT/cEDyHW/C6piTdLQ2VvGXPrw4iznQP3nuR+TDfe8+pTw+8eznhn+ePaa1ou+PYAKCFqVMZuDaeVfJXa3Fj+i965pvlFRL5prjkOLFMy+Q59s3DP+fCSwUAsRZCoW/K0WI/23Z78qHzvbv68+23GeN+OL6fYMuibh/872XfxS6AWRULCS17qO4qpMicDIFYXtDgYk6KPnuD70OyMkFIVpLBJ/dPPOUPy4I+NeK4aa2q4Yf4derBJDOUuz9g4AfEaPUwq2EUgQxG6W2+cSO4UVuAELG+z+0c43s7zp42t8a4iz2u0IYE908Pw5hK5ytDVeNmU2+dTfN5yFDiJO5GyDafJS2d6+Di69zcFOsddb5zrYfyeMHnzn1b6SQAP/64rdlXYfvx0L08hR5rHjH8OPje5+p6HXAZ1boDzQ+xGIKxKiXQj/mSKPXQbN17fFNsjbwflCnIMSfbL9HfrD/F0UJsdjvgnjohv88tckUfh6Q8Zeu+mu5c8s9iSutsMg/gLxKzIFi30chbGYKOCDEpOISuQiuwefDgttDC3l2A1XhONrxpuD5pCPSarD8hVvNeRxe/Mc35QlRfEIEGQYXOEzlvzrvT4YXNQIBiNRG4fbVX/ZM123DP6c00dcaTvR1Dd83+AwL7wNcBog2n1PCLaBwtz4sCyxYwu0kxBwFYbMhoJNUhGOpFodSpuKqyUQPBRTM31z+2VNm69898+XQqgyYgzANL5p53vAwCrCWCfH2V34iz3S8eNrmA8CnaMz+zzz1V6E+1bj427VfqeZ8xPqMv0+UNXucfNZK7jvYQFVmVGE9d4UhRzfJtkJsSNsMxOJCHmBzQ7N89vG/DjUNh83qJ/5EPnnoPcP+SQMoxDCEOfFhlpUyzcoNFpQKIgGvTzCH7xu7flh0ozEBFpjRIEuYrKP1i8IvW8Ww5durc3T9jSRC8N1wdk0wMRujj78YE2E2Z+3GlEKqumTDVF7WslA+/MinfWKLWa8bVw3CPzmSnLsolMrJKxVECkNLY+WD/sZvaNSz8R0WBnRKISyYg9eoYtiyoOodfT4EVeAm3Ee1OLGB/4FZOI4k2MkbcVIU1gBz7p3Lbhl29h/Z1nFabl45CAsUQH3arK4oDCKtnHzmKZUGFOYgAiYYUk4eYtjnNmQIvyGi9WazAQoDOlGEGBXMUaReiRYDapmPURxNbShQZnW8uC79juzhf136meEFa8zdUrl5oyVE2ygMIhUi7HOWk4dY6nMHyRCAK0K7CpUFW1HmfkefD0nZcBcioILilFPNHQ6TJdEkcaqE+xCTxEAtzDIs1PctvfXUv7FgYcoZBz1+j3+H1RcXmpmlchmLoVxfYBjipIyUQqHJumjSguHAED4vSgjLMV0L8YEzflP++ILfG763iDgbUlSUhR5L7zPk8DOC9KfwGvY30H6H3xDJiQ00n+tCLnIwwYsbrNaZBf/gn5/1Cbl01gWvSnwubHhgTFuTpwYyDCMd5KiBEEEUWUKhyYpkaqBYPXU5pmswZw/NHL65/rvyF5f+sfXPV6qyJ7iRAfMnzo18rqkkqlIMOOITU7J8gqbzyUKTuZ9EiCd2OiAt2zuFtWocmGqvnXvlKcXy5L5nTpl+O0/sKfo3WPSf6f7kcGAC5FiMBEC0aGtliCIOohKGXQElfcDPdz84qteZ0Tz9lJJEFN40lrWNuAElzIlKVAElgD5L75PUuo/iqgl8730kxeGgygCVoTlPBS/S6MistW0yW/VdIGACH+Htu+4eJsitc6MV3Vee/8awukG982MPvbpT9Bcv/h+nTO4sO/yRomMCH6PN68PG8NCeR4um39jEH/36L0J/b4JMwy3Jnv9q6HMRSArzq2bcYht0+LonaR0PE2RDYCfAHzdRQh51pOJsE2KfzTcbScADi/rWJW8aVhCoXoHiMUBk2iRjw/8Yhkr6DUthpI0HoHI/cvb7hn/+9obbR30dadkY4l4HKmuinlsq4p5RUzYthHhc8pV6EITdJtx9iDY0/t0W8UJJ3qQ+y1/4ScmA3xKpIjCzoRCMnw2KyqSwoBY6y9USt1395aLNW7MKuCQq7ZbARoPXtJxFYCv1LilLLYqrekiGk3gNh41CRE2f8RmOl/CO2UmamS467EAut6R5gcFMRvt9pJCAFO9q/sYpnxP8ZJ9/+Z9iLdJyUKqhQ6VhGjEUa96qcA5bUeakiDeKq1Bm1Mz3b/fmfHfhMaRgVARYpkrpqpFqJMTUAwoQpAgYMnxq33OnmdAjAcxuqM44vRfxHDwXI+6hUcG/hR/MwBz0tJVVLsWatypqhhCTWvdRXDWZPIccrmPe5t8UPHVvMCAxx4cQYpJm7YADEzYTSeiIlH7uotNTR1ZOWzZMaCMBCA2pHjC7oTpN78Uw4LS7s1qXDz//Rzd9czi9JS6RwiwOBgXQwGI4Fem5v5EPPvAp7VqdThy39D59Dl4X/GZKlDv4eOoY0l6OHCVkjwN735VKTLVChJJCay/kIxrTEj5DqEP43UBoT77+J8M+xbhKDUQGQjPnjCAaGiciC8f/m+//4KlkauT6/fj6r0emtSASbq79fz7+d8PXj1zM+1733WGSjasMjW9Oy+eqTiy4UIh1kj8pYIA/Dxb6EPFvbPlHQ5Ra0oQIph5r8UvvtPVGUGUHe9uHfYJRJIJKCxNdNkBqDdpWDZfDvew/5+PnfmCYXHBOybuX3zocpTVpPYXvjbphcxQnAP8jFFrhc8NUH54Lxz7qlHGSHa4PZH3tlquG+zYWvhbIF5FwkGHwGNKZzTOGzzrB337y2EfkhUPr5UTfidNqn+NgUuNEWT55yfD1hJUJjhSVPsYhY7C1Nlz5EIWcZ3o6dDUEGNqk2kyjSmyvEYXYYeuNULsLZXbaFuwRxWPta0/9GyfEmQTuIBF+bf23X6WMoOruOfCwfPLMDwwTnSFGpLDc9vIdpwVb/uHyz58q7yv2eiAu0zTVVEXg2koB5IPqGXNuCchtfGPzaT5NkLCpGMH1BJUgWvo/fXDtMKHjusy1jbSGe7TJ3GYTMhUtiHgjHSa4IVV5Z5tiOGbhPfoTdJOFcZU5KgWBleGUm623rOkP9gPcRzKC/3CRNw6UsMFNNUtSrbp6qpUQg8RnFh3KyoKqCiQBcjHVLN/adHuoSWkU2xc3fkM+uPBWefPim4d7Kf509/2nPQ8R3I+vfL/c9soPSpqcwcVvOk5HAaS75sBTw41WoTYLSRMqtK15etFIOAgdA26B1W0XyYTG8dLS2CKLJs0v+95WIiCDprIGwdpwcy+SUKApxpCE5yOnfb0PxRBvUyj+ThgBWLfg+1eYX77dG39PQvwDuIxCJDOyRJPqJYhVucziF4+8yw+naSaWKtOLi+AhTuWYhvDnGeKuZFcYvLbLLjPms6EfZNR9KXRlxPmb0bhQ4MZI6ZEPUIdfsvA+iPA+lpClGeZ/gaB7nTdwcNFeb3zdU4gbgwoR9hFm7WSO+gibPylCtK0Qj6ZtJo42aDCSBQzCSipY4brlVjmfzWbAJm4/Rkdot/Q+SQU1o/ySDeQwvP8Rcx25AiLqkfxpVPWjeLPR4ITlL/6kWAysKBQZwUFL75NUJDtKWI0hx53kcwcW3rG6LldwYT1kTnSBaKkRQrT55SsUSoh21nvUyaFjyHV9NK8HPZN5KEiIx+k3wJPaIhRikmbtMFtb/vIP6PxXKJysCReEaLp6NQXM9t5Ck/kwbwLYc+ko3qwS6KzSL1+hyAKGLCnEIUmuGiaKoxCBHkcBeNwQc5AQ4fnewp+X88m1Qoj7dQ0oFKfQIXbygbsStAbjBFUmUgAe9czlk4WECFN1E1kbh/zOkNK5hr2SbF/EY5YnwCFx01hCoUgjdlt6n6TU4VDEeoY7cAoJEebyqUyTwuP/jkg+UXlRwMYu9oZJ+hFtE+KQxUmgUKQduyy9T1LrvCdCsEEdTiX/tQeJOVdEwm7jzwvIoGFyt1oI0eYkUCiUEH0klQMcxU3gPXNI/cEwQoTMNAWbc8SvWimFJLvE9Ir9BG0lRIXC973ZSrlJihCjuAkmczN55kjw+bkiNv0eyk34ECc7UogiFmuMCZjMg7oeFDWO3WLn9MveBDkk6nWbOCC6OiXgb8wVISE0eUCy4nQJD6wkTYhHLE+EXlWJCsWpTJOkkaTgCeMm8BmKTsaQEE+EEaLpHgulOIWE2FDihZNOoG53MBk263pQ1DhsrYGk1veAhLvbYC6PlXwdM8izP4wQD1NGtnI0hLx4kmV2HQ5MWCVERS2jg+vfBpKyAKM4KSf5OuYuKciFzBVRfdvEd6pOpNk81hEhDop9P+IBsXeOhEJRq+bykENCbCgkRNQwlyJEkNBO8R2r+N0sCQ+sJF1RcsTBpHhF14WiRmGrA257gtZfFCehS3ZTgDy7CuVjsRfcwgueK74fsRSSVlOHHUyKDbouFDUI+NO2WnqvJNd1FCeBEJtpJuO5vVGEiAjzRj55gfj5iKXQK8mWvB0W+37EbWI/B1KhcI2NFtdaUnmOcfiogYTYT44biCLEXt6cTirEhRFvkGRVyYDYjzZjUrys60NRY1hn6X36E1zTcbgomIPYEVch4iyC7eI7HmeP0mZP624Shpd0fShqCF1c7zZwSNz5D00OYj3JszMYUClFiENkzo38GadQ3eCNeZSaNhUisNfBBNkubuqpFQoXeMmiuZxkq72oNYuWhuMlf6Lgq8zrXIk/nEQWxR9e6I2/9MYfeeO94nfBCVavdEvx40orhVPNGy0Cn/sFXSeKGsFzFt8rqWbMfRJdw9zC0SslIt0NJcjwVm9cTMLM8eeLab7iwNqvSr4JhJBtWxO+iQstT5K1VMd1ul4UVYzdYs8tBcszqYBlnEYR8B2aChU8fyCOQjzHG58T/3zkQoD0PuGNG4t80CSxx8FEwWfaoutFUeV41uJ77U14vcYhRFi+nVKiEq6QEJGIfQMfi5FlHRXkJeLXOpfDzqNBu7hJhXlG14uiioE1tb5KCDGKg8Bn5liUV+UfliLENpJdFJZ4Y1mB/Z6kn29I3ARXULVyWNeNokqxVpL1/xcSVlIccSLG5xhLQuyVkGh0rgjxlDKlgxiQV/dMS9psdtHiH5/xcV03iirEgOW5nWRrvTjcgw7ZY0iex+IS4n7epP6QFx6kzN5QxKxN2mzucjBxXnT0vgpFklgn9hqZQFgkGQeIwz1IGawjGR4vhxAfEL+msVReEqLLjxWx2Uva5RXETgcTB5vDU7p+FFUGm+oQydhJxQB6YxC7afnVT3P5ZFxCBJCT9FkpXtuIF/uCN+4s8XpJd6fZKXbamxfiKUn+LGqFwhawtg9YfL8dCb52FOdAFcJ/2EjyDM1VLJaHCEn5U8pQBFjOFt8ZCdPxCW+sCbHBcXEzE/zw+DDImWqzPIF6+Nmv0rWkqAL8yuJ7QUjsc0yIzRR/x0dCiEAXie84RwPN5KcipC8UZB/ZOClsd0CIQkK8SPKhe4Uii1hvWR3ukuTKAvskun45R4U4SF4LNd0btt6yptTvEI15hGMYC+9YHXWBphPujARv8AF+qLGWJxJ2OvhdrtE1pcgosD4ftvyeSZvLUS60eo4+KTguoBR7VhqHEr7Bg+LudLwnRY8YUGQXL1hYn4WEleR6icoRhrk8hjzXwzFkmxBDozgVwjZxE1zBLvOQritFBoGAwoOW3zPJDtzgmKjuNnD1GfcdyLA/6kVzCV1s0rsQHKP7HE2s5yXZFkYKRRJ4xLJ1k/QajcMx9STFXhJo5LHJSRGije4Zro4MhTK9V9eXIkNAJccTDtRhkj0WozimjoSYo2V3Ms71JEWIPZJ8g9V2cXMqH4B8yBd1nSkygvvjmIsVBN4ryQ7cnRKd6J2TfE/XXpJipJstl+BF21CJrzieZFrSp0g7cD7QRsvvuS1hAo6TNlRPldgfVx0mTYiHLexK+8Vdq/8ukqJCkVaACO6x/J7w0yXZR7RfoqPLuQAh9vJvYgVhkyREMLKNEL/LE/JeFG0iq0gv0JfAdprYVkk2yyTOIVV15LYhkuFgGgjRKLikgUjWUYeT7i7ROmdF+gAf3rOW3xPkk3SwMw6n1AVE2YCUEdxJmhC7LZm0GxxOvGMOzBKFIspUvtPB+26VZDteHZXog6SkQB3GNpdtECJgo9M1nKxHHE5AmM56lrMiLbjXgdVkQx2Wk9c4GDCXY8MGIdo6D+Vlx5PwHsemu0JhNmcXR+iCDJM8jqBH4jWCzRWYy2UhZ+lm2VCJh8RuF49iX9hPxE1JoUIhtJJ+7mjuJx1cjMshdVyDZfkObRPiQbFzmM1LjgkJCdu/1HWpcACsrx9I8l3ri2G9JJti1yfx85oNGY6IB2wR4qDYqT1GisE2xxPzsRSY74raw88dWUgoC0y6+9S+MtTeUGCUjQaLNw7h8tniJ0wmCZDRGZJsk9oooOP4VG9M13WqsADUKb/g6L2TLmEdkPLS915FhCE9X50pRKGktqESIa83OJ6gMFu+L1rap0gesIh+4ei9oQyTPm1zn1isw85ZvoF7LX04dOl1HfHFRPme2DsIXFF7QCDxDnHjN8c6Xm/hPfba/FA5BzfRxgeEv2GtuI/44izaO3XdKhIArI/bxV2VFM51TjqdzpaAckaINiUwFGIa6oyxi2rkWVFJgAT/04K5WgpI79me8HvYcrE5J8QBKicbgC/xRAom8KMcCsVoARfM922bkkWsLxvW1YDtD5dzdFP3iR3fGr6851MykaESn9L1rBilmPiBBXUWBvRWTLqDTp84OiLEFSGCqHZbeq9DjidQEPemiKAV2QL84T8Sd0dnAEctvf9uSfb4gdQRIoDcom5L7/VSSkxn4Geixw8oyhcQPxa3Cf9Qp89YIKpucXiIm0tCxI63w/KXmYY6Y1wDEref1XWuKMNMXuf4OtaJnWazO1yu05zjm9wu9vIFOyQ9JXX4wu/2xuO63hUhgC8NqTUbHV8HFNs2C+9zTNxFzlNBiCJ2D53HoVRHUjThUWHwsK57RRGY1JotKbiO5yyJhK2ub3oaCNHmofNDNJ3TVD0CQoRfcVA5QEHgmM1/F3supbD1AteOjQ46+8ReTCHVhAjsEntti7pJimnCWqoBPZtFAfP0W+K2t6fBJrFznHCfJN8xJ1OECMexzdQYTLaNKVsIW6kKtOt27WIT58CxFFzLQYtrZJs4SMJOMyECOGu1w+L7bUzJLlxI1N8Q9z0dFfZNU7hOvi9uGrwWokvsZWV0SPQ5yzVJiEYlDVichPjST6TsHmAy3iZa6lcrQIOE75EQ05AWhvX3pCViHpQUBFLSTIjwoe20+H7wXaC5Zn/K7gMWBkr97hD1K1Yz9tMi2Jyia3rGosm+I23zO5fCSYJoU6fF9zvOHTGNh0Mhb/JrkhKHs6KiQA7qN8Vx3l0BNoi9jI9OcVSvnDVCFO6YNtNQUO/8QkrvBYIscLT/SjQ1pxqADRgukV9ISgIJBCyzTZbeazBlqjj1hAi/iu2GDHi/V1J6P6Bef01iPCyKrGIDFf/WlF0XBMHzltdaTxq/oFyKJw/8Kx2W33N9ys1TdAH5V2+sUbWYOVWICDJqktN2zg7W2JMW51OHOGzeEIWGlE8kyOpVlq8TZUo4GXBWSu8JAkAPkbxfL/5Jhor0ApUeD0g6g2Pw4z0u9oKKeJ8taf6ycimfTH0OfA0mHedAyu8Nrg8VDfdICkqeFK/CXn4/d6eUDJFuhjPEbeY9bpZ05FlmViECiMIhGjXT4nvCfEB360u80ZriewPyfppq8SpvnJ+BTa4WzGMo+OclnZkLAPx3j4pdP94+SVdEPbOECCBfaYI3Wiy+p0lQvcwbU1J+f7qoFEGOr/XGUuUlJ9bMEySaNKsgqNVHLFsVJ8R9o4qqIkQoNpTanWP5muHzgI/l0gyQIoBoIfrnzfHG1d5YoDxlZeOEn3CNpK/qqZQyPGF5DW2UjAQBGzI08U7SB7HMwc7/GM3naRm5V4hGf8cbc71xpTcWKm8lMi/WkmA6M3C93Q7IULhmM1Nt1ZCxSdjOxT7H8vv2kxQv9kZbhu4Xkm2RBAz/6+XeWO6NOuWyUZt/cE08I+lLoQm75kfFfvBtt2TAb5hlQgSQJwhf4mQHZjt8ihdIelNySgEO7R96Y5I3LhI/lWmsclvZ7gh8/y9I+mrfw9DJzdx2InSHZLDkNIuEiMgdSozOcbCoB6kOVtEczRpQBoiSMURBV4oflZ4jilKAfxD15PARbs/g9YOU4AO3HeTp4RodytoNa8jwREUZ1FneaHRAyM/RDFme0fsHhfM8B/yi55IgJykHnjL1XuLIao7nXrFzbGgh+rg2B7J40xoyPGnNLrRC3PjF8N7wIZ0n2c79Q230LzlmkxhB9BNrjAT3cSGvE/slo5XGFn4O2wrNWG89Wb1xDRn/4tG3DVGsJQ6VBL78ix0o1SSwh+N+8f2kizlmS/UFY2BGbiN5bJbqOLoBhPSiuOu4vlnScfxBzRIiAGf3GG/Mc6iwfk1SHF9FhLGXA59tnPipO/O9cYb41TtZI8h+kj0i79v5OFBF3xc+H/zbrkpOd3AtGmB+TOZ8mcRNtYFuiLVKiMkrGwRYXKXEoFzrYZrPs6T60E0TbB3/3cSJjjGD9z1NJvYgN6oDJPVdNImrtUMQVBlKTV0lhh/gGgwCJHijN64TPxf2OOcNiPNfSN77JGWBl4YqmhRbqRQnO3r/fk5KlM0tk+rO9zNJ8sHGG2ZDmi5+Vc8kfheTJLlsACyyDg6YvEe4OA9VmfoLw24qLleft0OK93cEEf6p+NVSwSov+KfhXvqxN37EDUsJMSH/yUZxHxCAUxnJqBeSoGsFPdz9i9WsjqE7YVxgNHNhYOSK3KuewGMfVWoXRzfV0IDULoao2F220zrGNVeo8pD98Q7x07qKzYXXcDN7TgkxeVMJeWMrxK0/DwoFLf+RxD1VFL1Ub4rKuTCecXxPj3OtFXNDoI7+ipC/baIVlTr3UjW2ijI5il0pmLSPlthBFYqRAorqIcdk2CXhuYYtEp51Ad45W/wOVkqIo0Bcvxz8eevFfVKtUayPSHbqXhXpBOY0fIVP0YXgcqNfL+Hli4diEnbqmj5kiRDreL1xSbGPX1wakkSPcFffqetaMYr547qnYA/XVBQhv8wRhg2Swh6JWSLEHEd9GcQI39U6SUf5FXbU58RNCyZFdlUhyivXSDpcQOskXl00CHNcyO+RBvV1SeEpl1kLqtQFSLFf4kUZDSmujPiSbAHmxIPiR8MXibbjUhQHcvReSImFY8gwjqmOtKs3iB9hxhrdTwEwkZ8FVhK6Bn3XGweVEEeOwQKVaIhkSKITbvv4hYKEWlLyWXA9yCFD5xxtqqAwOEkiTEs6ygmat1FkiDWJjIoPeONj4uceosrpp/xb/A6R6Y18vVS6j7JEiEOSd+TWB659gL+LiuQaUlwm6amqOMpJM4/XNUb5oGaB+Yucwk3iNmgSRKfE71yDNnJv9Mbvi1+9hGYhnxU/CIRST1PjnJMUdxhvyOCkGeQXhLB+U4AQ4zTtNCk5SyU9Z6Tg82yjWgQpLlAzuuYAs/IlSZdvuZ3kHKfcER3Zf9MbHxW/nBMNaf9B/EO3QO57JCOpZ1lMzB7kTc7x+hv4c1dMUjQHVi3gTpYW4DOZTiXI9G9Tnqh6HCcRpu0M8P2ch3FIDNbNu73xIfF94iDBL4t/CmRfQMhkAlluENtH0xkqcRxVVTf/P+oLwO9Rfwkn7/wULhJ0OYZzGhU36l+sPmDeIS1ll6Sv4QQ6AcXxX2K9oQPSe7zxOzSZYR5/wRt3SUYb62b1CAGhGjzJL8bUxjZQKfbE3JX28jWWSPpSkA5yoG3SmZLCrH5F2cBce4XqK21EOMhri5NQPYZq8B1UhiDDR6gMfyjaINYZMRpJDjJD7XILCXIgplIUTgATbEljk9c9JO5ZSoyZJ8Ltks6GFH1UrMdjPLeeAuK3xI8ow2eIwOBXxe9g05PlLyrrzR0MKXbzs4AsJvJLg1M47uE6xpdzJpVmGj+n6WY9gxNSm0akHwiSoEXaTklvL0ZYVBvLIDJEjD/ijbdzk76fZPiQVEHBQTV0uxki8XVKvkvvVKq9o/yS4kzGHpLi4pSTzX6OKbzWmaJR6bQBVsdWKvuhlF/n5jJUK8xk9Di8lfPvFyTDX0iVdDOqlvZfQzRLjvEz4cvCaXLwLcIPF/fQoAHulnNoCqSZaKCAn+JnXMDr1bOW3aGfBLhN0n9IFdYLAjq7y/gbHPv7MapDAM1d/0n8FJtj1fIlVls/xJMkiiES4iR+xjp+aXF3wt00o5dI+g+PMt1H4ANCqg6i5tNVNVoDrJDtnDNZOMAeLqZXJP6hWvDLo1XXH3jjnTSx7/PGX4lfgldVaKjCCQrT9zC/+Nn0eSA1Zw937rjBFkwYlFAhiTsLgQy4BfZxQDXOpWpsEUUSpAIC3CHZOq0PbiUkW8fxredoaa32xru88Rv83Ld747+WqS6VEFMwYdsln7w9hebkfhJG3Bwp0xjiDJrRWUE3TX8M+FRn8frHiWI0c2ofN9ZDkr0Dq3bTTI7r04SVgUOiftsb19L6+pY3viIpa/uvhBhfMRlSzFEpjqMJjMkRNyKGCbSTSgAmdNbqjc0hTOtJjlDNM1U5xt4Q95MADko2T+3rpYlcjp8PAgIJ10irWcH18gNv/Dutpmo9vbCqCRHo527eFzChF5EMdpIw4/oVMaHQmw7Z+dMyej8MOa7jPWjjwOepV/4b3vxwfw5wHJVsH/8A19FWKc+3CWvioyRDlOU9K36y9R3i9wEYrOYJ0FADkxyEdyTgN4H5O5+EsI1mUNwJ0y/5U/UWZPz+neBi2UoFPY0qeiqVZK4G5gbIrpPzwxxh2lcFn6ufc/tQmaqwjUT4cfH95jgo7R/FLyWtiW7vtUCIBogab6EvBCoPPjVT7oeJ01XG7neIinGhpKdrzmjdC6ZUUEiGk/nZDEFWQ0pPn+TPb27nY3+VzfN2bnJxixJyVIU4R/l13ngbN4oHvPF58ZsZ18whabVEiIYUTfnUEslHoLH77SrThMaEe5mvsaDK7uVgQDWZw+jhe50YGBM4GlJ6/cep/o5x4OfuKp7bI1GFQrMYgZO3ip9eg3uE5gyoS35EauzEyFojRKCHpAi1gGMFplMpTuLOul/KOw3sEFXHfJJjtQL36zBHEI10P+AemiYbzdxozKh0TuRJbkgnJX9ovTnA3jT3qCUcCszpcnCuN35X/DI8WAIbSIa3ie8vH6w1cqhFQjSLew8XKhYQgi2LA6S4W/IJ3nFf7xWanAultipG8NlNsKYUGjnX8Fgv+QCO6WVZx5/7A/fcmHxDVO29fK9+0XOug5v7Vik/FxKbNypPEEl+Mzetu73xHfGrnzbWIhnWMiGahbyT6qKThDiD5uC0gFosR21gYuLsXKS1zKnx+1t4r/uq3GS1bR5j095X5uaAlDE0H4afED7DS7mRIdka+YVPSvX5VJUQy8AAzQ3jb0K3G0Shl5MUN5MYO8vYMTFBTd4a/DPa+VpRSRzgRl6OedxId8ZlVIU3c35DCf6AyvAFvbVKiIbAujnJemlCLwiQGSbOOsnnM5azi2+hypwv6TnYSpFNIDC0XcprsWWO7YWv/CLxzz25kfP4p1SGv5IqLcNTQhwdTnJidHGgYexc7qowpV+kYiy359sJEupUvp6WzynKgdmsR9JeC8Guq8VPp7lJ/Lp8WC9o5Pp9bzwj5TU9UUKsMaVoKlu6+Yg0hAu8cbn4gRccoIPgyWEpLxItkk9jaRVt1aWIBnzXu6T8NBqhKgT5oTHDB8U/NB5rHQnWd3K8LOrTVUKMSYzHObB7wukM5zOixxNoTm+kWgQxlhuNO8S/Q7oPAi9NessVRSyVgzKyaDrm1RXin5F8NYkRbpt7qAqfkipuzqCEmCwwKX9FEruGZLiKpi8G8ra2S/kNMjHRD/D120iMekh9baOXRHhghEQIX/cMEuFbqQqHaNXARIbPUAMnSogVUYxQhPAFImVhBU1elDst4Y77ouTrpYfKfO39XAStNMvVx1hbgNlqWoqNhAjHcN6gXyHcOzfy31tJgtjQH+V7KJQQKwJE5eDPQbAFuV9Iz0FiKzL9l5MUccjOJk7wuhEQo6klnkKy1ah0deMYTdf2Ua5f+LdRencziRBz9V7xu9M8RAumV2+3EmKl0U/CMhPZNISAakQDTaTWoFUSErM3y8gd1u0cKH+bSeWY09tfFYC/+TDnT9coX+tCb1zvjTeInwmBXEOcb7JG/EOfnpZsNrJVQsyY+dxD8+MYH9FG/mLxfYozqRrRjBW1oM+NYkJiwWzh68NRDv+QRqaziR66Rg7K6CpB4E5ZzDn2Xm9cQotiB1Xhjzjv4II5qbddCdEmzFnOmOhbaUKfxbGKk/VumtGYoCM9ptGc5raXZjTIETmN2tA13TB9OI1VMVLkuBGiUOBKb9wgfjoNAnHIgPgx59l93EAVSohOcYhmCibjBpovIMPLOYmhFp/izr1fymsaUQjTymqb5Bu6qq8xXTgm+dSq0SQ8gwiR5rWEqvAa8QMnCOihlBTJ2jgT+T/E9xOqaayEmBpgMprcse1UjK/lLn4JTRwoxV9zNz8ZMKVGqj5Mm/sxJEeM8fpVOLMWTGu0SgQw6riZvkb8XEJssstoFSCj4YfchOEzPKq3XwkxreilejtMYlxJUxoVL9dzYsOcfoGKcTNJcWiU72lM6iaa01NJjno2czIwyfum+qgS/jrTAg3ldsglRI/CM6kO+0iEj9A0RirNCam9vo9KiBkE1Bt8O2ilhPzFx2k+X8sJfj3VIxzhv+TkPiD5M6NHg5MBcsR3a44BmKTf9ajRTzXWzu+qkm2y4BduoxqEnxCVJvP5HutJhJgrT9NU1oCJEmLmAHI7xAFzGgEYpEqsoGK8kqb0BVSKUIyoL90n5TeQKLWAzfvXUXlM4oB61FSeaDfIcZLgUX4nlWxMi+9kFufDpbQkMCfO4PvA73y/+I1BsLluEc0nVEKsEsCsWkPCw4SHPwjdRxAtvIGKAES4lopyHf99tEKLIFifvZtkCFKcEBi1HrWGsu8MjONS+UCFOVJhAjdHfO+XkBRn0AR+knPlbqpC5Bd26RJSQqxGGMW2kQMTfxXVwWouEvgZ0VEHEeuHxfc3HqeiqNQRmVjoJmJtMI4k2SL5M1KqlSQHSDInOHB/k+j8Yny49SQ8UwMP98nr+DM2JwTjfk7z+Gc0kXv4uz5dNkqI1Y5uEt028atbsFheQ5MJTvSVXDCv5+L4FdXjfi6ykwldU7fkjyIFxkr+8CgzxmaIKAdILN2BYfMQqhZeA9r1X0VXyQoSIdYefMcIkjzKDfJZblK9gY1LoYRY9TC9F9upTtZTFT4geV8S/EroWIJa6bfwOfg9gjF7qSA7Er7OnhLk0UhihPk3JvDYGBhJ+yj7A6NP8qfwmcceh+oKAZEl3NiuphUwhxtKO7+7R0mGL0r+rGiNGish1jzMAUybOJ6kqQw1gZLAC0iS6Gt3CU3unXyecbZvFruRR3PNnSHPqef8Cj7m+FgXojIHJB+8GAgopf6CkaaT99pIdlD6l/N7Q/9M5BKewefgO3qOG9/THFpZooSoiEBHgOwQZUQk+jIuskVcZGfRxEau4/M0q835LYclnxri2lyt1tb0U0nqk/hdnCd+ihO+qyvoZuik6nuapvD9dJNADeoZJilF3dBQto+4XXjH6lr4nibRdDZpGtdQNU7nptZNkxrmFxpObBO/imFnwLzsFj3TuOz1wccmqlu4AhaI7w/s5UaFnNIpfE4j7/MmEuB6kt/9VLl1ev9Px9Zb1qhCVJSNY1Qa8NMhLeeHVCMgxvNpqi3nzz1UifA1mua1O6ked/B3Y6pcwVUCTZIPJF3CTQndjBDoWkwSbCbJ4ft5lGYxVOAa/lxPRWiCI0qGajIrKgAThMFAlBSRYDSsRW00fFRI1wk68pfw/0GQJ/jc7fw7qBbkOZrqmH2ieW5AC8kPxLeUYyrN4eX82aQk9fF+guxwch36DyI4tpH3uFM3GyVEhT30Sz7Reg8X4kSSYBsVzPVcxDCrF3JhA+2S7+O4lz+vp4rsDLxmFwmi2k5mayahtXJMpfJbxHu1mPdrJpX0JJIblPVWjkf4b5jDG+iigLmsJXVKiIoUoINjR+D/UOUwjYt7EcdSkuYiLvx6yR94BVI9QiKE+nmJ5qA58+VYQKUekbw/LI1KCJ8L1SA5KroZJDdsGiv4GVBXPpukOJePgyRA4aZggiJPBhT2RpJgo5xeYqlkqISoSDGe4eN4fs9jaE6fTfUzn2Q5i/++ikRhDrnaRTIcoBLaQlIECSKy3cPfmcj2lIBqNWa+OV8mx9ce4HWc4KOpxKiTfCWOyWHEc5v4GmP5+wF+nh5eZ53k2591kOQHSHwoj+zlZzyDhIfPOod/3xogskH+/Sv8Nx4fpWKG+lvL5zRIvqmD1hUrISoyCENQII8HOeaSUHIkkSv4M4hjeUBRnU2CuoRE0EOSOkyiMK/7EkmugSZlO033F6nWmiV/stxKmpxn8P/38T2aSbwzeG1QpefwtZfyekBQl5KwlvPvmvi8vXwcJCEuosKbzM82GCDdHbwvG+gugCp+nM83pnBnAQGKVLbDjUIJUeEQwQjnbsmnlGwjQbUFTEZjTvZTYS2VfJ3zKv7tUioz4MKAqusLkE83lVeOyus4yeoE/20I6jiV236+z3gS0mS+fovkSwaND3AsX9ckext1eTLw2bby520kuuMk02NUwAf4Pid4rQNyevRdCVAJUVEDCNbImnrfjgBpriMJ1ZF4ZtIkxnyZzn/n+H/zqdKEpGZM4TYS1Tj+TSPJZyLfp5f/NxQgvxN8Xwn8fJzvO8T/M7W+2wMka06XO8R/43kHJe/7PMz36AmY/Z06DRRKiIo4CrJLTk/F2VHwXBOAaKBKHMu/N2e81JMkZ/D/oeomBJTcNL6+qYM+RPKrDwxzgPsEmrJ9/P89fO5+PqdX8j0fj5DgQZRHA6ayQqGEqEgMhwI/Hyjy+7oAERqCNaS4n6rStB4bz9erJ5l2B5TlTqpL04FnApXdGIkX1FAyVCghKlKjNrtKqM7tVG94XnvgOceLvFawHZkxczXCq0gE/1+AAQDUjVR9grc7/wAAAABJRU5ErkJggg==");
            background-size: 3.24rem 3.33rem;
            background-position: center;
            background-repeat: no-repeat;
        }
         .title{
              padding-left: .5rem;
            .word{
                line-height: 1.5rem;
                font-size: .34rem;
                padding-left: .1rem;
                font-weight: 700;
                
            }
        }
        .content{
             padding-left: .5rem;
             min-height: 6rem;
            .list{
                border-top: 1px solid #666;
                font-size: .3rem;
                line-height: 1rem;
                .colorCircle{
                    font-size: .24rem;
                    background-color: red;
                    border-radius: 50%;
                }
                .icon{
                    display:block;
                    height: .4rem;;
                    width: .4rem;
                    border: 2px solid #3879d9;
                    float: right;
                    border-radius: 50%;
                    margin: .28rem 1rem 0 0 ;
                      transition: all .2s ease;
                } 
                .choose{
                    background-image: url("./icon_1.png");
                    background-size: .66rem .66rem;
                    background-repeat: no-repeat;
                    background-position: center;
                    
                } 
                .word{
                   display: inline-block;
                    width: 75%;
                    text-align: justify;
                    line-height: .7rem;
                }
            }
           
        }
         .insureStatus{
                font-size: .3rem;
                margin-top: 2rem;
                text-align: center;
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
                    width: 1.8rem;
                    height: .7rem;
                    line-height: .7rem;
                    font-size: .3rem;
                    color: #fff;
                    background-color: #2d95ff;
                    border-radius: .4rem;
                }
            }
    }
</style>
