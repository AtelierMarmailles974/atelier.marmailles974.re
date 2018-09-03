<template lang="pug">
include ../styles/mixins
v-section(title="Découvrez nos produits", ct="greyVVL"): +ul('Items')
  +home-product('Item')(v-for="(p, i) in products", :key="`product_${i}`", :product="p", :index="i")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules } from 'nuxt-fela';

import HomeProduct from '~/components/home-product.vue';
import { Product } from '~/definitions';

@Component({ components: { HomeProduct } })
export default class HomeProducts extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop({ default: [] })
  products: Product[];

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Item: { mb: 12 },
    Items: { w: '100%'},
  };
}
</script>
