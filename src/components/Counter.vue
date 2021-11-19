<template>
  <div class="counter has-text-bold is-flex is-justify-content-center is-family-monospace">
    <span class="days">{{pd}}</span>
    <span class="unit">days</span>
    <span class="hours">{{ph}}</span>
    <span class="unit">h</span>
    <span class="minutes">{{pm}}</span>
    <span class="unit">m</span>
    <span class="seconds">{{ps}}</span>
    <span class="unit">s</span>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Counter',
  props: ['d', 'h', 'm', 's'],
  methods: {
    pad(s) {
      if(String(s).length === 1) {
        return '0' + s
      }
      return s
    }
  },
  computed: {
    pd() {
      return this.pad(this.d)
    },
    ph() {
      return this.pad(this.h)
    },
    pm() {
      return this.pad(this.m)
    },
    ps() {
      return this.pad(this.s)
    },
  }
}
</script>
<style lang="scss">
.counter {
  font-size: 7vw;
  line-height: 7vw;
  .unit {
    font-size: 3vw;
  }
}
</style>
