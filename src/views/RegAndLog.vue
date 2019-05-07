<template>
  <div id="register">
     <div class="register-top">
         <router-view></router-view>

     </div>
     <div class="register-bottom">
        <ul>
          <li>关于我们</li>
          <li>我是房客</li>
          <li>加入我们</li>
          <li>网站地图</li>
        </ul>
     </div>
  </div>

</template>
<script>

</script>

<style scoped>
  #register{
    width: 100%;
    height: 100%;

  }

  .register-top{
    width: 100%;
    height: 85%;
    background-image: url("../assets/register/background.jpg");
    background-position: top center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;

  }

  .register-bottom{
    text-align: center;
    height: 15%;
    background-color: #ebebeb;
  }

  .register-bottom li{
    font-family: "Baskerville Old Face";
    font-size: 18px;
    margin: 20px 10px;
    display: inline-block;
  }
</style>


