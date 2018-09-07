<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins } from 'nuxt-fela';

import { hero } from '~/content/pages/sitemap.json';
import { Hero } from '~/definitions';

@Component({ head: { title: 'Plan du site - ATELIER MARMAILLES 974' } } as any)
export default class SitemapPage extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  hero: Hero = hero;
}
</script>
