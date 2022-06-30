<template>
  <div class="proposal">
    <c-filter :categories="categories" :tags="tags" />
    <div class="content box" :class="{'has-background-primary-light': isChallengeSetting}">
      <b-notification
      v-if="isChallengeSetting"
        type="is-warning is-light"
        aria-close-label="Close notification"
        role="alert">
          This is a <i>Challenge Setting Proposal</i>. There is an <b>important</b> distinction between <i>Proposals for Funding</i> and <i>Challenge Setting Proposals</i>. These help guide the direction of Catalyst development and will form the challenges that appear in the next fund. Voters will assess their importance in relation to the next fund Challenge Setting Strategic Goals and consider what sort of <i>Proposals for Funding</i> they will encourage.<br />
          Learn more about what <i>Challenge Setting</i> is about from this video <a href="https://youtu.be/nP0r5KwNtQk?t=4790" target="_blank">https://youtu.be/nP0r5KwNtQk?t=4790</a>
      </b-notification>
      <div class="is-flex is-align-items-center">
        <h5 class="mr-5 mb-0">{{category.title}}</h5>
        <a class="has-text-weight-bold is-text-6" @click="briefActive = true">
          [Open challenge brief]
        </a>
      </div>
      <h1>{{proposal.title}}</h1>
      <h6><span class="has-text-weight-normal">Author:</span> {{proposal.author}}</h6>
      <div class="mb-4">
        <h4 class="mb-1" v-if="!isChallengeSetting">Problem statement (max 140 char)</h4>
        <h4 class="mb-1" v-if="isChallengeSetting">Challenge question (max 140 char)</h4>
        <div v-html="proposal.description" v-if="!isChallengeSetting"></div>
        <div v-html="proposal.description" v-if="isChallengeSetting"></div>
      </div>
      <div class="mb-4" v-if="proposal.problem_solution">
        <h4 class="mb-1">Problem solution (max 140 char)</h4>
        <div v-html="proposal.problem_solution"></div>
      </div>
      <div class="mb-4" v-if="proposal.relevant_experience">
        <h4 class="mb-1">Relevant experience (max 140 char)</h4>
        <div v-html="proposal.relevant_experience"></div>
      </div>
      <div class="mb-4" v-if="proposal.importance">
        <h4 class="mb-1">Why is it important? (max 140 char)</h4>
        <div v-html="proposal.importance"></div>
      </div>
      <div class="mb-4" v-if="proposal.importance">
        <h4 class="mb-1">How does success look like? (max 140 char)</h4>
        <div v-html="proposal.how_does_success_look_like_"></div>
      </div>
      <div class="mb-4" v-if="proposal.requested_funds">Requested funds: <b>{{proposal.requested_funds}}</b></div>
      <div class="mb-4" v-if="proposal.requested_funds_coti">Requested funds: <b>{{proposal.requested_funds_coti}}</b></div>
      <div>
        No. assessments: <b>{{(proposal.no_assessments) ? proposal.no_assessments : 0}}</b><br />
        <span class="is-size-7" v-if="lastUpdate">
          Stats last update: {{fLastUpdateDuration}} [{{ fLastUpdate }}]
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
            type="is-link is-medium"
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
      :width="960"
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
import { mapState, mapGetters } from "vuex";
import categories from '../assets/data/f9/categories.json'
import tags from '../assets/data/f9/tags.json'
import proposals from '../assets/data/f9/proposals.json'
import CFilter from '@/components/Filter'
import Assessment from '@/components/Assessment'
import ChallengeBrief from '@/components/ChallengeBrief'
import Suggest from '@/components/Suggest'


export default {
  data() {
    return {
      categories: categories,
      tags: tags,
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
    ...mapGetters("filters", ["getById"]),
    proposal() {
      return this.getById(parseInt(this.$route.params.id))
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
        if (this.category.id === 26257) {
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
