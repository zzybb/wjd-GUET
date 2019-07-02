<template>
    <div class="merchant-unit-list" v-loading="isLoading">

        <div class="order-header">
            <h5>房屋管理<router-link :to="{name:'merchant-register'}" class="gotoPush2" v-if="haveHouse">继续发布房屋</router-link></h5>

        </div>
        <div class="list-house-body">
            <ul class="nineLattice">
                <li class="listLi" v-for="item in sliceList" @click="gotoUpdate(item)">
                    <div class="topImage">
                        <a class="house-detail-link">
                            <img class="lazy" :src="requireURL + item.hotelImage1">
                        </a>
                    </div>
                    <div class="listLi-top">
                        <div class="house-title">
                            <span>{{item.name | spliceString}}</span>
                        </div>
                        <div class="house-price">
                            <span>￥{{item.price}}</span>
                        </div>
                    </div>
                    <div class="house-address">
                        <p>{{item.street}}</p>
                        <span class="iconfont"></span>
                    </div>
                    <div class="house-detail">
                        <p>{{parseInt(item.bathroom) + parseInt(item.bedrooms)}}居/{{item.area}}平米/宜住{{item.suitablePopulation}}人</p>
                    </div>
                </li>
                <div class="clear"></div>
            </ul>
            <div class="splice-page">
                <el-pagination
                        background
                        hide-on-single-page
                        @current-change="handlePageChange"
                        :page-size="6"
                        :total="HouseList.length"
                        layout="prev, pager, next"
                >
                </el-pagination>
            </div>
        </div>
        <div class="none-house-box" v-if="!haveHouse">
            <div class="no-house">
                <img src="../../assets/merchant-system/data_image2.png">
                <span class="no-house-word">当前还没发布任何房屋</span>
                <div class="gotoPush" @click="gotoPush"><span>发布新房屋</span></div>
            </div>

        </div>


    </div>

</template>

<script>

    export default {
        name: "merchantUnitList",

        data(){
            return {
                haveHouse:true,
                isLoading:false,
                requireURL:this.$myconfig.ImageURL,
                HouseList:[],
                sliceList:[],
            }
        },
        created() {
            this.requiredHouse();
        },
        methods:{
            requiredHouse(){
                this.isLoading = true;
                this.$api.get(this.$myconfig.getSelfHouse,{
                },success=>{
                    if (success.data.msg == '未发布房源！'){
                        this.haveHouse = false;
                        throw new Error();
                    }
                    this.HouseList = success.data.list;
                    this.HouseList.length == 0 ? this.haveHouse = false : this.haveHouse = true;
                    this.handlePageChange(1);
                    this.isLoading = false;

                },failure=>{
                    console.log(failure)

                    this.isLoading = false;
                })
            },
            gotoPush(){
                this.$router.push({name:'merchant-register'})
            },
            gotoUpdate(item){
                localStorage.setItem("detailHotelInfo",JSON.stringify(item));
                this.$router.push({name:'UpdateHotel',params:{hotelId:item.id}});
            },
            handlePageChange(page){
                var min = (page - 1)*6,
                    max = (page*6);
                this.sliceList = this.HouseList.slice(min,max);
            }
        }
    }
</script>

<style scoped>
    .clear{
        clear: both;
    }
    .merchant-unit-list{
        float: right;
        position: relative;

        width: 950px;
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(63,63,68,.05), 0 1px 3px 0 rgba(63,63,68,.15);
        padding-bottom: 20px;
    }
    .order-header{
        width: 95%;
        margin: 0 auto;
    }

    .order-header h5{
        font-size: 16px;
        padding: 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid #eee;
    }
    .none-house-box{
        width: 100%;
        height: 220px;
    }
    .no-house{
        width: 180px;
        margin: 249px auto 0;
    }
    .no-house-word{
        display: block;
        font-size: 16px;
        color: #999;
        margin-top: 10px;
        text-align: center;
    }
    .no-house img{
        margin-left: 21%;
    }
    .gotoPush2{

        width: 140px;
        height: 40px;
        margin-left: 700px;
        text-align: center;
        color: #fff;
        background-color: #6e80e3;
        border-color: #6e80e3;
        font-size: 14px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .no-house .gotoPush{

        width: 140px;
        height: 40px;
        text-align: center;
        margin-top: 10px;
        margin-left: 10%;
        color: #fff;
        background-color: #6e80e3;
        border-color: #6e80e3;
        font-size: 14px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .list-house-body{
        width: 950px;
        margin: 50px auto;
    }

    .nineLattice .listLi{
        width: 300px;
        height: 250px;
        cursor: pointer;
        float:left;
        margin-top: 20px;
        margin-left: 13px;
        box-shadow: 0 0 0 1px rgba(63,63,68,.05), 0 1px 3px 0 rgba(63,63,68,.15);
    }




    .nineLattice .listLi .topImage{
        width: 100%;
        height: 132px;
        overflow: hidden;
        position: relative;
    }

    .pagination .block{
        margin-left: 61%;
    }
    .topImage img{
        width: 100%;
        height: 232px;
    }

    .listLi-top{
        margin-top: 10px;
        padding-left: 10px;
    }

    .listLi-top .house-title{
        width: 300px;
        font-size: 18px;
        color: #333;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        display: inline-block;
    }
    .listLi-top .house-price{
        display: inline-block;
        font-size: 16px;
        color: #f66;
        text-align: right;
        letter-spacing:2px;
    }
    .house-address{
        margin-top: 10px;
        display: flex;
        align-items: center;
        padding-left: 10px;
    }
    .listLi .house-address p{
        font-size: 14px;
        color: #666;
        line-height: 26px;
        margin-right: 10px;
        align-items: center;

    }
    .listLi .house-detail{
        padding-left: 10px;
    }
    .listLi .iconfont {
        display: inline-block;
        background-image: url("../../assets/hotel-list/com-search.png");
        width: 20px;
        height: 22px;
    }
    .splice-page{
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;


    }




</style>