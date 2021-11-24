<template>
  <div class="filter-wrapper mb-5">
    <label class="mb-2 is-flex is-flex-wrap-wrap">
      <span class="has-text-weight-bold mr-3">Filter proposals by challenge:</span>
      <b-button type="is-primary" size="is-small" @click="clearFilter()">Clear filters</b-button>
    </label>
    <b-taginput
        ref="tagInput"
        :value="selectedChallenges"
        :data="filteredChallenges"
        icon="label"
        field="title"
        autocomplete
        :open-on-focus="true"
        placeholder="Select a challenge"
        max-height="450px"
        @add="selectChallenge"
        @remove="unselectChallenge"
        @typing="getFilteredChallenges">
        <template #empty>
            There are no items
        </template>
    </b-taginput>
    <b-field class="mt-3" label="Filter by title">
      <b-input placeholder="Search for (min 3 char)..."
        type="search"
        icon="magnify"
        icon-clickable
        v-model="keyword">
      </b-input>
    </b-field>
</div>
</template>



<script>

import { mapState } from "vuex";

export default {
  name: 'CFilter',
  props: ['categories'],
  data() {
    return {
      filteredChallenges: []
    }
  },
  computed: {
    ...mapState({
      selectedChallenges: (state) => state.filters.selectedChallenges,
    }),
    keyword: {
      get() {
        return this.$store.state.filters.keyword
      },
      set(value) {
        this.$store.commit('filters/setKeyword', value)
      }
    }
  },
  watch: {
  },
  methods: {
    selectChallenge(challenge) {
      this.$store.commit('filters/addChallenge', challenge)
    },
    unselectChallenge(challenge) {
      this.$store.commit('filters/removeChallenge', challenge)
    },
    clearFilter() {
      this.$store.commit('filters/resetState')
    },
    getFilteredChallenges(text) {
      let filteredChallenges
      if (text) {
        filteredChallenges = this.categories.filter((option) => {
          return option.title
              .toString()
              .toLowerCase()
              .indexOf(text.toLowerCase()) >= 0
        })
      } else {
        filteredChallenges = this.categories
      }
      this.filteredChallenges = [{
        title: "All",
        id: 0
      }, ...filteredChallenges]
    }
  },
  mounted() {
    this.getFilteredChallenges()
  }
}
</script>


<style scoped lang="scss">
  .multiselect__tags-wrap .tag {
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
