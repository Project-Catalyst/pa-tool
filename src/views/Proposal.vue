<template>
  <div class="proposal">
    <h1>{{proposal.title}}</h1>
    <h3>Problem statement</h3>
    <div class="description">{{proposal.description}}</div>
    <div>No assessments: <b>{{proposal.no_assessments}}</b></div>
    <a class="button" :href="proposal.url" target="blank">
      Take me there
    </a>
  </div>
</template>


<script>
import proposals from '../assets/data/proposals.json'

export default {
  data() {
    return {
      proposals: proposals
    }
  },
  computed: {
    proposal() {
      let filtered = this.proposals.filter(p => (p.id === parseInt(this.$route.params.id)))
      if (filtered.length) {
        return filtered[0]
      }
      return filtered
    }
  }

}
</script>

<style lang="scss">
.description {
  margin-bottom: 40px;
}
</style>
