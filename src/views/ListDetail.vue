<template>
    <div class="list-detail">
        <div>
            <slider></slider>
        </div>
        <div class="top-image">
            <el-carousel indicator-position="outside"  height="590px">
                <el-carousel-item v-for="item in DetailForm.HotelImageList" :key="item">
                    <img :src="item" class="first-image">

                </el-carousel-item>
            </el-carousel>
        </div>

            <div class="icon-2-nav" :class="[searchBarFixed ? 'searchBarFixed':'']">
                <div class="icon-container-nav">
                    <ul>
                        <li><a href="#house_description">房屋介绍</a></li>
                        <li><a href="#trading_rules">交易规则</a></li>
                        <li><a href="#Check-in_instructions">入住须知</a></li>
                    </ul>
                </div>
            </div>
            <div class="icon-2-body">
                <div class="icon-2-body-left">
                    <div class="icon-2-main">
                        <h3 class="unit-title__name">{{DetailForm.HouseName}}</h3>
                        <p class="unit-title__address">地址：{{DetailForm.address}}</p>
                        <div class="unit-house-info">
                            <ul class="clearfix">
                                <li>
                                    <i class="icon-fangwuleixing"></i>
                                    <span>{{DetailForm.HouseType}}</span>
                                </li>
                                <li>
                                    <i class="icon-huxing"></i>
                                    <span>{{DetailForm.roomNum}} 室 {{DetailForm.livingNum}} 厅 {{DetailForm.bathNum}}卫</span>
                                </li>
                                <li>
                                    <i class="icon-chuangxing"></i>
                                    <span>{{DetailForm.bedNum}} 张床</span>
                                </li>
                                <li>
                                    <i class="icon-yizhujiren"></i>
                                    <span>宜住 {{DetailForm.fitNum}} 人</span>
                                </li>
                                <li v-if="ServiceList[2].isShow">
                                    <i class="icon-duliweiyu"></i>
                                    <span>独立卫浴</span>
                                </li>

                            </ul>
                        </div>
                        <div class="unit-layout__item" id="house_description">
                            <h5>房屋描述</h5>
                            <div class="unit-description simple">
                                {{DetailForm.HouseDescription}}
                            </div>
                        </div>
                        <div class="unit-layout__item" id="Facility_service">
                            <h5>设施服务</h5>
                            <div class="unit-facilities">
                                <ul>
                                    <li>
                                        <h2 class="facilities-title">基础设施</h2>
                                        <span v-for="(item,index) in ServiceList"  :key="index">
                                            <p v-if="item.isShow">
                                                <i :class="item.className"></i>
                                                {{item.chiName}}
                                            </p>
                                        </span>


                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div class="unit-layout__item" id="house_position">
                            <h5>房屋位置</h5>

                        </div>
                        <div class="unit-layout__item" id="trading_rules">
                            <div class="rule-intro">
                                <h5>交易规则<span class="rule-transaction-icon">此规则由房东制定</span></h5>
                                <p>付款方式： 全额预付房费</p>
                                <p>需要确认： 付款后需要等待房东确认是否接待，建议提前和房东沟通</p>
                                <p>入住押金： 在线支付￥{{DetailForm.deposit}} 元</p>
                            </div>

                        </div>
                        <div class="unit-layout__item" id="Check-in_instructions">
                            <div class="rule-intro">
                                <h5>入住须知</h5>
                                <ul>
                                    <li>
                                        <span>入住时间：{{DetailForm.hotelRule.inTime}} 后 </span>
                                    </li>
                                    <li>
                                        <span>退房时间：{{DetailForm.hotelRule.outTime}} 前</span>
                                    </li>
                                    <li>
                                        <span>接待时间：{{DetailForm.hotelRule.receiveTime}}</span>
                                    </li>
                                    <li>
                                        <span>卫生打扫：{{DetailForm.hotelRule.cleaning}}</span>
                                    </li>
                                    <li>
                                        <span>被单更换：{{DetailForm.hotelRule.sheets}}</span>
                                    </li>
                                    <li>
                                        <span>洗漱更换：{{DetailForm.hotelRule.sheets}}</span>
                                    </li>
                                    <li>
                                        <span>毛巾更换：{{DetailForm.hotelRule.sheets}}</span>
                                    </li>
                                    <li>
                                        <span>接待说明：</span>
                                        <span class="rule-intro-accept" v-if="DetailForm.hotelRule.acceptOld">
                                            <i class="acceptOld"></i>
                                            接待老人
                                        </span>
                                        <span class="rule-intro-accept" v-if="DetailForm.hotelRule.acceptChild">
                                            <i class="acceptChild"></i>
                                            接待小孩
                                        </span>
                                        <span class="rule-intro-accept" v-if="DetailForm.hotelRule.acceptForeign">
                                            <i class="acceptFor"></i>
                                            接待外宾
                                        </span>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>

                </div>
                <div class="icon-2-body-right" :class="[searchBarFixed ? 'searchBarFixed2':'']">
                    <div class="unit-price__price">
                        <span>￥</span>
                        <span class="price__count">{{DetailForm.price}}</span>
                        每晚
                    </div>
                    <div class="calendar">
                        <Calendar v-on:getDate="getDate($event)"></Calendar>
                    </div>



                    <button class="common__button">
                        <span class="common__button_price">立刻预订（{{SelectDate.nightNum}}晚¥{{(SelectDate.nightNum * DetailForm.price) || 0}}）</span>
                    </button>

                </div>
                <div class="clear"></div>

            </div>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script>
    import BottomNav from "../components/bottomNav";
    import Calendar from "../components/Calendar";
    import Slider from "../components/slider";

    export default {
        name: "ListDetail",
        components:{
            Slider,
            Calendar,
            BottomNav
        },
        data(){
            return {
                Image1src:'',
                SelectDate:'',
                searchBarFixed:false,
                DetailForm:{
                    HouseName:'',
                    address:'',
                    HouseType:'',
                    roomNum:'',
                    livingNum:'',
                    bathNum:'',
                    bedNum:'',
                    fitNum:'',
                    HouseDescription: '',
                    deposit:'',
                    hotelRule:'',
                    HotelImageList:[]

                },
                ServiceList:[
                    {
                        engName:"airConditioning",
                        chiName:"中央空调",
                        className:'icon-airConditioning',
                        isShow:false
                    },
                    {
                        engName:"bathTowel",
                        chiName:"浴巾",
                        className:"icon-bathTowel",
                        isShow:false
                    },
                    {
                        engName:"bathroom",
                        chiName:"独立卫浴",
                        className:"icon-bathTowel",
                        isShow:false
                    },
                    {
                        engName:"hairDrier",
                        chiName:"吹风机",
                        className:"icon-hairDrier",
                        isShow:false
                    },
                    {
                        engName:"hotWater",
                        chiName:"全天热水",
                        className:"icon-hotWater",
                        isShow:false
                    },
                    {
                        engName:"kettle",
                        chiName:"电热水壶",
                        className:"icon-kettle",
                        isShow:false
                    },
                    {
                        engName:"refrigerator",
                        chiName:"冰箱",
                        className:"icon-refrigerator",
                        isShow:false
                    },
                    {
                        engName:"soap",
                        chiName:"肥皂",
                        className:"icon-soap",
                        isShow:false
                    },
                    {
                        engName:"television",
                        chiName:"电视",
                        className:"icon-television",
                        isShow:false
                    },
                    {
                        engName:"toiletPaper",
                        chiName:"厕所纸",
                        className:"icon-toiletPaper",
                        isShow:false
                    },
                    {
                        engName:"toiletries",
                        chiName:"洗浴用品",
                        className:"icon-toiletries",
                        isShow:false
                    },
                    {
                        engName:"toothCleaners",
                        chiName:"牙具",
                        className:"icon-toothCleaners",
                        isShow:false
                    },
                    {
                        engName:"towel",
                        chiName:"毛巾",
                        className:"icon-towel",
                        isShow:false
                    },
                    {
                        engName:"washing",
                        chiName:"洗衣机",
                        className:"icon-washing",
                        isShow:false
                    },
                    {
                        engName:"washingPowder",
                        chiName:"洗衣粉/液",
                        className:"icon-washingPowder",
                        isShow:false
                    },
                    {
                        engName:"wifi",
                        chiName:"无线网络",
                        className:"icon-wifi",
                        isShow:false
                    }
                ]
            }
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll)
        },
        created() {

            this.$api.get(this.$myconfig.hotelDetail + this.$route.params.hotelId,{
                "token":localStorage.getItem("token")
            },r=>{
                console.log(r.data);
                let data = r.data.hotel;
                this.Image1src = '/image/' + data.hotelImage1;
                this.DetailForm = {
                    HouseName:data.name,
                    address:data.address,
                    HouseType:data.type,
                    roomNum:parseInt(data.bedrooms) + parseInt(data.study),
                    livingNum:data.drawingRoom,
                    bathNum:data.bathroom,
                    bedNum:data.bed,
                    fitNum:data.suitablePopulation,
                    HouseDescription:data.feature,
                    deposit:data.deposit,
                    hotelRule:data.hotelRule,
                    price:data.price,
                    HotelImageList:[
                        this.$myconfig.ImageURL + data.hotelImage1,
                        this.$myconfig.ImageURL + data.hotelImage2,
                        this.$myconfig.ImageURL + data.hotelImage3,
                        this.$myconfig.ImageURL + data.hotelImage4
                    ]
                };
                this.ServicePush(data.facilityService);
            },e=>{
                console.log(e);
            });

            if (localStorage.getItem("SelectDate")){
                this.SelectDate = JSON.parse(localStorage.getItem("SelectDate"));
            }
        },
        methods:{
            ServicePush(data){
                for(var item in data){
                    if (data[item]){
                        for(var i = 0;i<this.ServiceList.length;i++){
                            item == this.ServiceList[i].engName ? this.ServiceList[i].isShow = true : ''
                        }
                    }
                }
            },
            getDate(event){
                this.SelectDate = event;
            },
            handleScroll(){
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let offsetTop = document.querySelector('.icon-2-nav').offsetTop;
                scrollTop > offsetTop ? this.searchBarFixed = true : this.searchBarFixed = false;
            }
        }
    }
