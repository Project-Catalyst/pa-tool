import categories from '@/assets/data/categories.json'
import proposals from '@/assets/data/proposals.json'

import { mapState } from "vuex";


var proposalsData = {
  data() {
    return {
      categories: categories,
      proposals: proposals,
      interval: false,
    }
  },
  computed: {
    ...mapState({
      selectedChallenges: (state) => state.filters.selectedChallenges,
      currentKeyword: (state) => state.filters.keyword,
      currentIndex: (state) => state.filters.currentIndex
    }),
    filteredProposals() {
      let proposals = this.proposals
      if (this.selectedChallenges.length > 0) {
        let filters = this.selectedChallenges.map(el => el.id)
        proposals = this.proposals.filter(p => filters.indexOf(p.category) > -1)
      }
      if (this.currentKeyword.trim().length >= 3) {
        proposals = proposals.filter(
          (el) => el.title.toLowerCase().includes(this.currentKeyword.toLowerCase())
        )
      }
      return proposals
        .sort(() => (Math.random() > .5) ? 1 : -1)
        .sort(
          (a,b) => (a.no_assessments > b.no_assessments) ? 1 : ((b.no_assessments > a.no_assessments) ? -1 : 0)
        )
    }

  },
  methods: {
    remoteUpdate() {
      this.axios.get('proposals.json').then((res) => {
        let remoteProposals = res.data
        remoteProposals.forEach((r) => {
          let selected = this.proposals.find((p) => p.id === r.id)
          if (selected) {
            selected.no_assessments = r.assessments_count
          }
        })
      })
    }
  },
  mounted() {
    this.remoteUpdate()
    this.interval = setInterval(() => {
      this.remoteUpdate()
    }, 15 * 60 * 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}

export default proposalsData
