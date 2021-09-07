<template>
  <div class="proposal">
    <div class="content box">
      <div class="is-flex is-align-items-center">
        <h5 class="mr-5 mb-0">{{category.title}}</h5>
        <b-button type="is-primary" size="is-small" @click="briefActive = true">Open challenge brief</b-button>
      </div>
      <h1>{{proposal.title}}</h1>
      <div class="mb-4">
        <h3 class="mb-1">Problem statement</h3>
        <p>{{proposal.description}}</p>
      </div>
      <div class="mb-4" v-if="proposal.relevant_experience">
        <h3 class="mb-1">Relevant experience</h3>
        <p>{{proposal.relevant_experience}}</p>
      </div>
      <div class="mb-4" v-if="proposal.problem_solution">
        <h3 class="mb-1">Problem solution</h3>
        <p>{{proposal.problem_solution}}</p>
      </div>
      <div class="mb-4" v-if="proposal.importance">
        <h3 class="mb-1">Importance</h3>
        <p>{{proposal.importance}}</p>
      </div>
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
          @click.native.prevent="setReviewed">
          Proposal reviewed
        </b-checkbox>
      </div>
    </div>
    <b-modal
      v-model="briefActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Challenge Brief"
      aria-modal>
      <template #default="props">
        <challenge-brief v-bind="{challenge: category}" @close="props.close" />
      </template>
  </b-modal>
    <b-modal
      v-model="modalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Self Checklist"
      aria-modal>
      <template #default="props">
        <checklist v-bind="{challenge: category, proposal: proposal}" @assessed="confirmAssessed" @close="props.close" />
      </template>
    </b-modal>
  </div>
</template>


<script>
import categories from '../assets/data/categories.json'
import proposals from '../assets/data/proposals.json'
import { EventBus } from './../EventBus';
import Checklist from '@/components/Checklist'
import ChallengeBrief from '@/components/ChallengeBrief'


export default {
  data() {
    return {
      categories: categories,
      proposals: proposals,
      assessed: [],
      autoflag: false,
      modalActive: false,
      briefActive: false
    }
  },
  components: {
    Checklist,
    ChallengeBrief
  },
  computed: {
    proposal() {
      let filtered = this.proposals.filter(p => (p.id === parseInt(this.$route.params.id)))
      if (filtered.length) {
        return filtered[0]
      }
      return filtered
    },
    category() {
      if (this.proposal) {
        let category = this.categories.filter(c => (c.id === parseInt(this.proposal.category)))
        if (category.length) {
          return category[0]
        }
      }
      return ''
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
        this.modalActive = true
      } else {
        let index = this.assessed.indexOf(this.proposal.id)
        this.assessed.splice(index, 1)
        this.$localStorage.set('assessed', this.assessed)
        EventBus.$emit('update-assessed')
      }
    },
    confirmAssessed(res) {
      if (res && !this.isReviewed) {
        this.assessed.push(this.proposal.id)
      } else if (!res) {
        console.log('a')
        this.getLs()
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
