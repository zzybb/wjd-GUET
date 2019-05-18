<template>
    <div class="login-content">
        <div class="login-content-left">
            <div class="login-left-title">
                <span>普通会员登录|</span>
                <span> 企业会员登录</span>
            </div>
            <div class="login-left-input">
                <input type="text" placeholder="邮箱/手机号/用户名" id="mobile" v-model="mobile">
                <input type="text" placeholder="密码" id="password" v-model="password">
                <input type="text" placeholder="请输入验证码" id="verifyCodePic" >
                <img src="../assets/register/VerifyImage.jpg">
                <label style="color: white">
                    <input id="saveUserLongTime" type="checkbox" v-model="checked">
                    保存登录时长一个星期
                    <a href="" class="forgetPas">忘记密码</a>
                </label>

                <button v-on:click="inputLogin">登录</button>
            </div>
        </div>
        <div class="login-content-right">
            <p class="cooperateWeb">合作网站账号登录</p>
            <div class="btn-list">
                <p>
                    <a id="qqLogin" title="QQ账户登录" href="">QQ</a>
                    <a id="sinaLogin" title="新浪微博账户登录" href="">微博</a>
                    <a id="wechatLogin" title="微信" href="">微信</a>
                </p>

            </div>

            <div class="text-cont">
                还不是微酒店会员？
                <router-link to="/userLogin/registerPage">立即注册</router-link>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                mobile:'',
                password:'',
                checked:false
            }
        },
        methods:{
            inputLogin(){
                this.$api.post(this.$myconfig.userLogin,{
                    mobile:this.mobile,
                    password:this.password
                },success=>{
                    console.log(success.data);
                    localStorage.setItem("token",success.data.token);

                },failure=>{
                    console.log("登录失败，失败原因：" + failure.data)
                })
            }
        }
    }
</script>
<style scoped>
    .login-content{
        width: 700px;
        height: 450px;
        margin: 0 auto;
        background-color: rgba(1,1,1,0.7);
        display: flex;
        align-items: center;
    }

    .login-content-left {
        width: 50%;
        height: 100%;
    }

    .login-content-left span{
        font-family: "Baskerville Old Face";
        margin-top: 30px;
        display: inline-block;
        color: white;
        font-size:18px;

    }

    .login-content-left input,button{
        display: block;
        margin-left: 30px;
        margin-top: 30px;
    }

    #mobile,#password{
        width: 270px;
        padding: 10px;
    }

    #verifyCodePic{
        width: 125px;
        padding: 10px;
        display: inline;
    }


    .login-left-title{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .login-content-right{
        width: 50%;
        height: 100%;

    }

    .login-content-right .cooperateWeb{
        color: white;
        font-weight: 500;
        font-size: 16px;
        margin: 30px;

    }


    .login-content-left button{
        width: 295px;
        border: 0;
        color: white;
        outline:none;
        font: normal 18px/36px "Microsoft Yahei";;
        background-color: #e65284;
        border-radius: 3px;
        cursor:pointer;
    }

    .login-content-left img{
        margin-top:30px;
        margin-left: 15px;
    }

    .forgetPas{
        display: inline-block;
        color: #3b83cb;
        position: relative;
        left: 100px;


    }

    .login-content-left label{
        display: block;
        width: 292px;
        margin-left: 30px;
        margin-top: 20px;
    }
    #saveUserLongTime{
        display: inline;
        margin: 0;

    }

    .btn-list{

    }

    .btn-list p{
        display: flex;
        justify-content: space-around;

    }

    .btn-list a{
        color: white;
        margin-left: 10px;
        text-indent: -9999px;
    }

    #qqLogin,#wechatLogin,#sinaLogin{
        background-image: url("../assets/login/icons-coopreate.png");
        background-repeat: no-repeat;
    }

    .btn-list #qqLogin{
        background-position: 0 -82px;
        height: 45px;
        width: 45px;
    }

    .btn-list #sinaLogin{
        background-position: 0 -232px;
        height: 45px;
        width: 45px;
    }

    .btn-list #wechatLogin{
        background-position: 0 -322px;
        height: 45px;
        width: 45px;
    }

    .text-cont{
        color: white;
        margin: 30px;
    }

    .text-cont a{
        color: #3b83cb;
    }

</style>