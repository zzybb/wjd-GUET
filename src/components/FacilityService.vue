<template>
    <div class="facility-service">
        <div class="title-con">
            <h1>设施服务<span>房客可以按照他们想要的配套设施选择房屋。因此，请在页面上尽可能地全面展示您的房屋的配套设施。</span></h1>
        </div>
        <div class="facility-service-form">
            <el-form :label-position="labelPosition" status-icon label-width="80px" :model="FacilityForm">
                <div class="facility-item-form" v-for="facility in facilitys">
                    <el-form-item :label="facility.Fcname" >
                        <el-checkbox-group v-model="FacilityForm[facility.list]">
                            <div class="info-facility" v-for="item in facility.children">
                                <el-checkbox :label="item">{{item}}</el-checkbox>
                </div>

                        </el-checkbox-group>
                    </el-form-item >
                </div>
                <next-step :form="ThisForm"></next-step>
            </el-form>
        </div>

    </div>
</template>

<script>
    import facilityjson from '../utils/facility.json';
    import NextStep from "./nextStep";
    export default {
        name: "FacilityService",
        components: {NextStep},
        data(){
            return {
                ThisForm:{},
                labelPosition:'top',
                facilitys:facilityjson,
                FacilityForm: {
                    houseList:[],
                    bathroom:[]
                }
            }
        },
        created(){
            if (localStorage.getItem("FacilityForm") != null){
                var FacilityForm = JSON.parse(localStorage.getItem("FacilityForm"));
                this.FacilityForm = FacilityForm;
            }
        },
        mounted() {
            var self = this;
            self.ThisForm = {
                obj:self.$refs,
                formName:'FacilityForm',
                locationObj: self.FacilityForm
            };
        }
    }
</script>

<style scoped>
    .facility-service{
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
    .facility-service-form{
        margin-left: 30px;
        margin-top: 30px;
        width: 900px;

    }
    .facility-item-form{
        border-bottom: 1px solid #eee;
    }
    .info-facility{

        width: 150px;
        height: 30px;
        float: left;
        margin: 0 10px 10px 0;
        border: 1px solid #eee;
        background: #f8f8f8;
        line-height: 27px;
        padding-left: 10px;
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