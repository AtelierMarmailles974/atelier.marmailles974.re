<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero", :isHome="true")
  v-introduction(:introduction="introduction")
  home-products(:products="products")
  home-partners(:partners="partners")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins } from 'nuxt-fela';

import HomePartners from '~/components/home-partners.vue';
import HomeProducts from '~/components/home-products.vue';
import { hero, introduction } from '~/content/pages/home.json';
import partners from '~/content/partners';
import products from '~/content/products';
import { Hero, Introduction, Partner, Product } from '~/definitions';

@Component({ components: { HomePartners, HomeProducts }, head: { title: 'Accueil - ATELIER MARMAILLES 974' } } as any)
export default class IndexPage extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  hero: Hero = hero;
  introduction: Introduction = introduction;
  partners: Partner[] = partners;
  products: Product[] = products;
}
</script>
