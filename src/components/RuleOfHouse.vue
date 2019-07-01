<template>
    <div class="rule-of-house">
        <div class="title-con">
            <h1>入住规则<span>请注明您的房屋入住相关说明，以保证能收到合适的订单。</span></h1>
        </div>
        <div class="Detail-form">
            <el-form :label-position="labelPosition" status-icon label-width="80px" ref="RuleForm" :model="RuleForm" :rules="rules">
                <div class="Guest-In-time">
                    <el-form-item label="房客入住时间" prop="GuestInTime">
                        <el-select  placeholder="请选择房客可以入住的时间" v-model="RuleForm.GuestInTime" >
                            <el-option :label="time" :value="time" v-for="(time,index) in TimeLine" :key="index"></el-option>

                        </el-select>

                    </el-form-item>
                    <el-form-item label="房客退房时间" prop="GuestOutTime">
                        <el-select  placeholder="请选择房客可以退房的时间" v-model="RuleForm.GuestOutTime">
                            <el-option :label="time" :value="time" v-for="(time,index) in TimeLine" :key="index"></el-option>

                        </el-select>

                    </el-form-item>
                </div>

                    <el-form-item label="接待房客时间" prop="GetGuestTime1">
                        <el-select  placeholder="请选择接待时间" v-model="RuleForm.GetGuestTime1">
                            <el-option :label="time" :value="time" v-for="(time,index) in TimeLine" :key="index"></el-option>
                        </el-select>
                    </el-form-item>


                <el-form-item label="是否有前台" prop="IsFrend">
                    <el-radio-group v-model="RuleForm.IsFrend">
                        <el-radio  label="1">是</el-radio>
                        <el-radio  label="0">否</el-radio>
                    </el-radio-group>

                </el-form-item>
                <el-form-item label="接待性别" prop="gender">

                    <el-radio-group v-model="RuleForm.gender">
                        <el-radio  label="不限">不限</el-radio>
                        <el-radio  label="男">男</el-radio>
                        <el-radio  label="女">女</el-radio>
                    </el-radio-group>

                </el-form-item>
                <el-form-item label="接待特殊年龄段" >
                        <el-checkbox   v-model="RuleForm.acceptChild">儿童(0-12岁)</el-checkbox>
                        <el-checkbox   v-model="RuleForm.acceptOld">老人(65岁以上)</el-checkbox>
                </el-form-item>
                <el-form-item label="是否接待外宾" prop="ForeignGuests">
                    <el-radio-group v-model="RuleForm.ForeignGuests">
                        <el-radio  label="1">是</el-radio>
                        <el-radio  label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="打扫换洗方式">
                    <div class="Guest-In-time">
                        <el-form-item prop="HowManySweep">
                            <el-select  placeholder="多久提供打扫卫生" v-model="RuleForm.HowManySweep">
                                <el-option :label="item" :value="item" v-for="(item,index) in HowLongSweep" :key="index"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="HowManyReplace">
                            <el-select  placeholder="多久提供被单更换" v-model="RuleForm.HowManyReplace">
                                <el-option :label="item" :value="item" v-for="(item,index) in HowLongReplace" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form-item>
                <next-step :form="ThisForm"></next-step>
            </el-form>
        </div>
    </div>
</template>


<script>
    import NextStep from "./nextStep";
    export default {
        name: "RuleOfHouse",
        components: {NextStep},
        data(){
            return{
                ThisForm:{},
                labelPosition:'top',
                RuleForm:{
                    GuestInTime:'',
                    GuestOutTime:'',
                    GetGuestTime1:'',
                    IsFrend:'',
                    gender:'',
                    acceptChild:false,
                    acceptOld:false,
                    ForeignGuests:'',
                    HowManySweep:'',
                    HowManyReplace:'',
                },
                allowList:[
                    "允许吸烟",
                    "允许带宠物",
                    "允许做饭",
                    "允许聚会",
                    "允许加人",
                    "允许商业拍摄",
                    "允许房客加床"
                ],
                rules:{
                    GuestInTime:[
                        {required:true,message:'请选择房客入住时间',trigger:'change'}
                    ],
                    GuestOutTime:[
                        {required:true,message:'请选择房客退房时间',trigger:'change'}
                    ],
                    IsFrend:[
                        {required:true,message:'请选择是否有前台',trigger:'change'}
                    ],
                    gender:[
                        {required:true,message:'请选择接待性别',trigger:'change'}
                    ],
                    HowManySweep:[
                        {required:true,message:'请选择打扫方式',trigger:'change'}
                    ],
                    HowManyReplace:[
                        {required:true,message:'请选择换洗方式',trigger:'change'}
                    ],
                    requireList:[
                        {required:true,message:'请输入房客要求',trigger:'change'}
                    ],
                    GetGuestTime1:[
                        {required:true,message:'请选择接待房客时间',trigger:'change'}
                    ],
                    GetGuestTime2:[
                        {required:true,message:'请选择接待房客时间',trigger:'change'}
                    ],
                    ForeignGuests:[
                        {required:true,message:'请选择接待房客时间',trigger:'change'}
                    ]
                }
            }
        },
        computed:{
            TimeLine:function(){
                var hour,time=[];
                for(var i = 0;i<=24;i++){
                    hour = i<10?"0"+i:i;
                    time.push(hour+":00");
                }
                return time;
            },
            HowLongSweep:function(){
                var sweep=[];
                for(var i = 1;i<=7;i++){

                    sweep.push(i+"天1扫");
                }
                return sweep;
            },
            HowLongReplace:function(){
                var replace=[];
                for(var i = 1;i<=7;i++){

                    replace.push(i+"天1换");
                }
                return replace;

            }
        },
        created(){
            if (localStorage.getItem("RuleForm")!=null){
                var RuleForm = JSON.parse(localStorage.getItem("RuleForm"));
                this.RuleForm = RuleForm;
            }
        },
        mounted(){
            var self = this;
            self.ThisForm = {
                obj:self.$refs,
                formName:'RuleForm',
                locationObj:self.RuleForm
            };
        },
    }
</script>

<style scoped>
    .rule-of-house{
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
    .Detail-form{
        margin-left: 30px;
        margin-top: 30px;
        width: 700px;
    }
    .Guest-In-time{
        
        display: flex;
        width: 440px;
        justify-content: space-around;
    }
    .required-guest{
        width: 110px;
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