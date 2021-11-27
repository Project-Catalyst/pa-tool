import dayjs from 'dayjs'
// initial state
const getDefaultState = () => ({
  all: []
})
const state = getDefaultState()

// utils
const defaultAssessment = (id) => {
  return {
    id: id,
    rate_1: 0,
    note_1: '',
    self_ev_1: false,
    rate_2: 0,
    note_2: '',
    self_ev_2: false,
    rate_3: 0,
    note_3: '',
    self_ev_3: false,
    last_update: 0,
    submitted: false
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
  ids: (state, getters) => {
    return Object.keys(getters.indexed).map((a) => parseInt(a))
  },
  getById: (state, getters) => (id) => {
    if (getters.indexed[id]) {
      return getters.indexed[id]
    }
    return false
  }
}

// actions
const actions = {
}

// mutations
const mutations = {
  setAssessments (state, assessments) {
    console.log(assessments)
    state.all = assessments
  },
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
      assessment.last_update = dayjs().unix()
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
