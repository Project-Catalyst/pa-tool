<template>
  <div class="proposal">
    <c-filter :categories="categories" />
    <div class="content box">
      <div class="is-flex is-align-items-center">
        <h5 class="mr-5 mb-0">{{category.title}}</h5>
        <a class="has-text-weight-bold is-text-6" @click="briefActive = true">
          [Open challenge brief]
        </a>
      </div>
      <h1>{{proposal.title}}</h1>
      <div class="mb-4">
        <h4 class="mb-1" v-if="!isChallengeSetting">Problem statement (max 140 char)</h4>
        <h4 class="mb-1" v-if="isChallengeSetting">Challenge question (max 140 char)</h4>
        <p v-if="proposal.problem_statement">{{proposal.problem_statement}}</p>
        <p v-if="proposal.challenge_brief">{{proposal.challenge_brief}}</p>
      </div>
      <div class="mb-4" v-if="proposal.problem_solution">
        <h4 class="mb-1">Problem solution (max 140 char)</h4>
        <p>{{proposal.problem_solution}}</p>
      </div>
      <div class="mb-4" v-if="proposal.relevant_experience">
        <h4 class="mb-1">Relevant experience (max 140 char)</h4>
        <p>{{proposal.relevant_experience}}</p>
      </div>
      <div class="mb-4" v-if="proposal.importance">
        <h4 class="mb-1">Why is it important? (max 140 char)</h4>
        <p>{{proposal.importance}}</p>
      </div>
      <div class="mb-4" v-if="proposal.importance">
        <h4 class="mb-1">How does success look like? (max 140 char)</h4>
        <p>{{proposal.how_does_success_look_like_}}</p>
      </div>
      <div class="mb-4" v-if="proposal.requested_funds">Requested funds: <b>{{proposal.requested_funds}}</b></div>
      <div class="mb-4" v-if="proposal.requested_funds_coti">Requested funds: <b>{{proposal.requested_funds_coti}}</b></div>
      <div>
        No. assessments: <b>{{(proposal.no_assessments) ? proposal.no_assessments : 0}}</b><br />
        <span class="is-size-7" v-if="lastUpdate">
          Last update: {{fLastUpdateDuration}} [{{ fLastUpdate }}]
        </span>
      </div>
    </div>
    <div class="box">
      <div class="buttons">
        <b-tooltip type="is-white" class="mr-4">
          <b-button
            tag="a"
            :href="proposal.url"
            icon-left="eye"
            type="is-primary is-medium"
            target="blank">
            {{ ctaText }}
          </b-button>
          <template v-slot:content>
            Links to IdeaScale
          </template>
        </b-tooltip>
        <suggest :size="'is-medium'" />
      </div>
    </div>
    <assessment :proposal="proposal" />
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
  </div>
</template>


<script>
import { mapState } from "vuex";
import categories from '../assets/data/categories.json'
import proposals from '../assets/data/proposals.json'
import CFilter from '@/components/Filter'
import Assessment from '@/components/Assessment'
import ChallengeBrief from '@/components/ChallengeBrief'
import Suggest from '@/components/Suggest'


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
    ChallengeBrief,
    CFilter,
    Assessment,
    Suggest
  },
  computed: {
    ...mapState({
      lastUpdate: (state) => state.filters.lastUpdate
    }),
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
    activeQuestions() {
      return this.questions.filter((group) => {
        if (this.category) {
          if (group.challenges.indexOf(this.category.id) > -1) {
            return true
          }
        }
        return false
      })
    },
    questionsNumber() {
      let tot = 0
      this.activeQuestions.forEach((group) => {
        tot = tot + group.questions.length
      })
      return tot
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
    },
    isChallengeSetting() {
      if (this.category) {
        if (this.category.id === 26120) {
          return true
        }
      }
      return false
    },
    fLastUpdateDuration() {
      let now = this.$dayjs().unix()
      let last = this.$dayjs(this.lastUpdate).utc().unix()
      let diff = last - now
      return this.$dayjs.duration(diff, "seconds").humanize(true)
    },
    fLastUpdate() {
      return this.$dayjs(this.lastUpdate).format('DD MMM YYYY HH:mm')
    }
  },
  methods: {
  },
  mounted() {
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
