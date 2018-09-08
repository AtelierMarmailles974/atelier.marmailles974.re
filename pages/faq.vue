<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero")
  template(v-for="i in count")
    +div('Row')(v-if="hasThirdQuestionsRow(i)")
      +faq-question('Item')(:question="getThirdQuestionFromRow(i)", align="right", :divider="thirdDivider")
      faq-question(:question="getThirdQuestionFromRow(i, 1)", :ct="darkerTheme", :divider="thirdDivider")
      +faq-question('Item')(:question="getThirdQuestionFromRow(i, 2)", align="left", :divider="thirdDivider")
    faq-question(:question="getFullQuestionFromRow(i)", ct="greyVVL")
    +div('Row')(v-if="hasHalfQuestionsRow(i)")
      +faq-question('Item')(:question="getHalfQuestionFromRow(i)", :ct="darkerTheme", align="right", :divider="halfDivider")
      +faq-question('Item')(:question="getHalfQuestionFromRow(i, 1)", align="left", :divider="halfDivider")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Rules } from 'nuxt-fela';

import FaqQuestion from '~/components/faq-question.vue';
import { hero } from '~/content/pages/faq.json';
import questions from '~/content/questions';
import { Hero, Question } from '~/definitions';
import { BreakpointMixin } from '~/mixins/breakpoint';
import { ColorMixin } from '~/mixins/color';

@Component({ components: { FaqQuestion }, head: { title: 'F.A.Q. - ATELIER MARMAILLES 974' } } as any)
export default class FaqPage extends mixins(FelaMixin, BreakpointMixin, ColorMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  hero: Hero = hero;
  questions: Question[] = questions;

  get count(): number {
    return Math.max(this.fullQuestions.length, Math.ceil(this.halfQuestions.length / 2), Math.ceil(this.thirdQuestions.length / 3));
  }

  get darkerTheme(): string {
    return `${this.color}D`;
  }

  get fullQuestions(): Question[] {
    return this.questions.filter(({ section }) => section === 1);
  }

  get halfDivider(): number {
    return this.breakpoint < 3 ? 1 : 2;
  }

  get halfQuestions(): Question[] {
    return this.questions.filter(({ section }) => section === 2);
  }

  get thirdDivider(): number {
    return this.breakpoint < 3 ? 1 : 3;
  }

  get thirdQuestions(): Question[] {
    return this.questions.filter(({ section }) => section === 3);
  }

  // =================================================================================================================================
  // METHODS
  // =================================================================================================================================

  getFullQuestionFromRow(rowIndex: number): Question {
    return this.fullQuestions[rowIndex - 1];
  }

  getHalfQuestionFromRow(rowIndex: number, index = 0): Question {
    return this.halfQuestions[(rowIndex - 1) * 2 + index];
  }

  getThirdQuestionFromRow(rowIndex: number, index = 0): Question {
    return this.thirdQuestions[(rowIndex - 1) * 3 + index];
  }

  hasHalfQuestionsRow(index: number): boolean {
    return this.halfQuestions.length >= (index - 1) * 2 + 1;
  }

  hasThirdQuestionsRow(index: number): boolean {
    return this.thirdQuestions.length >= (index - 1) * 3 + 2;
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Item: { flex: 1 },
    Row: { row: { md: 'stretch' } },
  };
}
</script>
