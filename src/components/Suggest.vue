<template>
  <div class="suggest">
    <div class="buttons is-centered">
      <b-button
        type="is-primary"
        size="is-large"
        v-if="this.filteredProposals.length > 0"
        @click="suggest">
        {{suggestText}}
      </b-button>
      <b-button
        disabled="true"
        type="is-primary"
        size="is-medium"
        v-if="this.filteredProposals.length === 0">
        No proposals found. Change the filter criteria.
      </b-button>
    </div>
  </div>
</template>

<script>
import DataMixin from '@/mixins/data'

export default {
  mixins: [DataMixin],
  methods: {
    suggest() {
      if (this.filteredProposals[this.currentIndex]) {
        this.$router.push({ name: 'Proposal', params:{ id: this.filteredProposals[this.currentIndex].id }})
        this.$store.commit('filters/setCurrentIndex', this.currentIndex + 1)
      } else {
        this.$store.commit('filters/setCurrentIndex', 0)
      }
    },
  },
  computed: {
    suggestText() {
      return (this.$route.name === 'Home') ? 'Suggest Proposal' : 'Give me another'
    }
  }
}

</script>
