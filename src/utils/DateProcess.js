export function getDate(format,str){
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate();
        var oTime;
        if(format == 'yyyy-mm-dd'){
         oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) //最后拼接时间
    }else if(format == 'yyyy/mm/dd'){
         oTime = oYear +'/'+ getzf(oMonth) +'/'+ getzf(oDay) //最后拼接时间
    }
    return oTime;
}
//补0操作
function getzf(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}

