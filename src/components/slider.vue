<template>
    <div class="slide-nav">
        <div class="order-nav-body">
            <img src="../assets/home/logo.png" class="navLogo">
            <span class="logoFont">微酒店</span>
            <div class="nav-select">
                <router-link  :to="{name:'home'}" class="select-item" :class="activeObj('首页')">首页</router-link>
                <span class="select-item" :class="activeObj('发现')">发现</span>
            </div>
            <div class="nav-select-2" v-if="!isLogin">
                <router-link :to="{name:'registerPage'}" class="select-item-2">注册</router-link>
                <router-link :to="{name:'loginPage'}" class="select-item-2">登录</router-link>
            </div>

            <div class="nav-select-2" v-else>
                <router-link :to="{name:'manageSystem'}" class="select-item-2-long" :class="activeObj('商户系统')">商户系统</router-link>
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
                isLogin:false

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
                if (localStorage.getItem("token") == null){
                    this.isLogin = false;
                } else {
                    this.isLogin = true;
                }
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

    .navLogo{
        margin-left: 200px;
        width: 60px;
    }

    .logoFont{
        font-size: 30px;
        font-weight: 700;
        color: #3e97e2;
        font-family: 幼圆;
        letter-spacing: 3px;
    }
    .nav-select{

        width: 120px;
        height: 60px;
        margin-left: 200px;
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