</script>

<style scoped>
    .list-detail{
        background-color: #f5f5f5;
    }

    .top-image{
        width: 100%;


        height: 590px;
    }
    .first-image{
        height: 590px;
        width: 100%;
        min-width: 1280px;
        position: relative;
        color: #fff;
        z-index: 1;
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .icon-2-nav{
        width: 100%;
        min-width: 1280px;
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.05);


        overflow: hidden;
    }
    .icon-2-nav ul li{

        float: left;
        margin-right: 38px;
        height: 56px;
        line-height: 56px;
    }
    .icon-2-nav ul li a{
        font-size: larger;
        color: #333333;
        cursor: pointer;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    }

    .icon-container-nav{
        width: 1190px;
        margin: 0 auto;
        background: #fff;
        height: 56px;
        color: #333;
    }
    .icon-2-body{

        position: relative;
        width: 1250px;
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 50px ;



    }
    .icon-2-body-left{
        width: 750px;
        margin-top: 30px;
        margin-left: 30px;
        float: left;
        background-color: white;
        padding: 20px;


    }

    .icon-fangwuleixing{
        background-image: url("../assets/hotel-list/houseInfo-icon.png");
        background-position: -64px 0;
    }
    .icon-huxing{
        background-image: url("../assets/hotel-list/houseInfo-icon.png");
        background-position: 0 0;
    }
    .icon-chuangxing{
        background-image: url("../assets/hotel-list/houseInfo-icon.png");
        background-position: -64px -64px;
    }
    .icon-yizhujiren{
        background-image: url("../assets/hotel-list/houseInfo-icon.png");
        background-position: -96px -96px;
    }
    .icon-duliweiyu{
        background-image: url("../assets/hotel-list/houseInfo-icon.png");
        background-position: -32px -32px;
    }


    .unit-title__name{
        font-size: 28px;
        color: #333;
        margin-bottom: 12px;
        height: 37px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-family: "Baskerville Old Face";
    }
    .unit-title__address{
        color: #9b9b9b;
        line-height: 20px;
        margin-bottom: 20px;
    }
    .clearfix{
        display: flex;

    }
    .clearfix li{
        position: relative;
        width: 85px;
        text-align: center;
    }
    .clearfix li i{
        display: block;
        text-align: center;
        width: 28px;
        height: 28px;
        margin: 0 auto 15px;
    }
    .unit-house-info{
        margin-top: 50px;
    }

    .unit-layout__item{
        margin-top: 80px;
    }
    .unit-layout__item h5{
        font-size: 20px;
        color: #333;
        margin-bottom: 25px;
        font-weight: 500;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        padding: 0px;
    }
    .unit-description{
        font-size: 14px;
        font-weight: 500;
        letter-spacing:2px;
    }

    .clear{
        clear: both;
    }
    .icon-2-body-right{

        width: 360px;
        position: relative;
        margin-top: 30px;
        float: right;
        z-index: 1;
        padding: 30px;
        background-color: white;
    }
    .unit-facilities ul li p{

        width: 20%;
        display: inline-block;
        font-size: 14px;
        color: #666;
        line-height: 20px;
        margin-bottom: 15px;

    }
    .unit-facilities ul li p i{
        width: 20px;
        height: 20px;
        display: inline-block;
        background-repeat: no-repeat;
        margin-right: 13px;
        vertical-align: middle;
    }
    .facilities-title{
        font-size: 14px;
        color: #333;
        margin-bottom: 20px;
        margin-top: 20px;
        font-weight: 400;
    }
    .rule-transaction-icon{
        color: #999;
        font-size: 14px;
        font-weight: 400;
        margin-left: 10px;
    }
    .rule-intro p{
        margin-top: 20px;

    }
    .rule-intro li{
        margin-top: 10px;
    }
    .rule-intro li span{
        font-size: 14px;
    }
    .rule-intro i{
        display: inline-block;
        background-image: url("../assets/hotel-list/unit-detail.png");
        background-position: -174px -176px;
        width: 14px;
        height: 14px;
    }
    .rule-intro-accept{
        margin-right: 5px;
        margin-top: -2px;
        width: 20%;
        display: inline-block;
    }
    .price__count{

        font-size: 36px;
        text-align: right;
        line-height: 34px;
        margin-right: 5px;
        font-weight: 500;
    }
    .common__button{
        transition: .1s;
        background-image: linear-gradient(-221deg,#ff721e,#ff9b3e);
        -webkit-box-shadow: 0 2px 5px 0 rgba(253,130,56,.46);
        box-shadow: 0 2px 5px 0 rgba(253,130,56,.46);
        -webkit-appearance: none;
        text-align: center;
        white-space: nowrap;
        width: 100%;
        height: 50px;
        line-height: 50px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: none;
        border: 0;
        font-size: 16px;
        margin-top: 20px;
        color: #fff;

    }
    .common__button_price{
        font-size: 18px;
        line-height: 18px;
        display: inline-block;
        font-family: PingFangSC-Medium;
        letter-spacing: 0;
    }
    .calendar{
        margin-top: 20px;
    }
    .searchBarFixed{
        position: fixed;
        top:0;
        z-index:999;
    }
    .searchBarFixed2{
        position:fixed;
        left: 60.8%;

        top:86px;
        z-index: 999;
    }
    .tj-input__inner{
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #e9e9e9;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        display: inline-block;
        font-size: inherit;
        height: 44px;
        line-height: 44px;
        outline: none;
        padding: 0 38px 0 10px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
        margin: 15px 0;
    }
    .tj-calendar{
        background-image: url("../assets/hotel-list/unit-detail.png");
        background-position: -148px -126px;
        display: inline-block;
        width: 18px;
        height: 18px;
    }
    .tj-body-calendar{
        position: relative;
        border: 1px gray solid;
    }
    .select-time{
        margin-left: 20px;
        font-size: 20px;
    }

    .to{
        font-family: Algerian;
        font-size: 20px;
    }



    .icon-wifi{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -192px -216px;
    }
    .icon-airConditioning{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: 0 -24px;
    }
    .icon-washing{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -96px -216px;
    }
    .icon-kettle{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -120px -144px;

    }
    .icon-refrigerator{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -144px -120px;
    }
    .icon-washingPowder{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -96px -48px;
    }
    .icon-hairDrier{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -144px -24px;
    }
    .icon-hotWater{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -144px -72px;
    }
    .icon-toothCleaners{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -216px -144px;
    }
    .icon-towel{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -216px -168px;
    }
    .icon-toiletPaper{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -216px -120px;
    }
    .icon-bathTowel{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -48px -24px;
    }
    .icon-soap{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -168px -192px;
    }
    .icon-toiletries{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -144px 0;
    }
    .icon-television{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: -216px -192px;
    }
    .icon-bathroom{
        background-image: url("../assets/hotel-list/houseService-icon.png");
        background-position: 0 -144px;
    }




</style>