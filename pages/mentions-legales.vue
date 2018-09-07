<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins } from 'nuxt-fela';

import { hero } from '~/content/pages/legale-notice.json';
import { Hero } from '~/definitions';

@Component({ head: { title: 'Mentions légales - ATELIER MARMAILLES 974' } } as any)
export default class LegaleNoticePage extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  hero: Hero = hero;
}
</script>
