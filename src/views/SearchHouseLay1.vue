<template>
    <div class="searchHouse" v-on:click="handleCustom($event)">
        <div class="header">
            <slider></slider>
        </div>
        <div class="slide-image">

        </div>
        <div>
            <a href="/" class="back">微酒店  ></a>
            <a href=""  class="back1">{{city}}公寓住房></a>
        </div>


        <div class="search">
            <div class="search-border">
                <search v-on:UpdateList="requiredList"></search>
            </div>
            <div class="table-body">
                <el-form ref="SearchForm" :model="SearchForm">
                    <div class="select-item">
                        <div class="customize-price">
                            <span>自定义:</span>
                            <div class="price-left">
                                <input type="text" class="customize-input" v-model="SearchForm.CustomMin"/>
                            </div>
                             ~
                            <div class="price-left">
                                <input type="text" class="customize-input" v-model="SearchForm.CustomMax"/>
                            </div>
                            <button v-if="isCustom" @click="requiredList($event)" class="customize-ok">确认 </button>
                        </div>
                        <el-form-item>
                            <span class="span-title">房价</span>
                            <el-radio-group v-model="SearchForm.HousePrice" v-on:change="requiredList">
                                <el-radio label="￥0-200"></el-radio>
                                <el-radio label="￥200-300"></el-radio>
                                <el-radio label="￥300-400"></el-radio>
                                <el-radio label="￥400-500"></el-radio>
                                <el-radio label="￥500-800"></el-radio>
                                <el-radio label="￥800-100000"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="select-item last-child">
                        <el-form-item>
                            <span class="span-title">房型</span>
                            <el-radio-group v-model="SearchForm.HouseType" v-on:change="requiredList">
                                <el-radio label="公寓"></el-radio>
                                <el-radio label="别墅"></el-radio>
                                <el-radio label="特色名宿"></el-radio>
                                <el-radio label="单间出租"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>

        <div class="list-house-body" v-loading="isLoading">
            <ul class="nineLattice">
                <li class="listLi" v-for="(item,index) in HouseList" v-on:click="enterDetail(item.id)" :class="classObj(index)">
                    <div class="topImage">
                        <a class="house-detail-link">
                            <img class="lazy" :src="requireURL + item.hotelImage1">
                        </a>
                    </div>
                    <div class="listLi-top">
                        <div class="house-title">
                            <span>{{item.name}}</span>
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
            <div class="msg-null" v-if="!HouseList.length">
                <p>很抱歉，暂时没有符合条件的房屋，您可以更改条件重新搜索。</p>
            </div>
        </div>
        <div class="pagination">
            <div class="block">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="page.totalCount"
                        :page-count="page.totalPage"
                        :page-size="page.pageSize"
                        :current-page="page.currPage"
                        @current-change="changeCurr"
                >
                </el-pagination>
            </div>
        </div>
        <div>
            <undermost></undermost>
        </div>




    </div>
