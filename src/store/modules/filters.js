import router from '@/router'
import staticProposals from '@/assets/data/proposals.json'
// initial state
const getDefaultState = () => ({
  currentIndex: 0,
  keyword: '',
  selectedChallenges: [],
  proposals: staticProposals
})
const state = getDefaultState()

// getters
const getters = {
  filteredProposals: state => {
    let proposals = staticProposals
    if (state.selectedChallenges.length > 0) {
      let filters = state.selectedChallenges.map(el => el.id)
      proposals = proposals.filter(p => filters.indexOf(p.category) > -1)
    }
    if (state.keyword.trim().length >= 3) {
      proposals = proposals.filter(
        (el) => el.title.toLowerCase().includes(state.keyword.toLowerCase())
      )
    }
    return proposals
      .sort(() => (Math.random() > .5) ? 1 : -1)
      .sort(
        (a,b) => (a.no_assessments > b.no_assessments) ? 1 : ((b.no_assessments > a.no_assessments) ? -1 : 0)
      )
  }
}

// actions
const actions = {
  getAssessmentsCount ({ commit }) {
    const proposals = staticProposals
    this._vm.$http.get('proposals.json').then((res) => {
      if (res.data) {
        let remoteProposals = res.data
        remoteProposals.forEach((r) => {
          let selected = proposals.find((p) => p.id === r.id)
          if (selected) {
            selected.no_assessments = r.assessments_count
          }
        })
        commit('setProposals', proposals)
      }
    })
  },
  getNext({ commit, state, getters }) {
    let fProposals = getters.filteredProposals
    if (fProposals[state.currentIndex]) {
      let newId = fProposals[state.currentIndex].id
      let currentId = false
      if (router.currentRoute.name === 'Proposal') {
        currentId = router.currentRoute.params.id
      }
      if (newId !== currentId) {
        router.push({ name: 'Proposal', params:{ id: newId }})
      }
      commit('setCurrentIndex', state.currentIndex + 1)
    } else {
      commit('setCurrentIndex', 0)
    }
  }
}

// mutations
const mutations = {
  setProposals (state, proposals) {
    state.proposals = proposals
  },
  addChallenge(state, challenge) {
    state.currentIndex = 0
    var found = state.selectedChallenges.filter((schallenge) => challenge.id === schallenge.id)
    if (found.length === 0) {
      state.selectedChallenges.push(challenge)
    }
    this.dispatch('filters/getNext')
  },
  removeChallenge(state, challenge) {
    state.currentIndex = 0
    var found = state.selectedChallenges.filter((schallenge) => challenge.id === schallenge.id)
    if (found.length > 0) {
      state.selectedChallenges.splice(found, 1)
    }
    this.dispatch('filters/getNext')
  },
  setKeyword(state, keyword) {
    state.currentIndex = 0
    state.keyword = keyword
    this.dispatch('filters/getNext')
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
