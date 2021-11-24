import Vue from 'vue'
import Buefy from "buefy";
import Clipboard from 'v-clipboard'
import VueSimpleMarkdown from 'vue-simple-markdown'
import App from './App.vue'
import router from './router'
import store from "./store";
import './plugins/axios'

import "buefy/dist/buefy.css";
import 'vue-simple-markdown/dist/vue-simple-markdown.css'
import "./assets/sass/main.scss";

Vue.config.productionTip = false
Vue.use(Clipboard)
Vue.use(Buefy);
Vue.use(VueSimpleMarkdown)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
