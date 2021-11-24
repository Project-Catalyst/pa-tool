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
            <b-checkbox class="mb-1" v-model="selectedKeys" :native-value="question">
              {{ question }}
            </b-checkbox>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <b-button
            label="Reset"
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
  props: ['assessment', 'criterium'],
  data() {
    return {
      selectedKeys: []
    }
  },
  methods: {
    setAssessed(result) {
      if(result) {
        result = this.selectedKeys.map((el) => this.criterium.questions.indexOf(el))
      }
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
    if (this.assessment[`self_ev_${this.criterium.c_id}`]) {
      this.selectedKeys = this.assessment[`self_ev_${this.criterium.c_id}`]
        .map((el) => this.criterium.questions[el])
    } else {
      this.selectedKeys = []
    }
  }
}
</script>


<style scoped lang="scss">
</style>
