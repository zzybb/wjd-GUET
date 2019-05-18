<template>
    <el-form-item>
        <div class="next-type">
            <el-button type="primary"  class="next-type-btn ivu-btn"
                       @click="submitForm"

            >下一步</el-button>
        </div>
    </el-form-item>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const {  mapMutations,mapState } = createNamespacedHelpers('merchantForm');
    export default {
        name: "nextStep",
        props:['form'],
        methods:{
            ...mapMutations([
                'changeFormId'
            ]),
            submitForm(){
                var formName = this.form.formName;
                var ref = this.form.obj;

                if (Object.keys(ref).length  == 0){
                    this.changeFormId();
                    this.locationStore();
                    return;
                }
                ref[formName].validate((valid) => {
                    if (valid) {
                        this.changeFormId();
                        this.locationStore();
                    } else {
                        console.log('表单有未填写项');
                        return false;
                    }
                });
            },
            locationStore(){   //本地存储
                var formName = this.form.formName;
                var strObj = JSON.stringify(this.form.locationObj);
                var strList = JSON.stringify(this.FormCompleteId);
                localStorage.setItem(formName,strObj);
                localStorage.setItem('currentId',this.currentId);
                localStorage.setItem('FormCompleteId',strList);
                localStorage.setItem('writingId',this.writingId);
            }
        },
        computed:{
            ...mapState({
                currentId:state=>state.currentId,
                FormCompleteId:state=>state.FormCompleteId,
                writingId:state=>state.writingId
            })
        }
    }
</script>

<style scoped>
    .next-type{
        border-top: 1px solid #ddd;
        margin: 0 auto;
        width: 990px;
    }
    .next-type-btn{
        float: right;
        width: 100px;
        height: 40px;
        font-size: 16px;
        margin-top: 20px;
    }
    .ivu-btn{
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        line-height: 1.5;
        user-select: none;
        padding: 6px 15px;
        font-size: 12px;
        border-radius: 4px;
        transition: color .2s linear,background-color .2s linear,border .2s linear;
        color: white;
        background-color: #6e80e3;
        border-color: #6e80e3;

    }

</style>