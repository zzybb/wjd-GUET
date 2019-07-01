<template>
    <div class="Transparent">
        <div class="input-form" v-loading="isLoading">
            <div class="form-left">
                <ul>
                    <li v-for="(item,index) in optionLists" v-on:click="shiftItem(index + 1,item.englishName)" :class="[currentId == index + 1 ? 'active':'']">{{item.chinaName}}</li>
                </ul>
            </div>
            <div class="item-content position" v-if="currentId == 1">
                <div class="padding address">
                    <el-form :model="PositionForm" :rules="rules" ref="PositionForm">
                        <el-form-item label="地区城市" prop="city">
                            <el-Cascader :options="options"
                                         v-model="PositionForm.city"
                                         :props="defaultOptions"
                            >
                            </el-Cascader>
                        </el-form-item>
                        <el-form-item label="地址" prop="address">
                            <el-input v-model="PositionForm.address"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <!--<div class="next-type">
                    <el-button type="primary"  class="next-type-btn ivu-btn"
                               @click="submitForm">保存</el-button>
                </div>-->
            </div >
            <div class="item-content detail" v-if="currentId == 2" >
                <div class="detail">
                    <el-form :model="DetailForm" ref="DetailForm" :rules="rules">
                        <el-form-item label="出租类型" prop="TypeOfRental">
                            <el-radio-group v-model="DetailForm.TypeOfRental">
                                <el-radio label="整套房屋"></el-radio>
                                <el-radio label="独立房间"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="房屋类型" prop="TypeOfHouse">
                            <el-radio-group v-model="DetailForm.TypeOfHouse">
                                <el-radio label="公寓"></el-radio>
                                <el-radio label="客栈"></el-radio>
                                <el-radio label="别墅"></el-radio>
                                <el-radio label="其他/特色"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="">
                            <el-form-item label="房屋面积" prop="size">
                                <el-input v-model="DetailForm.size"></el-input>
                            </el-form-item>
                        </div>


                        <el-form-item label="房屋景观" prop="landscape">
                            <el-select v-model="DetailForm.landscape" placeholder="请选择活动区域">
                                <el-option label="海景" value="海景"></el-option>
                                <el-option label="湖景" value="湖景"></el-option>
                                <el-option label="江景" value="江景"></el-option>
                                <el-option label="山景" value="山景"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="房屋户型" >
                            <div class="House-type">
                                <p>卧室 &nbsp;
                                    <el-input-number v-model="DetailForm.HouseDetailNum.bedroom" controls-position="right" :min="0" :max="10" size="mini"></el-input-number>
                                </p>
                                <p>卫生间&nbsp<el-input-number v-model="DetailForm.HouseDetailNum.bathroom" controls-position="right" :min="0" :max="10" size="mini"></el-input-number></p>
                                <p>客厅&nbsp<el-input-number v-model="DetailForm.HouseDetailNum.livingRoom" controls-position="right" :min="0" :max="10" size="mini"></el-input-number></p>
                                <p>厨房&nbsp<el-input-number v-model="DetailForm.HouseDetailNum.kitchen" controls-position="right" :min="0" :max="10" size="mini"></el-input-number></p>
                                <p>书房&nbsp<el-input-number v-model="DetailForm.HouseDetailNum.BookRoom" controls-position="right" :min="0" :max="10" size="mini"></el-input-number></p>
                                <p>阳台&nbsp<el-input-number v-model="DetailForm.HouseDetailNum.balcony" controls-position="right" :min="0" :max="10" size="mini"></el-input-number></p>
                            </div>
                        </el-form-item>

                        <el-form-item label="床的数量" >
                            <el-select v-model="DetailForm.bedNum"  size="mini"  placeholder="请选择床的数量">
                                <el-option label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                                <el-option label="4" value="4"></el-option>
                                <el-option label="5" value="5"></el-option>
                                <el-option label="6" value="6"></el-option>
                                <el-option label="7" value="7"></el-option>
                                <el-option label="8" value="8"></el-option>
                                <el-option label="9" value="9"></el-option>
                                <el-option label="10" value="10"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="宜住人数" prop="fitNum">
                            <el-input-number v-model="DetailForm.fitNum" controls-position="right"  :min="1" :max="4" size="mini"></el-input-number>
                        </el-form-item>
                        <el-form-item label="同类房数量" prop="HouseNum">


                            <div class="info-HouseNum">
                                <el-input v-model="DetailForm.HouseNum" placeholder="请输入同类房间数量"></el-input>
                                &nbsp;&nbsp;<span>套</span>
                            </div>
                        </el-form-item>

                    </el-form>
                </div>


            </div>
            <div class="item-content description" v-if="currentId == 3" >
                <div class="Detail-description-form" >
                    <el-form  status-icon  :model="DescriptionForm" ref="DescriptionForm" :rules="rules">
                        <el-form-item label="房屋名称" prop="HouseName">
                            <el-input    v-model="DescriptionForm.HouseName"></el-input>
                        </el-form-item>
                        <el-form-item label="房屋特色" prop="HouseFeature">
                            <el-input type="textarea" maxlength="1000" show-word-limit v-model="DescriptionForm.HouseFeature" rows="6"></el-input>
                        </el-form-item>
                        <el-form-item label="交通位置(选填)">
                            <el-input type="textarea" maxlength="500" show-word-limit v-model="DescriptionForm.trafficLocation" rows="6"></el-input>
                        </el-form-item>
                        <el-form-item label="周边介绍(选填)">
                            <el-input type="textarea" maxlength="500" show-word-limit v-model="DescriptionForm.SurIntro" rows="6"></el-input>
                        </el-form-item>
                    </el-form>

                </div>
            </div>
            <div class="item-content facilityService" v-if="currentId == 4">
                <div class="facility-service-form">
                    <el-form  status-icon label-width="80px" :model="FacilityForm">
                        <div class="facility-item-form" v-for="facility in facilitys">
                            <el-form-item :label="facility.Fcname" >
                                <el-checkbox-group v-model="FacilityForm[facility.list]">
                                    <div class="info-facility" v-for="item in facility.children">
                                        <el-checkbox :label="item">{{item}}</el-checkbox>
                                    </div>

                                </el-checkbox-group>
                            </el-form-item >
                        </div>
                    </el-form>

                </div>
            </div >
            <div class="item-content RuleOfHouse" v-if="currentId == 5" >
                <div class="Detail-form">
                    <el-form  :model="RuleForm" ref="RuleForm" :rules="rules">
                        <div class="Guest-In-time">
                            <el-form-item label="房客入住时间" prop="GuestInTime">
                                <el-select  placeholder="请选择房客可以入住的时间" v-model="RuleForm.GuestInTime" >
                                    <el-option :label="time" :value="time" v-for="(time,index) in TimeLine" :key="index"></el-option>
                                </el-select>

                            </el-form-item>
                            <el-form-item label="房客退房时间" prop="GuestOutTime">
                                <el-select  placeholder="请选择房客可以退房的时间" v-model="RuleForm.GuestOutTime">
                                    <el-option :label="time" :value="time" v-for="(time,index) in TimeLine" :key="index"></el-option>

                                </el-select>

                            </el-form-item>
                        </div>

                        <el-form-item label="接待房客时间" prop="GetGuestTime1">
                            <el-select  placeholder="请选择接待时间" v-model="RuleForm.GetGuestTime1">
                                <el-option :label="time" :value="time" v-for="(time,index) in TimeLine" :key="index"></el-option>
                            </el-select>
                        </el-form-item>


                        <el-form-item label="是否有前台" prop="IsFrend">
                            <el-radio-group v-model="RuleForm.IsFrend">
                                <el-radio  label="1">是</el-radio>
                                <el-radio  label="0">否</el-radio>
                            </el-radio-group>

                        </el-form-item>
                        <el-form-item label="接待性别" prop="gender">

                            <el-radio-group v-model="RuleForm.gender">
                                <el-radio  label="不限">不限</el-radio>
                                <el-radio  label="男">男</el-radio>
                                <el-radio  label="女">女</el-radio>
                            </el-radio-group>

                        </el-form-item>
                        <el-form-item label="接待特殊年龄段" >
                            <el-checkbox   v-model="RuleForm.acceptChild">儿童(0-12岁)</el-checkbox>
                            <el-checkbox   v-model="RuleForm.acceptOld">老人(65岁以上)</el-checkbox>
                        </el-form-item>
                        <el-form-item label="是否接待外宾" prop="ForeignGuests">
                            <el-radio-group v-model="RuleForm.ForeignGuests">
                                <el-radio  label="1">是</el-radio>
                                <el-radio  label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="打扫换洗方式">
                            <div class="Guest-In-time">
                                <el-form-item prop="HowManySweep">
                                    <el-select  placeholder="多久提供打扫卫生" v-model="RuleForm.HowManySweep">
                                        <el-option :label="item" :value="item" v-for="(item,index) in HowLongSweep" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item prop="HowManyReplace">
                                    <el-select  placeholder="多久提供被单更换" v-model="RuleForm.HowManyReplace">
                                        <el-option :label="item" :value="item" v-for="(item,index) in HowLongReplace" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-form>

                </div>
            </div>
            <div class="item-content PriceSetting" v-if="currentId == 6" >
                <div class="Price-form">
                    <el-form  status-icon label-width="80px"  :model="PriceForm" ref="PriceForm" :rules="rules">
                        <div class="price-container">
                            <el-form-item label="售卖价格" prop="price">
                                <div class="input-price">
                                    <el-input v-model="PriceForm.price"></el-input>
                                    &nbsp;&nbsp;
                                    <span>元</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="支付押金" prop="deposit">
                                <div class="input-price">
                                    <el-input v-model="PriceForm.deposit"></el-input>
                                    &nbsp;&nbsp;
                                    <span>元</span>
                                </div>
                            </el-form-item>
                        </div>

                    </el-form>


                </div>

            </div>
            <div class="item-content HousePhoto" v-if="currentId == 7">
                <el-form  status-icon  :model="PhotoForm" >
                    <div class="item-title">
                        <div class="item-title-left">
                            <p>卧室</p>
                            <p class="photo-least">上传1张,展现完整床铺</p>
                        </div>
                    </div>
                    <div class="upload-container">
                        <el-upload
                                :action="UploadURL"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                name="picture"
                                :file-list="PhotoForm.bedRoomPhoto"
                                :limit="1"
                                :on-success="handleBedSuccess"
                                :on-remove="removeBedSuccess"
                                :before-upload="beforeAvatarUpload"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <div class="item-title">
                        <div class="item-title-left">
                            <p>卫生间</p>
                            <p class="photo-least">上传1张，卫浴设施完整，地面整洁</p>
                        </div>
                    </div>
                    <div class="upload-container">
                        <el-upload
                                :action="UploadURL"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :file-list="PhotoForm.bathRoomPhoto"
                                name="picture"
                                :limit="1"
                                :on-success="handleBathSuccess"
                                :on-remove="removeBathSuccess"
                                :before-upload="beforeAvatarUpload"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <div class="item-title">
                        <div class="item-title-left">
                            <p>其他</p>
                            <p class="photo-least">上传2张，任意上传</p>
                        </div>
                    </div>
                    <div class="upload-container">
                        <el-upload
                                :action="UploadURL"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :file-list="PhotoForm.OtherPhoto"
                                name="picture"
                                :limit="2"
                                :on-success="handleOtherSuccess"
                                :on-remove="removeOtherSuccess"
                                :before-upload="beforeAvatarUpload"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </el-form>

            </div>
            <div class="item-content HouseDate" v-if="currentId == 8" >
                <div class="set-house-price">
                    <el-date-picker
                            v-model="selectDate.startDate"
                            type="date"
                            placeholder="选择出售开始时间"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                    &nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;
                    <el-date-picker
                            v-model="selectDate.endDate"
                            type="date"
                            placeholder="选择出售结束时间"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </div>

            </div>
            <div class="next-type">
                <el-button type="primary"  class="next-type-btn ivu-btn"
                           @click="submitForm">保存</el-button>
            </div>
        </div>
        <div class="closePage" @click="closeUpdate">
            <font-awesome-icon icon="times" size="2x"></font-awesome-icon>
        </div>

    </div>
