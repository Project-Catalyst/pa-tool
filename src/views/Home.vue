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
        assessments, based on the category filter that you have selected.
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
    </b-message>
    <b-message type="is-info" has-icon>
      <p><b>Useful links for Community Advisors</b></p>
      <p>
        Watch <a href="https://www.youtube.com/watch?v=cOXRP68kj7I&t=2679s" target="_blank">this video</a> for CA guidelines<br />
        Please read the <a href="https://docs.google.com/document/d/16aq9dNudJ5S3TEVQhBgRznTCoaF8SQezyActtVhec8E/edit" target="_blank">onboarding document</a><br />
        Read our <a href="https://docs.google.com/document/d/1QkdaFK1tigrSI40iMeV3UP9GyTGsoqVmCUp7OJz0WFs/edit" target="_blank">Community advisor guidelines</a><br />
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
