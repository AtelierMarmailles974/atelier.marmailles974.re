<template lang="pug">
include ../styles/mixins
+div('Component')
  +main('Main')
    +h4('Subtitle') {{ subtitle }}
    +ul('Extras'): +li('Extra')(v-for="(extra, i) in extras", :key="`extra_${i}`")
      fa-icon(icon="square", size="xs")
      +span('Extra_label') {{ extra }}
    +img('Image')(v-bind="img")
  +aside('Aside')
    +span('Drawings') Dessins max : {{ drawings }}
    +div('Colorings'): +div('Coloring')(v-for="(coloring, i) in colorings", :key="`coloring_${i}`")
      span {{ coloring.description }}
      +ul('Colors'): +li('Color', 'color')(v-for="(color, colorI) in coloring.colors", :key="`color_${i}_${colorI}`")
</template>


<script lang="ts">
import { Component, FelaMixin, mixins, Prop, Rules, Styles as S } from 'nuxt-fela';

import { Image, ProductColoring } from '~/definitions';

@Component
export default class HomeProductContent extends mixins(FelaMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  @Prop() colorings: ProductColoring[];
  @Prop() drawings: string;
  @Prop() extras: string[];
  @Prop() image: Image;
  @Prop() subtitle: string;

  get img() {
    const src = this.image.src.replace('/images/product.', '');
    return {
      ...this.image,
      src: `${require(`!file-loader!sharp-image-loader?width=160&height=160!~/static/images/product.${src}`)}`,
      srcset: `${require(`!file-loader!sharp-image-loader?width=160&height=160!~/static/images/product.${src}`)} 160w,
      ${require(`!file-loader!sharp-image-loader?width=320&height=320!~/static/images/product.${src}`)} 320w`,
    };
  }

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Aside: { row: { md: 'stretch' } },
    Color: (color): S => ({ ml: 1, w: 1.25, h: 1.25, bgC: color, bC: 'greyVL', bS: 'solid', bW: 1 }),
    Colors: { row: true },
    Coloring: { row: true, jc: 'space-between', px: 2, py: 1, bgC: 'white' },
    Colorings: { flex: 1, col: 'center', bgC: 'white' },
    Component: { col: true },
    Drawings: { row: true, px: 2, py: 2, ct: 'orange' },
    Extra: { row: true, py: 1, c: 'orange' },
    Extra_label: { ml: 2, c: 'black' },
    Extras: { flex: 1 },
    Image: { hide: { base: true, xs: false, sm: true, md: false }, w: 10, h: 10 },
    Main: { mb: 2, flex: 1, row: 'flex-start', wrap: true, ac: 'flex-start', px: 2, py: 2, bgC: 'white' },
    Subtitle: { mb: 4, flex: '100%', f: 2, fF: 'Springtime', fW: '500', lS: 1, c: 'orange' },
  };
}
</script>
