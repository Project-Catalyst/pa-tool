import categories from '@/assets/data/categories.json'

import { mapState, mapGetters } from "vuex";


var proposalsData = {
  data() {
    return {
      categories: categories,
      interval: false,
    }
  },
  computed: {
    ...mapState({
      selectedChallenges: (state) => state.filters.selectedChallenges,
      currentKeyword: (state) => state.filters.keyword,
      currentIndex: (state) => state.filters.currentIndex,
      proposals: (state) => state.filters.proposals
    }),
    ...mapGetters({
      filteredProposals: 'filters/filteredProposals'
    })
  },
  methods: {
    remoteUpdate() {
      this.$store.dispatch("filters/getAssessmentsCount");
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
