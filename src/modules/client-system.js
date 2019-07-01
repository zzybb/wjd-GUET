export default {
    namespaced:true,
    state:{
        isShow:false,
        userInfo:'',
        hotelInfo:''
    },
    mutations: {
        changeShow(state,bool){
            state.isShow = bool;
        },
        getInfo(state,obj){

            state.userInfo = obj.user;
            state.hotelInfo = obj.hotel;
        }
    }
}