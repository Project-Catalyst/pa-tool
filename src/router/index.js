import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Proposal from '../views/Proposal.vue'
import Assessed from '../views/Assessed.vue'
import Proposals from '../views/Proposals.vue'
import ExampleAssessments from '../views/ExampleAssessments.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/example-assessments',
    name: 'ExampleAssessments',
    component: ExampleAssessments
  },
  {
    path: '/your-assessments',
    name: 'Assessed',
    component: Assessed
  },
  {
    path: '/proposals',
    name: 'Proposals',
    component: Proposals
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
