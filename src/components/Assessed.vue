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
      <div class="proposal-preview"
        :key="proposal.id"
        v-for="proposal in assessedProposals">
        <div class="prop-title">
          <router-link
            :to="{ name: 'Proposal', params: { id: proposal.id} }">
            {{proposal.title}}
          </router-link>
        </div>
        <b-button
          tag="a"
          size="is-small"
          :href="proposal.url"
          icon-left="link"
          type="is-primary"
          target="blank">
          Open
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>

import { EventBus } from './../EventBus';
import proposals from '@/assets/data/proposals.json'

export default {
  name: 'Assessed',
  data() {
    return {
      proposals: proposals,
      assessed: [],
      open: false
    }
  },
  computed: {
    assessedProposals() {
      return this.proposals.filter(p => (this.assessed.indexOf(p.id) > -1))
    },
    headerText() {
      return `Assessed Proposals (${this.assessedProposals.length}/${this.proposals.length})`
    }
  },
  methods: {
    getLs() {
      this.assessed = this.$localStorage.get('assessed')
    }
  },
  mounted() {
    EventBus.$on('update-assessed', this.getLs)
    this.getLs()
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
      }
    }
  }
</style>
