<template>
  <b-modal v-model="isModalActive" has-modal-card :can-cancel="false">
    <div class="countdown">
      <div class="modal-card" style="width: auto">
        <div class="modal-card-body has-text-centered">
          <div class="title mb-6">Project Catalyst Fund7 Assess Stage<br />has not started yet!<br />Use the tool for testing!</div>
          <div class="counter-box mb-6" v-if="secsToRegistration > 0">
            <span class="is-size-4 has-text-weight-bold">Community Advisors registrations starts in: </span>
            <counter :d="toReg.d" :h="toReg.h" :m="toReg.m" :s="toReg.s" />
            <span class="is-size-4 has-text-weight-bold">{{ fRegistrationsStart }} UTC</span>
          </div>
          <div class="counter-box" v-if="secsToRegistration > 0">
            <span class="is-size-4 has-text-weight-bold">Assess Stage starts in: </span>
            <counter :d="toAssess.d" :h="toAssess.h" :m="toAssess.m" :s="toAssess.s" />
            <span class="is-size-4 has-text-weight-bold">{{ fAssessStart }} UTC</span>
          </div>
          </div>
        <footer class="modal-card-foot">
          <b-button label="Close" @click="modalActivable = false" />
          <div class="subtitle ml-6">
            In the meantime take a look at the <a href="https://cardanocataly.st/en/community-advisor/guide.html" target="_blank">
              CA Assessment Guide</a>.
          </div>
        </footer>
      </div>
    </div>
  </b-modal>
</template>

<script>
// @ is an alias to /src

import Counter from '@/components/Counter'

export default {
  name: 'Countdown',
  components: {
    Counter
  },
  data() {
    return {
      registrationStartsUTC: this.$dayjs.utc('2021-12-02 11:00:00', 'YYYY-MM-DD HH:mm:ss'),
      assessStartsUTC: this.$dayjs.utc('2021-12-09 11:00:00', 'YYYY-MM-DD HH:mm:ss'),
      now: this.$dayjs().utc().unix(),
      modalActivable: true,
      interval: false
    }
  },
  methods: {
    getNow() {
      this.now = this.$dayjs().utc().unix()
    },
    getDuration(time) {
      let duration = this.$dayjs.duration(time, "seconds")
      return {
        d: duration.days(),
        h: duration.hours(),
        m: duration.minutes(),
        s: duration.seconds()
      }
    }
  },
  computed: {
    isModalActive() {
      return (this.secsToAssess > 0) && this.modalActivable
    },
    secsToRegistration() {
      return this.registrationStartsUTC.unix() - this.now
    },
    secsToAssess() {
      return this.assessStartsUTC.unix() - this.now
    },
    toReg() {
      return this.getDuration(this.secsToRegistration)
    },
    toAssess() {
      return this.getDuration(this.secsToAssess)
    },
    fRegistrationsStart() {
      return this.registrationStartsUTC.format('DD MMM YYYY HH:mm')
    },
    fAssessStart() {
      return this.assessStartsUTC.format('DD MMM YYYY HH:mm')
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.getNow()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.interval)
  }
}
</script>
<style lang="scss">
.countdown {
}
</style>
