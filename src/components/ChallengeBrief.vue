<template>
  <div class="checklist-wrapper">
    <div class="modal-card" style="width: 100%">
      <header class="modal-card-head">
        <p class="modal-card-title"><span v-if="challenge">{{challenge.title}} - </span>Challenge brief</p>
      </header>
      <section class="modal-card-body markdown" v-if="brief">
        <p class="is-size-5">{{brief.text}}</p>
        <div class="collapses-wrapper mt-6"
          v-if="brief.tabs">
          <b-collapse
            class="card"
            animation=""
            v-for="(collapse, index) of brief.tabs"
            :key="index"
            :open="isOpen == index"
            @open="isOpen = index">
            <template #trigger="props">
              <div
                class="card-header"
                role="button">
                <p class="card-header-title">{{ collapse.title }}</p>
                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
              </div>
            </template>
            <div class="card-content">
              <div class="content">
                {{ collapse.content }}
              </div>
            </div>
          </b-collapse>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChallengeBrief',
  props: ['challenge'],
  components: {
  },
  data() {
    return {
      brief: '',
      isOpen: 0
    }
  },
  methods: {
    updateText() {
      this.axios({
        url:`data/challenges/f8/${this.challenge.id}.json`,
        baseURL: process.env.VUE_APP_BASE_URL
      }).then((res) => {
        this.brief = res.data
      });
    }
  },
  watch: {
    challenge() {
      this.updateText()
    }
  },
  mounted() {
    this.updateText()
  }
}
</script>
<style lang="scss">
.collapses-wrapper .card-content .content {
  white-space: pre-line;
}
</style>
