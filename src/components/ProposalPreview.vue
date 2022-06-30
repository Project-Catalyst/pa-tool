<template>
  <div class="proposal-preview">
    <div class="columns is-multiline is-vcentered">
      <div class="column is-10">
        <div class="is-size-6 has-text-weight-bold">{{category.title}}</div>
        <router-link
          class="is-size-5"
          :to="{ name: 'Proposal', params: { id: proposal.id} }">
          {{proposal.title}}
        </router-link>
        <div class="no">
          No. assessments: {{no_ass}}
        </div>
      </div>
      <div class="column is-2">
        <div class="buttons">
          <b-button
            tag="a"
            size="is-small"
            :href="proposal.url"
            icon-left="link"
            type="is-link"
            target="_blank">
            Open in IdeaScale
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import categories from '../assets/data/f9/categories.json'

export default {
  name: 'ProposalPreview',
  props: ['proposal'],
  components: {
  },
  data() {
    return {
      categories: categories
    }
  },
  computed: {
    category() {
      if (this.proposal) {
        let category = this.categories.filter(c => (c.id === parseInt(this.proposal.category)))
        if (category.length) {
          return category[0]
        }
      }
      return ''
    },
    no_ass() {
      return this.proposal.no_assessments || 0
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>


<style lang="scss">
</style>
