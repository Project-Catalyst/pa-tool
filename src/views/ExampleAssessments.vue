<template>
  <div class="example-assessments">
    <div class="content">
      <p class="title">Example assessments from Fund 6 and Fund 7</p>
      <b-message>
        This page collects all the assessments from Fund 6 that were classified by the 80% of the Veteran Community Advisor as "Excellent".<br />
        Use them as a reference to write high quality assessments and don't forget to take a look at the related proposal to have the correct context.
      </b-message>
    </div>
    <div class="list content">
      <example-assessment-preview
        :key="assessment.id"
        v-for="assessment in assessments"
        :assessment="assessment"
      />
    </div>
  </div>
</template>

<script>

import ExampleAssessmentPreview from '@/components/ExampleAssessmentPreview'

export default {
  name: 'ExampleAssessments',
  components: {
    ExampleAssessmentPreview
  },
  data() {
    return {
      assessments: []
    }
  },
  computed: {
  },
  methods: {
    loadAssessments() {
      this.axios({
        url:`data/excellent-assessments.json`,
        baseURL: process.env.VUE_APP_BASE_URL
      }).then((res) => {
        this.assessments = res.data
      });
    }
  },
  mounted() {
    this.loadAssessments()
  }
}
</script>


<style scoped lang="scss">
</style>
