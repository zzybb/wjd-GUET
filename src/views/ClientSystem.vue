<template>
    <div class="client-system">
        <order-detail-transparent></order-detail-transparent>
        <slider></slider>
        <div class="client-body">
            <div class="m-menu">
                <div class="m-menu-profile">
                    <img src="../assets/client-system/user-default.png" class="avatar">
                    <div class="profile-number">
                        <h1>13631225981</h1>
                        <p>修改个人资料</p>
                    </div>
                </div>
                <div class="profile-select">
                    <ul>
                        <li v-for="item in orderList">
                            <div class="grid_5">
                                <h1 class="menu-name">
                                    <span class="icons-manage"></span>
                                    {{item.label}}
                                </h1>
                                <p  class="menu-item" v-for="children in item.childrens" @click="changePage(children)">
                                    {{children}}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="order-control" v-loading="isLoading" v-if="currentPage == '订单管理'">
                <div class="order-header">
                    <p class="my-order">我的订单</p>
                    <p class="none-order" v-if="!haveOrder">您暂时没有订单</p>
                    <div class="order-list" v-for="(item,index) in sliceList">
                        <div class="order-content">
                            <div class="order-head-item">
                                <p class="order-number">订单号:{{item.id}} (预付全额订单)</p>
                                <div class="order-detail-select">
                                    <a>再次预定</a>
                                    <a>删除订单</a>
                                    <a>和房东聊天</a>
                                    <a @click="showDetail(index)">订单详情</a>
                                </div>

                            </div>
                        </div>
                        <div class="order-body" >
                            <img class="order-image" :src="item.hotelImage">
                            <div class="order-detail-body-right">
                                <div class="order-name">
                                    <h1>{{item.hotelName}}</h1>
                                </div>
                                <div class="order-otherInfo">
                                    <span>入住:{{item.inDate}}</span>
                                    <span>退房:{{item.outDate}}</span>
                                    <span>套数：{{item.number}} 套</span>
                                    <span class="price-color">房费:￥{{item.money + ".00"}}</span>
                                </div>
                                <div class="booking-price">
                                    订金:<span class="price-color">￥{{item.money + ".00"}}</span>
                                </div>
                                <div class="order-status">
                                    订单状态 : {{item.payType}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-pagination
                            background
                            hide-on-single-page
                            :page-size="4"
                            @current-change="handleChangePage"
                            layout="prev, pager, next"
                            :total="allList.length">
                    </el-pagination>
                </div>
            </div>
            <div class="order-profile" v-if="currentPage == '个人资料'">
                <div class="profile-border">
                    <h1>资料</h1>
                    <div class="profile-data">
                        <div class="avatar-2">
                            <img src="../assets/client-system/user-default.png" class="profile-avatar">
                        </div>
                        <div class="profile-content">
                            <p class="profile-content-item">用户名：{{profileForm.username}}</p>
                            <p class="profile-content-item">邮箱：{{profileForm.email}}</p>
                            <p class="profile-content-item">绑定手机：{{profileForm.mobile}}</p>
                            <p class="profile-content-item">注册时间：{{profileForm.createTime}}</p>
                        </div>
                    </div>

                </div>
                <div class="profile-private">
                    <el-form v-model="profileForm">
                        <div class="real-name">
                            <el-form-item label="真实姓名:">
                                <el-input v-model="profileForm.realName"></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item label="出生地">
                            <el-cascader :options="options"
                                         v-model="profileForm.city"
                                         :props="defaultOptions">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="profileForm.gender">
                                <el-radio :label="1" >男</el-radio>
                                <el-radio :label="0" >女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="出生年月日">
                            <el-date-picker
                                    v-model="profileForm.birthday"
                                    type="date"
                                    value-format="yyyy-M-d"
                                    placeholder="选择出生年月">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="教育程度">
                            <el-select v-model="profileForm.education" placeholder="请选择">
                                <el-option
                                        v-for="item in edcationList"
                                        :label="item.label"
                                        :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="从事行业">
                            <el-select v-model="profileForm.industry" placeholder="请选择">
                                <el-option
                                        v-for="item in industryList"
                                        :label="item.label"
                                        :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <div class="next-type">
                                <el-button type="primary"  class="next-type-btn ivu-btn" @click="saveUserInfo">保存</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="clear">

            </div>

        </div>
    </div>
</template>

<script>
    import slider from '@/components/slider.vue';


    import areajson from '../utils/citys.json';
    import OrderDetailTransparent from "../components/client-system/order-detail-transparent";
    import { createNamespacedHelpers } from 'vuex'

    const { mapState, mapMutations } = createNamespacedHelpers('clientSystem');

    export default {
        name: "ClientSystem",
        components: {
            OrderDetailTransparent,

            slider
        },
        data() {
            return {
                haveOrder:false,
                defaultOptions:{
                    value:'label'
                },
                profileForm:{
                    realName:'',
                    city:[],
                    gender:'',
                    birthday:'',
                    education:'',
                    industry:'',
                    mobile:'',
                    createTime:'',
                    username:'',
                    email:'',
                    userId:''
                },
                industryList:[
                    {
                        label:'计算机/互联网/通讯/电子'
                    },
                    {
                        label:'会计/金融/银行/保险'
                    }
                ],
                edcationList:[
                    {
                        label:'博士',
                    },
                    {
                        label:'硕士'
                    },
                    {
                        label:'本科'
                    },
                    {
                        label:'大专'
                    },
                    {
                        label:'高中'
                    },
                    {
                        label:'其他'
                    }
                ],
                options:areajson,
                isLoading: false,
                currentPage:'订单管理',
                orderPage:0,
                allList: [],
                sliceList:[],
                noPayList: [],
                detailList: [],
                orderList: [
                    {
                        label: '我的订单',
                        childrens: [
                            '订单管理',
                            '点评管理'
                        ]
                    },
                    {
                        label: '我的资产',
                        childrens: [
                            '账户余额',
                            '收款账号',
                            '我的途游卡',
                            '我的红包',
                            '我的积分'
                        ]
                    },
                    {
                        label: '个人中心',
                        childrens: [
                            '个人资料',
                            '修改密码',
                            '我的收藏',
                            '常用入住人',
                            '我的发票',
                            '会员俱乐部',
                            '通知',
                            '消息'
                        ]
                    }
                ]
            }
        },

        created() {

            this.requiredOrderList();
            this.requiredUserInfo();

        },
        methods: {
            ...mapMutations({
                changeShow:'changeShow',
                getInfo:'getInfo'

            }),
            showDetail(id){
                var index = (this.orderPage - 1) * 4 + id;

                this.changeShow(true);
                this.getInfo({
                    user:this.allList[index],
                    hotel:this.detailList[index]
                });
            },
            requiredOrderList() {
                this.isLoading = true;
                this.$api.get(this.$myconfig.getUserOrderList, {

                }, r => {
                    if (r.data.page.list.length == 0){
                        this.haveOrder = false;
                        throw new Error();
                        return;
                    }
                    this.getOrderInfo(r.data.page.list);
                }, err => {

                    this.isLoading = false;
                })
            },
            requiredUserInfo(){
                this.$api.get(this.$myconfig.getUserInfo,{},r=>{
                    this.profileForm =r.data.user;
                    this.profileForm.city = [r.data.user.province,r.data.user.city]

                },err=>{

                })

            },
            slotNoPayList(list) {
                if (!list || !list.length) {
                    return;
                }
                for (var i = 0; i < list.length; i++) {
                    if (list[i].isPay == 0) {
                        list[i]["payType"] = "未支付";
                        this.noPayList.push(list[i]);
                    } else {
                        list[i]["payType"] = "已支付"
                    }
                }
            },
            getOrderInfo(list) {
                var reqList = [], self = this;
                for (let i = 0; i < list.length; i++) {
                    let req =  this.$api.NoResPost(this.$myconfig.hotelDetail, {
                        "id":list[i].hotelId,
                        "selectStartDate":'',
                        "selectEndDate":''
                    });
                    reqList.push(req);
                }


                var callBack = function (...reqList) {
                    for (let i = 0; i < reqList.length; i++) {
                        self.detailList.push(reqList[i].data.hotel);
                        list[i]["hotelName"] = reqList[i].data.hotel.name;
                        list[i]["hotelImage"] = self.$myconfig.ImageURL +  reqList[i].data.hotel.hotelImage1
                    }
                    self.allList = list;
                    self.slotNoPayList(list);
                    self.handleChangePage(1);  //设置第一页
                    self.isLoading = false
                };
                this.$api.axiosAll(reqList,callBack);
            },
            changePage(page){
                this.currentPage = page;
            },
            handleChangePage(page){
                this.orderPage = page;
                var min = (page - 1)*4 < 0 ? 0 : (page - 1)*4,
                    max = (page*4);
                this.sliceList = this.allList.slice(min,max);
            },
            saveUserInfo(){
                var obj = {
                    username:this.profileForm.username,
                    realName: this.profileForm.realName,
                    mobile:this.profileForm.mobile,
                    email:this.profileForm.email,
                    province:this.profileForm.city[0],
                    city:this.profileForm.city[1],
                    education: this.profileForm.education,
                    gender:this.profileForm.gender,
                    birthday: this.profileForm.birthday,
                    industry: this.profileForm.industry,
                    createTime: this.profileForm.createTime,
                    userId: this.profileForm.userId
                };
                console.log(obj)
                this.$api.post(this.$myconfig.UpdateUserInfo,obj,r=>{
                    console.log(r.data);
                },err=>{
                    console.log(err.data);
                })


            }
        }
    }
</script>

<style scoped>
    .clear{
        clear:both;
    }
    .client-body{
        width: 960px;
        height: 900px;
        margin: 0 auto 0;
        padding-top: 120px;
    }
    .m-menu{
        margin: 0;
        padding: 0;
        width: 200px;
        background-color: #fff;
        border-top: 2px solid #ff6600;
        box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.05);
        font-size: 12px;
        float: left;
    }
    .m-menu-profile{

        height: 100px;
        display: flex;
        align-items: center;
    }
    .profile-number{
        margin-left: 20px;
    }
    .profile-number h1{
        font-size: 10px;
    }
    .avatar{
        margin-left: 20px;
        width: 60px;
        height: 60px;
    }
    .none-order{
        margin-top: 10px;
    }
    .menu-name{
        margin: 0;
        padding: 0;
        border-top: 1px solid #f1f1f1;
        border-bottom: 1px solid #f1f1f1;
        background: #f8f8f8;
        font: bold 14px/40px "Microsoft Yahei";
        color: #333;
    }
    .icons-manage{
        display: inline-block;
        margin: 0 12px;
        padding: 0;
        vertical-align: -4px;
        background-image: url("../assets/client-system/nvaIcons.png");
        background-repeat: no-repeat;
        background-position: 0 -17px;
        height: 17px;
        width: 17px;
    }
    .menu-item{
        list-style-type: none;
        margin: 0;
        padding: 0 0 0 40px;
        font: 12px/32px "Microsoft Yahei";
        cursor: pointer;
    }
    .order-control{
        width: 750px;
        height: 710px;
        float: right;

    }
    .order-header{
        height: 50px;
        border-bottom: 1px gainsboro solid;
        clear: both;
    }
    .order-header .my-order{
        font: bold 16px/18px "微软雅黑";
        color: #f60;
        line-height: 50px;
        margin-left: 10px;
    }
    .order-head-item{
        line-height: 30px;
        background: #fff9ef;
        border-bottom: 1px solid #e7e7e7;
        border-top: 1px solid #f60;
        text-align: right;
        overflow: hidden;
        padding: 10px;
    }
    .order-number{
        float: left;
        font-size: 15px;
        color: #8c7a5b;
    }
    .order-detail-select{
        float: right;
    }
    .order-detail-select a{
        margin-left: 20px;
        color: black;
        cursor: pointer;
    }
    .order-body{
        margin-top: 20px;
        border-bottom: 1px lightgray solid;
        padding-bottom: 20px;
        margin-bottom: 15px;

        overflow: hidden;
    }
    .order-image{
        width: 100px;
        height: 70px;
    }
    .order-detail-body-right{
        float: right;
        width: 600px;
    }
    .order-otherInfo{
        margin: 10px 0 10px 0;
        display: flex;
        justify-content: space-around;
    }
    .order-detail-body-right .order-name h1{
        font-size: 10px;
    }
    .price-color{
        color: #f60;
        font-weight: bolder;
    }
    .order-status{
        margin-top: 10px;
    }
    .order-profile{
        float: right;
        width: 750px;


        height: 710px;
    }
    .profile-border{
        border: 1px lightgray solid;
        height: 181px;
    }
    .profile-border h1{
        height: 40px;
        font: 16px/40px "Microsoft Yahei";
        background: #f8f8f8;
        padding-left: 20px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
    }

    .avatar-2{
        width: 100px;
        height: 100px;

        margin-left: 30px;

    }
    .profile-data{
        display: flex;
        align-items: center;
        height: 141px;
    }
    .profile-avatar{
        display: block;
        float: left;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        cursor: pointer;
    }
    .profile-content{
        margin-left: 50px;
    }
    .profile-content-item{
        margin-top: 10px;
        letter-spacing: 2px;
    }
    .real-name{
        width: 350px;
    }
    .profile-private{
        margin-top: 30px;
        padding-left: 50px;
    }



</style>