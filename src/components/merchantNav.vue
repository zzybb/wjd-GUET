<template>
    <div class="Hotel-register-nav">
        <div class="order-nav-body">
            <img src="../assets/home/logo.png" class="navLogo">
            <span class="logoFont">微酒店</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "merchantNav"
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



</style>