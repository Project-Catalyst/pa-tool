<template>
  <div :class="{small: small, 'is-family-monospace': !small}"
    class="counter has-text-bold is-flex is-justify-content-center ">
    <span v-if="text" class="text">{{text}}</span>
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
  props: ['d', 'h', 'm', 's', 'small', 'text'],
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
.counter:not(.small) {
  font-size: 5vw;
  line-height: 5vw;
  .unit {
    font-size: 3vw;
  }
}
.counter.small {
  span {
    &.text, &.unit {
      margin-right: 4px;
    }
  }
}
</style>
