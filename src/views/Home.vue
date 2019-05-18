<template>
  <div class="home">
    <div>
      <img :src="backgroundPicture" class="backgroundPicture">
      <div class="header">


      <div class="header-content">
        <img :src="imgLogo" class="LogoPicture">
        <span class="hotelName">微酒店</span>
        <span class="nav">
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


      <div class="orderType">
        <h1>玩转名宿公寓</h1>
        <div class="order">
          <table>
            <tr>
              <td>
<!--                <img :src="orderPic1" class="orderPic">-->
                <div class="picIntroduce1">
                  <div class="picInt1">
                  <div class="bigInt">
                    <a href="" class="title">轰趴聚会
                    </a>
                  </div>
                  <div class="smallInt" >
                    <a href="" class="explain">私密空间 亲朋好友尽心玩
                    </a>
                  </div>
                  </div>
                </div>
              </td>
              <td>
<!--                <img :src="orderPic2" class="orderPic">-->
                <div class="picIntroduce2">
                  <div class="picInt2">
                    <div class="bigInt">
                      <a href="" class="title">家庭出游
                      </a>
                    </div>
                    <div class="smallInt" >
                      <a href="" class="explain">一房多卧 家人合住好照看
                      </a>
                    </div>
                  </div>
                </div>
              </td>
              <td>
<!--                <img :src="orderPic3" class="orderPic">-->
                <div class="picIntroduce3">
                  <div class="picInt3">
                    <div class="bigInt">
                      <a href="" class="title">实惠长住
                      </a>
                    </div>
                    <div class="smallInt" >
                      <a href="" class="explain">洗衣做饭 设施齐全又省钱
                      </a>
                    </div>
                  </div>
                </div>
              </td>
              <td>
<!--                <img :src="orderPic4" class="orderPic">-->
                <div class="picIntroduce4">
                  <div class="picInt4">
                    <div class="bigInt">
                      <a href="" class="title">新奇体验
                      </a>
                    </div>
                    <div class="smallInt" >
                      <a href="" class="explain">房型丰富 风格迥异更养眼
                      </a>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>


      <div class="hotType">
        <h1>当季热门</h1>
        <div class="hot">
        <table>
          <tr>
            <td>
              <img :src="hotPlace1" class="hotPlace">
              <div class="">

              </div>
            </td>
            <td>
              <img :src="hotPlace2" class="hotPlace">
            </td>
            <td>
              <img :src="hotPlace3" class="hotPlace">
            </td>
            <td>
              <img :src="hotPlace4" class="hotPlace">
            </td>
            <td>
              <img :src="hotPlace5" class="hotPlace">
            </td>
          </tr>
        </table>
        </div>
      </div>

      <div class="footer">
        <input type="button" value="查看更多>>" class="checkMore">
      </div>




    </div>



  </div>
</template>

<script>
// @ is an alias to /src


export default {

  name: 'home',
  data:function(){
    return {
      mobile:'',
      password:'',
      imgLogo:require("../assets/home/logo.png"),
      backgroundPicture:require("../assets/home/backgroundPicture.jpg"),
      // orderPic1:require("../assets/home/sy1.01.jpg"),
      // orderPic2:require("../assets/home/sy2.02.jpg"),
      // orderPic3:require("../assets/home/sy3.03.jpg"),
      // orderPic4:require("../assets/home/sy4.04.jpg"),
      hotPlace1:require("../assets/home/hotPlace.01.png"),
      hotPlace2:require("../assets/home/hotPlace.02.jpg"),
      hotPlace3:require("../assets/home/hotPlace.03.jpg"),
      hotPlace4:require("../assets/home/hotPlace.04.jpg"),
      hotPlace5:require("../assets/home/hotPlace.05.jpg")
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
  .hotelName{
    font-size:30px;
    font-weight:700;
    color:white;
    font-family:幼圆;
    letter-spacing: 3px;
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
  .nav{
    padding-right:500px;
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
  .header{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
    width:100%;
    heigth:600px;
  }
  .LogoPicture{
    width:50px;
    height:50px;
    margin:10px 5px;
    padding-left:350px;
  }

  .header-content{
    width:1902px;
    height:60px;
    background: rgba(116,107,108,.5);

  }
  .order{
    margin-top:20px;
    margin-left:2px;
  }
  .picIntroduce1{
    margin-right:20px;
    width:280px;
    height:420px;
    background:url("../assets/home/sy1.01.jpg");
  }
  .picInt1{
    width:280px;
    height:80px;
    background-color: #ff6666;
    margin-top:340px;
    float:left;
  }
  .title{
    font-size:20px;
    color:white;
    font-weight:600;
  }
  .bigInt{
    margin-top:10px;
    padding-left:20px;
  }
  .smallInt{

    padding-left:20px;
    font-weight:500;
  }
  .explain{
    font-size:15px;
    color:white;
  }
  .picIntroduce2{
    margin-right:20px;
    width:280px;
    height:420px;
    background:url("../assets/home/sy2.02.jpg");
  }
  .picInt2{
    width:280px;
    height:80px;
    background-color: #ffb000;
    margin-top:340px;
    float:left;
  }
  .picIntroduce3{
    margin-right:20px;
    width:280px;
    height:420px;
    background:url("../assets/home/sy3.03.jpg");
  }
  .picInt3{
    width:280px;
    height:80px;
    background-color: #36c48f;
    margin-top:340px;
    float:left;
  }
  .picIntroduce4{
    margin-right:20px;
    width:280px;
    height:420px;
    background:url("../assets/home/sy4.04.jpg");
  }
  .picInt4{
    width:280px;
    height:80px;
    background-color: #404a54;
    margin-top:340px;
    float:left;
  }
  .orderType h1{
    margin-top:40px;
    margin-left:520px;
    font-size:3em;
    font-weight:700;
    display:block;
    width:230px;


  }
  .orderType{
    margin-left:300px;


  }
  .hotType{
    margin-left:305px;
  }
  .hotType h1{
    margin-top:40px;
    margin-left:520px;
    font-size:3em;
    font-weight:700;
    display:block;
    width:230px;

  }
  .hotPlace{
    margin:10px 5px;
  }
  .footer{
    width:100%;
    height:300px;
  }
  .checkMore{
    float:left;
    margin-left:836px;
    margin-top:30px;
    width:136px;
    height:36px;
  }



  </style>
=======
<Style scoped></Style>
>>>>>>> 13168ec624104253ce5b0f2cadedca4a9fabc8b6
