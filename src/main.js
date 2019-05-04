import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Axios from 'axios'

      Vue.prototype.$http = Axios;
      const token = localStorage.getItem('jwtToken');
      if (token) {
        Vue.prototype.$http.defaults.headers.common['Authorization'] = token
      }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
