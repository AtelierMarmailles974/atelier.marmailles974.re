<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero")
  v-section(v-for="(a, i) of articles", :key="`article${i}`", :title="title(a)", :ct="ct(i)"): div(v-html="a.content")
</template>


<script lang="ts">
import _sortBy from 'lodash/sortBy';
import { Component, FelaMixin, mixins } from 'nuxt-fela';

import articles from '~/content/articles';
import { hero } from '~/content/pages/legale-notice.json';
import { Article, Hero } from '~/definitions';
import { ColorMixin } from '~/mixins/color';

@Component({ head: { title: 'Mentions légales - ATELIER MARMAILLES 974' } } as any)
export default class LegaleNoticePage extends mixins(FelaMixin, ColorMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  articles: Article[] = _sortBy(articles, 'order');
  hero: Hero = hero;

  // =================================================================================================================================
  // METHODS
  // =================================================================================================================================

  title(article: Article): string {
    return `${article.order} - ${article.title}`;
  }

  ct(index: number): string {
    if (index % 4 === 0) return this.color;
    if (index % 4 === 2) return `${this.color}D`;
    if (index % 4 === 1 || index % 4 === 3) return 'greyVVL';
  }
}
</script>
