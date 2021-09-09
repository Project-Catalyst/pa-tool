<template>
  <div class="checklist-wrapper">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Self-evaluation</p>
      </header>
      <section class="modal-card-body">
        <b-message  type="is-info" class="is-size-6">
          This checklist is designed to help you provide better quality assessments and feedback to the proposer. It is not mandatory, however using it can help give you an indication of how well you've applied the guidelines to your assessment.
        </b-message>
        <div class="form-group mb-3" v-for="group,idx in activeQuestions" :key="`g-${idx}`">
          <h3 class="mb-2 has-text-weight-bold">{{group.criterium}}</h3>
          <div class="block mb-1" v-for="question,idx2 in group.questions" :key="`q-${idx2}`">
            <b-checkbox class="mb-1" v-model="selected" :native-value="question">
              {{ question }}
            </b-checkbox>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <b-button
            label="Cancel"
            @click="setAssessed(false)" />
        <b-button
          :disabled="disabled"
          @click="setAssessed(true)"
          label="Confirm assessed"
          type="is-primary" />
      </footer>
    </div>
  </div>
</template>



<script>

import questions from '../assets/data/questions.json'

export default {
  name: 'Checklist',
  props: ['challenge', 'proposal'],
  data() {
    return {
      questions: questions,
      selected: []
    }
  },
  methods: {
    setAssessed(result) {
      this.$emit('assessed', result)
      this.$emit('close')
    }
  },
  computed: {
    activeQuestions() {
      return this.questions.filter((group) => {
        if (group.challenges.indexOf(this.challenge.id) > -1) {
          return true
        }
        return false
      })
    },
    totNumber() {
      let tot = 0
      this.activeQuestions.forEach((group) => {
        tot = tot + group.questions.length
      })
      return tot
    },
    disabled() {
      return false
      // return ((this.selected.length / this.totNumber) < 0.33)
    }
  },
  mounted() {
    this.$on('close', function() {
      this.selected = []
    })
  }
}
</script>


<style scoped lang="scss">
</style>
