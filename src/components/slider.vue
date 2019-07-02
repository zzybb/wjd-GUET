<template>
    <div class="slide-nav">
        <div class="order-nav-body">
            <div class="order-nav-logo">

                <span class="logoFont">微酒店</span>
            </div>

            <div class="nav-select">
                <router-link  :to="{name:'home'}" class="select-item" :class="activeObj('首页')">首页</router-link>
                <span class="select-item" :class="activeObj('发现')">发现</span>
            </div>
            <div class="nav-select-2" v-if="!isLogin">
                <router-link :to="{name:'registerPage'}" class="select-item-2">注册</router-link>
                <router-link :to="{name:'loginPage'}" class="select-item-2">登录</router-link>
            </div>

            <div class="nav-select-2" v-else>
                <router-link :to="{name:'manageSystem'}" class="select-item-2-long" :class="activeObj('商户系统')" v-if="isShowMerchant">商户系统</router-link>
                <router-link :to="{name:'clientSystem'}" class="select-item-2-long" :class="activeObj('我的途家')">我的途家</router-link>
                <a class="select-item-2-long" @click="exitLogin">退出登录</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "slider",
        data(){
            return {
                isLogin:false,
                isShowMerchant:false
            }
        },
        created(){
            this.judgeLogin();

        },
        methods:{
            activeObj(type){
                var name = this.$route.name;
                if (type == '首页'){
                    return name == 'home' ? 'active' : '';
                }
                if (type == '商户系统'){
                    return name == 'manageSystem' ? 'active' : '';
                }
                if (type == '我的途家'){
                    return name == 'clientSystem' ? 'active' : '';
                }
            },
            judgeLogin(){
                if (localStorage.getItem("isHotel") != null){
                    parseInt(localStorage.getItem("isHotel")) == 1? this.isShowMerchant = true : this.isShowMerchant = false;
                }else{
                    this.requiredHaveHotel();
                }


                if (localStorage.getItem("token") == null){   //判断显示是否登录的
                    this.isLogin = false;
                } else {
                    this.isLogin = true;
                }
            },
            requiredHaveHotel(){
                this.$api.get(this.$myconfig.getUserInfo,{},r=>{
                    if (!r.data.user){
                        throw new Error();
                    }
                    r.data.user.isHotel == 1 ? this.isShowMerchant = true: this.isShowMerchant = false;
                    localStorage.setItem("isHotel",r.data.user.isHotel);
                },err=>{
                    console.log(err.data);
                })
            },
            exitLogin(){
                localStorage.removeItem("token");
                this.isLogin = false;
                this.$message({
                    message: '账户已登出',
                    type: 'warning'
                });
            }
        }
    }
</script>
<style scoped>
    .slide-nav {
        width: 100%;
        height: 60px;
        position: absolute;
        top: 0;
        background:rgba(255,255,255,.7);
    }
    .order-nav-body{
        width: 100%;
        height: 60px;
        font-size: 14px;
        box-shadow: 0 0 8px #cfcfcf;
        display: flex;
        align-items: center;

    }

    .logoFont{
        font-size: 30px;
        font-weight: 700;
        color: #3e97e2;
        font-family: 幼圆;
        letter-spacing: 3px;
    }
    .order-nav-logo{
        display: flex;
        align-items: center;
        background-image: url("../assets/home/logo.png");
        background-repeat: no-repeat;
        background-size: 55px;
        background-position: 0 50%;
        width: 120px;
        height: 60px;
        padding-left: 60px;
        margin-left: 250px;
        min-width: 120px;
    }
    .nav-select{
        width: 120px;
        height: 60px;
        margin-left: 220px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .select-item{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        width: 60px;
        font-size: larger;
        font-weight: bolder;
        color: #fd8238;
    }
    .nav-select-2{
        width: 250px;
        height: 60px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-left: 500px;
    }
    .select-item-2{
        color:#fd8238 ;
        font-size: 15px;
        font-weight: bolder;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .select-item-2-long{
        color:#fd8238 ;
        font-size: 15px;
        font-weight: bolder;
        cursor: pointer;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
    }
    .active{
        background-color: #fd8238;
        color: white;
    }
</style>