<template>
    <div class="merchant-order-list">
        <div class="order-header">
            <h5>订单管理</h5>
        </div>
        <div class="tab-nav" v-loading="isLoading">
            <el-tabs  type="border-card" v-model="activeName" @tab-click="handleTapClick">
                <el-tab-pane label="全部" name="全部" >
                    <div class="out-border" v-for="item in allspliceList">
                        <div class="base-body" >
                            <div class="house-info">
                                <h5 class="house-title">
                                    <a>{{item.hotelName }}</a>
                                </h5>
                                <h4 class="house-type">房客姓名：{{item.realName}}</h4>
                                <h4 class="house-type">房客电话：{{item.tel}}</h4>
                                <span class="house-information"> 入住：{{item.inDate}}      离店：{{item.outDate}} | {{item.number}}间 | {{item.peopleNumber}}人 </span>
                            </div>
                            <div class="payment-detail">
                                <div class="order-free">
                                    <span class="title">{{item.payType}}</span>
                                    <span class="price"><span>￥</span>{{item.money}}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="待支付" name="待支付">
                    <div class="out-border" v-for="item in noPayspliceList">
                        <div class="base-body" >
                            <div class="house-info">
                                <h5 class="house-title">
                                    <a>{{item.hotelName}}</a>
                                </h5>
                                <h4 class="house-type">房客姓名：{{item.realName}}</h4>
                                <h4 class="house-type">房客电话：{{item.tel}}</h4>
                                <span class="house-information"> 入住：{{item.inDate}}      离店：{{item.outDate}} | {{item.number}}间 | {{item.peopleNumber}}人 </span>
                            </div>
                            <div class="payment-detail">
                                <div class="order-free">
                                    <span class="title">{{item.payType}}</span>
                                    <span class="price"><span>￥</span>{{item.money}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="待入住" name="待入住"></el-tab-pane>
                <el-tab-pane label="已离店" name="已入住"></el-tab-pane>
                <div class="none-order" v-if="isNone"></div>
            </el-tabs>
            <div class="splice-page2">
                <el-pagination
                        background
                        @current-change="handlePageChange"
                        :page-size="4"
                        :total="allList.length"
                        layout="prev, pager, next"
                        :current-page.sync="currentPage"
                        v-if="activeName == '全部'"
                >
                </el-pagination>
                <el-pagination
                        background
                        @current-change="handlePageChange"
                        :page-size="4"
                        :total="noPayList.length"
                        layout="prev, pager, next"
                        :current-page.sync="currentPage"
                        v-if="activeName == '待支付'"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "merchantOrderList",
        data(){
            return {
                isNone:false,
                activeName:'全部',
                isLoading:false,
                allList:[],
                allspliceList:[],
                noPayList:[],
                noPayspliceList:[],
                detailList:[],
                currentPage:1,
                testList:[
                    {
                        realName:'aaa',
                        tel:135,
                        inDate:'2018',
                        outDate:'2019',
                        number:12,
                        peopleNumber: 13,
                        payType:'未支付',
                        price:120
                    },
                    {
                        realName:'aba',
                        tel:135,
                        inDate:'2018',
                        outDate:'2019',
                        number:12,
                        peopleNumber: 13,
                        payType:'未支付',
                        price:120
                    },
                    {
                        realName:'aca',
                        tel:135,
                        inDate:'2018',
                        outDate:'2019',
                        number:12,
                        peopleNumber: 13,
                        payType:'未支付',
                        price:120
                    },
                    {
                        realName:'ada',
                        tel:135,
                        inDate:'2018',
                        outDate:'2019',
                        number:12,
                        peopleNumber: 13,
                        payType:'未支付',
                        price:120
                    },
                    {
                        realName:'aea',
                        tel:135,
                        inDate:'2018',
                        outDate:'2019',
                        number:12,
                        peopleNumber: 13,
                        payType:'未支付',
                        price:120
                    }
                ]
            }
        },

        created() {
            this.requiredOrderList();
        },
        methods:{
            requiredOrderList(){
                this.isLoading = true;
                this.$api.get(this.$myconfig.getHotelOrderList,{
                },r=>{
                    if(r.data.page.list.length == 0){
                        this.isNone = true;
                        throw new Error();
                    }
                    this.getOrderInfo(r.data.page.list);
                },err=>{

                    this.isLoading = false;
                })
            },
            slotNoPayList(list){
                if (!list || !list.length){
                    return;
                }
                for(var i = 0;i<list.length;i++){
                    if(list[i].isPay == 0){
                        list[i]["payType"] = "未支付";
                        this.noPayList.push(list[i]);
                    }else{
                        list[i]["payType"] = "已支付"
                    }
                }
            },
            getOrderInfo(list){
                var reqList = [],self = this;

                for(let i = 0;i<list.length;i++){
                    let req = this.$api.NoResPost(this.$myconfig.hotelDetail,{
                        "id":list[i].hotelId,
                        "selectStartDate":'',
                        "selectEndDate":''
                    });
                    reqList.push(req);
                }
                var callBack = function(...reqList){
                    for(let i = 0;i<reqList.length;i++){
                        self.detailList.push(reqList[i].data.hotel);
                        list[i]["hotelName"] = reqList[i].data.hotel.name
                    }
                    self.allList = list;
                    self.slotNoPayList(list);
                    self.handlePageChange(1);
                    self.currentPage = 1;
                    self.isLoading = false;
                }
                this.$api.axiosAll(reqList,callBack);
            },
            handlePageChange(page){

                var min = (page - 1)*4,
                    max = (page*4);
                if (this.activeName == '全部'){
                    this.allspliceList = this.allList.slice(min,max);
                }
                if (this.activeName == '待支付'){
                    this.noPayspliceList = this.noPayList.slice(min,max);
                }

            },
            handleTapClick(event){
                this.currentPage = 1;
                this.handlePageChange(1);

            }

        }
    }
</script>

<style scoped>
    .splice-page2{
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
    .merchant-order-list{
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
    .tab-nav{
        height: 100%;

        width: 95%;
        margin: 0 auto;
    }
    .none-order{

        background-image: url("../../assets/merchant-system/data_image.png");
        background-position: 0 0;
        width: 88px;
        height: 88px;
        display: block;
        margin: 300px auto 480px;
        position: relative;
    }
    .none-order:before{
        content: "\6682\65E0\76F8\5173\8BA2\5355";
        display: inline-block;
        position: absolute;
        font-size: 16px;
        width: 200px;
        bottom: -25px;
        color: #999;
    }

    .base-body{
        width: 300px;


        margin: 30px auto 0;

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
    .out-border{
        width: 420px;
        float: left;
        margin-left: 10px;
        margin-top: 30px;
        margin-bottom: 30px;

        overflow: hidden;
    }
</style>