</template>
<script>
    import slider from '../components/slider';

    import Search from "../components/search";
    import Undermost from "../components/undermost";
    export default{
        name: "SearchHouseLay1",
        components:{Undermost, Search, slider},
        data:function(){
            return{
                HouseList:[],
                isCustom:false,
                isLoading:false,
                requireURL:this.$myconfig.ImageURL,
                city:'',
                SearchForm:{
                    HousePrice:'',
                    HouseType:'',
                    CustomMax:'',
                    CustomMin:''
                },
                page:{
                    totalPage:0,
                    pageSize:9,
                    currPage:1,
                    totalCount:0
                }
            }
        },
        computed:{
            maxPrice(){
                var Price = this.getPrice(this.SearchForm.HousePrice);
                return Price[3];
            },
            minPrice(){
                var Price = this.getPrice(this.SearchForm.HousePrice);
                return Price[1];
            }
        },
        created() {
            this.requiredList();
        },
        methods:{
            getPrice(num){
                var reg = /[0-9]*/g;
                return num.match(reg);
            },
            requiredList(event){

                if (event &&Object.prototype.toString.call(event) !=="[object String]" && event.target.className == 'customize-ok'){
                    if (!(this.SearchForm.CustomMax !== '' && this.SearchForm.CustomMin !== '')){
                        this.SearchForm.CustomMax = '';
                        this.SearchForm.CustomMin = '';
                        return;

                    }
                } 
                this.isLoading = true;
                var city,select,obj;
                if (localStorage.getItem("SelectDate") != undefined && localStorage.getItem("palceName") != undefined){
                    select = JSON.parse(localStorage.getItem("SelectDate"));
                    city = localStorage.getItem("palceName");
                    this.city = city;
                }

                obj = {

                    "city":city,
                    "selectStartDate":select.BeganTime,
                    "selectEndDate":select.EndTime,
                    "maxPrice":this.SearchForm.CustomMax === '' ? this.maxPrice : this.SearchForm.CustomMax,
                    "minPrice":this.SearchForm.CustomMin === '' ? this.minPrice : this.SearchForm.CustomMin,
                    "type":this.SearchForm.HouseType,
                    "page":this.page.currPage,
                    "limit":this.page.pageSize
                };
                console.log(obj);
                this.$api.get(this.$myconfig.hotelList,obj,
                    success=>{
                        this.HouseList = [];
                        console.log("___________",success.data);

                        this.page = {
                            totalPage:2,
                            pageSize:9,
                            currPage:success.data.page.currPage,
                            totalCount:success.data.page.totalCount
                        };

                        for(var i = 0;i<success.data.page.list.length;i++){
                            this.HouseList.push(success.data.page.list[i]);
                        }
                        this.isLoading = false;

                        // localStorage.setItem("token",success.data.token);

                    },failure=>{
                        console.log("登录失败，失败原因：" + failure.data.msg)
                    })
            },
            enterDetail(num){
                this.$router.push({name:'HotelDetail',params:{hotelId:num}})
            },
            classObj(num){
                var margin = false;
                if (num == 1 || num == 4 || num == 7){
                    margin = true;
                }

                return {
                    'margin-between':margin
                }
            },
            changeCurr(num){
                this.page.currPage = num;
                this.requiredList();
            },
            handleCustom(event){
                if (event.target.className == 'customize-input'){
                    this.isCustom = true;
                } else{
                    this.isCustom = false;
                }
            }


        }
    }
</script>
<style scoped>
    .clear{
        clear: both;
    }
    .header{
        position:relative;
        width:100%;
        height:60px;
    }
    .back{
        display:inline-block;
        width:100px;
        margin-left:360px;
        margin-top:30px;

        color:black;
    }
    .back1{
        margin-left:-50px;
        color:black;
    }
    .block{
        width: 150px;
    }
    .searchHouse{
        width:100%;
        height:100%;

    }
    .search{
        width:1230px;
        margin: 0 auto;
    }
    .search-border{
        padding-left: 40px;
        background: #b1c7d6;
    }
    label{
        display: inline-block;
        width:100px;
    }
    .table-body{
        border: 1px solid #ddd;
    }
    .select-item{
        width: 94%;
        height: 40px;
        margin: 0 auto;
        border-bottom: 1px #ddd solid;
    }
    .last-child{
        border-bottom: none;
    }
    .span-title{
        width: 70px;
        color: #999;
        float: left;
    }
    .list-house-body{
        width: 1230px;
        margin: 50px auto;

    }

    .nineLattice .listLi{
        width: 370px;
        height: 358px;
        cursor: pointer;
        float:left;
    }
    .margin-between{
        margin-left: 50px;
        margin-right: 50px;
    }
    .nineLattice .listLi .topImage{
        width: 100%;
        height: 232px;
        overflow: hidden;
        position: relative;
    }
    .pagination{

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
    }
    .listLi .house-address p{
        font-size: 14px;
        color: #666;
        line-height: 26px;
        margin-right: 10px;
        align-items: center;

    }
    .listLi .iconfont {
        display: inline-block;
        background-image: url("../assets/hotel-list/com-search.png");
        width: 20px;
        height: 22px;
    }
    .house-detail{
        margin-top: 10px;
    }
    .house-detail p{
        height: 26px;
        line-height: 26px;
        color: #666;
        font-size: 14px;
    }
    .slide-image{
        width: 100%;

        height: 48px;
        background: url("../assets/searchHouseLay1/adv.jpg") top no-repeat scroll transparent;
    }
    .msg-null{
        width: 900px;
        height: 84px;
        background: #fffbf6;
        margin: 0 auto;
        border: 1px solid #f5dcbc;
        text-align: center;
        line-height: 84px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .customize-price{
        display: flex;
        justify-content: space-around;
        position: absolute;
        z-index: 100;
        width: 280px;
        left: 64.5%;
        margin-top: 10px;
    }
    .customize-price input{
        width: 80px;
    }
    .customize-ok{
        width: 50px;
        height: 25px;
    }









    </style>