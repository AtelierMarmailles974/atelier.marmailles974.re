<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero")
  v-section(ct="greyVVL"): ul: li(v-for="a of articles")
    h4 {{ a.title }}
    div(v-html="a.content")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins } from 'nuxt-fela';

import articles from '~/content/articles';
import { hero } from '~/content/pages/legale-notice.json';
import { Article, Hero } from '~/definitions';

@Component({ head: { title: 'Mentions légales - ATELIER MARMAILLES 974' } } as any)
export default class LegaleNoticePage extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  articles: Article[] = articles;
  hero: Hero = hero;
}
</script>
