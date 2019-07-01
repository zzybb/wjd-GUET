<template>
    <div class="House-description">
        <div class="title-con">
            <h1>房屋描述</h1>
        </div>
        <div class="Detail-description-form">
            <el-form :label-position="labelPosition" status-icon label-width="80px" ref="DescriptionForm" :model="DescriptionForm" :rules="rules">
                <el-form-item label="房屋名称" prop="HouseName">
                    <el-input    v-model="DescriptionForm.HouseName"></el-input>
                </el-form-item>
                <el-form-item label="房屋特色" prop="HouseFeature">
                    <el-input type="textarea" maxlength="1000" show-word-limit v-model="DescriptionForm.HouseFeature" rows="6"></el-input>
                </el-form-item>
                <el-form-item label="交通位置(选填)">
                    <el-input type="textarea" maxlength="500" show-word-limit v-model="DescriptionForm.trafficLocation" rows="6"></el-input>
                </el-form-item>
                <el-form-item label="周边介绍(选填)">
                    <el-input type="textarea" maxlength="500" show-word-limit v-model="DescriptionForm.SurIntro" rows="6"></el-input>
                </el-form-item>
                <next-step :form="ThisForm"></next-step>
            </el-form>
        </div>
    </div>
</template>

<script>
    import NextStep from "./nextStep";
    export default {
        name: "HouseDescription",
        components: {NextStep},
        data(){
            return{
                ThisForm:{},
                labelPosition:'top',
                DescriptionForm:{
                    HouseName:'',
                    HouseFeature:'',
                    trafficLocation:'',
                    SurIntro:''
                },
                rules:{
                    HouseName:[
                        {required:true,message:'请输入房屋名称',trigger:'blur'}
                    ],
                    HouseFeature:[
                        {required:true,message:'请输入房屋特色',trigger:'blur'}
                    ]
                }
            }
        },
        created(){
            if (localStorage.getItem("DescriptionForm") != null){
                var DescriptionForm = JSON.parse(localStorage.getItem("DescriptionForm"));
                this.DescriptionForm = DescriptionForm;
            }
        },
        mounted(){
            var self = this;
            self.ThisForm = {
                obj:self.$refs,
                formName:'DescriptionForm',
                locationObj:self.DescriptionForm
            };

        }
    }
</script>

<style scoped>
    .House-description{
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
    .Detail-description-form{
        margin-left: 30px;
        margin-top: 30px;
        width: 430px;
    }

    .next-type{
        border-top: 1px solid #ddd;
        margin: 0 auto;
        width: 990px;
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