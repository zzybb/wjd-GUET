<template>
    <div class="base-body">
        <div class="house-image">
            <img :src="houseInfo.imgUrl">
        </div>
        <div class="house-info">
            <h5 class="house-title">
                <a>{{houseInfo.name}}</a>
            </h5>
            <h4 class="house-type">{{houseInfo.type}}</h4>
            <span class="house-information"> {{houseInfo.homeNum}}室{{houseInfo.livingNum}}厅 | {{houseInfo.bedNum}}床 | 最多住{{houseInfo.peopleNum}}人 </span>
        </div>
        <div class="payment-detail">
            <div class="order-free">
                <span class="title">线上支付</span>
                <span class="price">
                    <span>￥</span>{{nightNum == '' ? (SelectDate.nightNum * houseInfo.price) : (nightNum * houseInfo.price)}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'

    const { mapState } = createNamespacedHelpers('Order');
    export default {
        name: "order-base",
        props:['hotelInfo'],
        data(){
            return {
                requiredURL:this.$myconfig.ImageURL,
                houseInfo:{
                    name:'',
                    type:'',
                    homeNum:0,
                    livingNum:0,
                    bedNum:0,
                    peopleNum:0,
                    price:0,
                    imgUrl:'',
                },
                SelectDate:''
            }
        },
        created(){
            this.requiredStorg();

        },
        watch:{
            hotelInfo(obj){
                this.houseInfo = {
                    name:obj.name,
                    type:obj.type,
                    homeNum:parseInt(obj.bathroom) + parseInt(obj.bedrooms) + parseInt(obj.drawingRoom) + parseInt(obj.study),
                    livingNum:obj.drawingRoom,
                    bedNum:obj.bed,
                    peopleNum:obj.suitablePopulation,
                    price:obj.price + ".00",
                    imgUrl:this.requiredURL + obj.hotelImage1
                }
            }
        },
        computed:{
            ...mapState({
                nightNum:state => state.night
            })
        },
        methods:{
            requiredStorg(){
                if (localStorage.getItem("SelectDate")){
                    this.SelectDate = JSON.parse(localStorage.getItem("SelectDate"));
                }
            },
        }
    }
</script>

<style scoped>
    .base-body{
        width: 300px;

        float: right;
        margin-top: 30px;
        border: 1px solid #ddd;
    }
    .house-image img{
        width: 100%;
        height: 188px;

    }
    .house-title{
        padding: 25px;
    }
    .house-title a{
        font-size: 16px;
        color: #3e97e2;
        line-height: 20px;
        font-weight: 400;
        text-decoration: none;
    }
    .house-type{
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 12px;
        margin-left: 15px;
    }
    .house-information{
        display: inline-block;
        margin-left: 25px;
        margin-bottom: 20px;
    }
    .payment-detail{
        background-color: #fffbf6;
        border:1px dashed #f5dcbc;
        height: 62px;
        display: flex;
        align-items: center;
    }
    .title{

        width: 170px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        color: #666;
        font-weight: normal;

        margin-left: 20px;
    }
    .payment-detail .price{
        font-size: 28px;
        color: #f66;
        margin-left: 80px;
    }

</style>