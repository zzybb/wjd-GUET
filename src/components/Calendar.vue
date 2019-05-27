
<template>
    <div class="calendar">
        <div class="calendar-input" v-on:click="showCalendar">
            <i class="calendar-image"></i>

            <span class="select-time">{{SelectDate.BeganTime}}</span>

            <span class="select-time">至</span>
            <span class="select-time">{{SelectDate.EndTime}}</span>

        </div>
        <div class="calendar-body" v-if="isShow">
            <div class="calendar-body-prev">
                <div class="calendar-body-header">
                    <button class="btn-prev" v-on:click="clickPre" v-if="currPage || cycle != 0">
                        <span>< </span>
                    </button>
                    <div>{{currYear}}年{{currMonth}}月</div>
                </div>
                <div class="calendar-body-month">
                    <div class="calendar-body-month-week">
                        <span>日</span>
                        <span>一</span>
                        <span>二</span>
                        <span>三</span>
                        <span>四</span>
                        <span>五</span>
                        <span>六</span>
                    </div>
                    <div class="calendar-month-panel">
                        <div class="calendar_day calendar-no-day-white" v-for="item in currBlankNum"  >

                        </div>
                        <div class="calendar_day" v-for="(item,index) in this.currentMonthDays" :class="[isGray(index + 1),isOrange('current',index + 1)]"  v-on:click="haveDate('current',index + 1)">
                            <span>{{item}}</span>
                            <p v-if="isBegan('current',index + 1)">入住</p>
                            <p v-if="isLeft('current',index + 1)">离店</p>

                        </div>
                    </div>
                </div>
            </div>
            <div class="calendar-body-next">
                <div class="calendar-body-header">
                    <div>{{nextYear}}年{{nextMonth}}月</div>
                    <button class="btn-next" v-on:click="clickNext">
                        <span> > </span>
                    </button>
                </div>
                <div class="calendar-body-month">
                    <div class="calendar-body-month-week">
                        <span>日</span>
                        <span>一</span>
                        <span>二</span>
                        <span>三</span>
                        <span>四</span>
                        <span>五</span>
                        <span>六</span>
                    </div>
                    <div class="calendar-month-panel">
                        <div class="calendar_day calendar-no-day-white" v-for="item in nextBlankNum" >

                        </div>
                        <div class="calendar_day" v-for="(item,index) in this.nextMonthDays" v-on:click="haveDate('next',index + 1)" :class="isOrange('next',index + 1)">
                            <span>{{item}}</span>
                            <p v-if="isBegan('next',index + 1)">入住</p>
                            <p v-if="isLeft('next',index + 1)">离店</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getDate} from "../utils/DateProcess.js"
    import Holiday from '../utils/Holiday.json';
    export default {
        name: "Calendar",
        data(){
            return{
                today:'',
                currDay:0,
                currBlankNum:0,
                nextBlankNum:0,
                currMonth:0,
                nextMonth:0,
                currYear:0,
                nextYear:0,
                currentMonthDays:0,
                nextMonthDays:0,
                currPage:0,
                cycle:0,
                lastPage:[],
                isShow:false,
                SelectDate:{
                    BeganTime:'',
                    EndTime:'',
                    currAttr:'start',
                    nightNum:0
                }
            }
        },
        created(){
            this.init();
        },

        methods:{
            init(){
                if (localStorage.getItem("SelectDate")){
                    this.SelectDate = JSON.parse(localStorage.getItem("SelectDate"));
                }

                var Time;
                if (!this.cycle){
                    Time = getDate('yyyy-mm-dd',new Date());
                    this.today = Time;

                }else{
                    Time = this.currYear + '-1';
                }

                var currDate = this.getSumDate('current',Time);
                var nextDate = this.getSumDate('next',Time);


                this.currYear = this.getYear(currDate);
                this.nextYear = this.getYear(nextDate);
                this.currMonth = this.getMonth(currDate);
                this.nextMonth = this.getMonth(nextDate);
                this.currentMonthDays = this.getTotalDays(currDate);
                this.nextMonthDays = this.getTotalDays(nextDate);
                this.currBlankNum = this.getFirstDay(currDate);
                this.nextBlankNum = this.getFirstDay(nextDate);
            },
            getTotalDays(time){
                time = new Date(time);
                var curMonth = time.getMonth() + 1,days = [],i=1,day = 0;
                time.setMonth(curMonth);
                /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
                time.setDate(0);
                /* 返回当月的天数 */
                day = time.getDate();

                for(;i<=day;i++){
                    days.push(i);
                }


                this.HolidayProcessing(curMonth,days);
                return days;
            },
            getFirstDay(time){
                time = new Date(time);
                time.setDate(1);
                return time.getDay();
            },
            getSumDate(type,time){
                var re = /-/g,
                    list = time.split(re);

                var month = parseInt(list[1]);
                if (type == 'next') {
                    var m1 = month + 1+this.currPage;
                    month = this.getZf(m1);
                    return list[0] + '-' + month;
                }else{
                    var m2 = month + this.currPage;
                    month = this.getZf(m2);
                    return list[0] + '-' + month;
                }
            },
            getMonth(time){
                var re = /-/g,
                    list = time.split(re);
                return parseInt(list[1]);
            },
            getYear(time){
                var re = /-/g,
                    list = time.split(re);
                return parseInt(list[0]);
            },
            getDays(time){
                var re = /-/g,
                    list = time.split(re);
                return parseInt(list[2]);
            },
            clickNext(){
                if (this.nextMonth >= 12) {
                    this.lastPage.push(this.currPage);
                    this.currYear ++;
                    this.nextYear ++;
                    this.currMonth = 1;
                    this.nextMonth = 1;
                    this.currPage = -1;

                    this.cycle++;
                }

                this.currPage++;
                this.init();
            },
            clickPre(){
                if (this.currMonth == 1){
                    this.currYear--;
                    this.nextYear--;
                    this.currMonth = 1;
                    this.nextMonth = 1;
                    this.currPage = this.lastPage.pop() + 1;
                    this.cycle --;
                }

                this.currPage--;
                this.init();
            },
            showCalendar(){
                this.isShow = !this.isShow;
            },
            HolidayProcessing(month,list){

                for(var i = 0;i<list.length;i++){
                    var date = this.currYear + '-' + this.getZf(month) + '-' + this.getZf(list[i]);
                    for( var item in Holiday){
                        if (item == date){
                            list[i] = Holiday[item];
                        }
                    }
                    if(date == this.today){
                        this.currDay = list[i];
                        list[i] = "今天";

                    }
                }
            },
            getZf(num){
                if(parseInt(num) < 10){
                    num = '0'+num;
                }
                return num;
            },
            isGray(num){
                var year = this.getYear(this.today),
                    month = this.getMonth(this.today),
                    gray = false,
                    day = this.getDays(this.today)

                if (this.currYear == year && this.currMonth == month){

                    if(num < day){
                        gray = true
                    }
                }


                return{
                    'calendar-no-day-gray':gray,
                }
            },
            isOrange(type,num){
                var date = this.AssembDate(type,num),deepOrange = false,orange = false;
                if (date == this.SelectDate.BeganTime || date == this.SelectDate.EndTime){
                    deepOrange = true;
                }

                if (this.CompareDate(date,this.SelectDate.BeganTime) == 1 && this.CompareDate(date,this.SelectDate.EndTime) == -1){
                    orange = true;
                }

                return {
                    'calendar-body-active':deepOrange,
                    'calendar-body-middle':orange
                }


            },
            haveDate(type,item){
                if (this.SelectDate.currAttr=="complete"){
                    this.SelectDate = {
                        BeganTime:'',
                        EndTime:'',
                        currAttr:'start',
                        nightNum:0
                    }
                }


                if (type == "current"){
                    var date = this.AssembDate(type,item);
                    if (this.SelectDate.currAttr == "start"){

                        this.SelectDate.BeganTime = date;
                        this.SelectDate.currAttr = "end";
                    }else{
                        if (this.CompareDate(this.SelectDate.BeganTime,date) == 1){
                            this.SelectDate = {
                                BeganTime:'',
                                EndTime:'',
                                currAttr:'start'
                            }
                        }else{
                            this.SelectDate.EndTime = date;
                            this.SelectDate.currAttr = "complete";
                            this.$emit("getDate",this.SelectDate);
                        }
                    }
                }

                if (type == "next"){
                    var date = this.AssembDate(type,item);
                    if (this.SelectDate.currAttr == "start"){
                        this.SelectDate.BeganTime = date;
                        this.SelectDate.currAttr = "end";
                    }else{
                        if (this.CompareDate(this.SelectDate.BeganTime,date) == 1){
                            this.SelectDate = {
                                BeganTime:'',
                                EndTime:'',
                                currAttr:'start'
                            }
                        }else{
                            this.SelectDate.EndTime = date;
                            this.SelectDate.currAttr = "complete";
                            this.SelectDate.nightNum = this.datedifference(this.SelectDate.BeganTime,this.SelectDate.EndTime);
                            this.$emit("getDate",this.SelectDate);
                        }

                    }
                }
                var strObj = JSON.stringify(this.SelectDate);
                localStorage.setItem("SelectDate",strObj);
                if (this.SelectDate.currAttr == "complete") {
                    this.isShow = false;
                }

            },
            isBegan(type,num){
                var date = this.AssembDate(type,num);

                if (date == this.SelectDate.BeganTime){
                    return true;
                } else{
                    return false;
                }
            },
            isLeft(type,num){
                var date = this.AssembDate(type,num);

                if (date == this.SelectDate.EndTime){
                    return true;
                } else{
                    return false;
                }

            },
            AssembDate(type,num){      //对当前页和下一页选中的日期进行组装
                var year,month,day,date;
                if(type == 'current'){
                    year = this.currYear;
                    month = this.currMonth;
                    day = num;
                    date = year + '-' + month + '-' +num;
                }

                if (type == 'next') {
                    year = this.nextYear;
                    month = this.nextMonth;
                    day = num;
                    date = year + '-' + month + '-' +num;
                }

                return date;
            },
            datedifference(sDate1, sDate2){   //计算两个日期之间的天数
                var dateSpan,
                    iDays;
                sDate1 = Date.parse(sDate1);
                sDate2 = Date.parse(sDate2);
                dateSpan = sDate2 - sDate1;
                dateSpan = Math.abs(dateSpan);
                iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
                return iDays
            },
            CompareDate(date1,date2){
                var d1 = new Date(date1);
                var d2 = new Date(date2);
                if (d1.getTime() > d2.getTime()) {
                    return 1;
                } else if(d1.getTime() == d2.getTime()){
                    return 0
                }else if(d1.getTime() < d2.getTime()){
                    return -1;
                }
            }
        }
    }
