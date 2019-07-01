<template>
    <div class="order-body">
        <div class="orderinfo-cont">
            <div class="col-header">
                <span class="col-title">预定信息</span>
            </div>
            <div class="order-info-main">
                <div class="date">
                    <span class="inTime">入住时段:</span>
                    <Calendar v-on:getDate="getDate($event)"></Calendar>
                    <span class="night">共{{SelectDate.nightNum}}晚</span>
                </div>
                <el-form v-model="baseInfo" label-width="80px">
                    <el-form-item label="预定数量:">
                        <el-select v-model="baseInfo.number" placeholder="预定数量">
                            <el-option :label="item" :value="item" v-for="item in 1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入住人数:">
                        <el-select v-model="baseInfo.peopleNumber" placeholder="入住人数">
                            <el-option :label="item" :value="item" v-for="item in Maxpeople"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="orderinfo-cont">
            <div class="col-header">
                <span class="col-title">入住人信息</span>
            </div>
            <div class="order-info-main">
                <el-form v-model="peopleInfo" label-width="80px">
                    <el-form-item >
                        <el-radio-group v-model="baseInfo.idType">
                            <el-radio label="身份证"></el-radio>
                            <el-radio label="居住证" disabled></el-radio>
                        </el-radio-group>


                    </el-form-item>
                    <el-form-item label="姓名:">
                        <el-input v-model="peopleInfo.realName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机:">
                        <el-input v-model="peopleInfo.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="证件:">
                        <el-input v-model="peopleInfo.idNumber"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="orderinfo-cont">
            <div class="col-header">
                <span class="col-title">退订规则</span>
            </div>
            <div class="order-info-main">
                未入住/提前离店 收取剩余房费的50%
            </div>
        </div>
        <button class="submit" @click="SubmitOrder">提交订单</button>
    </div>
</template>

<script>
    import Calendar from "../Calendar";
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations } = createNamespacedHelpers('Order');
    export default {
        name: "order-body",
        components: {Calendar},
        props:['hotelInfo'],
        data(){
            return {

                MaxOrder:0,
                Maxpeople:0,
                SelectDate:{
                    BeganTime:'',
                    EndTime:'',
                    nightNum:''
                },
                baseInfo:{
                    inDate:'',
                    outDate:'',
                    number:'',
                    peopleNumber:'',
                    money:0,
                    isPay:0,
                    idType:''
                },
                peopleInfo:{
                    realName:'',
                    tel:'',
                    idNumber:''
                }
            }
        },
        created(){
            this.requiredStorg();
        },
        watch:{
            SelectDate(newValue){
                this.baseInfo.inDate = newValue.BeganTime;
                this.baseInfo.outDate = newValue.EndTime;
            },
            hotelInfo(obj){
                this.MaxOrder = parseInt(obj.housingQuantity);
                this.Maxpeople = parseInt(obj.suitablePopulation);
            }
        },
        methods:{
            ...mapMutations({
                changeNight:'changeNight',
                changeInfo:'changeInfo',
                changeComId:'changeComId'
            }),

            getDate(event){
                this.SelectDate = event;
                this.changeNight(event.nightNum);
            },
            requiredStorg(){
                if (localStorage.getItem("SelectDate")){
                    this.SelectDate = JSON.parse(localStorage.getItem("SelectDate"));
                }
            },
            ReorganInfo(obj){
                Object.assign(obj,this.baseInfo);
                Object.assign(obj,this.peopleInfo);
                obj["money"] = this.SelectDate.nightNum * this.hotelInfo.price;
                obj["id"] = this.hotelInfo.id;
                obj["hotelId"] = this.$route.query.hotelId
            },
            SubmitOrder(){
                var obj = {};
                this.ReorganInfo(obj);
                this.changeInfo(obj);
                console.log(obj);
                this.$api.post(this.$myconfig.SaveOrder,obj,r=>{
                    this.changeComId(2);
                    if (r.data.msg == 'success'){
                        this.$router.push({name:'orderPay',query:{orderId:r.data.orderId}});
                    }else {
                        this.$message.error('提交失败。' + r.data.msg);
                    }
                    console.log(r.data);
                },err=>{
                    this.$message.error('提交失败。' + err.data.msg);
                })
            }
        }
    }
</script>

<style scoped>

    .order-body{
        margin: 0 auto;
        margin-top: 30px;
        padding: 40px 30px;
        width: 860px;
        box-shadow: 0 0 3px 0 #ccc;
        float: left;
    }
    .col-header{
        margin-bottom: 36px;
    }
    .col-header{
        width: 800px;
        padding: 8px 0;
        border-bottom: 2px solid #ddd;
        margin: 0 auto;
    }
    .col-title{
        padding-left: 8px;
        border-left: 3px solid #3e97e2;
        font-size: 18px;
        font-weight: 700;
        color: #333;
    }
    .order-info-main{

        font-size: 14px;
        color: #333;
        width: 800px;
        margin: 8px auto;
    }
    .night{
        margin-left: 20px;
        letter-spacing: 5px;
    }
    .inTime{
        margin-right: 14px;
        margin-left: 8px;

    }
    .submit{
        display: block;
        margin: 30px auto 0;
        width: 124px;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        border-radius: 2px;
        cursor: pointer;
        background-color: #3e97e2;
        color: #fff;
        border: none;
    }
    .date{
        margin-bottom: 20px;
    }

</style>