<template lang="pug">
include ../styles/mixins
v-section(:title="question.title", v-bind="$attrs"): +div('Content')(v-html="question.content")
</template>

<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules } from 'nuxt-fela';

import { Question } from '~/definitions';

@Component
export default class FaqQuestion extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================
  
  @Prop() question: Question;

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Content: { textAlign: 'justify' },
  };
}
</script>
