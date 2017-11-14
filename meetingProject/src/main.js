// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

//import { Button, Select ,Radio} from 'element-ui'





import App from './App'


// Vue.use(Button)
// Vue.use(Select)
// Vue.use(Radio)



import router from './router'
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
