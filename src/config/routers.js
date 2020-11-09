import Login from '../views/login.vue'
import Home from '../views/Home.vue'

console.log(Home)

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  }
]