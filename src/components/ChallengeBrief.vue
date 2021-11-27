<template>
  <div class="checklist-wrapper">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title"><span v-if="challenge">{{challenge.title}} - </span>Challenge brief</p>
      </header>
      <section class="modal-card-body markdown" v-if="brief">
        <p><strong>{{brief.text}}</strong></p>
        <b-tabs class="mt-4" type="is-boxed" v-model="activeTab" v-if="brief.tabs">
          <b-tab-item
            v-for="tab, idx in brief.tabs"
            :key="`tab-${idx}`"
            :label="tab.title">
            <div class="tab-text">
              <p>{{tab.content}}</p>
            </div>
          </b-tab-item>
        </b-tabs>
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
      activeTab: 0
    }
  },
  methods: {
    updateText() {
      this.axios({
        url:`data/challenges/f7/${this.challenge.id}.json`,
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
.tab-text {
  p {
    white-space: pre-line;
  }
}
</style>
