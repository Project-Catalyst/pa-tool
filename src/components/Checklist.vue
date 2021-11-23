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
        <div class="form-group mb-3">
          <h3 class="mb-2 has-text-weight-bold">{{criterium.title}}</h3>
          <div class="block mb-1" v-for="question,idx2 in criterium.questions" :key="`q-${idx2}`">
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

export default {
  name: 'Checklist',
  props: ['proposal', 'criterium'],
  data() {
    return {
      selected: []
    }
  },
  methods: {
    setAssessed(result) {
      this.$emit('self-evaluated', result)
      this.$emit('close')
    }
  },
  computed: {
    totNumber() {
      return this.criterium.questions.length
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
