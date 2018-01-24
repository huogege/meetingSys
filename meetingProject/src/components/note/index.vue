<template>
    <div class="note">
        <h1 class="title">会议:{{title}}</h1>
        <h2 class="time">{{time}}<mt-button type="primary" @click="submit" class="submit">完成</mt-button></h2>
        <div class="content">
            <textarea v-model="text"  class="textarea" placeholder="亲，点击文字开始记录您的会议笔记" name="会议内容" id="note" cols="30" rows="10">
                <img src="photo.png" alt="">
            </textarea>
            <div id="image_content">
                 <div class="img_box" >
                    <img v-show="photoArr.length>0" v-for="item in photoArr" :key="item.id" :src="item" alt="" @click="magnifyPicture"> 
                </div>
            </div>
           
        </div>
        <div class="menu">
            <ul>
                <li>
                    <div @click="delatePhoto" class="delate"></div>
                </li>
                <li>
                    <div class="qr-btn" node-type="qr-btn" id="qr-btn">
                        <input node-type="jsbridge" type="file" name="myPhoto" value="拍照" />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

        var photoArr = [];
        var UpdatePhoto = function(tempBtn) {
            var _this_ = this;
            _this_.nativeReady(tempBtn);
            
        };
        UpdatePhoto.prototype = {
            nativeReady: function(tempBtn) {
                $('[node-type=jsbridge]',tempBtn).on('click',function(e){
                    e.stopPropagation();
                });
                $(tempBtn).bind('click',function(e){
                    $(this).find('input[node-type=jsbridge]').trigger('click');
                });

                $(tempBtn).bind('change', this.getImgFile);
            },
            getImgFile: function() {
                var inputDom = $("#qr-btn").find('input[node-type=jsbridge]');
                var imgFile = inputDom[0].files;
                var oFile = imgFile[0];
                var oFReader1 = new FileReader();
                var fileName = oFile.name;
                var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

                if (imgFile.length === 0) {
                    return;
                }
                
                if (!rFilter.test(oFile.type)) {
                    alert("选择正确的图片格式!");
                    return;
                }
                
                oFReader1.onload = function(oFREvent) {             
                    var img = new Image();
                    img.onload=function(){
                         var that = this;
                        // 默认按比例压缩
                        var w = 800*1.5,
                        h = 600*1.5,
                        scale = w / h;
                        w = w;
                        h = w / scale;
                        var quality = 0.5;  // 默认图片质量为0.7
                        //生成canvas
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext('2d');
                        // 创建属性节点
                        var anw = document.createAttribute("width");
                        anw.nodeValue = w;
                        var anh = document.createAttribute("height");
                        anh.nodeValue = h;
                        canvas.setAttributeNode(anw);
                        canvas.setAttributeNode(anh); 
                        ctx.drawImage(that, 0, 0, w, h);
                        
                        // quality值越小，所绘制出的图像越模糊
                        var base64 = canvas.toDataURL('image/jpeg', 0.5);
                        // 回调函数返回base64的值
                        var photo = new Image();
                        photo.src = base64;
                        var formData = new FormData(); //构造空对象，下面用append 方法赋值。
                        formData.append("base64",fn.cutBase64(base64));
                        formData.append("fileName", fileName);
                         $.ajax({
                            type:"POST",
                            url:'http://sz.cqjjnet.com/jj_project/base/commonController/uploadFileBase64',
                            dataType: "JSON",
                            data:formData,
                            processData: false, // 必须false才会避开jQuery对 formdata 的默认处理, XMLHttpRequest会对 formdata 进行正确的处理
                            contentType: false, // 必须false才会自动加上正确的Content-Type,
                            success:function(data){                       
                                if(data.data!='' && data.rtnCode == "0000"){
                                    photoArr.push(data.data.data);
                                }else{
                                    //alert("")
                                }                      
                            }
                        });

                    };
                    img.src = oFREvent.target.result;
                    if(!$(".img_box")){
                        var img_box = $('<div class="img_box"></div>');
                        img_box.append(img)
                        $("#image_content").append(img_box); 
                    }else{
                        $(".img_box").append(img);
                    }
                    $("#image_content").find('img').css({
                         width:3.35+'rem',
                         height:2.5+'rem',  
                         float:'left'                   
                    })
                   
                   
                };
                oFReader1.readAsDataURL(oFile);
            },
            destory: function() {
                $(tempBtn).off('click');
            }
        };

        UpdatePhoto.init = function(tempBtn) {
            var _this_ = this;
            tempBtn.each(function() {
                new _this_($(this));
            });
        };
      

    import fn from "../../common/js/index.js";    
    import urls from "../../common/js/url.js";
    var jjURL = urls.jjURL;
    var url = jjURL+'meetingNote'; 
    var url2 = jjURL+'meetingNoteUpdate';
    export default{
        components:{
         
        },
        data:function(){
            return{
                text:'',
                title:'',
                time:'',
                nid:'',
                phone:'',
                photoArr:[
                  
                ]
            }
        },
        methods:{
            delatePhoto:function(){
                var $imgBox = $(".img_box");
                var childArr = $imgBox.find('img');
                var length =childArr.length;
                if(length>=1){
                    $(childArr[length-1]).remove();
                    photoArr.pop();
                }


            },
            request1:function(params){
                var _this = this;
                var mid = fn.QueryString('mid');     
                _this.$http.get(url, {
                    params:{phone:_this.phone,mid:mid}
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                if(response.data.data.note!=null){
                                    var thisData = response.data.data.note;
                                    if(thisData.content){
                                        _this.text = _this.getWord(thisData.content); 
                                        _this.nid = thisData.id;
                                        if(_this.getImgAdd(thisData.content)!=''){
                                             _this.photoArr = _this.getImgAdd(thisData.content);
                                             photoArr = _this.getImgAdd(thisData.content);   
                                        }
                                       
                                    }
                                }else{
                                     _this.nid  =null;
                                }
                                 
                            }
                        }
                    })
            },
            request2:function(){
                var _this = this;
                var mid = fn.QueryString('mid');      
              
                _this.$http({
                    method:"POST",
                    url:url2,
                    data:{
                        phone:_this.phone,
                        mid:mid,
                        content:_this.text+'thisIsACutByQf'+photoArr.join(';'),
                        nid:_this.nid,
                    },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (data) {
                        return $.param(data);
                    }

                })
                .then(function (response) {
                    if(response.status == "200" && response.data.rtnCode == "0000"){
                        if(response.data.data!='' && response.data.rtnCode == "0000"){
                                alert("您的笔记已保存");
                        }
                    }
                })
            },
            getWord:function(str){
                if(str && str!=''){
                    var arr = str.split('thisIsACutByQf');
                    return arr[0]
                }
            },
            getImgAdd:function(str){
              
            if(str && str!=''){
                var arr = str.split('thisIsACutByQf');
                if(arr[1]!=''){
                       return arr[1].split(';')
                }else{
                    return []
                }    
            }
                
                
            },
            submit:function(){
                if(this.text == ''){
                    alert("请您完成笔记再提交哦！")
                }else{
                    this.request2();
                    
                }
            },
            magnifyPicture:function(item,index){
        


                var imgArr = [];
                var length = this.photoArr.length;
                if(length>0){
                    for(var i=0;i<length;i++){
                        var obj = {
                            imgUrl:this.photoArr[i],
                            desc:i+1
                        }
                        imgArr.push(obj)
                    }
                    window.AppJsObj.viewImageContent(JSON.stringify(imgArr),1);  
                }
              
            }
        },
        created:function(){
            this.phone =localStorage.getItem('phone');
            var title = decodeURIComponent(fn.QueryString('title'));
            var time = decodeURIComponent(fn.QueryString('time'));
            this.title = title;
            this.time = time;
            this.request1();
            
           
        },
        mounted:function(){
            UpdatePhoto.init($('[node-type=qr-btn]'));  //待页面dom渲染完成再init
        }

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
    .note{
        position: relative;
        width: 6.7rem!important;
        padding: .4rem .36rem;
        .title{
            font-size: .36rem;
            line-height: .5rem;
            font-weight: 700;
        }
        .time{
            width: 80%;
            font-size: .24rem;
            color: #9e9e9e;
            line-height: .6rem;
            border-bottom: 1px solid #9e9e9e;
            .submit{
                position: absolute;
                top: 1.2rem;
                right: .2rem;
                color: #fff;
                border-radius: .2rem;
                background-color: #2d95ff;
                font-size: .26rem;
                width: 1.2rem;
                height: .7rem;
                line-height: .7rem;
            }
        }
        .content{
            .textarea{
                width:100%;
                min-height: 2rem;
                border: none;
                font-size: .3rem;
                line-height: .4rem;
            }
              .img_box{
                    width: 100%;
                    height: 5.03rem;
                    img{
                        width:3.35rem;
                        height: 2.5rem;
                        float: left;
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
                        width: .9rem;
                        height: .9rem;
                        margin: 0 auto;
                        background-image: url("./delate.png");
                        background-size: .9rem;
                     
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
                        width: 1rem;
                        height: 1rem;
                        margin: 0 auto;
                        z-index: 10;
                        background-image: url("./photo.png");
                        background-size: 1rem ;
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


