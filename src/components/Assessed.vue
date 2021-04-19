<template>
  <div class="assessed-wrapper" :class="{'open': open}">
    <div class="header" @click="open = !open">
      Assessed Proposals ({{assessedProposals.length}}/{{proposals.length}})
    </div>
    <div class="list">
      <div class="proposal-preview"
        :key="proposal.id"
        v-for="proposal in assessedProposals">
        <div class="title">{{proposal.title}}</div>
        <a :href="proposal.url">Go</a>
      </div>
    </div>
  </div>
</template>

<script>

import { EventBus } from './../EventBus';

export default {
  name: 'Assessed',
  props: ['proposals'],
  data() {
    return {
      assessed: [],
      open: false
    }
  },
  computed: {
    assessedProposals() {
      return this.proposals.filter(p => (this.assessed.indexOf(p.id) > -1))
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
    border: 2px solid black;
    transform: translateY(calc(100% - 38px));
    width: 500px;
    background: #fff;
    @include mobile {
      width: calc(100% - 30px);
      right: 15px;
    }
    &.open {
      transform: translateY(0);
    }
    .header {
      padding: 10px 20px;
      background: #000;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
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
        .title {
          flex-grow: 1;
        }
        &:nth-child(2n + 1) {
          background: #f1f1f1;
        }
      }
    }
  }
</style>
