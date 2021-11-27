<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="subtitle">
        {{assessment.challenge}}
      </div>
      <div class="title">
        {{assessment.title}}
        <b-button
          tag="a"
          :href="assessment.url"
          icon-left="eye"
          type="is-primary"
          size="is-small"
          class="has-text-weight-normal ml-4"
          target="blank">
          Open proposal in IdeaScale
        </b-button>
      </div>
      <div class="container details" v-if="open">
        <example-assessment :assessment="assessment" />
      </div>
    </div>
  </div>
</template>

<script>

import ExampleAssessment from '@/components/ExampleAssessment'

export default {
  name: 'ExampleAssessmentPreview',
  props: ['assessment'],
  components: {
    ExampleAssessment
  },
  data() {
    return {
      open: true
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
}
</script>


<style lang="scss">
</style>
