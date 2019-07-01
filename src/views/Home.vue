<template>
  <div class="home">
      <slider></slider>
      <div class="backgroundPicture">
          <div class="search-slide">
              <search></search>
          </div>
      </div>

      <div class="home-body">
          <div class="home-item orderType">
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


          <div class="home-item hotType">
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


          <div class="home-item checkMor">
              <input type="button" value="查看更多>>" class="checkMore">
          </div>

      </div>



      <div class="footer">
        <h5>关于我们 | 我是房客 | 加入途家 | 网站地图</h5>
        <h5>@2019 weijiudian 微酒店版权所有 京公网安备11010502027120 营业执照 安全保障计划 </h5>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import search from '../components/search';
import Slider from "../components/slider";

export default {

  name: 'home',
  components:{Slider, search},
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






<style>
  .home{
      width: 100%;
  }

  .select option{
    display:block;
    width:174px;
    height:100px;
    background-color:white;
    color:black;
  }
  .backgroundPicture{
      width: 100%;
      height: 640px;
      background-image: url("../assets/home/backgroundPicture.jpg");
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .search-slide{
      margin-top: 300px;
  }
  .order{
    margin-top:20px;
    margin-left:2px;
  }
  .home-item{
      width: 1200px;
      margin: 0 auto !important;
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
    margin-left:310px;


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
  .checkMor{
    height:100px;
      display: flex;
      justify-content: center;
  }
  .checkMore{
    float:left;
    margin-top:30px;
    width:136px;
    height:36px;
  }
  .footer{
    text-align: center;
    word-spacing: 1em;
    line-height: 2em;
    height:150px;
    width:100%;
    margin:0;
    padding-top:40px;
    background-color: #f7f7f7;
  }
  .search-box{
      display: flex;
      justify-content: center;
      margin-top:400px;
  }


  </style>

