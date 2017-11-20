<template>
    <div class="material">
        <div class="content">
            <ul>
                <li class="cell" @click="showMenu(item.url,item.name)" v-for="item in list">
                    <div class="icon" :class="cutPostfix(item.name)"><p class="word oneRowHide">{{item.name}}</p></div>
                </li>
            </ul>
        </div>
        <div class="mengceng" v-show="mengcengShow">
            <div class="bgColor"></div>
            <ul class="menu">
                <!-- <li class="subMenu">预览</li>
                <li class="subMenu">发送</li> -->
                <li class="subMenu"><a :href="downloadUrl" :download=" downloadName">下载</a></li>
                <li class="subMenu" @click="hideMengceng">取消</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import fn from "../../common/js/index.js";    
    var url = 'http://www.zaichongqing.com/jj_project/wapMeeting/manager/meetingData';
    var mid = fn.QueryString('mid');
    export default{
        components:{
            
        },
        data:function(){
            return{
                 mengcengShow:false ,
                 list:[], 
                 downloadUrl:''  ,
                 downloadName:''     
            }
        },
        methods:{
            request:function(params){
                var _this = this;
                _this.$http.get(url, {
                    params: params
                    })
                    .then(function (response) {
                        if(response.status == "200" && response.data.rtnCode == "0000"){
                            if(response.data.data!=''){
                                 _this.list = response.data.data.list;
                                 //debugger
                            }
                        }
                    })
            },
            showMenu:function(url,name){
                this.mengcengShow = true;
                this.downloadUrl = url;
                this.downloadName = name;
            },
            hideMengceng:function(){
                this.mengcengShow = false;
            },
            cutPostfix:fn.cutPostfix,
        },
        mounted:function(){
           this.request({mid:mid})
        },

    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/css/common.less";
    .material{
        .content{
            overflow: hidden;
            padding: .35rem;
            background-color: #f5f5f5;
            .cell{
                position: relative;
                width: 33.3%;
                height: 2.88rem;
                float: left;
                .icon{
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                    width: 1.61rem;
                    height:2.18rem;
                    background-size: 1.61rem 2.18rem;
                    background-repeat: no-repeat;
                    background-position: center;
                    .word{
                        position: absolute;
                        left: 0;
                        bottom: .1rem;
                        width: 1.61rem;
                        text-indent: .1rem; 
                        font-size: .22rem;
                        color: #6d6d6d;
                    }
                }
                .ppt{
                         background-image: url("./ppt.png")
                    }
                .zip{
                        background-image: url("./zip.png")
                }
                .doc{
                        background-image: url("./doc.png")
                }
                .jpg{
                        background-image: url("./jpg.png")
                }
                .mp3{
                        background-image: url("./mp3.png")
                }
                .rar{
                        background-image: url("./rar.png")
                }
                .txt{
                        background-image: url("./txt.png")
                }
                .xls{
                        background-image: url("./xls.png")
                }
                .docx{
                        background-image: url("./unknow.png")
                }
                .png{
                    background-image: url("./png.png")
                }
            }
        }
        .mengceng{
           position: fixed;
            bottom: 0;
            height: 13.34rem;
            width: 7.5rem;
            .bgColor{
                width: 7.5rem;
                height: 13.34rem;
                background-color:#666;
                opacity: .5;
            }
            .menu{
                z-index: 3;
                position: absolute;
                left: 0;
                bottom: 0;
                width: 7.5rem;
                background-color: #fff;
                .subMenu{
                    height: 1rem;
                    line-height: 1rem;
                    text-align: center;
                    font-size: .32rem;
                    border-bottom: 1px solid #ccc;
                    &:last-child{
                        border: none;
                    }
                }
            }
        }
    }
</style>


