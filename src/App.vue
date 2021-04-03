<template>
  <div id="app">
    <div class="logo">
      <router-link :to="{ name: 'Home' }">
        <img src="./assets/logo.png" />
      </router-link>
    </div>
    <div class="filter">
      <c-filter :categories="categories" @filter-changed="updateFilter" />
    </div>
    <div class="content-wrapper">
      <router-view/>
    </div>
    <div class="button" @click="suggest">
      Suggest Proposal
    </div>
  </div>
</template>

<script>
import categories from './assets/data/categories.json'
import proposals from './assets/data/proposals.json'
import CFilter from '@/components/Filter'

export default {
  data() {
    return {
      categories: categories,
      proposals: proposals,
      currentFilter: [],
      currentIndex: 0
    }
  },
  components: {
    CFilter
  },
  methods: {
    updateFilter(newVal) {
      this.currentIndex = 0
      this.currentFilter = newVal
      this.$router.push({ name: 'Home' })
    },
    suggest() {
      this.$router.push({ name: 'Proposal', params:{ id: this.filteredProposals[this.currentIndex].id }})
      this.currentIndex = this.currentIndex + 1
    }
  },
  computed: {
    filteredProposals() {
      let proposals = this.proposals
      if (this.currentFilter.length > 0) {
        let filters = this.currentFilter.map(el => el.id)
        proposals = this.proposals.filter(p => filters.indexOf(p.category) > -1)
      }
      return proposals.sort((a,b) => (a.no_assessments > b.no_assessments) ? 1 : ((b.no_assessments > a.no_assessments) ? -1 : 0))
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  max-width: 600px;
  width: 100%;
  margin: 0px auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f1f1f1;
  min-height: 100vh;
  padding: 0 30px;
  .logo {
    width: 150px;
    margin: 0px auto;
    img {
      width: 100%;
    }
  }
  .content-wrapper {
    padding: 0;
  }
}

.button {
  padding: 10px;
  border: 2px solid #000;
  width: 150px;
  border-radius: 8px;
  margin: 0px auto;
  text-align: center;
  font-weight: bold;
  display: block;
  text-decoration: none;
  margin-bottom: 20px;
  &, &:visited {
    color: #000;
  }
  &:hover {
    color: #fff;
    background: #000;
    cursor: pointer;
  }

}

</style>
