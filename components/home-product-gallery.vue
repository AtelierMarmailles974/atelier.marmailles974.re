<template lang="pug">
include ../styles/mixins
+div('Component')
  +ul('Images'): +li('Image')(v-for="(image,i) in imgs"): +img('Image').lazyload(v-bind="image.thumb", @click="select(image)")
  +el-button(['Action', 'Action$previous'])(v-if="active > 0", icon="el-icon-arrow-left", type="primary", @click="previous")
  +el-button(['Action', 'Action$next'])(v-if="active < images.length - 1", icon="el-icon-arrow-right", type="primary", @click="next")
  +div('Mask')(v-if="selected"): +div('Mask$wrapper')
    +img('Selection').lazyload(v-bind="selected.selection")
    +el-button(['Action','Action$close'])(icon="el-icon-close", type="primary", @click="unselect()")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules, Styles as S } from 'nuxt-fela';

import { Image } from '~/definitions';
import { ColorMixin } from '~/mixins/color';

@Component
export default class HomeProductGallery extends mixins(FelaMixin, ColorMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop({ default: [] })
  images: Image[];

  active = 0;
  selected: Image = null;

  get imgs() {
    return this.images.map(({ alt, src }) => {
      const o = src.replace('/images/product.', '');
      src = require(`!url-loader!sharp-image-loader?width=40&height=40&blurSigma=2!~/static/images/product.${o}`);
      return {
        selection: {
          alt,
          src: `${require(`!file-loader!sharp-image-loader!~/static/images/product.${o}`)}`,
          /*
          src,
          'srcset': `${require(`!file-loader!sharp-image-loader?width=200&jpegQuality=100!~/static/images/product.${o}`)} 200w,
          ${require(`!file-loader!sharp-image-loader?width=400&jpegQuality=100&withoutEnlargement!~/static/images/product.${o}`)} 400w,
          ${require(`!file-loader!sharp-image-loader?width=800&jpegQuality=100&withoutEnlargement!~/static/images/product.${o}`)} 800w,
          ${require(`!file-loader!sharp-image-loader?width=1600&jpegQuality=100&withoutEnlargement!~/static/images/product.${o}`)} 1600w`,
          */
        },
        thumb: {
          alt,
          src,
          'data-srcset': `${require(`!file-loader!sharp-image-loader?width=400&height=400!~/static/images/product.${o}`)} 400w,
          ${require(`!file-loader!sharp-image-loader?width=800&height=800!~/static/images/product.${o}`)} 800w`,
        },
      };
    });
  }

  // =================================================================================================================================
  // EVENTS
  // =================================================================================================================================

  next() {
    this.active++;
  }

  previous() {
    this.active--;
  }

  select(image: Image) {
    this.selected = image;
  }

  unselect() {
    this.selected = null;
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Action: { p: '1rem!important', bRd: '0!important' },
    Action$close: { absolute: 1, right: 0.5, top: 0.5 },
    Action$next: { pinR: 1, top: 'calc(50% - 25px)', opacity: 0.75 },
    Action$previous: { pinL: 1, top: 'calc(50% - 25px)', opacity: 0.75 },
    Component: { relative: true, overflow: 'hidden', bW: 6, bS: 'solid', bC: 'white' },
    Image: { flex: 'none', w: '100%', cursor: 'pointer' },
    Images: ({ active }): S => ({ row: 'stretch', transform: `translateX(-${active}00%)`, transition: 'all 0.2s' }),
    Mask: { fix: 9, row: true, jc: 'center', bgC: 'black50' },
    Mask$wrapper: { relative: true },
    Selection: { maxW: '90vw', maxH: '90vh', bW: 8, bS: 'solid', bC: 'white' },
  };
}
</script>
