<template>
  <div class="box assessment">
    <b-button
      v-if="!assessment"
      @click="createAssessment"
      icon-left="pencil"
      type="is-primary">
      Create Assessment
    </b-button>
    <div class="form-wrapper mb-4 content is-relative" v-if="assessment">
      <b-field class="saved-at">
        <b-tag icon="content-save-outline">{{savedAt}}</b-tag>
      </b-field>
      <div class="criterium mb-4 columns is-multiline">
        <div class="column is-12">
          <h4>{{ criterium(1).question }}</h4>
        </div>
        <div class="column is-2">
          <b-field :label="`Rating for ${criterium(1).title}:`">
            <b-rate v-model="rate1"></b-rate>
          </b-field>
          <b-button
            @click="getGuidingQuestions(1)"
            icon-left="help"
            type="is-primary is-small">
            Guiding Questions
          </b-button>
          <div class="is-full mt-4">
            <b-icon size="is-medium" icon="check-circle" v-if="this.assessment.self_ev_1" />
          </div>
        </div>
        <div class="column is-10 is-relative">
          <b-field :label="`Rationale for ${criterium(1).title}:`">
            <b-input type="textarea" v-model="debouncedNote1"></b-input>
          </b-field>
          <b-button
            :disabled="(this.assessment.note_1.length === 0)"
            class="absolute-button"
            @click="copyText('note_1')"
            icon-left="content-copy"
            type="is-primary is-small">
          </b-button>
        </div>
      </div>
      <div class="criterium mb-4 columns is-multiline">
        <div class="column is-12">
          <h4>{{ criterium(2).question }}</h4>
        </div>
        <div class="column is-2">
          <b-field :label="`Rating for ${criterium(2).title}:`">
            <b-rate v-model="rate2"></b-rate>
          </b-field>
          <b-button
            @click="getGuidingQuestions(2)"
            icon-left="help"
            type="is-primary is-small">
            Guiding Questions
          </b-button>
          <div class="is-full mt-4">
            <b-icon size="is-medium" icon="check-circle" v-if="this.assessment.self_ev_2" />
          </div>
        </div>
        <div class="column is-10 is-relative">
          <b-field :label="`Rationale for ${criterium(2).title}:`">
            <b-input type="textarea" v-model="debouncedNote2"></b-input>
          </b-field>
          <b-button
            :disabled="(this.assessment.note_2.length === 0)"
            class="absolute-button"
            @click="copyText('note_2')"
            icon-left="content-copy"
            type="is-primary is-small">
          </b-button>
        </div>
      </div>
      <div class="criterium mb-4 columns is-multiline">
        <div class="column is-12">
          <h4>{{ criterium(3).question }}</h4>
        </div>
        <div class="column is-2">
          <b-field :label="`Rating for ${criterium(3).title}:`">
            <b-rate v-model="rate3"></b-rate>
          </b-field>
          <b-button
            @click="getGuidingQuestions(3)"
            icon-left="help"
            type="is-primary is-small">
            Guiding Questions
          </b-button>
          <div class="is-full mt-4">
            <b-icon size="is-medium" icon="check-circle" v-if="this.assessment.self_ev_3" />
          </div>
        </div>
        <div class="column is-10 is-relative">
          <b-field :label="`Rationale for ${criterium(3).title}:`">
            <b-input type="textarea" v-model="debouncedNote3"></b-input>
          </b-field>
          <b-button
            :disabled="(this.assessment.note_3.length === 0)"
            class="absolute-button"
            @click="copyText('note_3')"
            icon-left="content-copy"
            type="is-primary is-small">
          </b-button>
        </div>
      </div>
    </div>
    <b-button
      v-if="assessment"
      @click="deleteAssessment"
      icon-left="delete"
      type="is-primary">
      Delete Assessment
    </b-button>
    <b-modal
      v-for="qid in [1, 2, 3]"
      v-model="modalActive[qid]"
      :key="`modal-${qid}`"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Self Checklist"
      aria-modal>
      <template #default="props">
        <checklist
        v-bind="{criterium: criterium(qid)}"
        @self-evaluated="selfEvaluated(qid, $event)"
        @close="props.close" />
      </template>
    </b-modal>
  </div>
