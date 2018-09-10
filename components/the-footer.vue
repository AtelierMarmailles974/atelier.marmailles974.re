<template lang="pug">
include ../styles/mixins
+nav('Component')
  +v-container('Wrapper')
    +ul('Menu')
      +li('MenuItem', 'true'): a(href="/sitemap.xml") Plan du site
      +li('MenuItem', 'false'): nuxt-link(to="mentions-legales") Mentions légales
    +span('Copyright') ©2018 Atelier Marmailles - Tous droits réservés
</template>

<script lang="ts">
import { Component, FelaMixin, mixins, Rules, Styles as S } from 'nuxt-fela';

import { menus } from '~/content/options.json';
import { Menu } from '~/definitions';
import { ColorMixin } from '~/mixins/color';

@Component
export default class TheFooter extends mixins(FelaMixin, ColorMixin) {
  // =================================================================================================================================
  // PROPS
  // =================================================================================================================================

  menu: Menu = menus.secondary;

  // =================================================================================================================================
  // STYLES
  // =================================================================================================================================

  rules: Rules = {
    Component: ({ color }): S => ({
      w: '100%',
      p: 2,
      ct: color,
      ...{ btW: 1, btS: 'dashed', btC: 'blueVVL' },
      textAlign: 'center',
      tr: 'background-color 0.3s linear',
    }),
    Copyright: { f: { base: 0.8, xs: 1 } },
    Menu: { row: true, jc: 'center' },
    MenuItem: (first): S => (first ? { mr: 2 } : { pl: 2, blW: 2, blS: 'solid' }),
    Wrapper: { row: { sm: true }, jc: 'space-between' },
  };
}
</script>
