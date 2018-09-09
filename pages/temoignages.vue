<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero")
  v-introduction(:introduction="introduction")
  +v-section('Wrapper')(title="Ce que vous en dites", ct="greyVVL") 
    +testimonies-item('Item')(v-for="(t, i) of testimonies", :key="i", :item="t" )
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Rules } from 'nuxt-fela';

import TestimoniesItem from '~/components/testimonies-item.vue';
import { hero, introduction } from '~/content/pages/testimonies.json';
import testimonies from '~/content/testimonies';
import { Hero, Introduction, Testimony } from '~/definitions';

@Component({ components: { TestimoniesItem }, head: { title: 'Témoignages - ATELIER MARMAILLES 974' } } as any)
export default class TestimoniesPage extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  hero: Hero = hero;
  introduction: Introduction = introduction;
  testimonies: Testimony[] = testimonies;

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Introduction: { f: 1.25, textAlign: 'justify' },
    Item: { mb: 4 },
    Wrapper: { py: 16 },
  };
}
</script>
