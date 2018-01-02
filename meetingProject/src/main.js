// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);




import App from './App'



import qs from 'qs'
/* 注入vue全局中，这样我们可以在组件内或者JS内通过使用this.$qs来使用qs库*/
Vue.prototype.$qs = qs

import router from './router'
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
Vue.config.productionTip = false

/* eslint-disable no-new */

  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })



