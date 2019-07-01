<template>
    <div class="OrderInfo">
        <OrderNav></OrderNav>
        <div class="Order-body">
            <router-view name="orderBody"  :hotelInfo = "hotelInfo"></router-view>
            <router-view name="orderSlide" :hotelInfo = "hotelInfo"></router-view>
            <router-view name="orderPay"   :hotelInfo=  "hotelInfo"></router-view>
            <router-view name="orderSuccess"   ></router-view>
        </div>
        <div class="clear"></div>

    </div>
</template>


<script>
    import OrderNav from '@/components/OrderCompon/order-nav.vue'
    export default {
        name: "OrderInfo",
        components:{
            OrderNav
        },
        data(){
            return {
                hotelInfo:''
            }
        },
        created() {
            this.requiredHotel();
        },
        methods:{
            requiredHotel(){
                this.$api.post(this.$myconfig.hotelDetail,{
                    "id":this.$route.query.hotelId,
                    "selectStartDate":'',
                    "selectEndDate":''
                },r=>{
                    this.hotelInfo = r.data.hotel;
                },error=>{
                    console.log(error.data);
                })
            }
        }
    }
</script>

<style scoped>
    .Order-body{
        width: 1250px;
        margin: 0 auto;
    }
    .clear{
        clear: both;

    }

</style>