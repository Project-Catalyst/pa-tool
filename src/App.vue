<template>
  <div id="app">
    <b-navbar class="is-primary" :mobile-burger="true">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          <img src="@/assets/images/catalyst.png" alt="Project Catalyst" />
        </b-navbar-item>
      </template>
      <template #end>
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
      </template>
    </b-navbar>
    <div class="section container">
      <div class="content-wrapper">
        <router-view/>
      </div>
      <suggest />
    </div>
    <assessed />
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Made by Catalyst Community for the Catalyst Community</p>
        <p><img class="aim-logo" src="@/assets/images/aim-logo.png" alt="Cardano AIM" /></p>
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


import Assessed from '@/components/Assessed'
import Suggest from '@/components/Suggest'
import Landing from '@/views/Landing'

export default {
  components: {
    Assessed,
    Landing,
    Suggest
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
