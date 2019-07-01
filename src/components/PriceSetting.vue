<template>
    <div class="price-setting">
        <div class="title-con">
            <h1>价格设置</h1>
        </div>
        <div class="Price-form">
            <el-form :label-position="labelPosition" status-icon label-width="80px" ref="PriceForm" :model="PriceForm" :rules="rules">
                <p class="base-price">基础价</p>
                <p class="base-price-tig">基础价是基本售卖价格，长期有效，如果您在房态日历中修改了特定日期的价格，则特定日期之外的所有日期按照此价格售卖</p>
                <div class="price-container">
                    <el-form-item label="售卖价格" prop="price">
                        <div class="input-price">
                            <el-input v-model.number="PriceForm.price"></el-input>
                            &nbsp;&nbsp;
                            <span>元</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="支付押金" prop="deposit">
                        <div class="input-price">
                            <el-input v-model.number="PriceForm.deposit"></el-input>
                            &nbsp;&nbsp
                            <span>元</span>
                        </div>
                    </el-form-item>
                </div>
                <next-step :form="ThisForm"></next-step>
            </el-form>
        </div>
    </div>
</template>

<script>
    import NextStep from "./nextStep";
    export default {
        name: "PriceSetting",
        components: {NextStep},
        data(){
            return {
                ThisForm:{},
                labelPosition:'top',
                PriceForm:{
                    price:'',
                    deposit: ''
                },
                rules:{
                    price:[
                        {required:true,message:'请输入价格',trigger:'blur'},
                        { type: 'number', message: '售卖价格必须为数字值'}
                    ],
                    deposit:[
                        {required:true,message:'请输入押金',trigger:'blur'},
                        { type: 'number', message: '支付押金必须为数字值'}
                    ]
                }
            }
        },
        mounted(){
            var self = this;
            self.ThisForm = {
                obj:self.$refs,
                formName:'PriceForm',
                locationObj:self.PriceForm
            };
        },
        created() {
            if (localStorage.getItem("PriceForm") != null){
                var PriceForm = JSON.parse(localStorage.getItem("PriceForm"));
                this.PriceForm = PriceForm;
            }
        }
    }
</script>

<style scoped>
    .price-setting{
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
    .Price-form{
        margin-left: 30px;
        margin-top: 30px;
        width: 800px;
    }
    .base-price{
        font-size: larger;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .base-price-tig{
        margin-bottom: 40px;
    }
    .input-price{
        width: 100px;
        display: flex;
        align-items: center;
    }
    .price-container{
        border-bottom: 1px solid #ddd;
        margin: 0 auto;
        width: 990px;
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