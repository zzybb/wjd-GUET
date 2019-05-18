<template>
    <div class="House-detail">
        <div class="title-con">
            <h1>房屋详情<span>客房一般根据房型、户型等信息，选择合适的房屋。</span></h1>
        </div>
        <div class="Detail-form">
            <el-form :label-position="labelPosition" status-icon label-width="80px" ref="DetailForm" :model="DetailForm" :rules="rules">
                <el-form-item label="出租类型" prop="TypeOfRental">
                    <el-radio-group v-model="DetailForm.TypeOfRental">
                        <el-radio label="整套房屋"></el-radio>
                        <el-radio label="独立房间"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="房屋类型" prop="TypeOfHouse">
                    <el-radio-group v-model="DetailForm.TypeOfHouse">
                        <el-radio label="公寓"></el-radio>
                        <el-radio label="客栈"></el-radio>
                        <el-radio label="别墅"></el-radio>
                        <el-radio label="其他/特色"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="房屋面积" prop="size">
                    <el-input v-model="DetailForm.size" placeholder="单位为：平方米"></el-input>
                </el-form-item>
                <el-form-item label="房屋景观" prop="landscape">
                    <el-select v-model="DetailForm.landscape" placeholder="请选择活动区域">
                        <el-option label="海景" value="海景"></el-option>
                        <el-option label="湖景" value="湖景"></el-option>
                        <el-option label="江景" value="江景"></el-option>
                        <el-option label="山景" value="山景"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房屋户型">
                    <div class="House-type">
                            <p>卧室 &nbsp;
                                <el-input-number v-model="DetailForm.HouseDetailNum.bedroom" controls-position="right" :min="0" :max="10" size="mini"></el-input-number>
                            </p>
                        <p>卫生间&nbsp<el-input-number v-model="DetailForm.HouseDetailNum.bathroom" controls-position="right" :min="0" :max="10" size="mini"></el-input-number></p>
                        <p>客厅&nbsp<el-input-number v-model="DetailForm.HouseDetailNum.livingRoom" controls-position="right" :min="0" :max="10" size="mini"></el-input-number></p>
                        <p>厨房&nbsp<el-input-number v-model="DetailForm.HouseDetailNum.kitchen" controls-position="right" :min="0" :max="10" size="mini"></el-input-number></p>
                        <p>书房&nbsp<el-input-number v-model="DetailForm.HouseDetailNum.BookRoom" controls-position="right" :min="0" :max="10" size="mini"></el-input-number></p>
                        <p>阳台&nbsp<el-input-number v-model="DetailForm.HouseDetailNum.balcony" controls-position="right" :min="0" :max="10" size="mini"></el-input-number></p>
                    </div>
                </el-form-item>
                <el-form-item label="床的数量">


                        <el-select v-model="DetailForm.bedNum"  size="mini"  placeholder="请选择床的数量">
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                            <el-option label="3" value="3"></el-option>
                            <el-option label="4" value="4"></el-option>
                            <el-option label="5" value="5"></el-option>
                            <el-option label="6" value="6"></el-option>
                            <el-option label="7" value="7"></el-option>
                            <el-option label="8" value="8"></el-option>
                            <el-option label="9" value="9"></el-option>
                            <el-option label="10" value="10"></el-option>
                        </el-select>

                </el-form-item>
                <el-form-item label="宜住人数" prop="fitNum">
                    <el-input-number v-model="DetailForm.fitNum" controls-position="right"  :min="1" :max="4" size="mini"></el-input-number>
                </el-form-item>
                <el-form-item label="同类房数量" prop="HouseNum">

                    <p class="info-titp2">房间数量是指相同类型房间的数量，最终会以库存的形式呈现。</p>
                    <div class="info-HouseNum">
                        <el-input v-model="DetailForm.HouseNum" placeholder="请输入同类房间数量"></el-input>
                        &nbsp;&nbsp;<span>套</span>
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
        name: "HouseDetails",
        components: {NextStep},
        data(){
            return{
                ThisForm:{},
                labelPosition:'top',   //输入框文字显示位置
                DetailForm:{           //表单数据存放
                    TypeOfRental:'',   //出租类型
                    TypeOfHouse:'',    //房屋类型
                    size:'',           //房屋面积
                    landscape:'',      //房屋风景
                    HouseDetailNum:{   //详细户型
                        bedroom:'',
                        bathroom:'',
                        livingRoom:'',
                        kitchen:'',
                        BookRoom:'',
                        balcony:''
                    },
                    bedNum:'',
                    fitNum:'',         //宜居人数
                    HouseNum:''        //房屋数量
                },
                rules:{                //校验规则
                    TypeOfRental:[
                        {required:true,message:'请选择房屋类型',trigger:'change'}
                    ],
                    TypeOfHouse:[
                        {required:true,message:'请选择房屋类型',trigger:'change'}
                    ],
                    size:[
                        {required:true,message:'请输入房屋面积',trigger:'blur'}
                    ],
                    landscape:[
                        {required:true,message:'请选择房屋景观',trigger:'change'}
                    ],
                    fitNum:[
                        {required:true,message:'请输入宜居人数',trigger:'blur'}
                    ],
                    HouseNum:[
                        {required:true,message:'请输入同类房数量',trigger:'blur'}
                    ]

                }
            }
        },
        mounted(){
            var self = this;
            self.ThisForm = {
                obj:self.$refs,
                formName:'DetailForm',
                locationObj: self.DetailForm
            };
        },
        created(){
            if (localStorage.getItem("DetailForm") != null){
                var DetailForm = JSON.parse(localStorage.getItem("DetailForm"));
                this.DetailForm = DetailForm;
            }
        }
    }
</script>

<style scoped>
    .House-detail{
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
    .House-type{
        display: flex;

        width: 1000px;
        justify-content: space-around;

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
        width: 400px;
    }
    .bed-type{
        margin-bottom: 20px;
        width: 700px;
        display: flex;
        justify-content: space-around;
    }
    .info-HouseNum{
        display: flex;
        align-items: center;

    }
    .info-titp span{
        color: red;
    }
    .info-titp2{
        font-size: 12px;
        margin-left: 10px;
        color: rgb(153, 153, 153);
        margin-bottom: 10px;
    }



</style>