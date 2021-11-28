<template>
  <div class="proposal-preview">
    <div class="columns is-multiline">
      <div class="column is-8">
        <router-link
          :to="{ name: 'Proposal', params: { id: proposal.id} }">
          {{proposal.title}}
        </router-link>
        <div class="buttons mt-4">
          <b-button
            tag="a"
            size="is-small"
            :href="proposal.url"
            icon-left="link"
            type="is-link"
            target="_blank">
            Open in IdeaScale
          </b-button>
          <b-button
            tag="a"
            size="is-small"
            icon-left="pencil"
            @click="open = !open"
            type="is-primary">
            {{editMsg}}
          </b-button>
        </div>
      </div>
      <div class="column is-4">
        <b-progress
          type="is-success"
          class="complete-progress mt-2"
          :value="completed"
          size="is-medium"
          show-value
          >
          Assessment Completion
        </b-progress>
        <div class="submitted">
          <b-tooltip
            type="is-light"
            class=" is-flex is-flex-align-center"
            label="To submit the assessment you have to copy-paste the content of the various criteria in the IdeaScale proposal page and mark the assessment as 'submitted' in the edit form in the ca-tool."
            multilined>
            <b-icon
              class="mr-4"
              :icon="(proposal.submitted) ? 'check-circle' : 'alert'"
              size="is-medium"
              :type="(proposal.submitted) ? 'is-success' : 'is-danger'" />
            <span class="mt-1">{{submittedMsg}}</span>
          </b-tooltip>
        </div>
      </div>
    </div>
    <div class="container details" v-if="open">
      <assessment :proposal="proposal" />
    </div>
  </div>
</template>

<script>

import criteria from '@/assets/data/criteria.json'
import Assessment from '@/components/Assessment'

export default {
  name: 'AssessmentPreview',
  props: ['proposal'],
  components: {
    Assessment
  },
  data() {
    return {
      criteria: criteria,
      open: false
    }
  },
  computed: {
    completed() {
      const reducer = (previousValue, currentValue) => previousValue + currentValue;
      let texts = ['note_1', 'note_2', 'note_3']
        .map((el) => (this.proposal[el].length > 0) ? 1 : 0 )
        .reduce(reducer)
      let ratings = ['rate_1', 'rate_2', 'rate_3']
        .map((el) => (this.proposal[el] > 0) ? 1 : 0 )
        .reduce(reducer)
      return parseInt((100 * (texts + ratings)) / 6)
    },
    submittedMsg() {
      return (this.proposal.submitted) ? 'Submitted to IdeaScale' : 'Not submitted to IdeaScale'
    },
    editMsg() {
      return (this.open) ? 'Close' : 'Access assessment'
    }
  },
  methods: {
    criterium(id) {
      let fCriteria = this.criteria.filter((c) => (c.c_id === id) && (c.challenges.indexOf(this.proposal.category) > -1))
      if (fCriteria.length > 0) {
        return fCriteria[0]
      }
      return false
    },
  },
  mounted() {
  }
}
</script>


<style lang="scss">
  .proposal-preview {
    padding: 10px 20px;
    width: 100%;
    &:nth-child(2n + 1) {
      background: #f1f1f1;
      progress::-webkit-progress-bar {
        background-color: #fff !important;
      }
      progress::-moz-progress-bar {
        background-color: #fff !important;
      }
    }
    &:nth-child(2n) {
    }
    .submitted {
      .tooltip-trigger {
        display: flex;
      }
    }
  }
</style>
