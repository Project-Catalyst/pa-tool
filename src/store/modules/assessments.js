// initial state
const getDefaultState = () => ({
  all: []
})
const state = getDefaultState()

// utils
const defaultAssessment = (id) => {
  return {
    id: id,
    rating_1: 0,
    note_1: '',
    self_ev_1: false,
    rating_2: 0,
    note_2: '',
    self_ev_2: false,
    rating_3: 0,
    note_3: '',
    self_ev_3: false
  }
}

// getters
const getters = {
  indexed: state => {
    let indexed = {}
    state.all.forEach(el => {
      indexed[el.id] = el
    })
    return indexed
  },
  getById: (state, getters) => (id) => {
    return getters.indexed[id]
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  addAssessment (state, proposalId) {
    let assessment = defaultAssessment(proposalId)
    state.all.push(assessment)
  },
  deleteAssessment (state, id) {
    var found = state.all.filter((assessment) => assessment.id === id)
    if (found.length > 0) {
      state.all.splice(found, 1)
    }
  },
  setValue (state, data) {
    let assessment = state.all.find(a => parseInt(a.id) === parseInt(data.id));
    if (assessment) {
      assessment[data.field] = data.value
    }
  },
  resetState (state) {
    //state.currentIndex = 0
    //state.keyword = ''
    //state.selectedChallenges = []
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
