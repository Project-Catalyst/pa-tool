import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import filters from './modules/filters'
import assessments from './modules/assessments'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let localStorage = createPersist({
    namespace: 'ca-tool-f8',
    initialState: {},
    expires: 90 * 24 * 60 * 60 * 1e3 // 90 days
})

export default new Vuex.Store({
  modules: {
    filters,
    assessments
  },
  strict: debug,
  plugins: [localStorage]
})
