<template>
  <div class="suggest">
    <div class="is-centered" :class="{buttons: size === 'is-large'}" v-if="filteredProposals">
      <b-button
        type="is-primary"
        :size="size"
        v-if="this.filteredProposals.length > 0"
        @click="suggest">
        {{suggestText}}
      </b-button>
      <b-button
        disabled="true"
        type="is-primary"
        :size="size"
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
  props: {
    size: {
      default: 'is-large'
    }
  },
  methods: {
    suggest() {
      this.$store.dispatch('filters/getNext', false)
    },
  },
  computed: {
    suggestText() {
      return (this.$route.name === 'Home') ? 'Suggest Proposal' : 'Suggest Another Proposal'
    }
  },
  mounted() {
  }
}

</script>
