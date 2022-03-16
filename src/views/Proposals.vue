<template>
  <div class="proposals">
    <p class="title">Proposals List</p>
    <c-filter :categories="categories" :tags="tags" />
    <div class="content box">
      <proposal-preview
        :proposal="proposal"
        :key="`proposal-${proposal.id}`"
        v-for="proposal in filteredProposals" />
      <p class="is-size-4" v-if="filteredProposals.length === 0">
        No results for current selection. Please adjust the filter criteria.
      </p>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import CFilter from '@/components/Filter'
import ProposalPreview from '@/components/ProposalPreview'
import proposals from '../assets/data/f8/proposals.json'
import tags from '../assets/data/f8/tags.json'
import categories from '../assets/data/f8/categories.json'

export default {
  data() {
    return {
      proposals: proposals,
      categories: categories,
      tags: tags
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
