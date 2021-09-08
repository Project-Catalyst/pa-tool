<template>
  <div id="app">
    <b-navbar class="is-primary" :mobile-burger="false">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          <img src="@/assets/images/catalyst.png" alt="Project Catalyst" />
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="a" target="_blank" href="https://www.youtube.com/watch?v=bXLwUHmCyzA">
          Tutorial for CAs
        </b-navbar-item>
        <b-navbar-item tag="a" target="_blank" href="https://docs.google.com/document/d/1g-iZhDlKhUBZkui1uv8NVNfJC4oVD3JtR-P6Fue7XPU/edit#">
          Assessment Guide
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="section container">
      <div class="filter">
        <c-filter :categories="categories" @filter-changed="updateFilter" />
      </div>
      <div class="content-wrapper">
        <router-view/>
      </div>
      <div class="buttons is-centered">
        <b-button
          type="is-primary"
          size="is-medium"
          @click="suggest">
          {{suggestText}}
        </b-button>
      </div>
    </div>
    <assessed :proposals="proposals" />
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Made by Catalyst Community for the Catalyst Community</p>
        <p><img class="aim-logo" src="@/assets/images/aim-logo.png" alt="Cardano AIM" /></p>
        <b-button
          label="Feedback"
          type="is-primary"
          icon-left="message-reply-text"
          tag="a"
          target="_blank"
          href="https://docs.google.com/forms/d/1VVnubvpfpG-iXx3tic739o6EgcdlJOyAC9dRu1sNWTI/edit"
          >
        </b-button>
      </div>
    </footer>
  </div>
</template>

<script>
import categories from './assets/data/categories.json'
import proposals from './assets/data/proposals.json'
import CFilter from '@/components/Filter'
import Assessed from '@/components/Assessed'

export default {
  data() {
    return {
      categories: categories,
      proposals: proposals,
      currentFilter: [],
      currentIndex: 0,
      interval: false
    }
  },
  components: {
    CFilter,
    Assessed
  },
  methods: {
    updateFilter(newVal) {
      this.currentIndex = 0
      this.currentFilter = newVal
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home' })
      }
    },
    suggest() {
      if (this.filteredProposals[this.currentIndex]) {
        this.$router.push({ name: 'Proposal', params:{ id: this.filteredProposals[this.currentIndex].id }})
        this.currentIndex = this.currentIndex + 1
      } else {
        this.currentIndex = 0
      }
    },
    remoteUpdate() {
      this.axios.get('proposals.json').then((res) => {
        let remoteProposals = res.data
        remoteProposals.forEach((r) => {
          let selected = this.proposals.find((p) => p.id === r.id)
          if (selected) {
            selected.no_assessments = r.assessments_count
          }
        })
      })
    }
  },
  computed: {
    filteredProposals() {
      let proposals = this.proposals
      if (this.currentFilter.length > 0) {
        let filters = this.currentFilter.map(el => el.id)
        proposals = this.proposals.filter(p => filters.indexOf(p.category) > -1)
      }
      return proposals
        .sort(() => (Math.random() > .5) ? 1 : -1)
        .sort(
          (a,b) => (a.no_assessments > b.no_assessments) ? 1 : ((b.no_assessments > a.no_assessments) ? -1 : 0)
        )
    },
    suggestText() {
      return (this.$route.name === 'Home') ? 'Suggest Proposal' : 'Give me another'
    }
  },
  mounted() {
    this.remoteUpdate()
    this.interval = setInterval(() => {
      this.remoteUpdate()
    }, 15 * 60 * 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss">
@import './assets/sass/base/mixins';
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.aim-logo {
  width: 150px;
}
</style>
