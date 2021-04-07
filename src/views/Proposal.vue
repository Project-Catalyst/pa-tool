<template>
  <div class="proposal">
    <h1>{{proposal.title}}</h1>
    <h3>Problem statement</h3>
    <div class="description">{{proposal.description}}</div>
    <div>No assessments: <b>{{proposal.no_assessments}}</b></div>
    <a class="button" :href="proposal.url" target="blank">
      Take me there
    </a>
    <span class="button" @click="setReviewed">{{reviewedText}}</span>
  </div>
</template>


<script>
import proposals from '../assets/data/proposals.json'
import { EventBus } from './../EventBus';

export default {
  data() {
    return {
      proposals: proposals,
      assessed: []
    }
  },
  computed: {
    proposal() {
      let filtered = this.proposals.filter(p => (p.id === parseInt(this.$route.params.id)))
      if (filtered.length) {
        return filtered[0]
      }
      return filtered
    },
    isReviewed() {
      if (this.proposal && this.assessed) {
        return (this.assessed.indexOf(this.proposal.id) > -1)
      }
      return false
    },
    reviewedText() {
      return (this.isReviewed) ? 'Unmark as reviewed' : 'Mark as reviewed'
    },
  },
  methods: {
    setReviewed() {
      if (!this.isReviewed) {
        this.assessed.push(this.proposal.id)
      } else {
        let index = this.assessed.indexOf(this.proposal.id)
        this.assessed.splice(index, 1)
      }
      this.$localStorage.set('assessed', this.assessed)
      EventBus.$emit('update-assessed')
    },
    getLs() {
      this.assessed = this.$localStorage.get('assessed')
    }
  },
  mounted() {
    this.getLs()
  }

}
</script>

<style lang="scss">
.description {
  margin-bottom: 40px;
}
</style>
