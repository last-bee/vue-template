import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';

import App from './app.vue';

import createStore from './store/store'
import createRouter from './config/router'
Vue.use(Vuex).use(VueRouter)

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#root')

  return {
    app, router, store
  }
}