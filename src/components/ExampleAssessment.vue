<template>
  <div class="wrapper">
    <div class="content columns">
      <div class="column">
        <b v-if="assessment.is_cs">{{ questions[4].full}}</b>
        <b v-if="!assessment.is_cs">{{ questions[1].full}}</b>
        <p>{{ assessment.q0 }}</p>
      </div>
      <div class="column is-narrow">
        <b-rate v-model="assessment.q0r" disabled />
      </div>
    </div>
    <div class="content columns">
      <div class="column">
        <b v-if="assessment.is_cs">{{ questions[5].full}}</b>
        <b v-if="!assessment.is_cs">{{ questions[2].full}}</b>
        <p>{{ assessment.q1 }}</p>
      </div>
      <div class="column is-narrow">
        <b-rate v-model="assessment.q1r" disabled />
      </div>
    </div>
    <div class="content columns">
      <div class="column">
        <b v-if="assessment.is_cs">{{ questions[6].full}}</b>
        <b v-if="!assessment.is_cs">{{ questions[3].full}}</b>
        <p>{{ assessment.q2 }}</p>
      </div>
      <div class="column is-narrow">
        <b-rate v-model="assessment.q2r" disabled />
      </div>
    </div>
  </div>
</template>

<script>

import questions from "@/assets/data/f6/questions.json";

export default {
  data(){
    return {
      questions: questions
    }
  },
  props: ['assessment', 'isChallengeSetting'],
}

</script>

<style lang="scss">
</style>
