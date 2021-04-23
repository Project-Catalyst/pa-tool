<template>
  <div class="filter-wrapper mb-5">
    <b-field label="Filter proposals by challenge">
      <multiselect
        v-model="selected"
        :options="categories"
        :searchable="false"
        :multiple="true"
        label="title"
        track-by="id">
        <template slot="tag"  slot-scope="props">
          <b-tag
            type="is-primary"
            closable
            aria-close-label="Close tag"
            @close="props.remove(props.option)">
            {{ props.option.title }}
          </b-tag>
        </template>
      </multiselect>
    </b-field>
  </div>
</template>



<script>

import Multiselect from 'vue-multiselect'

export default {
  name: 'CFilter',
  props: ['categories'],
  components: { Multiselect },
  data() {
    return {
      selected: null
    }
  },
  watch: {
    selected(newVal) {
      this.$emit('filter-changed', newVal)
    }
  },
  mounted() {
    this.selected = this.categories
  }
}
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped lang="scss">
  .multiselect__tags-wrap .tag {
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