</script>

<style scoped>
    .calendar{
        width: 360px;
        position: relative;

    }
    .calendar-input{
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #e9e9e9;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        display: flex;
        font-size: inherit;
        height: 44px;
        line-height: 44px;
        outline: none;
        padding: 0 38px 0 10px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
        align-items: center;
    }
    .calendar-image{
        background-image: url("../assets/hotel-list/unit-detail.png");
        background-position: -148px -126px;
        display: inline-block;
        width: 22px;
        height: 18px;
    }
    .select-time{
        margin-left: 20px;
        font-size: 15px;
    }
    .calendar-body{
        width: 748px;
        height: 392px;
        padding: 20px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 2px;
        -webkit-box-shadow: 0 0 5px rgba(0,0,0,.3);
        box-shadow: 0 0 5px rgba(0,0,0,.3);
        z-index: 10;
        position: absolute;
        top: 100%;
        right: 0;
    }
    .calendar-body-prev{
        width: 344px;
        height: 344px;
        float: left;
    }
    .calendar-body-next{
        width: 344px;
        height: 344px;
        float: right;
    }
    .btn-prev{
        width: 36px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #ddd;
        background: #fff;
        letter-spacing: 0;
        cursor: pointer;
    }
    .btn-next{
        width: 36px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #ddd;
        background: #fff;
        letter-spacing: 0;
        cursor: pointer;
    }
    .calendar-body-header div{
        display: inline-block;
        width: 308px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
        font-size: 16px;
        color: #333;
    }
    .calendar-body-month-week{
        height: 39px;
        line-height: 39px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 12px;
        color: #666;
        letter-spacing: 0;
    }
    .calendar-body-month-week span{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
    }
    .calendar-month-panel{
        margin: 6px;
    }
    .calendar_day{
        width: 46px;
        float: left;
        margin: -1px -1px 0 0;
        font-size: 12px;
        height: 46px;
        text-align: center;
        font-family: Tahoma;
        color: #333;
        background: #fff;
        border: 1px solid #eee;
        cursor: pointer;
    }
    .calendar-no-day-white{
        border: 1px white solid;
    }
    .calendar-no-day-gray{
        color: #eee;
        pointer-events: none;
    }
    .calendar-body-active{
        border: 1px #f60 solid;
        color: #fff;
        background: #f60;
    }
    .calendar-body-middle{
        color: #fff;
        background: #ffc6a0;
        border: 1px #ffc6a0 solid;
    }
    .calendar-body-active p{

        color: #fff;

    }



</style>