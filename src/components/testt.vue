<template>
    <div>
        <div class="list-item" v-for="item in HomeList">

            <h1>{{item.name}}</h1>

        </div>
    </div>
</template>

<script>
    export default {
        name: "testt",
        data(){
            return {
                HomeList:[]
            }
        },
        created() {
            this.$api.get(this.$myconfig.hotelList,{
                "token":localStorage.getItem("token")
            },r=>{

                this.HomeList = r.data.page.list;

            },e=>{
                console.log(e.data);
            })
        }
    }
</script>

<style scoped>


</style>