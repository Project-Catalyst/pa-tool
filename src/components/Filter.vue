<template>
  <div class="filter-wrapper mb-5">
    <label class="mb-2 is-flex is-flex-wrap-wrap">
      <span class="has-text-weight-bold mr-3"
        >Filter proposals by challenge:</span
      >
      <b-button
        type="is-warning is-light"
        size="is-small"
        @click="clearFilter()"
        >Clear filters</b-button
      >
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
      @typing="getFilteredChallenges"
    >
      <template v-slot="props">
        {{ props.option.title }} ({{ props.option.count }})
      </template>
      <template #empty> There are no items </template>
    </b-taginput>

    <b-field class="mt-3" label="Filter by title">
      <b-input
        placeholder="Search for (min 3 char)..."
        type="search"
        icon="magnify"
        icon-clickable
        v-model="keyword"
      >
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
      @typing="getFilteredTags"
    >
      <template v-slot="props">
        {{ props.option }}
      </template>
      <template #empty> There are no tags </template>
    </b-taginput>

    <label class="mb-2 is-flex is-flex-wrap-wrap">
      <span class="has-text-weight-bold mr-3"
        >Filter proposals budget is more than:</span
      >
    </label>
    <b-numberinput
      v-model="minPrice"
      :min="0"
      :max="Number.MAX_SAFE_INTEGER"
      :step="1000"
      expanded
      controls-position="compact"
      controls-alignment="right"
      @input="updateMinPrice"
    ></b-numberinput>

    <label class="mb-2 is-flex is-flex-wrap-wrap">
      <span class="has-text-weight-bold mr-3"
        >Filter proposals budget is less than:</span
      >
    </label>
    <b-numberinput
      v-model="maxPrice"
      :min="0"
      :max="Number.MAX_SAFE_INTEGER"
      :step="1000"
      expanded
      controls-position="compact"
      controls-alignment="right"
      @input="updateMaxPrice"
    ></b-numberinput>
  </div>
</template>



<script>
import { mapState } from "vuex";

export default {
  name: "CFilter",
  props: ["categories", "tags"],
  data() {
    return {
      filteredChallenges: [],
      filteredTags: [],
    };
  },
  computed: {
    ...mapState({
      selectedChallenges: (state) => state.filters.selectedChallenges,
      selectedTags: (state) => state.filters.selectedTags,
    }),
    keyword: {
      get() {
        return this.$store.state.filters.keyword;
      },
      set(value) {
        this.$store.commit("filters/setKeyword", value);
      },
    },
    minPrice: {
      get() {
        return this.$store.state.filters.minPrice;
      },
      set(value) {
        this.$store.commit("filters/setMinPrice", value);
      },
    },
    maxPrice: {
      get() {
        return this.$store.state.filters.maxPrice;
      },
      set(value) {
        this.$store.commit("filters/setMaxPrice", value);
      },
    },
  },
  watch: {},
  methods: {
    selectChallenge(challenge) {
      this.$store.commit("filters/addChallenge", challenge);
    },
    unselectChallenge(challenge) {
      this.$store.commit("filters/removeChallenge", challenge);
    },
    selectTag(tag) {
      this.$store.commit("filters/addTag", tag);
    },
    unselectTag(tag) {
      this.$store.commit("filters/removeTag", tag);
    },
    clearFilter() {
      this.$store.commit("filters/resetState");
    },
    getFilteredChallenges(text) {
      let filteredChallenges;
      if (text) {
        filteredChallenges = this.categories.filter((option) => {
          return (
            option.title.toString().toLowerCase().indexOf(text.toLowerCase()) >=
            0
          );
        });
      } else {
        filteredChallenges = this.categories;
      }
      this.filteredChallenges = [...filteredChallenges];
    },
    getFilteredTags(text) {
      if (text) {
        this.filteredTags = this.tags.filter((option) => {
          return option.toLowerCase().indexOf(text.toLowerCase()) >= 0;
        });
      } else {
        this.filteredTags = this.tags;
      }
    },
    getFilteredPrice(text) {
      if (text) {
        this.filteredTags = this.tags.filter((option) => {
          return option.toLowerCase().indexOf(text.toLowerCase()) >= 0;
        });
      } else {
        this.filteredTags = this.tags;
      }
    },
    updateMinPrice(value) {
      this.$store.commit("filters/setMinPrice", value)
    },
    updateMaxPrice(value) {
      this.$store.commit("filters/setMaxPrice", value)
    },
  },
  mounted() {
    this.getFilteredChallenges();
    this.getFilteredTags();
  },
};
</script>


<style scoped lang="scss">
.multiselect__tags-wrap .tag {
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
