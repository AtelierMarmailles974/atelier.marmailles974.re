<template lang="pug">
include ../styles/mixins
v-section(:title="introduction.title")
  +div('Content')(v-html="introduction.content")
  +aside('Aside'): +img('Image').lazyload(v-bind="img")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules } from 'nuxt-fela';

import { Introduction } from 'definitions';

@Component
export default class VIntroduction extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop() introduction: Introduction;

  get img() {
    const src = this.introduction.image.src.replace('/images/intro.', '');
    return {
      ...this.introduction.image,
      src: `${require(`!url-loader!sharp-image-loader?width=40&height=40&blurSigma=2!~/static/images/intro.${src}`)}`,
      'data-srcset': `${require(`!file-loader!sharp-image-loader?width=256&height=256!~/static/images/intro.${src}`)} 256w,
      ${require(`!file-loader!sharp-image-loader?width=512&height=512!~/static/images/intro.${src}`)} 512w`,
    };
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Aside: { ml: { xs: 8 }, flex: { base: '100%', xs: 'none' }, col: true, ai: 'center' },
    Content: { flex: { base: '100%', xs: 1 }, f: { sm: 1.25 }, textAlign: 'justify' },
    Image: { w: 16 },
  };
}
</script>
