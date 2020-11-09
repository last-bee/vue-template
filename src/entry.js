import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';
Vue.use(VueRouter).use(Vuex)
import createStore from './store/store';

import createRouter from './config/router'
const router = createRouter()
const store = createStore()
console.log(router)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')