<template>
    <div class="search">
    <div class="nav">
        <input type="text" placeholder="桂林" class="city" v-model="palceName" >
        <input type="text" readonly="readonly" class="check" style="width:300px;height:30px;">
        <input type="button" src="" value="搜索" class="choose" @click="showSearchLay1">
    </div>
    </div>

</template>
<script>

    export  default {
        name: "search",
        data(){
            return {
                palceName:[]
            }
        },

        methods:{
            showSearchLay1:function(){

                localStorage.setItem("palceName", this.palceName);
                this.$router.replace('/unitList')
            }

        }

    }
    </script>
<style>
    .nav{
        width:900px;
        height:63px;
        padding-right: 200px;
        background-color: #b1c7d6;
    }
    .city {
        display:inline-block;
        width:300px;
        height:30px;
        margin-top:16px;
        margin-left:50px;
        padding-left:40px;
        border:white;
        background: white url("../assets/searchHouseLay1/searchLogo1.png") no-repeat;

    }
    .check{
        display:inline-block;
        /*width:300px;*/
        height:10px;
        margin-top:16px;
        padding-left:40px;
        border: white;
        background: white url("../assets/searchHouseLay1/searchLogo2.png") no-repeat;
    }
    .choose{
        display:inline-block;;
        width:100px;
        height:30px;
        margin-top:16px;
        margin-left:20px;
        background-color: #3e97e2;
        border: white;
        font-size:14px;
        color:white;
        letter-spacing-spacing: 2em;
    }
    .search{
        width:1500px;
        height:200px;
        border: #ffffff ;
        margin-left:360px;
        margin-top:400px ;
    }
</style>