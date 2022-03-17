<template>
  <div class="home">
    <b-message>
      <p class="mb-1">
        This is a community made tool to assist with the facilitation of the Community Advisor (CA) assessment process. It allows CAs to be assigned a proposal and to keep track of the overall proposals already assessed.
      </p>
      <p><b>How it works</b></p>
      <p>
        <b>By clicking the "Suggest Proposal" button</b> the system will suggest a proposal with a low number of assessments. If it interests you you can assess it, or you can click the button again and it'll provide you with another low assessed proposal. You can also adjust which challenges you will see by adjusting the filter that you select.
      </p>
      <p>
        Data from a feed from Ideascale is used to refresh the information in this tool periodically.
      </p>
      <p class="mb-1">
        Using the "I confirm that I have submitted my assessments into Ideascale." checkbox you can keep track of the proposal that you've already assessed. The number will appear in "My assessments" on the top right.
      </p>
      <p>
        <strong>Disclaimer</strong>: the data about the assessment count is
        <strong>not updated</strong> in real time and therefore is likely
        different from those shown in IdeaScale - it also includes blanks.
      </p>
    </b-message>
    <b-message type="is-info" has-icon>
      <p><b>Useful links for Community Advisors</b></p>
      <p>
        Read the <a href="https://docs.google.com/document/d/1g-iZhDlKhUBZkui1uv8NVNfJC4oVD3JtR-P6Fue7XPU/edit" target="_blank">Community Advisor Assessment Guide</a><br />
        Watch the <a href="https://www.youtube.com/playlist?list=PLDLKmC_jWczVff7Gv6J5nmKLl52mVCT9q" target="_blank">the Catalyst School workshops for Community Advisors</a><br />
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
