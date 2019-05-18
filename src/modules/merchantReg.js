//注册页面的全局管理
export default {
    namespaced:true,
    state:{
        currentId:1,
        FormCompleteId:[1],
        writingId:0
    },
    mutations: {
        changeFormId:function(state,n){

            if (!n){ //点下一步的时候不传n就走这
                if(state.FormCompleteId.indexOf(state.currentId) == -1){ //如果完成列表里没有
                    state.FormCompleteId.push(state.currentId);
                    state.currentId++;//写入当前看的ID
                    state.writingId = state.currentId//写入正在写的ID

                }else{
                    state.currentId++;
                    state.writingId = state.currentId
                }

            } else{ //直接点击对应标签的就走这
                state.currentId = n
            }
        },
        changeFormCompleteId:function(state,list){
            if (state.FormCompleteId != null){
                state.FormCompleteId = list;
            }
        },
        changeWritingId:function(state,n){
            if (state.writingId != undefined){
                state.writingId = n;
            }

        }
    }
}
