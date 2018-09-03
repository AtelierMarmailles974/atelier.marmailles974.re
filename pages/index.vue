<template lang="pug">
include ../styles/mixins
div
  v-hero(:hero="hero", :isHome="true")
  v-introduction(:introduction="introduction")
  home-products(:products="products")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins } from 'nuxt-fela';

import HomeProducts from '~/components/home-products.vue';
import { hero, introduction } from '~/content/pages/home.json';
import products from '~/content/products';
import { Hero, Introduction, Product } from '~/definitions';

@Component({ components: { HomeProducts } })
export default class IndexPage extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  hero: Hero = hero;
  introduction: Introduction = introduction;
  products: Product[] = products;
}
</script>
