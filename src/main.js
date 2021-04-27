import Vue from 'vue'
import Buefy from "buefy";
import App from './App.vue'
import router from './router'
import './plugins/axios'
import './plugins/multiselect';
import './plugins/localstorage';

import "buefy/dist/buefy.css";
import "./assets/sass/main.scss";

Vue.config.productionTip = false
Vue.use(Buefy);

new Vue({
  router,
  render: h => h(App),
  localStorage: {
    assessed: {
      type: Object,
      default: []
    }
  }
}).$mount('#app')
