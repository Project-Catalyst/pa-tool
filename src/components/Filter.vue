<template>
  <div class="filter-wrapper mb-5">
    <label class="mb-2 is-flex is-flex-wrap-wrap">
      <span class="has-text-weight-bold mr-3">Filter proposals by challenge:</span>
      <b-button type="is-warning is-light" size="is-small" @click="clearFilter()">Clear filters</b-button>
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
        <template v-slot="props">
          {{props.option.title}} ({{props.option.count}})
        </template>
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

    <label class="mb-2 is-flex is-flex-wrap-wrap">
      <span class="has-text-weight-bold mr-3">Filter proposals by tag:</span>
    </label>
    <b-taginput
        ref="tagInput"
        :value="selectedTags"
        :data="filteredTags"
        icon="label"
        field="title"
        autocomplete
        :open-on-focus="true"
        placeholder="Select a tag"
        max-height="450px"
        @add="selectTag"
        @remove="unselectTag"
        @typing="getFilteredTags">
        <template v-slot="props">
          {{props.option.title}}
        </template>
        <template #empty>
            There are no tags
        </template>
    </b-taginput>
</div>
</template>



<script>

import { mapState } from "vuex";

export default {
  name: 'CFilter',
  props: ['categories', 'tags'],
  data() {
    return {
      filteredChallenges: [],
      filteredTags: []
    }
  },
  computed: {
    ...mapState({
      selectedChallenges: (state) => state.filters.selectedChallenges,
      selectedTags: (state) => state.filters.selectedTags,
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
    selectTag(tag) {
      this.$store.commit('filters/addTag', tag)
    },
    unselectTag(tag) {
      this.$store.commit('filters/removeTag', tag)
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
        id: 0,
        count: 944
      }, ...filteredChallenges]
    },
    getFilteredTags(text) {
      if (text) {
        this.filteredTags = this.tags.filter((option) => {
          return option.title
              .toString()
              .toLowerCase()
              .indexOf(text.toLowerCase()) >= 0
        })
      } else {
        this.filteredTags = this.tags
      }
    }
  },
  mounted() {
    this.getFilteredChallenges()
    this.getFilteredTags()
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
