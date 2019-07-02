<template>
    <div class="register-content">
        <div class="register-content-left">
            <div class="register-left-title">
                <span>普通会员注册|</span>
                <span> 企业会员注册</span>
            </div>
            <div class="register-left-input">
                <input type="text" placeholder="请输入注册手机号" id="mobile" v-model="mobile">
                <input type="text" placeholder="请输入验证码" id="verifyCodePic" v-model="captcha">
                <img :src="cachePath">


                <input type="password" placeholder="注册密码" id="password" v-model="password">
                <button v-on:click="inputRegister">注册</button>
            </div>
        </div>
        <div class="register-content-right"></div>
    </div>
</template>
<script>
    export default {
        name:'Register',
        data(){
            return {
                mobile:'',
                password:'',
                cachePath:'',
                captcha:'',
                uuid:''
            }
        },
        created(){
            this.getCapth();
        },
        methods:{
            getUUID() {
                this.uuid =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
                })

                return this.uuid;
            },
            inputRegister(){
                this.$api.post(this.$myconfig.register,{
                    mobile:this.mobile,
                    password:this.password,
                    captcha:this.captcha,
                    uuid:this.uuid
                },success=>{
                    if (success.data.msg != 'success'){
                        this.$message.error(success.data.msg);
                        this.getCapth();
                    } else{
                        this.$message({
                            message: '注册成功',
                            type: 'success'
                        });
                        this.$router.push({name:'loginPage'});

                    }


                },failure=>{
                    console.log("注册失败，失败原因：" + failure.data)
                })
            },
            getCapth(){
                this.cachePath = this.$myconfig.ServerPath +  "wjd/app/captcha.jpg?uuid=" + this.getUUID();
            }
        }
    }
</script>
<style scoped>
    .register-content{
        width: 700px;
        height: 450px;
        margin: 0 auto;
        background-color: rgba(1,1,1,0.7);
        display: flex;
        align-items: center;
    }

    .register-content-left {
        width: 50%;
        height: 100%;
    }

    .register-content-left span{
        font-family: "Baskerville Old Face";
        margin-top: 30px;
        display: inline-block;
        color: white;
        font-size:18px;

    }

    .register-content-left input,button{
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


    .register-left-title{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .register-content-right{
        background-image: url("../assets/register/app-download-only.png");
        background-position:30px 30px;
        background-repeat: no-repeat;
        width: 50%;
        height: 100%;
        /*border: 1px white solid;*/
    }

    .register-content-left button{
        width: 295px;
        border: 0;
        color: white;
        outline:none;
        font: normal 18px/36px "Microsoft Yahei";;
        background-color: #e65284;
        border-radius: 3px;
        cursor:pointer;
    }

    .register-content-left img{
        width: 130px;
        height: 42px;
        margin-top:30px;
        margin-left: 15px;
    }

</style>
