<template>
    <div id="createunitHouse">
        <merchant-nav></merchant-nav>
        <div id="select-body">
            <div class="step-content">
                <ul>
                    <li v-for="(step,index) in stepContent"
                        :key="step.id"
                        @click="changeCurrentId(step.id)"
                        :class="[currentId == step.id ? 'active' : '',FormCompleteId.indexOf(step.id) == -1 && currentId != step.id
                        && writingId != step.id ? 'disable-click':'']"
                    >

                        <div class="step-img"
                             :class="['stepList'+step.id,
                                      currentId == step.id?'stepActList'+step.id:'']"
                        ></div>
                        <span class="icon-content" :class="FormCompleteId.indexOf(step.id) == -1 && currentId != step.id
                        && writingId != step.id? 'disable-color':''">{{step.name}}</span>
                        <span class="nice" v-if="FormCompleteId[index] == step.id"></span>
                    </li>
                </ul>
            </div>
            <HousePosition v-if="currentId == 1" ></HousePosition>
            <HouseDetails v-if="currentId == 2" ></HouseDetails>
            <HouseDescription v-if="currentId == 3" ></HouseDescription>
            <facility-service v-if="currentId == 4"> </facility-service>
            <RuleOfHouse v-if="currentId == 5" ></RuleOfHouse>
            <HomePhoto v-if="currentId == 6" ></HomePhoto>
            <PriceSetting v-if="currentId == 7"></PriceSetting>
            <authentication v-if="currentId == 8" ></authentication>
            <div class="clear"></div>

        </div>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script>
    import MerchantNav from "../components/merchantNav";
    import HousePosition from "../components/HousePosition";
    import HouseDetails from "../components/HouseDetails";
    import HouseDescription from "../components/HouseDescription";
    import FacilityService from "../components/FacilityService";
    import RuleOfHouse from "../components/RuleOfHouse";
    import HomePhoto from "../components/HomePhoto";
    import PriceSetting from "../components/PriceSetting";
    import Authentication from "../components/authentication";
    import BottomNav from "../components/bottomNav";
    import { createNamespacedHelpers } from 'vuex'

    const { mapState, mapMutations } = createNamespacedHelpers('merchantForm');

    export default {
        name: "createUnitHouse",
        components: {
            BottomNav,
            Authentication,
            PriceSetting,
            HomePhoto, RuleOfHouse, FacilityService, HouseDescription, HouseDetails, HousePosition, MerchantNav},
        data(){
            return{

                stepContent:[
                    {
                        name:'房屋位置',
                        id:1
                    },
                    {
                        name:'房屋详情',
                        id:2
                    },
                    {
                        name:'房屋描述',
                        id:3
                    },
                    {
                        name:'设施服务',
                        id:4
                    },
                    {
                        name:'入住规则',
                        id:5
                    },
                    {
                        name:'房屋照片',
                        id:6
                    },
                    {
                        name:'价格',
                        id:7
                    },
                    {
                        name:'身份验证',
                        id:8
                    }
                ],
            }
        },
        mounted(){
            var currentId = parseInt(localStorage.getItem("currentId")),
                FormCompleteId = JSON.parse(localStorage.getItem("FormCompleteId")),
                writingId = parseInt(localStorage.getItem("writingId"));
            if (FormCompleteId != null){
                this.changeCurrentId(currentId);
                this.changeFormCompleteId(FormCompleteId);
                this.changeWritingId(writingId);
            }
        },
        methods:{
            ...mapMutations({
                changeCurrentId:'changeFormId',
                changeFormCompleteId:'changeFormCompleteId',
                changeWritingId:'changeWritingId'
                }),
        },
        computed:{
            ...mapState({
                currentId:state=>state.currentId,
                FormCompleteId:state=>state.FormCompleteId,
                writingId:state=>state.writingId
            })
        }
    }
</script>


<style scoped>

    .clear{
        clear: both;
    }
    #select-body{
        margin: 20px auto;
        width: 1300px;

    }
    .step-content{
        width: 200px;
        border-top: 2px solid #6e80e3;
        float: left;
    }
    .step-content ul{
        box-shadow: 0 0 0 1px rgba(63,63,68,.05), 0 1px 3px 0 rgba(63,63,68,.15);
        margin-bottom: 10px;
    }
    .step-content ul>li{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        padding-left: 43px;
        position: relative;
        cursor: pointer;
        color: #666;
    }


    .icon-content{
        display: inline-block;
        width: 120px;
    }
    .step-img{
        float: left;
        position: absolute;
        left: 15px;
        top: 11px;
        background-image: url("../assets/merchant-register/page-blate.png");
        background-repeat: no-repeat;
        width: 16px;
        height: 16px;
    }
    .nice{  /*蓝色的勾*/
        display: inline-block;
        width: 8px;
        height: 16px;
        border-color: #6e80e3;
        border-style: solid;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);

    }

    .active{
        background: #f8f8f8;
        color: #6e80e3 !important;

    }
    .disable-color{
        color: #999;
    }
    .disable-click{
        pointer-events: none;
    }

    .stepList1{

        background-position: -774px -568px;


    }
    .stepList2{

        background-position: -1250px -934px;


    }
    .stepList3{

        background-position: -1250px -968px;

    }
    .stepList4{

        background-position: -1243px -760px;


    }
    .stepList5{

        background-position: -1256px -850px;

    }
    .stepList6{

        background-position: -1216px -1002px;

    }
    .stepList7{

        background-position: -1243px -780px;

    }
    .stepList8{

        background-position: -1250px -900px;

    }

    .stepActList1{

        background-position: -1236px -850px;

    }
    .stepActList2{

        background-position: -1243px -720px;

    }
    .stepActList3{

        background-position: -1243px -800px;

    }
    .stepActList4{

        background-position: -1236px -1002px;

    }
    .stepActList5{

        background-position: -1256px -1002px;

    }
    .stepActList6{

        background-position: -1243px -820px;

    }
    .stepActList7{

        background-position: -1243px -780px;

    }
    .stepActList8{

        background-position: -1250px -900px;

    }


</style>