<template lang="pug">
include ../styles/mixins
li
  +header('Header')
    +div('Header$withStatus')(v-if="hasStatus")
      fa-icon(:icon="statusIcon")
      +span('Header$withStatus_label')(v-if="breakpoint > 1") {{ statusLabel }}
    +h3('Title') {{ product.title }}
  +div('Wrapper')
    +home-product-gallery('Gallery')(v-bind="product")
    +home-product-content('Content')(v-bind="product")
  home-product-pricing(:pricing="product.pricing", :ct="ct")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules, Styles as S } from 'nuxt-fela';

import HomeProductContent from '~/components/home-product-content.vue';
import HomeProductGallery from '~/components/home-product-gallery.vue';
import HomeProductPricing from '~/components/home-product-pricing.vue';
import { Product } from '~/definitions';
import { BreakpointMixin } from '~/mixins/breakpoint';
import { ColorMixin } from '~/mixins/color';

@Component({ components: { HomeProductContent, HomeProductGallery, HomeProductPricing } })
export default class HomeProduct extends mixins(FelaMixin, BreakpointMixin, ColorMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop({ default: 0 })
  index: number;

  @Prop({ default: [] })
  product: Product;

  get ct(): string {
    return `${this.color}${this.index % 2 ? 'D' : ''}`;
  }

  get hasStatus(): boolean {
    return this.product.isDiscount || this.product.isNew;
  }

  get statusIcon(): string {
    return this.product.isNew ? 'star' : 'tag';
  }

  get statusLabel(): string {
    return this.product.isNew ? 'Nouveau' : 'Promo';
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Content: { flex: 1, pt: { base: 2, sm: 0 }, pl: { sm: 2 } },
    Gallery: { alignSelf: 'center', w: '100%', maxW: 24 },
    Header: ({ ct }): S => ({ mb: 2, row: 'stretch', ct, tr: 'background-color 0.3s linear' }),
    Header$withStatus: { row: true, px: 4, ct: 'orange', uppercase: true },
    Header$withStatus_label: { ml: 1 },
    Title: { py: 1, px: 4, f: 1.5, fW: '500', uppercase: true },
    Wrapper: { mb: 2, col: { base: true, sm: false }, row: { sm: 'stretch' } },
  };
}
</script>
