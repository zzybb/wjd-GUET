<template>
    <div class="searchHouse">
    <div class="header">
        <slider></slider>
    </div>
        <img :src="advertise" calss="advertise">
        <div>
            <a href="/" class="back">微酒店  ></a>
            <a href=""  class="back1">桂林公寓住房  ></a>
        </div>
    <div class="search">
         <div class="search-border">
             <search></search>
         </div>

        <div>
            <table>
                <tr class="tab">
                    <td>
                        <span class="scope">房价</span>
                            <label><input type="radio" name="housePrice" value="" class="tabPrice">￥0-200</label>
                            <label><input type="radio" name="housePrice" value="" class="tabPrice">￥200-300</label>
                            <label><input type="radio" name="housePrice" value="" class="tabPrice">￥300-400</label>
                            <label><input type="radio" name="housePrice" value="" class="tabPrice">￥400-500</label>
                            <label><input type="radio" name="housePrice" value="" class="tabPrice">￥500-800</label>
                            <label><input type="radio" name="housePrice" value="" class="tabPrice">￥800-100000</label>
                        <span>自定义  <input type="text" class="selfPrice">~<input type="text" class="selfPrice"></span>

                    </td>
                </tr>
                <div class="hr"></div>
                <tr class="tab">
                    <td>
                        <span class="scope">房型</span>

                            <label><input type="radio" name="houseType" value="" class="tabPrice">公寓</label>
                            <label><input type="radio" name="houseType" value="" class="tabPrice">别墅</label>
                            <label><input type="radio" name="houseType" value="" class="tabPrice">复式</label>
                            <label><input type="radio" name="houseType" value="" class="tabPrice">渔家乐</label>
                            <label><input type="radio" name="houseType" value="" class="tabPrice">农家乐</label>
                            <label><input type="radio" name="houseType" value="" class="tabPrice">木屋</label>
                            <label><input type="radio" name="houseType" value="" class="tabPrice">竹屋</label>
                            <label><input type="radio" name="houseType" value="" class="tabPrice">树屋</label>
                    </td>
                </tr>
                <div class="hr"></div>
            </table>

        </div>

    </div>
    <div class="sec">
<!--        <table>-->
<!--            <tr>-->
<!--                <td class="select1">-->
<!--                    <img :src="sec01" class="sec01">-->
<!--                    <div>-->
<!--                        <div>-->
<!--                            <a>豪华公寓J3-长安街故宫国贸家庭公寓</a>-->
<!--                            <a> ￥599</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <a>朝阳区</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <span>1居/100平米/宜居5人</span>-->
<!--                            <a>5分/10条评论</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </td >-->
<!--                <td class="select1">-->
<!--                    <img :src="sec02" class="sec01">-->
<!--                    <div>-->
<!--                        <div>-->
<!--                            <a>豪华公寓J3-长安街故宫国贸家庭公寓</a>-->
<!--                            <a> ￥599</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <a>朝阳区</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <span>1居/100平米/宜居5人</span>-->
<!--                            <a>5分/10条评论</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </td>-->
<!--                <td class="select1">-->
<!--                    <img :src="sec03" class="sec01">-->
<!--                    <div>-->
<!--                        <div>-->
<!--                            <a>豪华公寓J3-长安街故宫国贸家庭公寓</a>-->
<!--                            <a> ￥599</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <a>朝阳区</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <span>1居/100平米/宜居5人</span>-->
<!--                            <a>5分/10条评论</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </td>-->
<!--            </tr>-->
<!--&lt;!&ndash;            <tr>&ndash;&gt;-->
<!--                <td class="select1">-->
<!--                    <img :src="sec04" class="sec01">-->
<!--                    <div>-->
<!--                        <div>-->
<!--                            <a>豪华公寓J3-长安街故宫国贸家庭公寓</a>-->
<!--                            <a> ￥599</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <a>朝阳区</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <span>1居/100平米/宜居5人</span>-->
<!--                            <a>5分/10条评论</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </td>-->
<!--                <td class="select1">-->
<!--                    <img :src="sec05" class="sec01">-->
<!--                    <div>-->
<!--                        <div>-->
<!--                            <a>豪华公寓J3-长安街故宫国贸家庭公寓</a>-->
<!--                            <a> ￥599</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <a>朝阳区</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <span>1居/100平米/宜居5人</span>-->
<!--                            <a>5分/10条评论</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </td>-->
<!--                <td class="select1">-->
<!--                    <img :src="sec06" class="sec01">-->
<!--                    <div>-->
<!--                        <div>-->
<!--                            <a>豪华公寓J3-长安街故宫国贸家庭公寓</a>-->
<!--                            <a> ￥599</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <a>朝阳区</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <span>1居/100平米/宜居5人</span>-->
<!--                            <a>5分/10条评论</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--                <td class="select1">-->
<!--                    <img :src="sec07" class="sec01">-->
<!--                    <div>-->
<!--                        <div>-->
<!--                            <a>豪华公寓J3-长安街故宫国贸家庭公寓</a>-->
<!--                            <a> ￥599</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <a>朝阳区</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <span>1居/100平米/宜居5人</span>-->
<!--                            <a>5分/10条评论</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </td>-->
<!--                <td class="select1">-->
<!--                    <img :src="sec08" class="sec01">-->
<!--                    <div>-->
<!--                        <div>-->
<!--                            <a>豪华公寓J3-长安街故宫国贸家庭公寓</a>-->
<!--                            <a> ￥599</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <a>朝阳区</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <span>1居/100平米/宜居5人</span>-->
<!--                            <a>5分/10条评论</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </td>-->
<!--                <td class="select1">-->
<!--                    <img :src="sec09" class="sec01">-->
<!--                    <div>-->
<!--                        <div>-->
<!--                            <a>豪华公寓J3-长安街故宫国贸家庭公寓</a>-->
<!--                            <a> ￥599</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <a>朝阳区</a>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <span>1居/100平米/宜居5人</span>-->
<!--                            <a>5分/10条评论</a>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </td>-->
<!--            </tr>-->

