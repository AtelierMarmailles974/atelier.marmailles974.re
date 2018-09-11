<template lang="pug">
include ../styles/mixins
+div('Component')
  +ul('Images'): +li('Image')(v-for="(i, ind) in imgs")
    +img('Image').lazyload(v-bind="i.thumb", @click="select($event.target, i.selection, ind)")
  +el-button(['Action', 'Action$previous'])(v-if="active > 0", icon="el-icon-arrow-left", type="primary", @click="previous")
  +el-button(['Action', 'Action$next'])(v-if="active < images.length - 1", icon="el-icon-arrow-right", type="primary", @click="next")
  transition
    +div('Mask')(v-if="selected")
      +img('Selection').lazyload(v-bind="selected")
      +el-button(['Action','Action$close'])(icon="el-icon-close", type="primary", @click="unselect()")
      +el-button(['Action', 'Action$previous', 'Action$selectionPrevious'])(v-if="active > 0", icon="el-icon-arrow-left", type="primary", 
      @click="selectPrevious")
      +el-button(['Action', 'Action$next', 'Action$selectionNext'])(v-if="active < images.length - 1", icon="el-icon-arrow-right", 
      type="primary", @click="selectNext")
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

  @Prop({ default: [], type: Array })
  images: Image[];

  active = 0;
  from;
  selected: Image = null;
  selectedIndex = -1;

  get imgs() {
    return this.images.filter(({ src }) => !!src).map(({ alt, src }) => {
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

  select(el: Element, image: Image, index: number) {
    const rect = el.getBoundingClientRect();
    this.from = {
      left: rect.left / 4,
      top: rect.top / 4,
    };

    this.selected = image;
    this.selectedIndex = index;
  }

  selectNext() {
    this.selectedIndex++;
    this.selected = this.imgs[this.selectedIndex].selection;
  }

  selectPrevious() {
    this.selectedIndex--;
    this.selected = this.imgs[this.selectedIndex].selection;
  }

  unselect() {
    this.selected = null;
    this.selectedIndex = -1;
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  selection_bW = 8;

  rules: Rules = {
    Action: { p: '1rem!important', bRd: '0!important' },
    Action$close: { absolute: 1, right: 1, top: 1 },
    Action$next: { pinR: 1, top: 'calc(50% - 25px)', opacity: 0.75 },
    Action$previous: { pinL: 1, top: 'calc(50% - 25px)', opacity: 0.75 },
    Action$selectionNext: ({ selection_bW }): S => ({ mr: `${selection_bW}px!important` }),
    Action$selectionPrevious: ({ selection_bW }): S => ({ ml: `${selection_bW}px!important` }),
    Component: { relative: true, overflow: 'hidden', bW: 6, bS: 'solid', bC: 'white' },
    Image: { flex: 'none', w: '100%', cursor: 'pointer' },
    Images: ({ active }): S => ({ row: 'stretch', transform: `translateX(-${active}00%)`, transition: 'all 0.2s' }),
    Mask: { fix: 9, row: true, jc: 'center', bgC: 'black50' },
    Selection: ({ selection_bW }): S => ({ maxW: '90vw', maxH: '90vh', bW: selection_bW, bS: 'solid', bC: 'white', tr: 'all 0.3s' }),
  };
}
</script>
