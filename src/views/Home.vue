<template>
  <div class="home">
    <b-message>
      <p>
        This is a tool created from need. A way for Community Advisors (CA) to
        be assigned a proposal and to keep track of the proposals already
        assessed.
      </p>
    </b-message>
    <b-message>
      <p><b>How it works</b></p>
      <p>
        The system will suggest a proposal with a low number of
        assessments, based on the challenge filter that you have selected.
      </p>
      <p>
        Data is updated periodically from feeds from Ideascale to refresh the
        list.
      </p>
      <p>
        Using the "Mark as reviewed" button you can keep track of the proposal
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
        Watch the <a href="https://www.youtube.com/watch?v=bXLwUHmCyzA" target="_blank">the Tutorial for Community Advisors by The Catalyst School</a><br />
        Join the <a href="https://t.me/CatalystCommunityAdvisors" target="_blank">community advisor TG support channel</a>
      </p>
    </b-message>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
<style lang="scss">
.home {
}
</style>
