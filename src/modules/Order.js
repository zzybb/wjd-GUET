export default {
    namespaced:true,
    state:{
        night:'',
        orderInfo:{
            houseNumber:0,
            price:0
        },
        completeId:1

    },
    mutations: {
        changeNight:function(state,n){
            state.night = n;
        },
        changeInfo:function(state,obj){
            state.orderInfo.houseNumber = obj.number;
            state.orderInfo.price = obj.price;
        },
        changeComId:function(state,id){
            state.completeId = id;
        }
    }
}