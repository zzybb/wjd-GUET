<template>
    <div class="searchBox">
        <div class="nav">
            <input type="text" placeholder="请输入城市" class="city" v-model="palceName" >
            <Calendar v-on:getDate="getDate($event)"></Calendar>
            <input type="button" src="" value="搜索" class="choose" @click="showSearchLay1">
        </div>
    </div>
</template>
<script>

    import Calendar from "./Calendar";
    export  default {
        name: "search",
        components: {Calendar},
        data(){
            return {
                palceName:''
            }
        },
        created(){
            this.palceName = localStorage.getItem("palceName");
        },
        methods:{
            showSearchLay1:function(){
                localStorage.setItem("palceName", this.palceName);
                if (this.$route.name == 'home'){
                    this.$router.push({ path: 'unitList' });
                }else if(this.$route.name == 'unitList'){
                    this.$emit("UpdateList");

                }


                /*this.$api.get(this.$myconfig.hotelList,{
                        "token":localStorage.getItem("token"),
                        "city":localStorage.getItem("palceName"),
                        "selectStartDate":Select.BeganTime,
                        "selectEndDate":Select.EndTime

                    },
                    success=>{
                        console.log("___________",success.data.page.list);
                        // localStorage.setItem("token",success.data.token);

                    },failure=>{
                        console.log("登录失败，失败原因：" + failure.data)
                    })*/



            },
            getDate(event){
                console.log(event);
            }

        }

    }
    </script>
<style>
    .nav{
        width:770px;
        height:63px;



        display: flex;
        align-items: center;



    }
    .city {
        display:inline-block;
        width:300px;
        height:44px;
        border: 1px solid #e9e9e9;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding-left:40px;
        background:white url("../assets/searchHouseLay1/searchLogo1.png") no-repeat left 50%;

    }
    .check{
        display:inline-block;
        /*width:300px;*/
        height:10px;
        margin-top:16px;

        border: white;
        background: white url("../assets/searchHouseLay1/searchLogo2.png") no-repeat;
    }
    .choose{
        display:inline-block;;
        width:100px;
        height:44px;
        background-color: #3e97e2;
        border: white;
        font-size:14px;
        color:white;
        letter-spacing-spacing: 2em;
    }
    .searchBox{
        margin-top: 10px;
        width:770px;
    }

    .calendar-input{
        border-radius:0 !important;

    }
</style>