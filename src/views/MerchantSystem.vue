<template>
    <div class="merchant-system">
        <router-view name="UpdateHotel"></router-view>

        <slider></slider>
        <div class="merchant-system-body">
            <div class="step-content">
                <ul v-on:click="handleList($event)">
                    <li v-for="(item,index) in navList">
                        <h5>
                            <span class="m-img">
                                <i class="u-img" :class="ListClassObj(index)"></i>
                            </span>
                            <span>{{item.labs}}</span>
                        </h5>
                        <div class="g-menu-layout">
                            <p class="m-menu-item" :class="[detail == currentTab ? 'active-tap' : '']" v-for="detail in item.children">{{detail}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <merchant-order-list v-if="currentTab == '订单管理'"></merchant-order-list>
            <merchant-unit-list v-if="currentTab == '房屋管理'"></merchant-unit-list>
            <merchant-store-setting v-if="currentTab == '门店设置'"></merchant-store-setting>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    import MerchantNav from "../components/merchantNav";
    import MerchantOrderList from "../components/merchant-system/merchantOrderList";
    import MerchantUnitList from "../components/merchant-system/merchantUnitList";
    import MerchantStoreSetting from "../components/merchant-system/merchantStoreSetting";
    import Slider from "../components/slider";

    export default {
        name: "MerchantSystem",
        components:{
            Slider,

            MerchantStoreSetting,
            MerchantUnitList,
            MerchantOrderList,
            MerchantNav
        },
        data(){
            return {
                currentTab:'订单管理',
                navList:[
                    {
                        labs:'交易管理',
                        children:['订单管理','点评管理']
                    },
                    {
                        labs:'房源管理',
                        children:['房屋管理','房态管理']
                    },
                    {
                        labs:'结算管理',
                        children:['钱箱']
                    },
                    {
                        labs:'营销推广',
                        children:['折扣与优惠设置','平台征集活动']
                    },
                    {
                        labs:'经营管理',
                        children:['经营概况','身份验证','短信','宾客管理']
                    },
                    {
                        labs:'门店管理',
                        children:['门店设置']

                    }
                ]

            }
        },

        methods:{
            handleList(event){
                this.currentTab = event.target.innerHTML
            },
            ListClassObj(index){
                var className = "icon-" + (1000 + index*100);
                return className;
            }
        }
    }
</script>

<style scoped>
    .clear{
        clear: both;
    }


    .merchant-system-body{
        min-height: 800px;
        width: 1190px;
        min-width: 1190px;
        margin: 0px auto;
        padding-top: 100px;

    }

    .merchant-system-body .step-content{
        float: left;
        min-width: 200px;
        max-width: 220px;
    }

    .merchant-system-body .step-content ul{
        color: #333;
        border-top: 2px solid #6e80e3;
        box-shadow: 0 0 1px 1px #e9e9e9;
        border-radius: 4px;
    }
    .merchant-system-body .step-content ul li{
        border: 1px solid #e9e9e9;
        border-top: 0;
    }
    .merchant-system-body .step-content ul li h5{
        background-color: #f8f8f8;
        border-bottom: 1px solid #f8f8f8;
        height: 43px;
        line-height: 43px;
        font-size: 14px;
        padding-right: 5px;
    }
    .merchant-system-body .step-content .m-img{
        display: inline-block;
        width: 40px;
        height: 40px;
        text-align: center;
    }
    .merchant-system-body .step-content .u-img{
        margin-bottom: -3px;
        display: inline-block;
    }

    .g-menu-layout{
        padding: 5px 0 5px 40px;
    }
    .m-menu-item{
        display: block;
        height: 40px;
        line-height: 40px;
        color: #000;
        cursor: pointer;
    }
    .Transparent{
        position: absolute;
        background-color: rgba(0,0,0,0.6);
        width: 100%;
        height: 100%;

    }
    .icon-1000{
        width: 17px;
        background-position: 0 -154px;
        height: 17px;
        background-image: url("../assets/merchant-system/page-common.png");
    }
    .icon-1100{
        width: 17px;
        background-position: -122px -154px;
        height: 17px;
        background-image: url("../assets/merchant-system/page-common.png");
    }
    .icon-1200{
        width: 17px;
        background-position: -41px -154px;
        height: 17px;
        background-image: url("../assets/merchant-system/page-common.png");
    }
    .icon-1300{
        width: 17px;
        background-position: -21px -154px;
        height: 17px;
        background-image: url("../assets/merchant-system/page-common.png");
    }
    .icon-1400{
        width: 17px;
        background-position: -61px -154px;
        height: 17px;
        background-image: url("../assets/merchant-system/page-common.png");
    }
    .icon-1500{
        width: 17px;
        background-position: -102px -154px;
        height: 17px;
        background-image: url("../assets/merchant-system/page-common.png");
    }
    .active-tap{
        color: #6e80e3;
        text-decoration: none;
        font-weight: 700;
    }


</style>