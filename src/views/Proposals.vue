<template>
  <div class="proposals">
    <p class="title">Proposals List</p>
    <c-filter :categories="categories" />
    <div class="content box">
      <proposal-preview
        :proposal="proposal"
        :key="`proposal-${proposal.id}`"
        v-for="proposal in filteredProposals" />
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import CFilter from '@/components/Filter'
import ProposalPreview from '@/components/ProposalPreview'
import proposals from '../assets/data/proposals.json'
import categories from '../assets/data/categories.json'

export default {
  data() {
    return {
      proposals: proposals,
      categories: categories
    }
  },
  components: {
    CFilter,
    ProposalPreview
  },
  computed: {
    ...mapGetters("filters", ["filteredProposals"])
  },
  methods: {
  },
  mounted() {
  }

}
</script>

<style lang="scss">
</style>
