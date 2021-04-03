<template>
  <div class="filter-wrapper">
    <multiselect v-model="selected" :options="categories" :multiple="true" label="title" track-by="id"></multiselect>
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
  }
}
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped lang="scss">
  .filter-wrapper {
    padding: 30px 0;
  }
</style>
