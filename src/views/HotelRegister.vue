<template>
    <div id="Hotel-register">
        <div class="Hotel-register-nav">
            <img src="../assets/merchant-register/GUET.png">
        </div>
        <div class="Hotel-register-body">
            <h1>哪些房屋可以在途家网出租</h1>
                <ul class="Hotel-type">
                    <li><img src="../assets/merchant-register/houseType01.jpg">
                        <div class="i-type01"><span>公寓</span></div>

                    </li>
                    <li><img src="../assets/merchant-register/houseType02.jpg">
                        <div class="i-type02"><span>别墅</span></div>

                    </li>
                    <li><img src="../assets/merchant-register/houseType03.jpg">
                        <div class="i-type03"><span>特色民宿</span></div>

                    </li>
                    <li><img src="../assets/merchant-register/houseType04.jpg">
                        <div class="i-type04"><span>单间出租</span></div>
                    </li>
                </ul>

        </div>
        <div class="Hotel-register-bottom">
            <h1>提高平台曝光和排名</h1>
            <ul class="infoList">
                <li><img src="../assets/merchant-register/icon_s01.png"><br>想一个特别的房屋名字</li>
                <li><img src="../assets/merchant-register/icon_s02.png"><br>真实的房屋照片(至少6张)</li>
                <li><img src="../assets/merchant-register/icon_s03.png"><br>同比周边更有竞争力的价格</li>
                <li><img src="../assets/merchant-register/icon_s04.png"><br>详细的地址和周边的配套设施</li>
            </ul>
        </div>



    </div>
</template>
<script></script>
<style scoped>
    .Hotel-register-nav{
        display: flex;
        align-items: center;
        height: 80px;
        overflow: hidden;
        background-color: #5264cc;
    }

    .Hotel-register-nav img{
        width: 300px;
        height: 50px;
        margin-left: 200px;
    }

    .Hotel-register-nav h1{

        font-size: 25px;
        color: white;
        margin-left: 300px;
    }

    .Hotel-register-body{
        height: 500px;

    }

    .Hotel-type{
        width: 80%;
        margin-left: 200px;
        margin-top: 50px;
        display: flex;
        justify-content: space-around;

    }
    .Hotel-register-body h1{
        font-family: "Bauhaus 93";
        margin-top: 50px;
        font-size: 30px;
        margin-left: 200px;
    }
    .i-type04,.i-type03,.i-type02,.i-type01{
        display: block;
        position: absolute;
        width: 282px;
        line-height: 64px;
        top: 320px;
        color: white;
        text-align: center;
        background-image: url("../assets/merchant-register/iconType-small.png");
        background-repeat: no-repeat;
        padding-top: 60px;
        font-size: 24px;
        font-weight: bolder;
    }

    .i-type01{
        background-position: 112px 0;
    }
    .i-type02{
        background-position: 112px -160px;
    }
    .i-type03{
        background-position: 112px -320px;
    }
    .i-type04{
        background-position: 112px -480px;
    }



    .Hotel-register-bottom{
        text-align: center;
        justify-content: center;
        height: 400px;
        background-color: #383c50;
    }

    .Hotel-register-bottom h1,.infoList>li{
        color: white;
    }

    .Hotel-register-bottom .infoList{
        display: flex;
        margin-top: 50px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .Hotel-register-bottom h1{
        color: #acb2ce;
        padding-top: 50px;
        margin-top: 20px;
        font-size: 30px;

    }

    .Hotel-register-bottom .infoList>li{
        color: #acb2ce;

        width: 260px;
        font-size: 20px;
        margin: 0 50px;
    }

    .Hotel-register-bottom .infoList>li img{
        padding-bottom: 20px;
    }

</style>