<!--        </table>-->
        <div class="">
            <ul>
                <li v-for="item in list">
                    <a><img v-bind:src="item.hotelImage1">
                        <div>{{item.name}}}</div>
                        <div>{{item.price}}}</div>
                        <div>{{item.street}}}</div>
                    </a>
                </li>
            </ul>

        </div>

    </div>
    <div >
        <undermost></undermost>
    </div>
    </div>
</template>
<script>
    import slider from '../components/slider';
    import undermost from '../components/undermost';
    import Search from "../components/search";
    export default{
        name: "SearchHouseLay1",
        components:{Search, slider ,undermost},
        data:function(){
            return{
                advertise:require("../assets/searchHouseLay1/adv.jpg"),
                list:[]

                // sec01:require("../assets/searchHouseLay1/sec01.jpg"),
                // sec02:require("../assets/searchHouseLay1/sec02.jpg"),
                // sec03:require("../assets/searchHouseLay1/sec03.jpg"),
                // sec04:require("../assets/searchHouseLay1/sec04.jpg"),
                // sec05:require("../assets/searchHouseLay1/sec05.jpg"),
                // sec06:require("../assets/searchHouseLay1/sec06.jpg"),
                // sec07:require("../assets/searchHouseLay1/sec07.jpg"),
                // sec08:require("../assets/searchHouseLay1/sec08.jpg"),
                // sec09:require("../assets/searchHouseLay1/sec09.jpg"),
            }
        },


        created() {
            var select = JSON.parse(localStorage.getItem("SelectDate"));
            this.$api.get(this.$myconfig.hotelList,{
                "token":localStorage.getItem("token"),
                "city":localStorage.getItem("palceName"),
                "selectStartDate":select.BeganTime,
                "selectEndDate":select.EndTime

                },
                success=>{
                    console.log("___________",success.data.page.list);
                    this.list=success.data.page.list
                    // localStorage.setItem("token",success.data.token);

                },failure=>{
                    console.log("登录失败，失败原因：" + failure.data.msg)
                })
        },

    }

</script>
<style scoped>
    .header{
        position:relative;
        width:100%;
        height:60px;
    }
    .back{
        display:inline-block;
        width:100px;

        margin-left:360px;
        margin-top:30px;

        color:black;
    }
    .back1{
        margin-left:-50px;
        color:black;

    }
    .searchHouse{
        width:1920px;
        height:100%;
    }
    .search{
        width:1200px;
        margin: 0 auto;
    }
    .search-border{

        padding-left: 40px;

        background: #b1c7d6;
    }
    .tab{
        height: 50px;
    }
    label{
        display: inline-block;
        width:100px;

    }
    .sec{
        width:1193px;

        height:1000px;
        margin-left:360px;
    }
    .scope{
        display:inline-block;
        width:200px;
        margin-left:40px;


    }
    .hr{
        width:1200px;
        border:1px solid #f7f7f7;
    }
    .selfPrice{
        display:inline-block;
        width:50px;
    }
    .sec01{
        display:inline-block;
        width:370px;
        height:230px;
        margin-right:40px;
    }


    </style>