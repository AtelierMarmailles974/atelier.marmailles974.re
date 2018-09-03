<template lang="pug">
include ../styles/mixins
+div('Component')
  +header('Heading')
    +h1('Title').hero__title {{ hero.title }}
    +h2('Subtitle').hero__subtitle {{ hero.subtitle }}
  +img('Background').lazyload(v-bind="image")
  +div('Mask')
</template>

<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules, Styles as S } from 'nuxt-fela';

import { Hero } from '~/definitions';

@Component
export default class VHero extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop() hero: Hero;

  @Prop({ default: false })
  isHome: boolean;

  get image() {
    const src = this.hero.image.src.replace('/images/hero.', '');
    return {
      ...this.hero.image,
      src: `${require(`!url-loader!sharp-image-loader?width=40&height=40&blurSigma=2!~/static/images/hero.${src}`)}`,
      'data-srcset': `${require(`!file-loader!sharp-image-loader?width=544!~/static/images/hero.${src}`)} 544w,
      ${require(`!file-loader!sharp-image-loader?width=768&withoutEnlargement!~/static/images/hero.${src}`)} 768w,
      ${require(`!file-loader!sharp-image-loader?width=992&withoutEnlargement!~/static/images/hero.${src}`)} 992w,
      ${require(`!file-loader!sharp-image-loader?width=1280&withoutEnlargement!~/static/images/hero.${src}`)} 1280w,
      ${require(`!file-loader!sharp-image-loader?width=1488&withoutEnlargement!~/static/images/hero.${src}`)} 1488w,
      ${require(`!file-loader!sharp-image-loader?width=2512&withoutEnlargement!~/static/images/hero.${src}`)} 2512w,
      ${require(`!file-loader!sharp-image-loader?width=4000&withoutEnlargement!~/static/images/hero.${src}`)} 4000w`,
    };
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Background: { pin: -2, w: '100%', h: '100%', objectFit: 'cover', objectPosition: 'left center' },
    Component: ({ isHome }): S => ({
      col: isHome ? 'flex-end' : 'center',
      relative: true,
      h: isHome ? 'calc(100vh - 6rem)' : '30vh',
      ai: 'center',
    }),
    Heading: ({ isHome }): S => ({
      px: { base: 4, xs: 6, sm: 8 },
      pb: isHome ? { base: 4, xs: 12, sm: 18 } : 0,
      f: { base: 2, xs: 3, sm: 4 },
      textAlign: 'center',
    }),
    Mask: { pin: -1, bgC: 'white', opacity: 0.5 },
    Subtitle: { c: 'orange', fF: 'SpringTime', tSh: '0 2px 0 #333' },
    Title: { c: 'white', fW: '700', tSh: '0 2px 0 #333', uppercase: true },
  };
}
</script>


<style lang="scss" scoped>
.hero__subtitle {
  animation: fromRight 1s;
}
.hero__title {
  animation: fromLeft 1s;
}
@keyframes fromLeft {
  0% {
    transform: translateX(-100vw);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes fromRight {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

