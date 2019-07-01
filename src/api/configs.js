    /**
 * 放置后端接口
 */
export default {
  ServerPath:'http://10.12.0.180:8080/',       // 基地址
  ImageURL:'http://10.12.0.180:8090/',         // 图片服务器地址
  register:'/register',                        // 用户注册
  userLogin:'/login',                          // 用户登录
  photoUpLoad:'wjd/upload',                    // 上传图片(element ui专用)
  hotelSave:'/hotel/save',                     // 酒店最终提交
  hotelList:'/hotel/list',                     // 获取房屋列表
  hotelDetail:'/hotel/info',                   // 房屋详情
  getUserInfo:'/user/info',                    // 获取用户资料信息
  UpdateUserInfo:'/user/update',               // 更新用户资料信息
  getHotelOrderList:'/order/hotelOrderList',   // 获取商户订单列表
  getUserOrderList:'/order/userOrderList',     // 获取用户订单列表
  UpdateOrder:'/order/save',                   // 更新订单
  getSelfHouse:'/hotel/queryHotelList',        // 房东获取自己发布的房屋
  UpdateHouse:'/hotel/update',                 // 更新房屋
  SaveOrder:'/order/save'  ,                   // 添加订单
  GetOrder:'/order/info/',                     // 获取特定订单
  GetCaptcha:'/captcha.jpg'                    // 获取验证码
}
