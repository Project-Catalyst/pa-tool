import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Proposal from '../views/Proposal.vue'
import Assessed from '../views/Assessed.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/your-assessments',
    name: 'Assessed',
    component: Assessed
  },
  {
    path: '/proposal/:id',
    name: 'Proposal',
    component: Proposal
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
