import Vue from 'vue'
import Clipboard from 'v-clipboard'
import App from './App.vue'
import router from './router'
import store from "./store";
import './plugins/buefy'
import './plugins/axios'
import "./plugins/vue-papa-parse";

import "./assets/sass/main.scss";

Vue.config.productionTip = false
Vue.use(Clipboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
