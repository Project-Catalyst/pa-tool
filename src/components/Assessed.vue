<template>
  <div class="assessed-wrapper" :class="{'open': open}">
    <b-button
      :label="headerText"
      type="is-primary"
      :icon-right="(open) ? 'chevron-up' : 'chevron-down'"
      expanded
      @click="open = !open"
    ></b-button>
    <div class="list content">
      <assessment-preview
        :key="proposal.id"
        v-for="proposal in assessedProposals"
        :proposal="proposal"
      />
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import proposals from '@/assets/data/proposals.json'

import AssessmentPreview from '@/components/AssessmentPreview'

export default {
  name: 'Assessed',
  components: {
    AssessmentPreview
  },
  data() {
    return {
      proposals: proposals,
      assessed: [],
      open: false
    }
  },
  computed: {
    ...mapGetters("assessments", ["ids", "indexed"]),
    assessedProposals() {
      return this.proposals.filter(p => (this.ids.indexOf(p.id) > -1))
        .map((p) => {
          return {...p, ...this.indexed[p.id]}
        })
    },
    headerText() {
      return `My assessed proposals (${this.assessedProposals.length}/${this.proposals.length})`
    }
  },
  methods: {},
  mounted() {
  }
}
</script>


<style scoped lang="scss">
  @import '../assets/sass/base/mixins';
  .assessed-wrapper {
    padding: 0;
    position: fixed;
    bottom: -2px;
    right: 20px;
    transform: translateY(calc(100% - 40px));
    width: 500px;
    background: #fff;
    @include mobile {
      width: calc(100% - 30px);
      right: 15px;
    }
    &.open {
      transform: translateY(0);
    }
    .list {
      width: 100%;
      max-height: 500px;
      overflow: auto;
      @include mobile {
        max-height: 80vh;
      }
    }
  }
</style>
