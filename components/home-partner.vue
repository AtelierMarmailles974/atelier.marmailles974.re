<template lang="pug">
include ../styles/mixins
+a('Component')(:href="partner.link", target="_blank", @mouseout="mouseout", @mouseover="mouseover")
  +img('Image').lazyload(v-bind="img")
  +span('Title') {{ partner.title }}
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules, Styles as S } from 'nuxt-fela';

import { Partner } from '~/definitions';

@Component
export default class HomePartner extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop({ type: Object })
  partner: Partner;

  isHovered: boolean = false;

  get img() {
    const src = this.partner.image.src.replace('/images/partner.', '');
    return {
      ...this.partner.image,
      src: `${require(`!url-loader!sharp-image-loader?width=40&height=40&blurSigma=2!~/static/images/partner.${src}`)}`,
      'data-srcset': `${require(`!file-loader!sharp-image-loader?width=64&height=64!~/static/images/partner.${src}`)} 64w,
      ${require(`!file-loader!sharp-image-loader?width=128&height=128!~/static/images/partner.${src}`)} 128w`,
    };
  }

  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  mouseout() {
    this.isHovered = false;
  }

  mouseover() {
    this.isHovered = true;
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Component: { relative: true, overflow: 'hidden', w: 6, h: 6 },
    Image: { w: 6, h: 6 },
    Title: ({ isHovered }): S => ({
      ...{ pin: 1, row: true, jc: 'center' },
      ...{ ct: 'orange', opacity: 0.9 },
      ...{ f: 0.75, uppercase: true, textAlign: 'center' },
      transform: isHovered ? 'translateY(0)' : 'translateY(-100%)',
      tr: '0.2s all',
    }),
  };
}
</script>
