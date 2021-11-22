import router from '@/router'
// initial state
const getDefaultState = () => ({
  currentIndex: 0,
  keyword: '',
  selectedChallenges: []
})
const state = getDefaultState()

// utilities
const checkRoute = () => {
  if (router.currentRoute.name !== 'Home') {
    router.push({ name: 'Home' })
  }
}

// getters
const getters = {}

// actions
const actions = {
}

// mutations
const mutations = {
  addChallenge(state, challenge) {
    state.currentIndex = 0
    var found = state.selectedChallenges.filter((schallenge) => challenge.id === schallenge.id)
    if (found.length === 0) {
      state.selectedChallenges.push(challenge)
    }
    checkRoute()
  },
  removeChallenge(state, challenge) {
    state.currentIndex = 0
    var found = state.selectedChallenges.filter((schallenge) => challenge.id === schallenge.id)
    if (found.length > 0) {
      state.selectedChallenges.splice(found, 1)
    }
    checkRoute()
  },
  setKeyword(state, keyword) {
    state.currentIndex = 0
    state.keyword = keyword
    checkRoute()
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index
  },
  resetState (state) {
    Object.assign(state, getDefaultState())
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
