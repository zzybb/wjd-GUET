import router from "../router";
var axios = require('axios')
/**
 * Created by tan on 2017/10/23.
 */
let baseUrl= "";   //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = "http://localhost:8080/wjd/app"  //开发环境url
    break
  case 'production':
    baseUrl = "http://10.12.0.180:8080/wjd/app"   //生产环境url
    break
}

axios.interceptors.request.use(
    config => {

      if (localStorage.getItem("token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.token = localStorage.getItem("token");
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    });

axios.interceptors.response.use(
    response => {
      if (response.data.msg == "token失效，请重新登录"){
        localStorage.removeItem("token");
        router.push({name:'loginPage'})
      }

      return response
    },
    error => {
      return Promise.reject(error)
    }
)


// 引用axios

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
 接口处理函数
 这个函数每个项目都是不一样的，我现在调整的是适用于
 https://cnodejs.org/api/v1 的接口，如果是其他接口
 需要根据接口的参数进行调整。参考说明文档地址：
 https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
 主要是，不同的接口的成功标识和失败提示是不一致的。
 另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
 */



function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  return axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'POST' || method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: baseUrl,
    withCredentials: false
  })
    .then(function (res) {
      if (res) {
        success(res)
      } else {
        failure(res)
      }
    })
    .catch(function (err) {
      let res = err.response
      if (err) {
        failure(res)
      }
    })
}

function apiAxiosNoRes (method, url, params) {
  if (params) {
    params = filterNull(params)
  }
  return axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'POST' || method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: baseUrl,
    withCredentials: false
  })
}

function apiAxiosAll(reqList,callback){

  axios.all(reqList).then(axios.spread(callback));
}


function fileAxios (formData, success, failure) {
  axios({
    method: 'post',
    url: '/file/upload/axios',
    data: formData,
    formData: formData,
    baseURL: '/file',
    withCredentials: true
  })
  .then(function (res) {
    if (res) {
      success(res)
    } else {
      failure(res)
    }
  })
  .catch(function (err) {
    let res = err.response
    if (err) {
      failure(res)
    }
  })
}



// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  fileAxios: function (formData, success, failure) {
    return fileAxios(formData, success, failure)
  },
  NoResPost:function(url,params){
    return apiAxiosNoRes('POST',url,params)
  },
  axiosAll:function(reqList,callback){
    return apiAxiosAll(reqList,callback)
  }

}

