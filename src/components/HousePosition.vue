<template>
    <div class="House-position">
        <div class="title-con">
            <h1>房屋位置<span>房客会使用位置信息来找到您的房子</span></h1>
        </div>
        <div class="g-location-info-desc">
            <h1>房客会使用此信息来寻找地点合适的房源。</h1>
            <p>
                您的门牌号是您的隐私，房客预订前将为您保密。
                <br>
                房客可以通过您的房屋位置，了解您房屋的周边信息。
                <br>
                房屋发布成功后，我们会对您的地址信息进行核对。
            </p>
        </div>
        <div class="House-form">
            <el-form :label-position="labelPosition" status-icon label-width="80px" :model="PositionForm" :rules="rules" ref="PositionForm">
                <el-form-item label="地区城市" prop="city">
                    <el-Cascader :options="options"
                                 v-model="PositionForm.city"
                                 :props="defaultOptions"
                    ></el-Cascader>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="PositionForm.address"></el-input>
                </el-form-item>
                <el-form-item label="补充说明(选填)">
                    <el-input v-model="PositionForm.addressSupplement"></el-input>
                </el-form-item>

                <next-step :form="ThisForm"></next-step>
            </el-form>
        </div>
    </div>
</template>

<script>
    import areajson from '../utils/citys.json';
    import NextStep from "./nextStep";


    export default {
        name: "HousePosition",
        components: {NextStep},
        data(){
            return{
                defaultOptions:{
                    value:'label'
                },
                ThisForm:{},
                PositionForm:{
                    city:[],
                    address:'',
                    addressSupplement:''
                },
                rules:{
                    city:[
                        {required:true,message:'请输入地区城市',trigger:'change'}
                    ],
                    address:[
                        {required:true,message:'请输入地址',trigger:'blur'}
                    ]
                },
                labelPosition:'top',
                options:areajson,
                address:'',
                addition:'',
                HouseDetailNum:''
            }
        },
        created(){
            if (localStorage.getItem("PositionForm") != null){
                var PositionForm = JSON.parse(localStorage.getItem("PositionForm"));
                this.PositionForm = PositionForm;
            }
        },
        mounted(){
            var self = this;
            self.ThisForm = {
                obj:self.$refs,
                formName:'PositionForm',
                locationObj:self.PositionForm
            };
        },

    }
</script>

<style scoped>
    .House-position{
        float: right;
        position: relative;

        width: 1050px;
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(63,63,68,.05), 0 1px 3px 0 rgba(63,63,68,.15);
        padding-bottom: 20px;
    }

    .title-con{
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

    .House-form{
        margin-left: 30px;
        margin-top: 30px;
        width: 400px;
    }

    .g-location-info-desc{
        position: absolute;
        top: 150px;
        right: 150px;
        width: 358px;
        height: 159px;
        padding: 20px;
        border: 1px solid #f5dcbc;
        background: #fffbf6;
    }

    .g-location-info-desc h1{
        line-height: 18px;
        font-size: 14px;
        letter-spacing: 0;
        color: #333;
    }

    .g-location-info-desc p{
        margin-top: 10px;
        line-height: 20px;
        font-size: 12px;
        letter-spacing: 0;
        font-family: MicrosoftYaHei;
        color: #666;
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