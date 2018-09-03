<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins } from 'nuxt-fela';

import { hero } from '~/content/pages/sitemap.json';
import { Hero } from '~/definitions';

@Component
export default class SitemapPage extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  hero: Hero = hero;
}
</script>
