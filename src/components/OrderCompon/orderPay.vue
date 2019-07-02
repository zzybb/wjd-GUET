<template>
    <div class="order-success" v-loading="isLoading">
        <div class="order-top">
            <div class="status-cont">
                <div class="order-status">
                    <i class="icon-status"></i>
                    <div class="info-box">
                        <h2>
                            提交订单成功，请尽快支付订金。
                        </h2>
                    </div>

                </div>
                <div class="order-information">
                    <h1>{{baseInfo.name}}（宜住{{baseInfo.peopleNumber}}人，{{baseInfo.bedNum}}床）</h1>
                    <h1>{{baseInfo.inTime}} 至 {{baseInfo.endTime}} 入住{{baseInfo.nightNum}}晚{{baseInfo.houseNumber}}间房</h1>
                </div>
            </div>
            <div class="status-pay">
                <span class="online-pay">在线支付</span>
                <span class="price">￥{{baseInfo.price}}</span>
            </div>
            <button class="submit-pay" @click="payForInstance">立即支付</button>
        </div>
    </div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'

    const { mapMutations } = createNamespacedHelpers('Order');

    export default {
        name: "orderPay",
        props:['hotelInfo'],
        data(){
            return {
                isLoading:false,
                baseInfo:{
                    name:'',
                    suitPeople:'',
                    bedNum:'',
                    nightNum:'',
                    price:0,
                    inTime:'',
                    endTime:'',
                    houseNumber:''
                },


            }
        },
        created(){
            this.requiredOrder();

        },

        methods:{
            ...mapMutations({
                changeComId:'changeComId'
            }),
            requiredOrder(){
                this.isLoading = true;
                this.changeComId(2);
                this.$api.get(this.$myconfig.GetOrder + this.$route.query.orderId,{},r=>{
                    var order = r.data.hotelOrder;

                    this.baseInfo = {
                        name:order.realName,
                        suitPeople:order.peopleNumber,
                        bedNum:order.number,
                        nightNum:JSON.parse(localStorage.getItem("SelectDate")).nightNum,
                        houseNumber:order.number,
                        inTime:order.inDate,
                        endTime:order.outDate,
                        price:order.money
                    }

                    this.isLoading = false;
                },err=>{
                    console.log(err.data);
                    this.isLoading = false;
                })

            },
            payForInstance(){
                this.changeComId(3);
                this.$router.push({name:'orderSuccess'});

            }

        }

    }
</script>

<style scoped>
    .order-success{

        width: 1190px;
        height: 400px;
        border: 1px solid #ddd;
        padding: 20px 30px;
        margin: 30px auto 0;
    }



    .status-cont{
        width: 90%;
        margin: 0 auto;
        height: 250px;
        border-bottom: 1px gray dashed;
        display: flex;
        align-items: center;


    }
    .order-status {
        width: 380px;

        display: flex;
        align-items: center;
        margin: 0 auto ;
    }
    .order-status i{
        background-image: url("../../assets/order-pay/icon-status.png") ;
        background-repeat: no-repeat;
        float: left;
        overflow: hidden;
        height: 60px;
        width: 60px;
        display: block;
    }
    .info-box{
        margin-left: 30px;
        float: right;
    }
    .status-pay{
        margin-top: 20px;
        height: 100px;
    }
    .price{
        display: inline-block;
        font-size: 30px;
        margin-left: 100px;
        font-weight: 700;
        color: #f60;
    }
    .online-pay{
        margin-left: 100px;
        font-size: 20px;
    }
    .submit-pay{
        display: block;
        margin: 0 auto;
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

</style>