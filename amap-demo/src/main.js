import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.config.productionTip = false

//返回随机字符串 当作组件id使用
Vue.prototype.randomString = function (len) {
  len = len || 32
  var $chars = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz2345678"
  const maxPos = $chars.length
  let pwd = ""
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
//csv转json
Vue.prototype.csvToJson = function (csvString) {
  let data = [];
  let relArr = csvString.split("\n")
  if (relArr.length > 1) {
    let title = relArr[0].split(',');
    let title_arr = title.keys();
    for (let key = 0, len = relArr.length - 1; key < len; key++) {
      let values = relArr[key];
      let objArr = values.split(",");
      let obj = {};
      for (let i = 0; i < title.length; i++) {
        obj[title[title_arr.next().value]] = objArr[i];
      }
      data.push(obj);
      title_arr = title.keys();
    }
  }
  return data;
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
