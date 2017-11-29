<template>
    <div class="note">
        <h1 class="title">会议:{{title}}</h1>
        <h2 class="time">{{time}}<mt-button type="primary" @click="submit" class="submit">完成</mt-button></h2>
        <div class="content">
            <textarea v-model="text"  class="textarea" placeholder="亲，点击文字开始记录您的会议笔记" name="会议内容" id="note" cols="30" rows="15">
                <img src="photo.png" alt="">
            </textarea>
            <div id="img_box"></div>
        </div>
        <div class="menu">
            <ul>
                <li>
                    <div @click="delateText" class="delate"></div>
                </li>
                <li>
                    <div class="qr-btn" node-type="qr-btn">
                        <input node-type="jsbridge" type="file" name="myPhoto" value="拍照" />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    (function($) {
        var Qrcode = function(tempBtn) {
            var _this_ = this;
            var isWeiboWebView = /__weibo__/.test(navigator.userAgent);

            if (isWeiboWebView) {
                if (window.WeiboJSBridge) {
                    _this_.bridgeReady(tempBtn);
                } else {
                    document.addEventListener('WeiboJSBridgeReady', function() {
                        _this_.bridgeReady(tempBtn);
                    });
                }
            } else {
                _this_.nativeReady(tempBtn);
            }
        };

        Qrcode.prototype = {
            nativeReady: function(tempBtn) {
                $('[node-type=jsbridge]',tempBtn).on('click',function(e){
                    e.stopPropagation();
                });

                $(tempBtn).bind('click',function(e){
                    $(this).find('input[node-type=jsbridge]').trigger('click');
                });

                $(tempBtn).bind('change', this.getImgFile);
            },
            bridgeReady: function(tempBtn) {
                $(tempBtn).bind('click', this.weiBoBridge);
            },
            weiBoBridge: function() {
                window.WeiboJSBridge.invoke('scanQRCode', null, function(params) {
                    //得到扫码的结果
                });
            },
            getImgFile: function() {
                var _this_ = this;
                var inputDom = $(this).find('input[node-type=jsbridge]');
                var imgFile = inputDom[0].files;
                var oFile = imgFile[0];
                var oFReader = new FileReader();
                var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

                if (imgFile.length === 0) {
                    return;
                }
                
                if (!rFilter.test(oFile.type)) {
                    alert("选择正确的图片格式!");
                    return;
                }

                oFReader.onload = function(oFREvent) {
                    qrcode.decode(oFREvent.target.result);
                    var img = new Image();
                    img.width = 600;
                    img.height = 800;
                    img.onload=function(){
                       
                    };  
                    img.src = oFREvent.target.result;
                    $("#img_box").append(img);
                    qrcode.callback = function(data) {
                        //扫描毁掉函数
                    };
                    
                    
                };

                oFReader.readAsDataURL(oFile);
            },
            destory: function() {
                $(tempBtn).off('click');
            }
        };

        Qrcode.init = function(tempBtn) {
            var _this_ = this;

            tempBtn.each(function() {
                new _this_($(this));
            });
        };
        window.Qrcode = Qrcode;
    })(window.Zepto ? Zepto : jQuery);


    import fn from "../../common/js/index.js";    
    var url = 'http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingNote'; 
    var urls = 'http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingNoteUpdate';
    var phone = JSON.parse(localStorage.getItem('userInfor')).phone;
    export default{
        components:{
         
        },
        data:function(){
            return{
                text:'',
                title:'',
                time:'',
                nid:''
            }
        },
        methods:{
            delateText:function(){
                this.text = '';
            },
            request1:function(params){
                var _this = this;
                var mid = fn.QueryString('mid');     
                _this.$http.get(url, {
                    params:{phone:phone,mid:mid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                if(response.data.data.note!=''){
                                    _this.text =  response.data.data.note.content;
                                    _this.nid  = response.data.data.note.id;
                                }else{
                                     _this.nid  =null;
                                }
                                 
                            }
                        }
                    })
            },
            request2:function(params){
                var _this = this;
                var mid = fn.QueryString('mid');      //数据处理都必须在export defalut 里面，不然可能导致渲染的时候拿不到数据
              
                _this.$http.post(urls, {
                    phone:phone,mid:mid,content:this.text
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!='' && response.data.rtnCode == "0000"){
                                    alert("您的笔记已保存");
                            }
                        }
                    })
            },
            submit:function(){
                if(this.text == ''){
                    alert("请您完成笔记再提交哦！")
                }else{
                    this.request2();
                }
            }
        },
        created:function(){
            
            var title = decodeURIComponent(fn.QueryString('title'));
            var time = decodeURIComponent(fn.QueryString('time'));
            this.title = title;
            this.time = time;
            this.request1();
           
        },
        mounted:function(){
            Qrcode.init($('[node-type=qr-btn]'));  //待页面dom渲染完成再init
        }

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
    .note{
        position: relative;
        padding: .4rem .36rem;
        .title{
            font-size: .36rem;
            line-height: .5rem;
        }
        .time{
            font-size: .24rem;
            color: #9e9e9e;
            line-height: .6rem;
            border-bottom: 1px solid #9e9e9e;
            .submit{
                float: right;
                color: #fff;
                border-radius: .2rem;
                background-color: #2d95ff;
                font-size: .28rem;
                width: 1rem;
                height: .5rem;
                line-height: .5rem;
                        }
        }
        .content{
            .textarea{
                width:100%;
                min-height: 3rem;
                border: none;
                font-size: .3rem;
                line-height: .4rem;
            }
              #img_box{
                    width: 100%;
                    height: 5rem;
                    text-align: center;
                    img{
                        width: 6rem;
                        height: 9rem;
                        margin: 0 auto;
                    }
                }
        }
        .menu{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
             ul{
                 overflow: hidden;
                 li{
                    padding: .8rem 0;
                     width: 50%;
                     float: left;
                    
                    .delate{
                        height: 1.2rem;
                        background-image: url("./delate.png");
                        background-size: .9rem;
                        border-right: 1px solid #9e9e9e;
                        background-repeat: no-repeat;
                        background-position: center;
                    }
                  .photo{
                        height: 1.2rem;;
                        background-image: url("./photo.png");
                        background-size: 1.14rem;
                        background-repeat: no-repeat;
                        background-position: center;                       
                    }
                    .jsbridge {
                        height: 2rem;
                        width: 4rem;
                        background-color: red;
                    }

                    .upimg {
                        height: 4rem;
                        width: 4rem;
                        background-color: green;
                        margin-bottom: 1rem;
                    }

                    .qr-btn{
                        z-index: 10;
                        background-image: url("./photo.png");
                        background-size: 1.14rem ;
                        background-position: center;
                        background-repeat: no-repeat;
                    }

                    input[node-type=jsbridge]{
                        visibility: hidden;
                    }
                 }
             }
        }
    }
</style>


