<template>
  <div class="suggest">
    <div class="buttons is-centered" v-if="filteredProposals">
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
      this.$store.dispatch('filters/getNext')
    },
  },
  computed: {
    suggestText() {
      return (this.$route.name === 'Home') ? 'Suggest Proposal' : 'Give me another'
    }
  },
  mounted() {
  }
}

</script>
