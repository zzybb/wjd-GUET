<template>
    <div class="order-nav">
        <div class="order-nav-body">
            <img src="../../assets/home/logo.png" class="navLogo">
            <span class="logoFont">微酒店</span>
            <div class="order-step">
                <el-steps   :active="completeId" finish-status="success">
                    <el-step title="提交订单" ></el-step>
                    <el-step title="支付订金" ></el-step>
                    <el-step title="预定成功" ></el-step>
                </el-steps>
            </div>

        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapState } = createNamespacedHelpers('Order');
    export default {
        name: "order-nav",
        data(){
            return {
            }
        },
        computed:{
            ...mapState({
                completeId:state=>state.completeId
            })

        }
    }
</script>

<style scoped>
    .order-nav-body{
        width: 100%;
        height: 60px;
        font-size: 14px;
        box-shadow: 0 0 8px #cfcfcf;
        border-top: 1px solid #3e97e2;
        display: flex;
        align-items: center;
    }

    .navLogo{
        margin-left: 200px;
        width: 60px;
    }

    .logoFont{
        font-size: 30px;
        font-weight: 700;
        color: #3e97e2;
        font-family: 幼圆;
        letter-spacing: 3px;
    }

    .order-step{
        margin-left: 600px;
        width: 700px;
        margin-top: 5px;
    }


</style>