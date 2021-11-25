<template>
  <div class="checklist-wrapper">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title"><span v-if="challenge">{{challenge.title}} - </span>Challenge brief</p>
      </header>
      <section class="modal-card-body markdown">
        {{text}}
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
      text: ''
    }
  },
  mounted() {
    this.axios({
      url:`data/challenges/${this.challenge.id}.md`,
      baseURL: process.env.VUE_APP_BASE_URL
    }).then((res) => {
      this.text = res.data
    });
  }
}
</script>

<style lang="scss">
  .modal-card-body.markdown {
    .markdown-body {
      white-space: initial !important;
      font-size: 16px !important;
      h1, h2, h3, h4, h5, h6 {
        margin-bottom: 10px;
      }
      ul, ol {
        list-style: initial;
      }
    }
  }
</style>
