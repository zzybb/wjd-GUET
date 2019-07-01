<template>
    <div class="authentication">
        <div class="title-con">
            <h1>身份验真<span>请注明您的房屋入住相关说明，以保证能收到合适的订单。</span></h1>

        </div>
        <div class="Identity-form">
            <el-form :label-position="labelPosition" status-icon label-width="80px" ref="IdentityForm" :model="IdentityForm" :rules="rules">
                <el-form-item label="房东昵称/门店名称 客人可通过名称快速搜索到您的小家" prop="HouseName">
                    <el-input v-model="IdentityForm.HouseName" placeholder="真实姓名或个性昵称"></el-input>
                </el-form-item>
                <el-form-item label="您的电话 此电话在客房预订成功后可见" prop="HousePhone">
                    <el-input v-model.number="IdentityForm.HousePhone" placeholder="请输入您的电话..."></el-input>
                </el-form-item>
                <el-form-item label="房东头像/门店标志" prop="HouseLabel">
                    <el-upload
                            :action="UploadURL"
                            list-type="picture-card"
                            :file-list="IdentityForm.HouseLabel"
                            :on-success="HandLabelSuccess"
                            name="picture">

                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <!--<el-form-item label="资质认证方式" >
                    <el-checkbox-group v-model="IdentityForm.identityType">
                        <el-checkbox label="身份证" ></el-checkbox>
                        <el-checkbox label="护照" disabled></el-checkbox>
                        <el-checkbox label="营业执照" disabled></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>-->

                <el-form-item label="姓名" prop="PeopleName">
                    <el-input v-model="IdentityForm.PeopleName" placeholder="请输入您的姓名..."></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="identityNumber">
                    <el-input v-model="IdentityForm.identityNumber" placeholder="请输入您的身份证号..."></el-input>
                </el-form-item>

                    <div class="identity-three">
                        <el-form-item prop="IdeHand">
                            <div class="avatar">
                                <p class="avatar-tip">上传手持身份证正面</p>
                                <el-upload
                                    class="avatar-uploader"
                                    :action="UploadURL"
                                    :file-list="IdentityForm.IdeHand"
                                    :on-success="HandSuccess"
                                    name="picture"
                                >
                                <img v-if="HandUrl" :src="HandUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </el-form-item>
                        <el-form-item prop="IdePositive">
                            <div class="avatar">
                                <p class="avatar-tip">上传身份证正面</p>
                                <el-upload
                                        class="avatar-uploader"
                                        :action="UploadURL"
                                        :on-success="PositiveSuccess"
                                        :file-list="IdentityForm.IdePositive"
                                        name="picture"
                                >
                                    <img v-if="PositiveUrl" :src="PositiveUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </el-form-item>
                        <el-form-item prop="IdeNegative">
                            <div class="avatar">
                                <p class="avatar-tip">上传身份证反面</p>
                                <el-upload
                                        class="avatar-uploader"
                                        :action="UploadURL"
                                        :on-success="NegativeSuccess"
                                        :file-list="IdentityForm.IdeNegative"
                                        name="picture"
                                >
                                    <img v-if="NegativeUrl" :src="NegativeUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </el-form-item>
                    </div>
                <el-form-item>
                    <div class="next-type">
                        <el-button type="primary" @click="submitForm()" class="next-type-btn ivu-btn"
                        >提交发布</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import facility2json from '../utils/facility2.json';
    export default {
        name: "authentication",
        data(){
            var PhotoPass = (rule,value,callback) => {
                if (!value[0]){
                    return callback(new Error('图片不能为空'));
                }else{
                    callback();
                }
            };
            return {
                labelPosition:'top',
                requiredURL:this.$myconfig.ImageURL,
                facilitys:facility2json,               //设施中英对照表
                IdentityForm:{
                    HouseName:'',
                    HousePhone:'',
                    PeopleName:'',
                    identityNumber:'',
                    HouseLabel:[],
                    IdePositive:[],
                    IdeNegative:[],
                    IdeHand:[]

                },
                rules:{
                    HouseName:[
                        {required:true,message:'请输入房屋名称',trigger:['blur','change']}
                    ],
                    HousePhone:[
                        {required:true,message:'请输入电话',trigger:['blur','change']},
                        { type: 'number', message: '电话号码必须为数字值'}
                    ],
                    PeopleName:[
                        {required:true,message:'请输入人名',trigger:['blur','change']}
                    ],
                    identityNumber:[
                        {required:true,message:'请输入身份证号',trigger:['blur','change']}
                    ],
                    HouseLabel:[
                        {validator: PhotoPass}
                    ],
                    IdeHand:[
                        {validator: PhotoPass}
                    ],
                    IdePositive:[
                        {validator: PhotoPass}
                    ],
                    IdeNegative:[
                        {validator: PhotoPass}
                    ]
                },
                PositiveUrl:'',
                NegativeUrl:'',
                HandUrl:'',
                labelUrl:''
            }
        },
        computed:{
            UploadURL(){
                return this.$myconfig.ServerPath + this.$myconfig.photoUpLoad
            }
        },
        methods:{
            HandLabelSuccess(res,file){

                var url = this.requiredURL+res.msg;
                this.$set(this.IdentityForm.HouseLabel, 0, {name:file.name,url:url});
                this.labelUrl = URL.createObjectURL(file.raw);
                this.$refs['IdentityForm'].validateField('HouseLabel');
            },
            HandSuccess(res, file) {

                this.HandUrl = URL.createObjectURL(file.raw);
                var url = this.requiredURL+res.msg;
                this.$set(this.IdentityForm.IdeHand, 0, {name:file.name,url:url});
                this.$refs['IdentityForm'].validateField('IdeHand');
            },
            PositiveSuccess(res, file) {
                var url = this.requiredURL+res.msg;
                this.$set(this.IdentityForm.IdePositive, 0, {name:file.name,url:url});
                this.PositiveUrl = URL.createObjectURL(file.raw);
                this.$refs['IdentityForm'].validateField('IdePositive');
            },
            NegativeSuccess(res, file){
                var url = this.requiredURL+res.msg;
                this.$set(this.IdentityForm.IdeNegative, 0, {name:file.name,url:url});
                this.NegativeUrl = URL.createObjectURL(file.raw);
                this.$refs['IdentityForm'].validateField('IdeNegative');
            },
            ReorganPosition(obj){
                var Form = JSON.parse(localStorage.getItem("PositionForm"));
                var PositionForm = {
                    "city":Form.city[1],                                  //城市
                    "street":Form.city[2],                                //街道
                    "provincial":Form.city[0],                            //省会
                    "address":Form.address,                               //地址
                    "addressSupplement":Form.addressSupplement            //地址补充
                };

                Object.assign(obj,PositionForm);


            },
            ReorganDetail(obj){
                var Form = JSON.parse(localStorage.getItem("DetailForm"));

                var DetailForm = {
                    "rentWay":Form.TypeOfRental,                          //出租方式
                    "area":Form.size,                                     //房屋面积
                    "type":Form.TypeOfHouse,                              //房屋类型
                    "landscape":Form.landscape,                           //房屋风景
                    "bedrooms":Form.HouseDetailNum.bedroom,               //卧室数量
                    "bathroom":Form.HouseDetailNum.bathroom,              //浴室数量
                    "drawingRoom":Form.HouseDetailNum.livingRoom,         //客厅数量
                    "kitchen":Form.HouseDetailNum.kitchen,                //厨房数量
                    "study":Form.HouseDetailNum.BookRoom,                 //书房数量
                    "balcony":Form.HouseDetailNum.balcony,                //阳台数量
                    "bed":Form.bedNum,                                    //床的数量
                    "suitablePopulation":Form.fitNum,                     //适合住的人数
                    "housingQuantity":Form.HouseNum                       //房子数量
                }

                this.toStr(DetailForm);
                Object.assign(obj,DetailForm);
            },
            ReorganDescription(obj){
                var Form = JSON.parse(localStorage.getItem("DescriptionForm"));
                var Description = {
                    "name":Form.HouseName,                                 //房屋名称
                    "feature":Form.HouseFeature,                           //房屋特色
                    "traffic":Form.trafficLocation,                        //交通位置
                    "introduce":Form.SurIntro                              //周边介绍
                };
                Object.assign(obj,Description);
            },
            ReorganFacilityForm(){
                var Form = JSON.parse(localStorage.getItem("FacilityForm"));
                   var Facility = this.facilityCreat(Form);

                return Facility;

            },
            ReorganRule(){
                var Form = JSON.parse(localStorage.getItem("RuleForm"));
                this.TrueChangeOne(Form);
                var RuleForm = {
                    "inTime":Form.GuestInTime,
                    "outTime":Form.GuestOutTime,
                    "receiveTime":Form.GetGuestTime1,
                    "isProscenium":Form.IsFrend,
                    "acceptSex":Form.gender,
                    "acceptOld":Form.acceptOld,
                    "acceptChild":Form.acceptChild,
                    "acceptForeign":Form.ForeignGuests,
                    "cleaning":Form.HowManySweep,
                    "sheets":Form.HowManyReplace
                };

                return RuleForm;
            },
            ReorganHousePhoto(obj){
                var Form = JSON.parse(localStorage.getItem("PhotoForm")),j=1,image={
                    "hotelImage1":'',
                    "hotelImage2":'',
                    "hotelImage3":'',
                    "hotelImage4":'',
                };

                for(var item in Form){
                    for(var i = 0;i<Form[item].length;i++,j++){
                        image['hotelImage' + j] = this.splicePhoto(Form[item][i].url);
                    }
                }

                Object.assign(obj,image);
            },
            ReorganPrice(obj){
                var Form = JSON.parse(localStorage.getItem("PriceForm"));
                var Price = {
                    "price":parseInt(Form.price),
                    "deposit":Form.deposit
                }

                Object.assign(obj,Price);
            },
            ReorganIdentity(obj){
                var idcardImage1 = this.splicePhoto(this.IdentityForm.IdeHand[0].url),
                    idcardImage2 = this.splicePhoto(this.IdentityForm.IdePositive[0].url),
                    idcardImage3 = this.splicePhoto(this.IdentityForm.IdeNegative[0].url),
                    avatarImage = this.splicePhoto(this.IdentityForm.HouseLabel[0].url);

                var identity = {
                    "nickname":this.IdentityForm.HouseName,                     //昵称
                    "tel":this.IdentityForm.HousePhone,                         //电话
                    "avatarImage":avatarImage,                                  //门标图
                    "realName":this.IdentityForm.PeopleName,                    //真实姓名
                    "idNumber":this.IdentityForm.identityNumber,                //身份证号
                    "idcardImage1":idcardImage1,                                //手持证件照
                    "idcardImage2":idcardImage2,                                //正面照
                    "idcardImage3":idcardImage3                                 //背面照
                };

                this.toStr(identity);
                Object.assign(obj,identity);
            },
            splicePhoto(str){                                                   //把图片的前缀去掉
              if(!str) return '';
              var strs = str.split('/');
              return strs.pop();
            },
            facilityCreat(form){                                                //将设施转换成需要的形式
                var Facility = {
                    "airConditioning": 0,
                    "bathTowel": 0,
                    "bathroom": 0,
                    "hairDrier": 0,
                    "hotWater": 0,
                    "hotelId": 0,
                    "kettle": 0,
                    "refrigerator": 0,
                    "soap": 0,
                    "television": 0,
                    "toiletPaper": 0,
                    "toiletries": 0,
                    "toothCleaners": 0,
                    "towel": 0,
                    "washing": 0,
                    "washingPowder": 0,
                    "wifi": 0
                };

                for(var pard in form){
                    var list = form[pard];
                    console.log(list);
                    for(var i = 0;i<list.length;i++){
                         var china = list[i],english = this.facilitys[china];
                        for(var item in Facility){
                            if (item == english){
                                Facility[item] = 1;
                            }
                        }
                    }
                }

                return Facility;

            },
            TrueChangeOne(form){                                                   //转换成0或者1
                for(var item in form){
                    if(form[item] == true){
                        form[item] = 1;
                    }else if(form[item] == false){
                        form[item] = 0;
                    }
                }
            },
            toStr(obj){                                                             //转换成字符串
                for(var part in obj){
                    obj[part] = obj[part].toString();
                };
            },
            submitForm(){ //最终提交
                if (this.$refs['IdentityForm'] != undefined){
                    this.$refs['IdentityForm'].validate((valid) => {
                        if (valid) {
                            this.$message({
                                message: '提交房源成功',
                                type: 'success'
                            });
                            this.organData();
                        } else {

                            return false;
                        }
                    });
                } else {
                    this.organData();
                }



                var obj2 = {   //对比用的对象，没作用的
                    "address": "string",//
                    "addressSupplement": "string",//
                    "area": "string",//
                    "balcony": "string",//
                    "bathroom": "string",//
                    "bed": "string",//
                    "bedrooms": "string",//
                    "city": "string",//
                    "deposit": "string",//
                    "drawingRoom": "string",//
                    "feature": "string",//
                    "hotelImage1": "string",//
                    "hotelImage2": "string",//
                    "hotelImage3": "string",//
                    "hotelImage4": "string",//
                    "housingQuantity": "string",//
                    "id": 0,
                    "idNumber": "string",//
                    "idcardImage1": "string",
                    "idcardImage2": "string",
                    "idcardImage3": "string",
                    "introduce": "string",//
                    "isCheck": "string",
                    "kitchen": "string",//
                    "landscape": "string",//
                    "name": "string",//
                    "nickName": "string",
                    "price": "string",//
                    "provincial": "string",//
                    "realName": "string",
                    "rentWay": "string",//
                    "street": "string",//
                    "study": "string",//
                    "suitablePopulation": "string",//
                    "traffic": "string",//
                    "type": "string",//
                    "userId": 0,
                    "facilityService": { //基础设施
                        "airConditioning": 0,
                        "bathTowel": 0,
                        "bathroom": 0,
                        "hairDrier": 0,
                        "hotWater": 0,
                        "hotelId": 0,
                        "id": 0,
                        "kettle": 0,
                        "refrigerator": 0,
                        "soap": 0,
                        "television": 0,
                        "toiletPaper": 0,
                        "toiletries": 0,
                        "toothCleaners": 0,
                        "towel": 0,
                        "washing": 0,
                        "washingPowder": 0,
                        "wifi": 0
                    },
                    "hotelRule": { //房屋规则
                        "acceptChild": 0,
                        "acceptForeign": 0,
                        "acceptOld": 0,
                        "acceptSex": 0,
                        "cleaning": "string",
                        "hotelId": 0,
                        "id": 0,
                        "inTime": "string",
                        "isProscenium": 0,
                        "outTime": "string",
                        "receiveTime": "string",
                        "sheets": "string"
                    },
                }
            },
            organData(){
                var obj = {};
                this.ReorganPosition(obj);
                this.ReorganDetail(obj);
                this.ReorganDescription(obj);
                this.ReorganHousePhoto(obj);
                this.ReorganPrice(obj);
                this.ReorganIdentity(obj);
                obj["facilityService"] = this.ReorganFacilityForm();                //设施服务单独设置
                obj["hotelRule"] = this.ReorganRule();                              //酒店规则单独设置
                console.log(obj);
                this.$api.post(this.$myconfig.hotelSave,obj,r=>{
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    this.cleanStorg();
                    this.$router.push({name:'manageSystem'});
                },err=>{
                    console.log(err);
                });
            },
            cleanStorg(){
                localStorage.removeItem("FacilityForm");
                localStorage.removeItem("DescriptionForm");
                localStorage.removeItem("PhotoForm");
                localStorage.removeItem("FormCompleteId");
                localStorage.removeItem("DetailForm");
                localStorage.removeItem("RuleForm");
                localStorage.removeItem("PriceForm");
                localStorage.removeItem("PositionForm");
                localStorage.removeItem("palceName");
                localStorage.removeItem("currentId");
                localStorage.removeItem("writingId");
            }
        },

        created(){
            if (localStorage.getItem("IdentityForm") != null){
                var IdentityForm = JSON.parse(localStorage.getItem("IdentityForm"));
                this.IdentityForm = IdentityForm;
            }
        },
        mounted(){
            var self = this;
            self.ThisForm = {
                obj:self.$refs,
                formName:'IdentityForm',
                locationObj:self.IdentityForm
            };
        }
    }
</script>

<style scoped>
    .authentication{
        float: right;
        position: relative;
        width: 1050px;
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(63,63,68,.05), 0 1px 3px 0 rgba(63,63,68,.15);
        padding-bottom: 20px;
    }

    .title-con {
        width: 990px;
        height: 60px;
        border-bottom: 2px solid #eee;
        margin: 0 auto;
    }
    .title-con h1{

        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-size: 18px;
        color: #333;
        line-height: 60px;
    }
    .title-con span{
        margin-left: 20px;
        font-size: 12px;
        color: #999;
        line-height: 65px;
    }
    .Identity-form{
        margin-left: 30px;
        margin-top: 30px;
        width: 400px;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 260px;
        height: 170px;
        display: block;
        border: 1px dashed #c0ccda;
        text-align: center;
        position: relative;



    }
    .identity-three{
        display: flex;
        width: 800px;
        justify-content: space-around;
    }
    .avatar-tip{
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translate(-50%);
    }
    .next-type{
        border-top: 1px solid #ddd;
        margin: 0 auto;
        width: 990px;
        margin-top: 30px;
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