<template>
  <div class="home">


  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  data:function(){
    return {
      mobile:'',
      password:''
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
      })
    }
  }


}
</script>
