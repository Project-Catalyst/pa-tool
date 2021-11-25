<template>
  <div class="home">
    <b-message>
      <p class="mb-1">
        This is a tool created from need. A way for Community Advisors (CA) to
        be assigned a proposal and to keep track of the proposals already
        assessed.
      </p>
      <p><b>How it works</b></p>
      <p>
        <b>By clicking the button "Suggest Proposal"</b> below, the system will suggest a proposal with a low number of
        assessments, based on the challenge filter that you have selected.
      </p>
      <p>
        Data is updated periodically from feeds from Ideascale to refresh the
        list.
      </p>
      <p class="mb-1">
        Using the "Proposal reviewed" checkbox you can keep track of the proposal
        that you've already assessed. The "assessed proposals" will appear on
        the bottom of the screen.
      </p>
      <p>
        <strong>Disclaimer</strong>: the data about the assessment count is
        <strong>not updated</strong> in real time and therefore is likely
        different from those shown in IdeaScale.
      </p>
    </b-message>
    <b-message type="is-info" has-icon>
      <p><b>Useful links for Community Advisors</b></p>
      <p>
        Please read the <a href="https://docs.google.com/document/d/16aq9dNudJ5S3TEVQhBgRznTCoaF8SQezyActtVhec8E" target="_blank">onboarding document</a><br />
        Read the <a href="https://docs.google.com/document/d/1g-iZhDlKhUBZkui1uv8NVNfJC4oVD3JtR-P6Fue7XPU/edit" target="_blank">Community Advisor Assessment Guide</a><br />
        Watch the <a href="https://vimeo.com/600295406" target="_blank">the Tutorial for Community Advisors</a><br />
        Join the <a href="https://t.me/CatalystCommunityAdvisors" target="_blank">community advisor TG support channel</a>
      </p>
    </b-message>
    <suggest />
  </div>
</template>

<script>
// @ is an alias to /src
import Suggest from '@/components/Suggest'

export default {
  name: 'Home',
  components: {
    Suggest
  }
}
</script>
<style lang="scss">
.home {
}
</style>