</template>

<script>
    import areajson from '../../utils/citys.json';
    import facilityjson from '../../utils/facility.json';
    import facility2json from '../../utils/facility2.json';
    export default {
        name: "UpdateHotel",
        data(){
            return {
                options:areajson,
                isLoading:false,
                currentId:1,
                userId:0,
                hotelId:0,
                requiredURL:this.$myconfig.ImageURL,
                currRefName:'PositionForm',
                dialogVisible:false,
                dialogImageUrl:'',
                defaultOptions:{
                    value:'label'
                },
                optionLists:[
                    {
                        chinaName:'房屋位置',
                        englishName:'PositionForm'
                    },
                    {
                        chinaName:'房屋详情',
                        englishName:'DetailForm'
                    },
                    {
                        chinaName:'房屋描述',
                        englishName:'DescriptionForm'
                    },
                    {
                        chinaName:'设施服务',
                        englishName:'FacilityForm'
                    },
                    {
                        chinaName:'入住规则',
                        englishName:'RuleForm'
                    },
                    {
                        chinaName:'价格设置',
                        englishName:'PriceForm'
                    },
                    {
                        chinaName:'房屋照片',
                        englishName:'PhotoForm'
                    },
                    {
                        chinaName:'出售时间',
                        englishName:''
                    }
                ],
                PositionForm:{
                    city:[],
                    address:'',
                    addressSupplement:''
                },
                DetailForm:{           //表单数据存放
                    TypeOfRental:'',   //出租类型
                    TypeOfHouse:'',    //房屋类型
                    size:'',           //房屋面积
                    landscape:'',      //房屋风景
                    HouseDetailNum:{   //详细户型
                        bedroom:'',
                        bathroom:'',
                        livingRoom:'',
                        kitchen:'',
                        BookRoom:'',
                        balcony:''
                    },
                    bedNum:'',
                    fitNum:'',         //宜居人数
                    HouseNum:''        //房屋数量
                },
                DescriptionForm:{
                    HouseName:'',
                    HouseFeature:'',
                    trafficLocation:'',
                    SurIntro:''
                },
                facilitys:facilityjson,
                facilitys2:facility2json,
                FacilityForm: {
                    houseList:[],
                    bathroom:[]
                },
                RuleForm:{
                    GuestInTime:'',
                    GuestOutTime:'',
                    GetGuestTime1:'',
                    IsFrend:false,
                    gender:'',
                    acceptChild:false,
                    acceptOld:false,
                    ForeignGuests:'',
                    HowManySweep:'',
                    HowManyReplace:''
                },
                PriceForm:{
                    price:'',
                    deposit:''
                },
                PhotoForm:{
                    bedRoomPhoto:[],
                    bathRoomPhoto:[],
                    OtherPhoto:[],
                },
                selectDate:{
                    startDate:'',
                    endDate:''
                },
                rules:{
                    city:[
                        {required:true,message:'请输入地区城市',trigger:'change'}
                    ],
                    address:[
                        {required:true,message:'请输入地址',trigger:'blur'}
                    ],
                    TypeOfRental:[
                        {required:true,message:'请选择房屋类型',trigger:'change'}
                    ],
                    TypeOfHouse:[
                        {required:true,message:'请选择房屋类型',trigger:'change'}
                    ],
                    size:[
                        {required:true,message:'请输入房屋面积',trigger:'blur'}
                    ],
                    landscape:[
                        {required:true,message:'请选择房屋景观',trigger:'change'}
                    ],
                    fitNum:[
                        {required:true,message:'请输入宜居人数',trigger:'blur'}
                    ],
                    HouseNum:[
                        {required:true,message:'请输入同类房数量',trigger:'blur'}
                    ],
                    GuestInTime:[
                        {required:true,message:'请选择房客入住时间',trigger:'change'}
                    ],
                    GuestOutTime:[
                        {required:true,message:'请选择房客退房时间',trigger:'change'}
                    ],
                    IsFrend:[
                        {required:true,message:'请选择是否有前台',trigger:'change'}
                    ],
                    gender:[
                        {required:true,message:'请选择接待性别',trigger:'change'}
                    ],
                    HowManySweep:[
                        {required:true,message:'请选择打扫方式',trigger:'change'}
                    ],
                    HowManyReplace:[
                        {required:true,message:'请选择换洗方式',trigger:'change'}
                    ],
                    requireList:[
                        {required:true,message:'请输入房客要求',trigger:'change'}
                    ],
                    GetGuestTime1:[
                        {required:true,message:'请选择接待房客时间',trigger:'change'}
                    ],
                    GetGuestTime2:[
                        {required:true,message:'请选择接待房客时间',trigger:'change'}
                    ],
                    ForeignGuests:[
                        {required:true,message:'请选择接待房客时间',trigger:'change'}
                    ],
                    price:[
                        {required:true,message:'请输入价格',trigger:'blur'}
                    ],
                    deposit:[
                        {required:true,message:'请输入押金',trigger:'blur'}
                    ]

                },

            }
        },
        created(){
            this.requiredHouse();

        },
        computed:{
            TimeLine:function(){
                var hour,time=[];
                for(var i = 0;i<=24;i++){
                    hour = i<10?"0"+i:i;
                    time.push(hour+":00");
                }
                return time;
            },
            HowLongSweep:function(){
                var sweep=[];
                for(var i = 1;i<=7;i++){

                    sweep.push(i+"天1扫");
                }
                return sweep;
            },
            HowLongReplace:function(){
                var replace=[];
                for(var i = 1;i<=7;i++){

                    replace.push(i+"天1换");
                }
                return replace;
            },
            UploadURL(){
                return this.$myconfig.ServerPath + this.$myconfig.photoUpLoad
            }
        },
        methods:{
            requiredHouse(){
                this.isLoading = true;
                var hotelInfo = JSON.parse(localStorage.getItem("detailHotelInfo"));
                this.slotData(hotelInfo);
                this.isLoading = false;
            },
            slotData(hotel){
                this.slotPSForm(hotel);
                this.slotDTForm(hotel);
                this.slotDPForm(hotel);
                this.slotFCForm(hotel);
                this.slotRuleForm(hotel);
                this.slotPriceForm(hotel);
                this.slotHousePhoto(hotel);
                this.slotDate(hotel);
                this.userId = hotel.userId;
                this.hotelId = hotel.id;
            },
            slotDate(hotel){
                this.selectDate = {
                    startDate:hotel.startDate,
                    endDate:hotel.endDate
                }
            },
            slotPSForm(hotel){

                this.PositionForm = {
                    city:[hotel.provincial,hotel.city,hotel.street],
                    address:hotel.address,
                    addressSupplement:hotel.addressSupplement == null ? '' : hotel.addressSupplement
                }

            },
            slotDTForm(hotel){
                this.DetailForm = {
                    TypeOfRental:hotel.rentWay,
                    TypeOfHouse:hotel.type,
                    size:hotel.area,
                    landscape:hotel.landscape,
                    HouseDetailNum:{
                        bedroom:hotel.bedrooms,
                        bathroom:hotel.bathroom,
                        livingRoom:hotel.drawingRoom,
                        kitchen:hotel.kitchen,
                        BookRoom:hotel.study,
                        balcony:hotel.balcony
                    },
                    bedNum:hotel.bed,
                    fitNum:hotel.suitablePopulation,
                    HouseNum:hotel.housingQuantity == null ? 0 : hotel.housingQuantity
                }
            },
            slotDPForm(hotel){
                this.DescriptionForm = {
                    HouseName:hotel.name,
                    HouseFeature:hotel.feature,
                    trafficLocation:hotel.traffic,
                    SurIntro:''
                }
            },
            slotFCForm(hotel){
                var houseList = this.getHouseList(hotel.facilityService),
                    bathroom = this.getBathroomList(hotel.facilityService);

                this.FacilityForm = {
                    houseList:houseList,
                    bathroom:bathroom
                }
            },
            slotRuleForm(hotel){
                var rule = hotel.hotelRule;
                this.RuleForm = {
                    GuestInTime:rule.inTime,
                    GuestOutTime:rule.outTime,
                    GetGuestTime1:rule.receiveTime,
                    ForeignGuests:rule.acceptForeign.toString(),
                    IsFrend:rule.isProscenium.toString(),
                    gender:rule.acceptSex,
                    acceptChild:rule.acceptChild == 1 ? true : false,
                    acceptOld:rule.acceptOld == 1 ? true : false,
                    HowManySweep:rule.cleaning,
                    HowManyReplace:rule.sheets
                }
            },
            slotPriceForm(hotel){
                this.PriceForm = {
                    price:hotel.price,
                    deposit:hotel.deposit == null ? 0 : hotel.deposit
                }
            },
            slotHousePhoto(hotel){
                this.PhotoForm = {
                    bedRoomPhoto:[{name:hotel.hotelImage1,url:this.requiredURL +  hotel.hotelImage1}],
                    bathRoomPhoto:[{name:hotel.hotelImage2,url:this.requiredURL + hotel.hotelImage2}],
                    OtherPhoto:[{name:hotel.hotelImage3,url:this.requiredURL + hotel.hotelImage3},{name:hotel.hotelImage4,url:this.requiredURL + hotel.hotelImage4}]
                }
            },
            getHouseList(facilityList){
                var houseList = [];
                for(var item in facilityList){
                    if (facilityList[item]){
                        for(var i = 0;i<this.facilitys[0]["engName"].length;i++){
                            if (item == this.facilitys[0]["engName"][i]){
                                houseList.push(this.facilitys[0]["children"][i])
                            }
                        }
                    }
                }

                return houseList;
            },
            getBathroomList(facilityList){
              var bathroom = [];
              for(var item in facilityList){

                  if (facilityList[item]){

                      for(var i = 0;i<this.facilitys[1]["engName"].length;i++){
                          if (item == this.facilitys[1]["engName"][i]){
                              bathroom.push(this.facilitys[1]["children"][i])
                          }
                      }
                  }
              }
              return bathroom
            },
            shiftItem(num,name){
                this.currentId = num;
                this.currRefName = name;
            },
            handlePictureCardPreview(file){

                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleBedSuccess(res,file,fileList){
                var url = this.requiredURL+res.msg;
                this.PhotoForm.bedRoomPhoto.push({name:file.name,url:url})

            },
            handleBathSuccess(res,file,fileList){

                var url = this.requiredURL+res.msg;
                this.PhotoForm.bathRoomPhoto.push({name:file.name,url:url})
            },
            handleOtherSuccess(res,file,fileList){

                var url = this.requiredURL+res.msg;

                this.PhotoForm.OtherPhoto.push({name:file.name,url:url})
            },
            removeBedSuccess(file,fileList){
                console.log(file,fileList)
                this.WhereRemoveFile(file.name,this.PhotoForm.bedRoomPhoto);

            },
            removeBathSuccess(file){
                //this.PhotoForm.bathRoomPhoto = fileList
                this.WhereRemoveFile(file.name,this.PhotoForm.bathRoomPhoto);

            },
            removeOtherSuccess(file){
                this.WhereRemoveFile(file.name,this.PhotoForm.OtherPhoto);

            },
            beforeAvatarUpload(file){
                const isSize = new Promise(function(resolve, reject) {
                    let width = 1440;
                    let height = 1080;
                    let _URL = window.URL || window.webkitURL;
                    let img = new Image();
                    img.onload = function() {
                        let valid = img.width >= width && img.height >= height;
                        valid ? resolve() : reject();
                    }
                    img.src = _URL.createObjectURL(file);
                }).then(() => {
                    return file;
                }, () => {

                    this.$message.error('上传的icon必须是等于或大于1440*1080!');
                    return Promise.reject();
                });
                return isSize;
            },
            WhereRemoveFile(name,List){
                for (var i = 0;i<List.length;i++){
                    if (List[i].name == name){
                        List.splice(i,1);
                    }
                }

            },
            ReorganPosition(obj){

                var Form = this.PositionForm;
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
                var Form = this.DetailForm;

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
                var Form = this.DescriptionForm;
                var Description = {
                    "name":Form.HouseName,                                 //房屋名称
                    "feature":Form.HouseFeature,                           //房屋特色
                    "traffic":Form.trafficLocation,                        //交通位置
                    "introduce":Form.SurIntro                              //周边介绍
                };
                Object.assign(obj,Description);
            },
            ReorganFacilityForm(){
                var Form = this.FacilityForm;
                var Facility = this.facilityCreat(Form);

                return Facility;

            },
            ReorganRule(){
                var Form = this.RuleForm;
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
                    "sheets":Form.HowManyReplace,

                };

                return RuleForm;
            },
            ReorganHousePhoto(obj){
                var Form = this.PhotoForm,j=1,image={
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
                var Form = this.PriceForm;
                var Price = {
                    "price":parseInt(Form.price),
                    "deposit":Form.deposit
                }

                Object.assign(obj,Price);
            },
            ReorganDate(obj){
                var Form = this.selectDate;
                var Date = {
                    "startDate":Form.startDate,
                    "endDate":Form.endDate
                }

                Object.assign(obj,Date);
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
                    "wifi": 0,

                };

                for(var pard in form){
                    var list = form[pard];
                    console.log(list);
                    for(var i = 0;i<list.length;i++){
                        var china = list[i],english = this.facilitys2[china];
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
                }
            },
            submitForm(){
                console.log(this.$refs[this.currRefName])
                if (this.$refs[this.currRefName] != undefined){
                    this.$refs[this.currRefName].validate((valid) => {
                        if (valid) {
                            this.SaveForm();
                        } else {
                            console.log('表单有未填写项');
                            return false;
                        }
                    });
                } else {
                    this.SaveForm();
                }
            },
            SaveForm(){
                var obj = {};
                this.ReorganPosition(obj);
                this.ReorganDetail(obj);
                this.ReorganDescription(obj);
                this.ReorganHousePhoto(obj);
                this.ReorganPrice(obj);
                this.ReorganDate(obj);
                obj["id"] = parseInt(this.hotelId);
                obj["facilityService"] = this.ReorganFacilityForm();                //设施服务单独设置
                obj["hotelRule"] = this.ReorganRule();                              //酒店规则单独设置x
                console.log(obj);
                this.$api.post(this.$myconfig.UpdateHouse,obj,r=>{
                    if (r.data.msg == 'success'){
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error('保存失败。' + r.data.msg);
                    }
                },err=>{
                    this.$message.error('保存失败');
                    console.log(err);
                });
            },
            closeUpdate(){
                this.$router.push({name:'manageSystem'})
            }
        }
    }
</script>

<style scoped>
    .Transparent{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0,0,0,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index:100;

    }
    .input-form{
        width: 1300px;
        height: 900px;
        background-color: white;
        box-shadow: 0 0 0 1px rgba(63,63,68,.05), 0 1px 3px 0 rgba(63,63,68,.15);
    }
    .form-left{
        width: 220px;
        height: 100%;
        float: left;
    }
    .form-left ul{
        color: #333;
        height: 100%;
        border-right: 2px solid #6e80e3;


    }
    .form-left ul li {
        display: block;

        height: 40px;
        line-height: 40px;
        color: #000;
        cursor: pointer;
        text-align: center;

    }
    .item-content{
        height: 90%;
        width: 1050px;
        float: right;
        margin-top: 20px;

    }
    .address{
        margin-left: 30px;
        margin-top: 20px;
        width: 290px;
    }

    .next-type{
        margin: 0 auto;
        height: 10%;
        text-align: right;
        padding-right: 100px;
        margin-top: 20px;

    }

    .next-type-btn{



        width: 100px;
        height: 40px;
        font-size: 16px;

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
    .House-type{
        display: flex;
        width: 1000px;
        justify-content: space-around;

    }
    .info-HouseNum{
        display: flex;
        align-items: center;
        width: 400px;
    }
    .Detail-description-form{
        width: 500px;
        margin-top: 30px;
    }
    .facility-service-form{
        margin-left: 30px;
        margin-top: 30px;
        width: 900px;
    }
    .facility-item-form{
        border-bottom: 1px solid #eee;
    }
    .info-facility{
        width: 150px;
        height: 30px;
        float: left;
        margin: 20px 10px 10px 0;
        border: 1px solid #eee;
        background: #f8f8f8;
        line-height: 27px;
        padding-left: 10px;
    }
    .Detail-form{
        margin-left: 30px;
        margin-top: 30px;
        width: 700px;
    }
    .Guest-In-time{

        display: flex;
        width: 440px;
        justify-content: space-around;
    }
    .Price-form{
        margin-left: 30px;
        margin-top: 30px;
        width: 800px;
    }

    .input-price{
        width: 100px;
        display: flex;
        align-items: center;
    }
    .price-container{
        border-bottom: 1px solid #ddd;
        margin: 0 auto;
        width: 990px;
    }
    .closePage{
        width: 25px;
        height: 25px;
        position: relative;
        left: -25px;
        top: -436px;
        cursor: pointer;
    }

    .active{
        background-color: #6e80e3;
        color: white !important;
    }
    .item-title{
        background: #f5f5f5;
        height: 56px;
        padding: 10px 20px;
        display: flex;
        align-items: center;

    }
    .item-title p{
        font-weight: 600;
        font-size: 16px;
        color: #333;
        line-height: 16px;
    }
    .item-title .photo-least{
        font-size: 12px;
        color: #666;
        line-height: 12px;
        margin-top: 10px;
    }
    .upload-container{
        margin-bottom: 20px;
        margin-top: 20px;
        margin-left: 20px;

    }
    .set-house-price{
        margin-top: 30px;
        margin-left: 30px;
        


    }




</style>