</template>

<script>

import moment from 'moment'
import { mapGetters } from "vuex";
import debounce from 'lodash.debounce';
import criteria from '@/assets/data/criteria.json'
import Checklist from '@/components/Checklist'

export default {
  props: ['proposal'],
  data() {
    return {
      criteria: criteria,
      modalActive: {
        1: false,
        2: false,
        3: false
      },
      savedAt: 'Not Saved',
      interval: false
    }
  },
  components: {
    Checklist
  },
  computed: {
    ...mapGetters("assessments", ["getById"]),
    assessment() {
      return this.getById(this.proposal.id)
    },
    rate1: {
      get() {
        return this.assessment.rate_1
      },
      set(val) {
        this.setValue('rate_1', val)
      }
    },
    debouncedNote1: {
      get() {
        return this.assessment.note_1;
      },
      set: debounce(function(val) {
        this.setValue('note_1', val)
      }, 500)
    },
    rate2: {
      get() {
        return this.assessment.rate_2
      },
      set(val) {
        this.setValue('rate_2', val)
      }
    },
    debouncedNote2: {
      get() {
        return this.assessment.note_2;
      },
      set: debounce(function(val) {
        this.setValue('note_2', val)
      }, 500)
    },
    rate3: {
      get() {
        return this.assessment.rate_3
      },
      set(val) {
        this.setValue('rate_3', val)
      }
    },
    debouncedNote3: {
      get() {
        return this.assessment.note_3;
      },
      set: debounce(function(val) {
        this.setValue('note_3', val)
      }, 500)
    }
  },
  methods: {
    createAssessment() {
      this.$buefy.dialog.confirm({
        message: `I confirm that this tool is only to be used for compiling purpose. I understand that the assessments MUST be submitted through IdeaScale AND that this interface in saved locally on the browser meaning that data will be lost if the cache is cleared.`,
        trapFocus: true,
        onConfirm: () => {
          this.$store.commit('assessments/addAssessment', this.proposal.id)
        }
      })
    },
    deleteAssessment() {
      this.$buefy.dialog.confirm({
        message: `Are you sure? After deleting your assessment can't be recovered.`,
        trapFocus: true,
        onConfirm: () => {
          this.$store.commit('assessments/deleteAssessment', this.proposal.id)
        }
      })
    },
    setValue(field, val) {
      this.$store.commit('assessments/setValue', {
        id: this.proposal.id,
        field: field,
        value: val
      });
      this.updateSavedAt()
    },
    criterium(id) {
      let fCriteria = this.criteria.filter((c) => (c.c_id === id) && (c.challenges.indexOf(this.proposal.category) > -1))
      if (fCriteria.length > 0) {
        return fCriteria[0]
      }
      return false
    },
    getGuidingQuestions(criteriumId) {
      this.modalActive[criteriumId] = true
    },
    selfEvaluated(id, val) {
      this.setValue(`self_ev_${id}`, val)
    },
    copyText(field) {
      this.$clipboard(this.assessment[field])
      this.$buefy.notification.open({
        message: 'Rationale copied to clipboard. Paste it in IdeaScale!',
        type: 'is-primary',
        position: 'is-bottom-right'
      })
    },
    updateSavedAt() {
      if (this.assessment.last_update === 0) {
        this.savedAt = 'Not saved'
      } else {
        let diff = this.assessment.last_update - moment().utc().unix()
        let duration = moment.duration(diff, "seconds").humanize(true)
        this.savedAt = `Saved ${duration}`
      }
    }
  },
  mounted() {
    this.updateSavedAt()
    this.interval = setInterval(() => {
      this.updateSavedAt()
    }, 15 * 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}

</script>

<style lang="scss">
  .absolute-button {
    position: absolute !important;
    bottom: 30px;
    right: 20px !important;
  }
  .saved-at {
    position: absolute !important;
    top: 0;
    right: 0;
  }
</style>
