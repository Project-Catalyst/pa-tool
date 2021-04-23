<template>
  <div class="proposal">
    <div class="content box">
      <h1>{{proposal.title}}</h1>
      <h3>Problem statement</h3>
      <p>{{proposal.description}}</p>
      <h3>Problem solution</h3>
      <p>Lorem ipsum dolor sit amet{{proposal.solution}}</p>
      <div>No assessments: <b>{{proposal.no_assessments}}</b></div>
    </div>
    <div class="box">
      <div class="buttons">
        <b-button
          tag="a"
          :href="proposal.url"
          icon-left="pencil-plus"
          type="is-primary"
          v-if="autoflag"
          @click="forceReviewed"
          target="blank">
          Review
        </b-button>
        <b-button
          tag="a"
          :href="proposal.url"
          icon-left="eye"
          type="is-primary"
          target="blank">
          {{ ctaText }}
        </b-button>
        <b-checkbox
          :value="isReviewed"
          @input="setReviewed">
          Proposal reviewed
        </b-checkbox>
      </div>
    </div>
  </div>
</template>


<script>
import proposals from '../assets/data/proposals.json'
import { EventBus } from './../EventBus';

export default {
  data() {
    return {
      proposals: proposals,
      assessed: [],
      autoflag: false
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
    ctaText() {
      return (this.autoflag) ? 'Preview' : 'Go to proposal'
    }
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
    forceReviewed() {
      if (!this.isReviewed) {
        this.setReviewed()
      }
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
.content-wrapper {
  margin-bottom: 40px;
}
</style>
