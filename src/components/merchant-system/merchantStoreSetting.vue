<template>
    <div class="merchant-store-setting" v-loading="isLoading">
        <div class="order-header">
            <h5>门店设置</h5>
        </div>
        <div class="form">
            <el-form label-position="top">
                <div class="stores-info">
                    <p class="stores-title">门店信息</p>
                    <div class="portrait">
                        <p class="landlord-item">房东头像<span style="color: red">*</span></p>
                        <div class="img-required">
                            <p>上传要求</p>
                            <p>1、请上传真实头像，若有营业执照也可以上传品牌logo,否则审核不会通过呦</p>
                            <p>2、请上传2MB以内的JPG、JPEG、GIF、PNG格式的图片文件</p>
                        </div>
                        <div class="avatar-uploader">
                            <el-upload
                                    :action="UploadURL"
                                    :on-success="handleAvaSuccess"
                                    name="picture"
                            >
                                <img v-if="userInfo.imageUrl" :src="userInfo.imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>

                        </div>

                        <el-form-item>
                            <p class="landlord-item">房东昵称<span style="color: red">*</span><span class="item-introduction">客人可通过名称快速搜索到您的小家</span></p>
                            <div class="name-input">
                                <el-input v-model="userInfo.name"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <p class="landlord-item">地区/城市<span style="color: red">*</span></p>
                            <el-Cascader :options="options"
                                         v-model="userInfo.city"
                                         :props="defaultOptions"
                            >
                            </el-Cascader>

                        </el-form-item>

                    </div>



                    <div class="stores-info">
                        <p class="stores-title">联系方式</p>

                        <el-form-item>
                            <p class="landlord-item">联系电话<span style="color: red">*</span></p>
                            <div class="name-input">
                                <el-input v-model="userInfo.call"></el-input>
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item>
                    <div class="next-type">
                        <el-button type="primary"  class="next-type-btn ivu-btn"
                                   @click="submitForm"

                        >保存</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import areajson from '../../utils/citys.json';
    export default {
        name: "merchantStoreSetting",
        data(){
            return {
                options:areajson,
                isLoading:false,
                defaultOptions:{
                    value:'label'
                },
                requiredURL:this.$myconfig.ImageURL,
                imageName:'',
                userInfo:{
                    imageUrl:'',
                    name:'',
                    city:[],
                    call:'',
                    userId:''
                },


            }
        },
        created() {
            this.requiredUser();
        },
        computed:{
            UploadURL(){
                return this.$myconfig.ServerPath + this.$myconfig.photoUpLoad
            }
        },
        methods:{
            requiredUser(){
                this.isLoading = true;
                this.$api.get(this.$myconfig.getUserInfo,{
                    "token":localStorage.getItem("token")
                },success=>{
                    console.log(success.data);
                    var data = success.data.user;
                    this.userInfo = {
                        imageUrl:this.requiredURL + data.userAvatar,
                        name:data.nickName,
                        city:[data.province,data.city],
                        call:data.mobile,
                        userId:data.userId
                    };
                    this.imageName = data.userAvatar;
                    this.isLoading = false;

                },failure=>{
                    console.log("请求失败，失败原因：" + failure.data.msg)
                })
            },
            submitForm(){
                var obj = {
                    "nickName":this.userInfo.name,
                    "city":this.userInfo.city[1],
                    "province":this.userInfo.city[0],
                    "mobile":this.userInfo.call,
                    "userId":this.userInfo.userId,
                    "userAvatar":this.imageName
                };

                this.$api.post(this.$myconfig.UpdateUserInfo,obj,r=>{
                    if (r.data.msg == 'success'){
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error('保存失败。' + r.data.msg);
                    }

                },failure=>{
                    this.$message.error('保存失败');
                    console.log("提交失败,失败原因" + failure);
                })
            },
            handleAvaSuccess(file){

                this.userInfo.imageUrl = this.requiredURL+file.msg;
                this.imageName = file.msg
            }
        }
    }
</script>

<style scoped>
    .merchant-store-setting{
        float: right;
        position: relative;
        width: 950px;
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(63,63,68,.05), 0 1px 3px 0 rgba(63,63,68,.15);
        padding-bottom: 20px;
    }
    .order-header{
        width: 95%;
        margin: 0 auto;
    }

    .order-header h5{
        font-size: 16px;
        padding: 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid #eee;
    }
    .stores-title{

        font-size: 16px;
        line-height: 16px;
        height: 16px;
        margin-top: 20px;
    }
    .form{
        width: 95%;
        margin: 0 auto;
    }
    .stores-title{
        padding-left: 10px;
        border-left: 5px slateblue solid;
        margin-bottom: 20px;
    }
    .avatar-uploader{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
        margin-top: 20px;
    }

    .avatar-reUpdate p{
        color: white;
    }

    .avatar-uploader:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .img-required{
        position: absolute;
        top: 150px;
        left: 230px;
    }
    .landlord-item{
        font-size: 14px;
        margin-bottom: 10px;
    }
    .item-introduction{
        font-size: 12px;
        margin-left: 5px;
        color: #999;
    }
    .name-input{

        width: 300px;
    }
    .next-type{
        border-top: 1px solid #ddd;
        margin: 0 auto;
        width: 900px;
    }
    .next-type-btn{
        float: right;
        width: 100px;
        height: 40px;
        font-size: 16px;
        margin-top: 20px;
    }
    .ivu-btn{
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        line-height: 1.5;
        user-select: none;
        padding: 6px 15px;
        font-size: 12px;
        border-radius: 4px;
        transition: color .2s linear,background-color .2s linear,border .2s linear;
        color: white;
        background-color: #6e80e3;
        border-color: #6e80e3;

    }
</style>