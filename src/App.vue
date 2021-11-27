<template>
  <div id="app">
    <b-navbar class="is-primary" fixed-top :mobile-burger="true">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          <img src="@/assets/images/catalyst.png" alt="Project Catalyst" />
        </b-navbar-item>
        <b-navbar-item class="has-text-weight-bold" tag="a" target="_blank" href="https://cardanoscan.io/pool/b61f05ec1e907ab9b069eaec6c664056c16f56cab59076109c66d2ae">
          Stake with [AIM] pool
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-dropdown label="Proposals">
          <b-navbar-item @click="next">
            Suggest next
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ name: 'Proposals' }">
            List
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item tag="router-link" :to="{ name: 'ExampleAssessments' }">
          Example Assessments
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'Assessed' }">
          My Assessments
        </b-navbar-item>
        <b-navbar-dropdown right label="CA Resources">
          <b-navbar-item tag="a" target="_blank" href="https://docs.google.com/document/d/16aq9dNudJ5S3TEVQhBgRznTCoaF8SQezyActtVhec8E">
            Onboarding document
          </b-navbar-item>
          <b-navbar-item tag="a" target="_blank" href="https://vimeo.com/600295406">
            Tutorial for CAs
          </b-navbar-item>
          <b-navbar-item tag="a" target="_blank" href="https://docs.google.com/document/d/1g-iZhDlKhUBZkui1uv8NVNfJC4oVD3JtR-P6Fue7XPU">
            Assessment Guide
          </b-navbar-item>
          <b-navbar-item tag="a" target="_blank" href="https://t.me/CatalystCommunityAdvisors">
            Telegram CAs chat
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
    <div class="section container">
      <div class="content-wrapper">
        <router-view/>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Made by Catalyst Community for the Catalyst Community</p>
        <p><img class="aim-logo" src="@/assets/images/aim-logo.png" alt="Cardano AIM" /></p>
        <p class="is-size-4 has-text-weight-bold">
          <a href="https://cardanoscan.io/pool/b61f05ec1e907ab9b069eaec6c664056c16f56cab59076109c66d2ae" target="_blank">
            Stake with [AIM] pool
          </a>
        </p>
        <p class="icons">
          <a href="https://github.com/Project-Catalyst/ca-tool" target="_blank">
            <b-icon icon="github" size="small" />
          </a>
          <a href="https://twitter.com/AimCardano" target="_blank">
            <b-icon icon="twitter" size="small" />
          </a>
          <a href="https://t.me/joinchat/Ivl50eWG7r0zODI1" target="_blank">
            <b-icon icon="telegram" size="small" />
          </a>
        </p>
        <b-button
          label="Feedback"
          type="is-primary"
          icon-left="message-reply-text"
          tag="a"
          target="_blank"
          href="https://forms.gle/7AhvFHeuL5r3VtkBA"
          >
        </b-button>
      </div>
    </footer>
    <landing />
  </div>
</template>

<script>


import Landing from '@/views/Landing'

export default {
  components: {
    Landing
  },
  methods: {
    next() {
      this.$store.dispatch('filters/getNext', false)
    }
  }
}
</script>

<style lang="scss">
@import './assets/sass/base/mixins';
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.aim-logo {
  width: 150px;
}
</style>
