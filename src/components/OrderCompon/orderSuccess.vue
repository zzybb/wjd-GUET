<template>
    <div class="order-success">
        <div class="success-top">
            <i class="icon-status"></i>
            <div class="info-box">
                <h2>
                    恭喜您，预定成功
                </h2>
            </div>


        </div>
        <button class="checkOrder" @click="gotoOrder">查看我的订单</button>


    </div>
</template>

<script>
    export default {
        name: "orderSuccess",
        methods:{
            gotoOrder(){
                this.$router.push({name:'clientSystem'})
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
        display: flex;
        align-items: center;
    }
    .success-top{
        width: 250px;
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .icon-status{
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
    }
    .checkOrder{
        width: 124px;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        border-radius: 2px;
        cursor: pointer;
        background-color: #3e97e2;
        color: #fff;
        border: none;
        position: absolute;
        display: block;

        left: 50%;
        transform:translate(-50%,-100%);
        align-self: flex-end;
    }

</style>