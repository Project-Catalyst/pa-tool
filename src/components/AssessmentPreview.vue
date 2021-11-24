<template>
  <div class="proposal-preview">
    <div class="prop-title">
      <router-link
        :to="{ name: 'Proposal', params: { id: proposal.id} }">
        {{proposal.title}}
      </router-link>
      <b-progress
        class="complete-progress mr-4 mt-2"
        :value="completed"
        size="is-small is-darkgrey"
        show-value
        >
        Assessment Completed
      </b-progress>
    </div>
    <b-button
      tag="a"
      size="is-small"
      :href="proposal.url"
      icon-left="link"
      type="is-primary"
      target="_blank">
      Open
    </b-button>
  </div>
</template>

<script>

export default {
  name: 'AssessmentPreview',
  props: ['proposal'],
  data() {
    return {
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
    }
  },
  methods: {},
  mounted() {
  }
}
</script>


<style lang="scss">
  .proposal-preview {
    padding: 10px 20px;
    width: 100%;
    display: flex;
    .prop-title {
      flex-grow: 1;
    }
    &:nth-child(2n + 1) {
      background: #f1f1f1;
    }
    .complete-progress {
      .progress {
        border: 1px solid #4a4a4a;
      }
    }
  }
</style>
