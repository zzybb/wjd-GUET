<template>
    <div class="detail-information" v-if="isShow">
        <div class="input-form">
            <h1 class="detail-order-header">订单详情</h1>
            <div class="detail-order-body">
                <p class="detail-item">房屋名称：{{hotelInfo.name}}</p>
                <p class="detail-item">房屋信息：{{parseInt(hotelInfo.bathroom) + parseInt(hotelInfo.bedrooms)}}室{{hotelInfo.drawingRoom}}厅{{hotelInfo.bathroom}}卫{{hotelInfo.kitchen}}厨房{{hotelInfo.balcony}}阳台</p>
                <p class="detail-item">房间地址：{{hotelInfo.address}}</p>
                <p class="detail-item">房东电话：{{hotelInfo.tel}}</p>
                <p class="detail-item">入住时间：{{userInfo.inDate}}</p>
                <p class="detail-item">退房时间：{{userInfo.outDate}} 12:00之前</p>
                <p class="detail-item">联系人姓名：{{userInfo.realName}}</p>
                <p class="detail-item">联系人电话：{{userInfo.tel}}</p>
            </div>
        </div>
        <div class="closePage" @click="closePage">
            <font-awesome-icon icon="times" size="1x"></font-awesome-icon>
        </div>
    </div>
    
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapMutations } = createNamespacedHelpers('clientSystem');
    export default {
        name: "order-detail-transparent",
        data(){
            return {

            }
        },
        computed:{
            ...mapState({
                isShow:state=>state.isShow,
                userInfo:state=>state.userInfo,
                hotelInfo:state=>state.hotelInfo
            })
        },
        methods:{
            ...mapMutations({
                changeShow:'changeShow',
            }),
            closePage(){
                this.changeShow(false)
            }
        }
    }
</script>

<style scoped>
    .detail-information{
        width: 100%;
        height: 110%;
        position: absolute;
        background-color: rgba(0,0,0,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index:100;
    }
    .input-form{
        width: 400px;
        height: 330px;
        background-color: white;
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(63,63,68,.05), 0 1px 3px 0 rgba(63,63,68,.15);

    }
    .detail-order-header{
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-size: 18px;
        color: #333;
        line-height: 40px;
        margin-left: 20px;
        width: 250px;
        border-bottom: 1px lightgray solid;
    }
    .detail-order-body{
        margin-left: 20px;
    }
    .detail-item{
        padding: 7px;
    }
    .closePage{
        width: 25px;
        height: 25px;
        position: relative;
        top: -154px;
        left: -15px;
        cursor: pointer;
    }

</style>