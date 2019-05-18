<template>
    <div class="Home-photo">
        <div class="title-con">
            <h1>房屋照片<span>上传真实、漂亮的房屋照片更能吸引房客</span></h1>
        </div>
        <div class="ivu-form-item-content">
            <el-form :label-position="labelPosition" status-icon label-width="80px" :model="PhotoForm"  ref="PhotoForm">
                <div class="g-img-info">
                    <h1>照片需上传6-140张且满足以下类型:</h1>
                    <div>
                        <p>
                            <span>卧室:1张</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>卫生间:1张</span>
                        </p>
                    </div>
                    <div class="u-pic-size-info">
                        <p>请保证上传的图片高清、无水印、无logo和联系方式；为了避免房屋图片与户型不符产生客诉，请根据所选户型上传。</p>
                        <p>如未找到图片所属类型，可返回房屋详情修改户型信息</p>
                    </div>
                </div>
                <div class="item-title">
                    <div class="item-title-left">
                        <p>卧室</p>
                        <p class="photo-least">上传1张,展现完整床铺</p>
                    </div>
                </div>
                <div class="upload-container">
                    <el-upload
                            :action="UploadURL"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            name="picture"
                            :file-list="PhotoForm.bedRoomPhoto"
                            :limit="1"
                            :on-success="handleBedSuccess"
                            :on-remove="removeBedSuccess"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div class="item-title">
                    <div class="item-title-left">
                        <p>卫生间</p>
                        <p class="photo-least">上传1张，卫浴设施完整，地面整洁</p>
                    </div>
                </div>
                <div class="upload-container">
                    <el-upload
                            :action="UploadURL"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :file-list="PhotoForm.bathRoomPhoto"
                            name="picture"
                            :limit="1"
                            :on-success="handleBathSuccess"
                            :on-remove="removeBathSuccess"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div class="item-title">
                    <div class="item-title-left">
                        <p>其他</p>
                        <p class="photo-least">上传2张，任意上传</p>
                    </div>
                </div>
                <div class="upload-container">
                    <el-upload
                            :action="UploadURL"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :file-list="PhotoForm.OtherPhoto"
                            name="picture"
                            :limit="2"
                            :on-success="handleOtherSuccess"
                            :on-remove="removeOtherSuccess"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <next-step :form="ThisForm"></next-step>
            </el-form>
        </div>

    </div>
</template>

<script>
    import NextStep from "./nextStep";
    export default {
        name: "HomePhoto",
        components: {NextStep},
        data(){
            return {
                labelPosition:'top',
                requiredURL:'http://192.168.1.103:8090/',
                UploadURL:this.$myconfig.photoUpLoad,
                PhotoForm:{
                    bedRoomPhoto:[],
                    bathRoomPhoto:[],
                    OtherPhoto:[],
                },
                ThisForm:{},
                dialogVisible:false,
                dialogImageUrl:''
            }
        },
        methods:{
            handlePictureCardPreview(file){

                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleBedSuccess(res,file,fileList){
                var url = this.requiredURL+res.msg;

                this.PhotoForm.bedRoomPhoto.push({name:file.name,url:url})

            },
            handleBathSuccess(res,file,fileList){

                var url = this.requiredURL+res.msg;
                this.PhotoForm.bathRoomPhoto.push({name:file.name,url:url})
            },
            handleOtherSuccess(res,file,fileList){

                var url = this.requiredURL+res.msg;
                this.PhotoForm.OtherPhoto.push({name:file.name,url:url})
            },
            removeBedSuccess(file,fileList){
                console.log(file,fileList)
                this.WhereRemoveFile(file.name,this.PhotoForm.bedRoomPhoto);

            },
            removeBathSuccess(file){
                //this.PhotoForm.bathRoomPhoto = fileList
                this.WhereRemoveFile(file.name,this.PhotoForm.bedRoomPhoto);

            },
            removeOtherSuccess(file){
                this.WhereRemoveFile(file.name,this.PhotoForm.bedRoomPhoto);

            },
            WhereRemoveFile(name,List){
                for (var i = 0;i<List.length;i++){
                    if (List[i].name == name){
                        List.splice(i,1);
                    }
                }

            }
        },
        created(){
            if (localStorage.getItem("PhotoForm") != null){
                var PhotoForm = JSON.parse(localStorage.getItem("PhotoForm"));
                this.PhotoForm = PhotoForm;
            }
        },
        mounted(){
            var self = this;
            self.ThisForm = {
                obj:self.$refs,
                formName:'PhotoForm',
                locationObj:self.PhotoForm
            };

        }
    }
</script>

<style scoped>
    .Home-photo{
        float: right;
        position: relative;
        width: 1050px;
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(63,63,68,.05), 0 1px 3px 0 rgba(63,63,68,.15);
        padding-bottom: 20px;
    }

    .title-con {
        width: 990px;
        height: 60px;
        border-bottom: 2px solid #eee;
        margin: 0 auto;
    }
    .title-con h1{

        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-size: 18px;
        color: #333;
        line-height: 60px;
    }
    .title-con span{
        margin-left: 20px;
        font-size: 12px;
        color: #999;
        line-height: 65px;
    }
    .ivu-form-item-content{
        position: relative;
        width: 990px;
        line-height: 32px;
        font-size: 12px;
        margin: 0 auto;
    }
    .g-img-info{
        margin: 20px 0;
        width: 920px;
        height: 140px;
        padding: 20px;
        margin-left: 20px;
        background: #f8f8f8;
        line-height: 1.5;
    }
    .g-img-info h1{
        margin-bottom: 20px;
    }
    .g-img-info p{
        color: black;
        margin: 20px;
    }
    .u-pic-size-info p{
        color:#999;
    }
    .item-title{
        background: #f5f5f5;
        height: 56px;
        padding: 10px 20px;
        display: flex;
        align-items: center;

    }
    .item-title p{
        font-weight: 600;
        font-size: 16px;
        color: #333;
        line-height: 16px;
    }
    .item-title .photo-least{
        font-size: 12px;
        color: #666;
        line-height: 12px;
        margin-top: 10px;
    }
    .upload-container{
        margin-bottom: 20px;
        margin-top: 20px;
        margin-left: 20px;

    }




</style>