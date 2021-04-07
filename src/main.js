import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/multiselect';
import './plugins/localstorage';

Vue.config.productionTip = false

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
