    <template>
    <div class="home">
        <div>
<!--            <img :src="backgroundPicture" class="backgroundPicture">-->
            <div class="header">


                <div class="header-content">
                    <img :src="imgLogo" class="LogoPicture">
                    <span class="hotelName">微酒店</span>
                    <span class="navHome">
          <span >
            <a href="" class="homePage">首页</a>
          </span>
          <span class="discover">
            <a href="" class="homePage">发现</a>
          </span>
        </span>
                    <span>
          <span>
            <a href="/userLogin/loginPage" class="homePage">注册</a>
          </span>
          <span>
            <a href="/userLogin/registerPage" class="homePage">登录</a>
          </span>
        </span>
                    <div class="selectBox">
                        <select class="select">
                            <option value="">免费发布房源</option>
                            <option value="">看看每月挣多少？</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>


    </template>

    <script>

       export  default {
           name:"slider",
            data:function(){
                return {
                    mobile:'',
                    password:'',
                    imgLogo:require("../assets/home/logo.png"),
                }
        },
            methods:{
                inputRegister:function(){
                    this.$api.post(this.$myconfig.register,{

                            mobile: this.mobile,

                            password:this.password
                        },
                        r=>{
                            console.log(r.data);
                        },
                        e=>{
                            console.log(e.data);
                        })
                }
            }
        }
    </script>
    <style scoped>
        .header{
            position:relative;
            left:0;
            top:0;
            right:0;
            bottom:0;
            margin:auto;
            width:100%;
            heigth:600px;
        }
        .header-content {
            width: 1902px;
            height: 60px;
            background: rgba(255, 255, 255, 0.5);
        }
        .LogoPicture{
            width:50px;
            height:50px;
            margin:10px 5px;
            padding-left:350px;
        }
        .hotelName{
            font-size:30px;
            font-weight:700;
            color: #3e97e2;
            font-family:幼圆;
            letter-spacing: 3px;
        }
        .navHome{
            padding-right:500px;
        }
        .homePage{
            font-size:15px;
            font-weight:600;
            color: #ffb000;
            font-family:幼圆;
            letter-spacing: 2px;
            padding-left:30px;
            padding-right:20px;

        }
        .selectBox {
            display:inline-block;

        }
        .select{
            display: block;
            height: 26px;
            line-height: 26px;
            margin: 17px 0 0;
            padding: 0 14px 0 8px;
            color: #fff;
            border-radius: 2px;
            background: #3d97e3;
            border: none;
        }
        .select option{
            display:block;
            width:174px;
            height:100px;
            background-color:white;
            color:black;
        }
        </style>