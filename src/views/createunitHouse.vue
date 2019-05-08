<script src="../router.js"></script>
<template>
    <div id="createunitHouse">
        <merchant-nav></merchant-nav>
        <div id="select-body">
            <div class="step-content">
                <ul>
                    <li v-for="step in stepContent"
                        :key="step.id"
                        >{{step.name}}</li>
                </ul>

            </div>
            <div class="House-position">

            </div>
        </div>
    </div>
</template>

<script>
    import MerchantNav from "../components/merchantNav";
    export default {
        name: "createUnitHouse",
        components: {MerchantNav},
        data(){
            return{
                stepContent:[
                    {
                        name:'房屋位置',
                        id:1
                    },
                    {
                        name:'房屋详情',
                        id:2
                    },
                    {
                        name:'房屋描述',
                        id:3
                    },
                    {
                        name:'设施服务',
                        id:4
                    },
                    {
                        name:'入住规则',
                        id:5
                    },
                    {
                        name:'房屋照片',
                        id:6
                    },
                    {
                        name:'价格',
                        id:7
                    },
                    {
                        name:'身份验证',
                        id:8
                    }
                ]
            }
        }
    }
</script>

<style scoped>


    #select-body{
        margin: 0 auto;
        width: 80%;
        border: 1px red solid;
    }

</style>