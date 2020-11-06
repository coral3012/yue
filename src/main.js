import Vue from 'vue'
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
//引入sass
import axios from "axios"

import App from './App.vue'
import router from './router'

//定义一个全局开关
Vue.prototype.$flag = true
//引入icon
import "../public/font_eh7uf39p3pa/iconfont.css"
//vant使用
Vue.use(Vant);
//使用axios
Vue.prototype.$axios = axios

//兄弟传参
const $eventBus = new Vue(); // 定义一个全局的vue实例
Vue.prototype.$eventBus = $eventBus; // 在vue对象的原型上进行赋值

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
